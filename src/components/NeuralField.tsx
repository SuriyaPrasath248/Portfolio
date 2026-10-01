"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Interactive "neural field": a few thousand neurons on a deformed sphere,
// wired to their nearest neighbours. Signals ripple across the network, and
// neurons near the cursor light up. Pure three.js, one draw call each for
// points and links; pauses when off-screen and respects reduced motion.

const POINT_VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;      // NDC
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vGlow;
  varying float vMix;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    // Signal waves travelling over the surface
    float wave = sin(position.y * 5.0 - uTime * 1.6 + aSeed * 6.2831) * 0.5 + 0.5;
    wave = pow(wave, 8.0);

    // Cursor proximity in screen space
    vec2 ndc = gl_Position.xy / gl_Position.w;
    float d = distance(ndc, uMouse);
    float near = smoothstep(0.35, 0.0, d);

    vGlow = 0.25 + wave * 0.9 + near * 1.4;
    vMix = clamp(position.x * 0.5 + 0.5, 0.0, 1.0);
    float size = (1.6 + aSeed * 2.2 + near * 4.0 + wave * 2.0) * uPixelRatio;
    gl_PointSize = size * (3.2 / -mv.z);
  }
`;

const POINT_FRAG = /* glsl */ `
  uniform vec3 uA;
  uniform vec3 uB;
  varying float vGlow;
  varying float vMix;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float core = smoothstep(0.5, 0.0, r);
    vec3 col = mix(uA, uB, vMix);
    gl_FragColor = vec4(col * (0.6 + vGlow), core * min(1.0, 0.35 + vGlow * 0.6));
  }
`;

const LINE_VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aPhase;
  varying float vA;
  varying float vMix;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vec2 ndc = gl_Position.xy / gl_Position.w;
    float near = smoothstep(0.4, 0.0, distance(ndc, uMouse));
    float pulse = pow(sin(aPhase * 6.2831 - uTime * 1.2) * 0.5 + 0.5, 12.0);
    vA = 0.05 + pulse * 0.55 + near * 0.35;
    vMix = clamp(position.x * 0.5 + 0.5, 0.0, 1.0);
  }
`;

const LINE_FRAG = /* glsl */ `
  uniform vec3 uA;
  uniform vec3 uB;
  varying float vA;
  varying float vMix;
  void main() {
    gl_FragColor = vec4(mix(uA, uB, vMix), vA);
  }
`;

function buildNetwork(count: number) {
  const pos = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    let x = Math.cos(th) * rad;
    let z = Math.sin(th) * rad;
    // Organic lobes so it reads as a "brain", not a perfect ball
    const lobe = 1 + 0.16 * Math.sin(3 * x + 2 * y) * Math.cos(2 * z - y) + 0.06 * Math.sin(9 * y);
    const jitter = 0.94 + Math.random() * 0.12;
    const r = lobe * jitter;
    x *= r * 1.18;
    z *= r;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y * r * 0.92;
    pos[i * 3 + 2] = z;
    seeds[i] = Math.random();
  }

  // Link each neuron to its 2 nearest neighbours within a radius
  const links: number[] = [];
  const phases: number[] = [];
  const maxD2 = 0.026;
  for (let i = 0; i < count; i++) {
    const ax = pos[i * 3], ay = pos[i * 3 + 1], az = pos[i * 3 + 2];
    let b1 = -1, b2 = -1, d1 = Infinity, d2 = Infinity;
    for (let j = i + 1; j < count; j++) {
      const dx = pos[j * 3] - ax, dy = pos[j * 3 + 1] - ay, dz = pos[j * 3 + 2] - az;
      const d = dx * dx + dy * dy + dz * dz;
      if (d > maxD2) continue;
      if (d < d1) { d2 = d1; b2 = b1; d1 = d; b1 = j; }
      else if (d < d2) { d2 = d; b2 = j; }
    }
    for (const b of [b1, b2]) {
      if (b < 0) continue;
      links.push(ax, ay, az, pos[b * 3], pos[b * 3 + 1], pos[b * 3 + 2]);
      const ph = Math.random();
      phases.push(ph, ph + 0.04);
    }
  }
  return { pos, seeds, links: new Float32Array(links), phases: new Float32Array(phases) };
}

export default function NeuralField({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 640;
    const count = small ? 1400 : 2600;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL → the CSS gradient behind it still looks fine
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0, 4.2);

    const { pos, seeds, links, phases } = buildNetwork(count);
    const colA = new THREE.Color("#8b7bff");
    const colB = new THREE.Color("#3ee6ff");
    const mouse = new THREE.Vector2(9, 9);

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    const pMat = new THREE.ShaderMaterial({
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: mouse },
        uPixelRatio: { value: dpr },
        uA: { value: colA },
        uB: { value: colB },
      },
    });
    const points = new THREE.Points(pGeo, pMat);

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(links, 3));
    lGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    const lMat = new THREE.ShaderMaterial({
      vertexShader: LINE_VERT,
      fragmentShader: LINE_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: pMat.uniforms.uTime, uMouse: { value: mouse }, uA: { value: colA }, uB: { value: colB } },
    });
    const lines = new THREE.LineSegments(lGeo, lMat);

    const group = new THREE.Group();
    group.add(lines, points);
    group.rotation.set(0.25, -0.4, 0.08);
    scene.add(group);

    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w / h < 0.9 ? 5.4 : 4.2;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Pointer: NDC for the shaders, plus a gentle tilt target
    const tilt = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      tilt.x = mouse.y * 0.25;
      tilt.y = mouse.x * 0.35;
    };
    const onLeave = () => { mouse.set(9, 9); tilt.x = 0; tilt.y = 0; };
    window.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    let rotY = -0.4;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      pMat.uniforms.uTime.value += dt;
      rotY += dt * 0.06;
      group.rotation.y += (rotY + tilt.y - group.rotation.y) * 0.05;
      group.rotation.x += (0.25 + tilt.x - group.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };

    if (reduced) {
      pMat.uniforms.uTime.value = 2.0;
      renderer.render(scene, camera);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      pGeo.dispose(); lGeo.dispose(); pMat.dispose(); lMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
