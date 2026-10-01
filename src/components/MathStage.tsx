"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Hero "figure": thousands of particles morphing between shapes from AI and
// mathematics, captioned like a figure in a paper. One draw call; pauses when
// off-screen; reduced-motion users get a static first figure.

type Fig = { title: string; formula: string; spin: boolean; make: (n: number) => Float32Array };

const rand = (a: number, b: number) => a + Math.random() * (b - a);

// ── Generators (each returns n points as x,y,z) ─────────────────────────────

function neuralNet(n: number) {
  const layers = [4, 6, 6, 3];
  const xs = layers.map((_, i) => -1.5 + (3 / (layers.length - 1)) * i);
  const nodes: [number, number][][] = layers.map((count, li) =>
    Array.from({ length: count }, (_, k) => [xs[li], (k - (count - 1) / 2) * 0.42] as [number, number]),
  );
  const out = new Float32Array(n * 3);
  let i = 0;
  const perNode = 60;
  for (const layer of nodes) {
    for (const [x, y] of layer) {
      for (let c = 0; c < perNode && i < n; c++, i++) {
        const a = rand(0, Math.PI * 2), r = c < perNode * 0.5 ? 0.075 : Math.sqrt(Math.random()) * 0.06;
        out.set([x + Math.cos(a) * r, y + Math.sin(a) * r, rand(-0.02, 0.02)], i * 3);
      }
    }
  }
  const edges: [[number, number], [number, number]][] = [];
  for (let l = 0; l < nodes.length - 1; l++) for (const a of nodes[l]) for (const b of nodes[l + 1]) edges.push([a, b]);
  const per = Math.floor((n - i) / edges.length);
  for (const [[x1, y1], [x2, y2]] of edges) {
    for (let c = 0; c < per && i < n; c++, i++) {
      const t = Math.random();
      out.set([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, rand(-0.01, 0.01)], i * 3);
    }
  }
  for (; i < n; i++) out.set([xs[0], 0, 0], i * 3);
  return out;
}

function lossLandscape(n: number) {
  const f = (x: number, z: number) => 0.32 * Math.sin(1.7 * x) * Math.cos(1.5 * z) + 0.13 * (x * x + z * z) - 0.35;
  const grad = (x: number, z: number) => [
    0.32 * 1.7 * Math.cos(1.7 * x) * Math.cos(1.5 * z) + 0.26 * x,
    -0.32 * 1.5 * Math.sin(1.7 * x) * Math.sin(1.5 * z) + 0.26 * z,
  ];
  const pts: [number, number, number][] = [];
  const surf = Math.floor(n * 0.8);
  // surface as a grid of iso-lines (reads as a mesh, not noise)
  for (let k = 0; k < surf; k++) {
    let x = rand(-1.6, 1.6), z = rand(-1.6, 1.6);
    if (k % 2) x = Math.round(x * 6) / 6; else z = Math.round(z * 6) / 6;
    pts.push([x, f(x, z), z]);
  }
  // gradient-descent path from a high corner down to a minimum
  const path: [number, number, number][] = [];
  let x = 1.45, z = 1.3;
  for (let s = 0; s < 400; s++) {
    path.push([x, f(x, z) + 0.03, z]);
    const [gx, gz] = grad(x, z);
    x -= 0.03 * gx;
    z -= 0.03 * gz;
  }
  for (let k = 0; pts.length < n; k++) {
    const p = path[Math.floor(Math.random() * path.length)];
    pts.push([p[0] + rand(-0.012, 0.012), p[1], p[2] + rand(-0.012, 0.012)]);
  }
  // tilt so we look down onto the surface
  const out = new Float32Array(n * 3);
  const c = Math.cos(0.6), s = Math.sin(0.6);
  pts.forEach(([px, py, pz], idx) => out.set([px * 0.82, (py * c - pz * s) * 0.82 + 0.3, (py * s + pz * c) * 0.82], idx * 3));
  return out;
}

function lorenz(n: number) {
  const out = new Float32Array(n * 3);
  let x = 0.1, y = 0, z = 0;
  const sg = 10, rh = 28, bt = 8 / 3, dt = 0.004;
  for (let k = 0; k < 2000; k++) {
    const dx = sg * (y - x), dy = x * (rh - z) - y, dz = x * y - bt * z;
    x += dx * dt; y += dy * dt; z += dz * dt;
  }
  for (let i = 0; i < n; i++) {
    for (let s = 0; s < 3; s++) {
      const dx = sg * (y - x), dy = x * (rh - z) - y, dz = x * y - bt * z;
      x += dx * dt; y += dy * dt; z += dz * dt;
    }
    out.set([x / 19, (z - 25) / 19, y / 19], i * 3);
  }
  return out;
}

function torusKnot(n: number) {
  const out = new Float32Array(n * 3);
  const p = 2, q = 3;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = Math.cos(q * t) + 2;
    const v = new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize().multiplyScalar(Math.random() * 0.13);
    out.set([r * Math.cos(p * t) * 0.42 + v.x, -Math.sin(q * t) * 0.42 + v.y, r * Math.sin(p * t) * 0.42 + v.z], i * 3);
  }
  return out;
}

function fourier(n: number) {
  const out = new Float32Array(n * 3);
  const terms = [1, 2, 3, 6, 14]; // partial sums, last one ≈ square wave
  for (let i = 0; i < n; i++) {
    const layer = i % terms.length;
    const xr = rand(-Math.PI, Math.PI);
    let y = 0;
    for (let k = 1; k <= terms[layer]; k++) y += Math.sin((2 * k - 1) * xr) / (2 * k - 1);
    y *= (4 / Math.PI) * 0.6;
    out.set([xr * 0.44, y + rand(-0.008, 0.008), (layer - 2) * 0.2], i * 3);
  }
  return out;
}

const FIGS: Fig[] = [
  { title: "Neural network", formula: "y = σ(Wx + b)", spin: false, make: neuralNet },
  { title: "Loss landscape · gradient descent", formula: "θ ← θ − η ∇L(θ)", spin: false, make: lossLandscape },
  { title: "Lorenz attractor", formula: "ẋ = σ(y − x)", spin: true, make: lorenz },
  { title: "(2, 3) torus knot", formula: "r = cos 3t + 2", spin: true, make: torusKnot },
  { title: "Fourier series → square wave", formula: "f(x) = Σ sin((2k−1)x) / (2k−1)", spin: false, make: fourier },
];

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  attribute vec3 aTo;
  attribute float aSeed;
  attribute vec3 aDir;
  varying float vGlow;
  varying float vMix;
  float ease(float t) { return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t + 2.0, 3.0) / 2.0; }
  void main() {
    vec3 p = mix(position, aTo, ease(uMorph));
    p += aDir * sin(3.14159 * uMorph) * (0.2 + aSeed * 0.3);
    p += aDir * sin(uTime * 1.3 + aSeed * 12.0) * 0.008;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float sweep = pow(sin(p.x * 2.0 - uTime * 1.8) * 0.5 + 0.5, 10.0);
    float near = smoothstep(0.3, 0.0, distance(gl_Position.xy / gl_Position.w, uMouse));
    vGlow = 0.5 + sweep * 0.9 + near * 1.2;
    vMix = clamp(p.x * 0.33 + 0.5 + p.y * 0.12, 0.0, 1.0);
    gl_PointSize = (2.6 + aSeed * 2.0 + sweep * 2.0 + near * 3.0) * uPixelRatio * (4.2 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uA;
  uniform vec3 uB;
  varying float vGlow;
  varying float vMix;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float a = smoothstep(0.5, 0.05, r);
    gl_FragColor = vec4(mix(uA, uB, vMix) * (0.75 + vGlow), a * min(1.0, 0.6 + vGlow * 0.5));
  }
`;

const CYCLE_MS = 4800;
const MORPH_MS = 1400;

export default function MathStage({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const goRef = useRef<(i: number) => void>(() => {});
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = window.innerWidth < 640 ? 3500 : 7000;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 5);

    const shapes = FIGS.map((f) => f.make(n));
    const seeds = new Float32Array(n);
    const dirs = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      seeds[i] = Math.random();
      const v = new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize();
      dirs.set([v.x, v.y, v.z], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(shapes[0].slice(), 3);
    const toAttr = new THREE.BufferAttribute(shapes[0].slice(), 3);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("aTo", toAttr);
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aDir", new THREE.BufferAttribute(dirs, 3));

    const mouse = new THREE.Vector2(9, 9);
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uMouse: { value: mouse },
        uPixelRatio: { value: dpr },
        uA: { value: new THREE.Color("#8b7bff") },
        uB: { value: new THREE.Color("#3ee6ff") },
      },
    });
    const group = new THREE.Group();
    group.add(new THREE.Points(geo, mat));
    scene.add(group);

    let current = 0;
    let morphing = false;
    let morphStart = 0;
    let lastSwitch = performance.now();

    const go = (target: number) => {
      target = ((target % FIGS.length) + FIGS.length) % FIGS.length;
      if (target === current && !morphing) return;
      if (morphing) (posAttr.array as Float32Array).set(toAttr.array as Float32Array);
      (toAttr.array as Float32Array).set(shapes[target]);
      posAttr.needsUpdate = true;
      toAttr.needsUpdate = true;
      mat.uniforms.uMorph.value = 0;
      morphStart = performance.now();
      lastSwitch = morphStart;
      morphing = true;
      current = target;
      setIdx(target);
    };
    goRef.current = go;

    const resize = () => {
      const w = host.clientWidth || 1, h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const tilt = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      const inside = Math.abs(mouse.x) < 1.2 && Math.abs(mouse.y) < 1.2;
      tilt.x = inside ? -mouse.y * 0.2 : 0;
      tilt.y = inside ? mouse.x * 0.3 : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    let spin = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) { lastSwitch = performance.now() - 1000; return; }
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = (mat.uniforms.uTime.value += dt);
      const now = performance.now();

      if (!morphing && now - lastSwitch > CYCLE_MS) go(current + 1);
      if (morphing) {
        const k = Math.min(1, (now - morphStart) / MORPH_MS);
        mat.uniforms.uMorph.value = k;
        if (k >= 1) {
          (posAttr.array as Float32Array).set(toAttr.array as Float32Array);
          posAttr.needsUpdate = true;
          mat.uniforms.uMorph.value = 0;
          morphing = false;
        }
      }

      let targetY: number;
      if (FIGS[current].spin) {
        spin += dt * 0.3;
        targetY = spin;
      } else {
        const front = Math.round(group.rotation.y / (Math.PI * 2)) * Math.PI * 2;
        targetY = front + Math.sin(time * 0.6) * 0.25;
        spin = group.rotation.y;
      }
      group.rotation.y += (targetY + tilt.y - group.rotation.y) * 0.06;
      group.rotation.x += (tilt.x - group.rotation.x) * 0.06;
      renderer.render(scene, camera);
    };
    if (reduced) renderer.render(scene, camera);
    else frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const fig = FIGS[idx];
  return (
    <figure className={`relative m-0 ${className}`}>
      {/* soft light behind the particles — no frame, they float on the page */}
      <div className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-[100px]" />
      {/* canvas overhangs the column so shapes can breathe */}
      <div ref={hostRef} className="absolute -top-[6%] -bottom-[6%] left-0 -right-[8%]" aria-hidden="true" />

      <figcaption className="absolute right-0 -bottom-4 flex flex-col items-end gap-2.5 text-right">
        <div>
          <p className="text-[13.5px] font-medium text-fg-2">{fig.title}</p>
          <p className="mt-0.5 font-mono text-[12px] text-cyan">{fig.formula}</p>
        </div>
        <div className="flex shrink-0 gap-1.5" role="tablist" aria-label="Figures">
          {FIGS.map((f, i) => (
            <button
              key={f.title}
              type="button"
              role="tab"
              aria-selected={i === idx}
              aria-label={f.title}
              onClick={() => goRef.current(i)}
              className={`h-1.5 cursor-pointer rounded-full transition-all ${i === idx ? "w-6 bg-cyan" : "w-1.5 bg-fg-3/60 hover:bg-fg-2"}`}
            />
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
