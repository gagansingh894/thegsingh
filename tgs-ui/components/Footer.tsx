import SocialLink from "@/components/SocialLink";

export default function Footer() {
  return (
    <footer className="border-t border-tgs-border">
      <div className="max-w-[1200px] mx-auto px-10 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[11px] text-tgs-muted tracking-[0.04em]">
          © 2026 G Singh — Built with intent.
        </div>
        <div className="flex gap-6">
          <SocialLink href="https://github.com/gagansingh894" label="GitHub" type="github" className="text-tgs-muted hover:text-tgs-text" />
          <SocialLink href="https://linkedin.com/in/gagandeepsingh894" label="LinkedIn" type="linkedin" className="text-tgs-muted hover:text-tgs-text" />
          <SocialLink href="mailto:gagandeep@thegsingh.com" label="Email" type="email" className="text-tgs-muted hover:text-tgs-text" />
        </div>
      </div>
    </footer>
  );
}
