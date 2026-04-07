import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import posts from '../data/posts';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Blog() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const headerRef = useReveal();
  const gridRef = useReveal();

  return (
    <main className="relative z-10 w-full">
      <section className="pt-[10rem] pb-[8rem] bg-white min-h-screen">
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12">

          {/* Header */}
          <div ref={headerRef} className="reveal-up mb-[6rem]">
            <div className="editorial-badge mb-[2rem]">INSIGHTS</div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h1 className="text-h2 text-black">Blog</h1>
              <p className="text-body max-w-[28rem]">
                Practical AI strategies for blue collar businesses. No buzzwords, just results.
              </p>
            </div>
          </div>

          {/* Posts Grid */}
          <div ref={gridRef} className="reveal-up delay-1">
            <div className="swiss-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  to={`/blog/${post.slug}`}
                  key={post.slug}
                  className="p-8 lg:p-10 flex flex-col hover-lift group cursor-pointer"
                >
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-auto pb-8">
                    <span className="font-mono text-[0.65rem] text-[#52525B] uppercase tracking-widest">{post.category}</span>
                    <span className="font-mono text-[0.65rem] text-[#52525B] uppercase tracking-widest">{post.readTime}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <time className="font-mono text-[0.65rem] text-black/30 uppercase tracking-widest block mb-4">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                    <h2 className="font-sans font-semibold text-xl text-black mb-4 tracking-tight group-hover:text-[#52525B] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[#52525B] text-sm leading-relaxed mb-6">{post.excerpt}</p>
                    <span className="font-mono text-[0.65rem] text-black uppercase tracking-widest flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Article
                      <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
