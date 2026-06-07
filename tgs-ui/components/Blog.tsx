import { blogPosts } from "@/lib/data";

export default function Blog() {
  return (
    <section id="blog" className="py-[100px] px-10 max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-14 pb-5 border-b border-tgs-border">
        <div>
          <div className="font-mono text-[11px] text-tgs-muted tracking-[0.12em] uppercase mb-2 flex items-center gap-2">
            <span className="block w-3.5 h-px bg-tgs-muted" />
            Writing
          </div>
          <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.05] tracking-tight text-tgs-text">
            Articles
          </h2>
        </div>
        <a
          href="#"
          className="inline-flex font-mono text-[12px] text-tgs-muted border border-tgs-border px-6 py-3 rounded-[4px] no-underline tracking-widest uppercase whitespace-nowrap transition-all duration-200 hover:text-tgs-text hover:border-tgs-borderh hover:-translate-y-px"
        >
          View all →
        </a>
      </div>

      <div className="flex flex-col gap-px bg-tgs-border border border-tgs-border rounded-md overflow-hidden">
        {blogPosts.map((post) => (
          <a
            key={post.title}
            href={post.href}
            className="bg-tgs-surface px-9 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-10 no-underline transition-colors duration-200 hover:bg-tgs-surface2"
          >
            <div className="font-mono text-[11px] text-tgs-muted tracking-widest uppercase sm:min-w-[90px]">
              {post.date}
            </div>
            <div className="font-sans text-[16px] font-semibold text-tgs-body flex-1">
              {post.title}
            </div>
            <div className="font-mono text-[10px] text-tgs-muted bg-tgs-bg border border-tgs-border px-2.5 py-0.5 rounded-sm tracking-widest uppercase self-start sm:self-auto">
              {post.tag}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
