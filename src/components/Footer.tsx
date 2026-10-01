import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-x-6 gap-y-2 px-5 py-7 pb-10 font-mono text-[12px] text-fg-3 sm:px-8 lg:px-12">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>{site.location}</p>
      </div>
    </footer>
  );
}
