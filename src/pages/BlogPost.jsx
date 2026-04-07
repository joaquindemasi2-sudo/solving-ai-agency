import { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
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

/* Simple markdown-ish renderer for ## headings, **bold**, and paragraphs */
function RenderContent({ content }) {
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-sans font-semibold text-2xl text-black mt-12 mb-6 tracking-tight">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('- **')) {
      // Collect all list items
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        const item = lines[i].trim().slice(2);
        items.push(item);
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-3 my-6">
          {items.map((item, j) => {
            const parts = item.split(/(\*\*.*?\*\*)/g).map((part, k) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={k} className="text-black font-medium">{part.slice(2, -2)}</strong>
                : part
            );
            return (
              <li key={j} className="text-body flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-black/40 mt-3 shrink-0"></span>
                <span>{parts}</span>
              </li>
            );
          })}
        </ul>
      );
      continue;
    } else {
      // Regular paragraph — handle **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g).map((part, k) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={k} className="text-black font-medium">{part.slice(2, -2)}</strong>
          : part
      );
      elements.push(<p key={i} className="text-body mb-6">{parts}</p>);
    }

    i++;
  }

  return <>{elements}</>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const articleRef = useReveal();

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  // Find next/prev posts
  const currentIdx = posts.indexOf(post);
  const nextPost = posts[currentIdx + 1];
  const prevPost = posts[currentIdx - 1];

  return (
    <main className="relative z-10 w-full">
      <section className="pt-[10rem] pb-[8rem] bg-white min-h-screen">
        <div className="w-full max-w-[48rem] mx-auto px-6 lg:px-12">

          {/* Back */}
          <div className="mb-[4rem]">
            <Link to="/blog" className="btn-outline text-sm">
              <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
              All Articles
            </Link>
          </div>

          {/* Article Header */}
          <div ref={articleRef} className="reveal-up">
            <div className="flex items-center gap-4 mb-[2rem]">
              <span className="font-mono text-[0.65rem] text-[#52525B] uppercase tracking-widest">{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-black/20"></span>
              <span className="font-mono text-[0.65rem] text-[#52525B] uppercase tracking-widest">{post.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-black/20"></span>
              <time className="font-mono text-[0.65rem] text-[#52525B] uppercase tracking-widest">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
            </div>

            <h1 className="text-h2 text-black mb-[3rem]">{post.title}</h1>

            <div className="flex items-center gap-4 pb-[3rem] mb-[3rem] border-b border-black/10">
              <img src="/profile.png" alt="Joaquin de Masi" className="w-10 h-10 rounded-full object-cover grayscale" />
              <div>
                <span className="block font-sans font-semibold text-sm text-black">Joaquin de Masi</span>
                <span className="block font-mono text-[0.6rem] text-[#52525B] uppercase tracking-widest">Founder</span>
              </div>
            </div>

            {/* Article Body */}
            <article className="prose-none">
              <RenderContent content={post.content} />
            </article>

            {/* Navigation */}
            <div className="mt-[6rem] pt-[3rem] border-t border-black/10 flex justify-between items-center">
              {prevPost ? (
                <Link to={`/blog/${prevPost.slug}`} className="btn-outline text-sm">
                  <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
                  {prevPost.title}
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link to={`/blog/${nextPost.slug}`} className="btn-outline text-sm">
                  {nextPost.title}
                  <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                </Link>
              ) : <div />}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
