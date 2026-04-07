import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function MetricCounter({ target, decimals = 0, suffix, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null;
          const animate = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / 2500, 1);
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const val = ease * target;
            el.textContent = decimals > 0 ? val.toFixed(decimals) : Math.floor(val);
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = decimals > 0 ? target.toFixed(decimals) : target;
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <div className="flex flex-col items-center pt-8 md:pt-0">
      <div className="text-[clamp(3.5rem,6vw,5rem)] font-semibold text-black tracking-tighter leading-none mb-4 flex items-baseline">
        <span ref={ref}>0</span>
        <span className="text-4xl text-[#52525B] ml-1">{suffix}</span>
      </div>
      <span className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] text-[#52525B] uppercase tracking-widest block">{label}</span>
    </div>
  );
}

export default function Home() {
  const heroRef = useReveal();
  const heroSubRef = useReveal();
  const problemRef = useReveal();
  const processRef = useReveal();
  const servicesRef = useReveal();
  const servicesGridRef = useReveal();
  const metricsRef = useReveal();
  const ctaRef = useReveal();

  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      num: '01',
      title: 'Identify',
      subtitle: 'what\'s worth building',
      desc: 'Before a single line of code gets written, we map how work actually flows inside your organisation. Where energy leaks, where decisions stall, where people waste time on things a machine could handle. Then we cut through the noise to find the handful of opportunities that will move the needle.',
      items: [
        { title: 'Executive alignment workshops', desc: 'Get leadership on the same page. Priorities, constraints, and a shared definition of success.' },
        { title: 'Employee & stakeholder interviews', desc: 'Talk to the people doing the work. Surface real bottlenecks, not assumed ones.' },
        { title: 'ROI modeling & business case design', desc: 'Pressure-test ideas early so you invest only where the return is real.' },
        { title: 'Prioritisation mapping', desc: 'Stack-rank every opportunity by impact and effort. Everyone knows where to start.' },
        { title: 'AI readiness diagnostics report', desc: 'A clear view of where you\'re ready now, what needs work, and what should wait.' },
      ],
    },
    {
      num: '02',
      title: 'Develop',
      subtitle: 'the right solutions',
      desc: 'We design, build, and test the automations that will transform your operations. Every workflow is custom. Built around your tools, your team, and your real-world edge cases. Nothing generic, nothing off-the-shelf.',
      items: [
        { title: 'Custom automation architecture', desc: 'Workflows designed around your stack. Make.com, HubSpot, Slack, and more.' },
        { title: 'AI agent development', desc: 'Purpose-built AI that scores leads, drafts replies, and handles scheduling.' },
        { title: 'Integration & API wiring', desc: 'Connect your CRM, calendar, invoicing, and job management into one engine.' },
        { title: 'Testing & iteration', desc: 'Every automation tested against real scenarios before it touches your business.' },
        { title: 'Documentation & training assets', desc: 'Your team gets clear docs so nothing is a black box.' },
      ],
    },
    {
      num: '03',
      title: 'Adopt',
      subtitle: 'and make it stick',
      desc: 'Technology only works when people actually use it. We embed the solution into your daily operations, train your team, and monitor performance until the new way of working becomes the only way of working.',
      items: [
        { title: 'Hands-on team training', desc: 'Not a slide deck. We sit with your people and walk them through the new workflows.' },
        { title: 'Rollout & change management', desc: 'Phased launch so nothing breaks and everyone adapts at their own pace.' },
        { title: 'Performance monitoring', desc: 'We watch the dashboards so you don\'t have to. If something drifts, we fix it.' },
        { title: 'Ongoing optimization', desc: 'Monthly reviews to find new opportunities and tune what\'s already running.' },
        { title: 'Dedicated Slack support', desc: 'Direct line to our team. Questions answered same day, not next quarter.' },
      ],
    },
  ];

  const services = [
    {
      title: "Lead Qualification",
      desc: "AI agents that score, route, and qualify inbound leads 24/7. Never miss a potential client because you were on the job site.",
      icon: "solar:user-check-linear",
      link: "/lead-qualification"
    },
    {
      title: "Smart Scheduling",
      desc: "AI reads emails and SMS, checks your calendar, negotiates times, and books appointments directly into your CRM.",
      icon: "solar:calendar-mark-linear",
      link: "/smart-scheduling"
    },
    {
      title: "Review Management",
      desc: "Automatically draft and post personalized, on-brand responses to customer reviews across all platforms in seconds.",
      icon: "solar:star-fall-minimalistic-linear",
      link: "/review-management"
    },
    {
      title: "Workflow Automation",
      desc: "Connect your disjointed tools. Generate proposals, daily briefings, and reports before your first coffee.",
      icon: "solar:code-square-linear",
      link: "/workflow-automation"
    },
    {
      title: "Website Redesign",
      desc: "Modern, high-converting websites built for trade businesses. Your online presence should work as hard as you do.",
      icon: "solar:monitor-linear",
      link: "/web-redesign"
    }
  ];

  return (
    <main className="relative z-10 w-full">

      {/* 01. HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[5rem]">
        {/* Swiss grid overlay */}
        <div className="absolute inset-0 pointer-events-none flex justify-between px-6 lg:px-12 opacity-10">
          <div className="w-[1px] h-full bg-black"></div>
          <div className="w-[1px] h-full bg-black hidden md:block"></div>
          <div className="w-[1px] h-full bg-black hidden lg:block"></div>
          <div className="w-[1px] h-full bg-black"></div>
        </div>

        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10 flex items-center min-h-[calc(100vh-5rem)] pb-[5vh]">
          {/* Left — Copy */}
          <div className="flex-1 flex flex-col justify-center">
            <div ref={heroRef} className="flex flex-col items-start reveal-up">
              <div className="editorial-badge mb-[3rem] group/bulb flex items-center gap-3">
                <Lightbulb size={16} className="transition-all duration-300 group-hover/bulb:text-yellow-400 group-hover/bulb:drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]" />
                AI AUTOMATION AGENCY
              </div>
              <h1 className="text-h1 text-black mb-[2rem]">
                Hard work got<br/>
                <span className="text-[#52525B]">you here.</span>
              </h1>
            </div>

            <div ref={heroSubRef} className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 reveal-up delay-1">
              <p className="text-body max-w-[28rem]">
                We use AI to automate the stuff that drains your time. Lead follow-ups, appointment scheduling, admin work, client reminders. So it just happens on its own. No bots that sound like bots. No complicated software. Just smart automations built with the latest AI that work while you sleep. You focus on the work that actually matters. We'll handle the rest.
              </p>
              <div className="flex-shrink-0">
                <Link to="/book" className="btn-editorial group">
                  <span className="relative z-10 flex items-center gap-3">
                    Work With Us
                    <iconify-icon icon="solar:arrow-right-up-linear" className="text-xl icon-arrow"></iconify-icon>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right — Profile */}
          <div className="hidden lg:flex flex-shrink-0 ml-[4rem]">
            <Link to="/about" className="relative w-[320px] aspect-[3/4] overflow-hidden group block">
              <img
                src="/profile.png"
                alt="Joaquin de Masi"
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out"
              />
              {/* Technical frame overlay */}
              <div className="absolute inset-0 border border-black/20 m-3 pointer-events-none">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black -translate-x-[1px] -translate-y-[1px]"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black translate-x-[1px] translate-y-[1px]"></div>
              </div>
              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white/80 via-white/40 to-transparent">
                <span className="block font-sans font-semibold text-black text-sm tracking-tight">Joaquin de Masi</span>
                <span className="block font-mono text-[0.65rem] text-[#52525B] uppercase tracking-widest mt-1">Founder</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 02. THE PROBLEM */}
      <section className="py-[12rem] relative bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12">
          <div ref={problemRef} className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[8rem] reveal-up">
            <div className="lg:col-span-5">
              <div className="editorial-badge mb-[2rem]">THE_PROBLEM</div>
              <h2 className="text-h3 text-black mb-6">Growth shouldn't break your operations. Or your people.</h2>
              <a href="#services" className="btn-outline mt-8">
                See the solutions
                <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
              </a>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-[3rem]">
              <p className="text-body text-black">
                As trade businesses scale, repetitive tasks compound. Lead follow-ups slip. Scheduling becomes a full-time job. Reviews go unanswered. Your best people spend hours on admin instead of revenue-generating work.
              </p>
              <div className="border-l border-black/20 pl-6 lg:pl-10">
                <p className="text-body">
                  Solving replaces manual, repetitive processes with intelligent automation. We build systems that run silently in the background so you can focus on what matters: <strong className="text-black">your craft and your clients.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. OUR PROCESS */}
      <section className="py-[10rem] relative bg-white border-t border-black/10">
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div ref={processRef} className="mb-[5rem] reveal-up">
            <div className="editorial-badge mb-[2rem]">OUR_PROCESS</div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2rem] lg:gap-[8rem]">
              <h2 className="text-h3 text-black lg:col-span-6">
                From experimenting with AI<br/>
                <span className="text-[#52525B]">to depending on it.</span>
              </h2>
              <p className="text-body lg:col-span-6 lg:pt-2">
                We help you find the right problems, build the right solutions, and make sure they actually stick inside your organisation.
              </p>
            </div>
          </div>

          {/* Phase tabs */}
          <div className="flex gap-0 border-b border-black/10 mb-[4rem]">
            {phases.map((phase, i) => (
              <button
                key={phase.num}
                onClick={() => setActivePhase(i)}
                className={`flex-1 py-5 text-left px-6 lg:px-8 border-b-2 transition-all duration-500 group ${
                  activePhase === i
                    ? 'border-black'
                    : 'border-transparent hover:border-black/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] tracking-widest transition-colors ${
                    activePhase === i ? 'text-black' : 'text-[#52525B]/50'
                  }`}>{phase.num}</span>
                  <div>
                    <span className={`block font-sans font-semibold text-lg tracking-tight transition-colors ${
                      activePhase === i ? 'text-black' : 'text-[#52525B]/50 group-hover:text-[#52525B]'
                    }`}>{phase.title}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active phase content */}
          {phases.map((phase, i) => (
            <div
              key={phase.num}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[6rem] transition-all duration-500 ${
                activePhase === i ? 'opacity-100' : 'hidden'
              }`}
            >
              {/* Left — Description */}
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-[clamp(3rem,5vw,4rem)] font-semibold text-black/[0.06] leading-none tracking-[-0.04em]">{phase.num}</span>
                  <div>
                    <h3 className="text-h3 text-black">{phase.title}</h3>
                    <span className="text-[#52525B] text-sm">{phase.subtitle}</span>
                  </div>
                </div>
                <p className="text-body mb-8">{phase.desc}</p>
                <Link to="/book" className="btn-editorial group inline-flex">
                  <span className="relative z-10 flex items-center gap-3">
                    Start with {phase.title}
                    <iconify-icon icon="solar:arrow-right-up-linear" className="text-xl icon-arrow"></iconify-icon>
                  </span>
                </Link>
              </div>

              {/* Right — Items */}
              <div className="lg:col-span-7">
                <div className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] text-[#52525B] uppercase tracking-widest mb-6">What's included</div>
                <div className="space-y-0">
                  {phase.items.map((item, j) => (
                    <div key={j} className="py-5 border-t border-black/[0.06] group/item">
                      <h4 className="font-sans font-semibold text-black text-[0.95rem] mb-1 tracking-tight group-hover/item:text-black transition-colors">{item.title}</h4>
                      <p className="text-[#52525B] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Next phase link */}
                {i < phases.length - 1 && (
                  <button
                    onClick={() => setActivePhase(i + 1)}
                    className="mt-6 text-[#52525B]/50 hover:text-black text-sm font-medium transition-colors flex items-center gap-2 group/next"
                  >
                    Next: {phases[i + 1].title}
                    <iconify-icon icon="solar:arrow-right-linear" className="group-hover/next:translate-x-1 transition-transform"></iconify-icon>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04. SERVICES BENTO */}
      <section id="services" className="py-[8rem] relative bg-white">
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12">
          <div ref={servicesRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[4rem] reveal-up gap-6">
            <div>
              <div className="editorial-badge mb-[2rem]">CAPABILITIES</div>
              <h2 className="text-h3 text-black">Engineered for<br/>leverage.</h2>
            </div>
            <p className="text-body max-w-[24rem]">
              Complex operations reduced to elegant automation.
            </p>
          </div>

          <div ref={servicesGridRef} className="swiss-grid grid-cols-1 md:grid-cols-2 reveal-up delay-1">
            {services.map((service, idx) => {
              const inner = (
                <>
                  <div className="flex justify-between items-start mb-auto">
                    <iconify-icon icon={service.icon} className="text-3xl text-black"></iconify-icon>
                    {service.link && (
                      <iconify-icon icon="solar:arrow-right-up-linear" className="opacity-0 group-hover:opacity-100 transition-all text-black/50 text-xl"></iconify-icon>
                    )}
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-xl text-black mb-3">{service.title}</h3>
                    <p className="text-[#52525B] text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </>
              );

              const isLast = idx === services.length - 1 && services.length % 2 !== 0;
              const spanClass = isLast ? 'md:col-span-2' : '';

              return service.link ? (
                <Link to={service.link} key={idx} className={`p-8 lg:p-10 flex flex-col hover-lift group cursor-pointer ${spanClass}`}>
                  {inner}
                </Link>
              ) : (
                <div key={idx} className={`p-8 lg:p-10 flex flex-col hover-lift group ${spanClass}`}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04. METRICS */}
      <section id="metrics" className="py-[8rem] relative border-y border-black/10 bg-gray-50">
        <div ref={metricsRef} className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center reveal-up">
          <MetricCounter target={40} suffix="%" label="Time saved on admin" />
          <MetricCounter target={12} suffix="sec" label="Average response time" />
          <MetricCounter target={100} suffix="%" label="Blue collar, by trade" />
        </div>
      </section>

      {/* 05. FINAL CTA */}
      <section className="py-[12rem] bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}></div>

        <div ref={ctaRef} className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center reveal-up">
          <div className="editorial-badge mb-[2rem] text-white/50 before:bg-white/50">INITIATE</div>
          <h2 className="text-h1 text-white mb-6 max-w-[50rem]">
            Ready to scale?
          </h2>
          <p className="text-body text-white/70 mb-[4rem] max-w-[30rem]">
            Stop doing robot work. Let AI handle the repetitive so you can focus on growth and human connection.
          </p>
          <Link to="/book" className="bg-white text-black px-8 py-4 font-sans font-semibold text-sm hover:bg-white/80 transition-colors flex items-center gap-2 group">
            Work With Us
            <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
          </Link>
        </div>
      </section>

    </main>
  );
}
