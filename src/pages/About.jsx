import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroRef = useReveal();
  const quoteRef = useReveal();
  const bodyRef = useReveal();
  const statsRef = useReveal();
  const timelineRef = useReveal();
  const ctaRef = useReveal();

  const stats = [
    { value: '5+', label: 'U.S. states worked across' },
    { value: '$12M+', label: 'Properties managed' },
    { value: '100%', label: 'Blue collar, by trade' },
  ];

  const timeline = [
    { place: 'Buenos Aires, Argentina', desc: 'Family construction business. Where it all started.', icon: 'solar:home-angle-linear' },
    { place: 'Georgia, USA', desc: 'Painting crew manager', icon: 'solar:paint-roller-linear' },
    { place: 'Deer Valley, Utah', desc: 'Property manager. Luxury homes $12M+. Met Mr. Crandall. Discovered AI.', icon: 'solar:buildings-linear' },
    { place: 'Montana', desc: 'Ranch manager & handyman', icon: 'solar:map-point-linear' },
    { place: 'Now. AI Automation Agency', desc: 'Helping blue collar companies adapt, automate, and stay ahead', icon: 'solar:cpu-linear', active: true },
  ];

  return (
    <main className="relative z-10 w-full">

      {/* HERO — Photo + Headline */}
      <section className="pt-[10rem] pb-[8rem] bg-white relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] max-w-[1000px] max-h-[600px] bg-black/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10">
          {/* Back */}
          <div className="mb-[4rem]">
            <Link to="/" className="btn-outline text-sm">
              <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
              Back to Home
            </Link>
          </div>

          <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-2 gap-[4rem] lg:gap-[6rem] items-start reveal-up">
            {/* Photo */}
            <div className="relative w-full aspect-[3/4] overflow-hidden group">
              <img
                src="/profile.png"
                alt="Joaquin de Masi"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 border border-black/20 m-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black -translate-x-[1px] -translate-y-[1px]"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black translate-x-[1px] translate-y-[1px]"></div>
              </div>
            </div>

            {/* Headline + Intro */}
            <div className="flex flex-col justify-center">
              <div className="editorial-badge mb-[2rem]">FOUNDER // ABOUT</div>
              <h1 className="text-h2 text-black mb-2">
                Blue collar roots.
              </h1>
              <h2 className="text-h2 text-[#52525B] mb-[3rem]">
                AI-powered future.
              </h2>

              <div className="space-y-6 text-body">
                <p>
                  I grew up in <span className="text-black font-medium">Buenos Aires Province, Argentina</span>, inside a family construction business. I learned early that work is not something you talk about. It's something you do with your hands, your back, and everything you've got.
                </p>
                <p>
                  That same drive brought me to the <span className="text-black font-medium">United States</span> chasing something better. I moved through states, took on every role in front of me, and never stopped. I managed painting crews in <span className="text-black font-medium">Georgia</span>, oversaw <span className="text-black font-medium">$12M+</span> luxury properties in <span className="text-black font-medium">Deer Valley, Utah</span>, ran ranches in <span className="text-black font-medium">Montana</span>, and picked up every trade skill in between. I didn't just observe these industries. I lived inside them.
                </p>
              </div>

              <div className="mt-[3rem]">
                <span className="block font-sans font-semibold text-lg text-black mb-1 tracking-tight">Joaquin de Masi</span>
                <span className="block font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] text-[#52525B] uppercase tracking-widest">Founder & AI Automation Specialist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-[6rem] bg-white border-y border-black/10">
        <div className="w-full max-w-[60rem] mx-auto px-6 lg:px-12">
          <div ref={quoteRef} className="reveal-up">
            <iconify-icon icon="solar:quote-left-linear" className="text-4xl text-black/20 mb-8 block"></iconify-icon>
            <blockquote className="text-h3 text-black font-medium italic leading-snug">
              "It was in Deer Valley where everything changed. Mr. Crandall, a man who had built real success, introduced me to the world of AI. Not as a buzzword. As a tool. As a competitive edge."
            </blockquote>
          </div>
        </div>
      </section>

      {/* BODY TEXT */}
      <section className="py-[8rem] bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12">
          <div ref={bodyRef} className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[8rem] reveal-up">
            <div className="lg:col-span-5">
              <div className="editorial-badge mb-[2rem]">THE_TURNING_POINT</div>
              <h3 className="text-h3 text-black">AI wasn't coming for blue collar jobs. It was coming for companies that refused to adapt.</h3>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-[2rem]">
              <p className="text-body">
                That conversation <span className="text-black font-medium">rewired how I saw my entire career</span>. Every inefficiency I had witnessed on job sites, every hour wasted on manual processes, every foreman drowning in paperwork. I now saw it differently.
              </p>
              <div className="border-l border-black/20 pl-6 lg:pl-10">
                <p className="text-body">
                  I built this agency because <span className="text-black font-medium">I am you</span>. I know what it's like to manage a crew at <span className="text-black font-medium">6am</span>, troubleshoot equipment on a <span className="text-black font-medium">Saturday</span>, and quote a job on a napkin. I also know what AI can do when you put it in the right hands, and I want <span className="text-black font-medium">those hands to be yours</span>.
                </p>
              </div>
              <p className="text-body text-black font-medium">
                <span className="text-black">Blue collar my whole life. AI-powered now.</span> I love <span className="text-black font-medium">Jesus</span>, <span className="text-black font-medium">fly fishing</span>, and <span className="text-black font-medium">my dog</span>. I'm building this so every trade business I can reach <span className="text-black font-medium">never gets left behind</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-[6rem] border-y border-black/10 bg-gray-50">
        <div ref={statsRef} className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center reveal-up">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center pt-8 md:pt-0">
              <div className="text-[clamp(3.5rem,6vw,5rem)] font-semibold text-black tracking-tighter leading-none mb-4">
                {stat.value}
              </div>
              <span className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] text-[#52525B] uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-[8rem] bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12">
          <div ref={timelineRef} className="reveal-up">
            <div className="editorial-badge mb-[2rem]">TRAJECTORY</div>
            <h3 className="text-h3 text-black mb-[4rem]">The journey</h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-black/30 via-black/10 to-transparent"></div>

              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-start gap-8 group py-8 border-b border-black/5 last:border-b-0">
                    {/* Icon */}
                    <div className={`relative z-10 w-12 h-12 flex items-center justify-center shrink-0 border transition-all duration-500 ${
                      item.active
                        ? 'bg-black border-black text-white'
                        : 'bg-gray-50 border-black/20 text-black group-hover:border-black/40 group-hover:bg-black/5'
                    }`}>
                      <iconify-icon icon={item.icon} width="20"></iconify-icon>
                    </div>

                    {/* Content */}
                    <div className="pt-1">
                      <h4 className={`font-sans font-semibold text-lg tracking-tight mb-1 ${item.active ? 'text-black' : 'text-black'}`}>
                        {item.place}
                      </h4>
                      <p className="text-[#52525B] text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[12rem] bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}></div>

        <div ref={ctaRef} className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center reveal-up">
          <div className="editorial-badge mb-[2rem] text-white/50 before:bg-white/50">LET'S_BUILD</div>
          <h2 className="text-h1 text-white mb-6 max-w-[50rem]">
            Ready to work together?
          </h2>
          <p className="text-body text-white/70 mb-[4rem] max-w-[30rem]">
            Let's talk about your business and find where AI can make the biggest impact.
          </p>
          <Link to="/book" className="bg-white text-black px-8 py-4 font-sans font-semibold text-sm hover:bg-white/80 transition-colors flex items-center gap-2 group">
            Work With Me
            <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
          </Link>
        </div>
      </section>

    </main>
  );
}
