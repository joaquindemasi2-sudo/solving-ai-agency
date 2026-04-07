import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

/* ─── Scroll-reveal hook ─── */
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

/* ─── Individual Node Card ─── */
function WorkflowNode({ id, icon, title, subtitle, colorClass, active, onClick, children }) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative flex flex-col rounded-lg border transition-all duration-300 cursor-pointer min-w-[220px] max-w-[260px] overflow-hidden ${
        active
          ? 'bg-[#0A0A0A] border-white/40 scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.05)] z-10'
          : 'bg-black border-white/10 hover:border-white/20 hover:bg-[#0A0A0A]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass} ${active ? 'shadow-lg' : ''}`}>
          <iconify-icon icon={icon} width="18" className="text-white"></iconify-icon>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm leading-tight">{title}</h4>
          <p className="text-neutral-500 text-[10px] uppercase tracking-wider">{subtitle}</p>
        </div>
        <div className={`ml-auto w-2 h-2 rounded-full ${active ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-700'}`}></div>
      </div>
      {/* Body */}
      {children && (
        <div className="px-5 py-4 text-xs text-neutral-400 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── Connection dot (port) ─── */
function Port({ side = 'right', color = 'bg-blue-500' }) {
  const pos = side === 'right' ? '-right-[7px]' : '-left-[7px]';
  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${pos} w-3.5 h-3.5 rounded-full border-2 border-neutral-950 ${color} z-20`}></div>
  );
}

/* ─── SVG curved connections ─── */
function Connections({ paths }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/* ─── Main Page ─── */
export default function LeadQualification() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const [paths, setPaths] = useState([]);
  const headerRef = useReveal();
  const canvasRef = useReveal();
  const bottomRef = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Calculate SVG paths between nodes */
  const calcPaths = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const get = (id) => {
      const el = container.querySelector(`#${id}`);
      if (!el) return null;
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      return {
        right: { x: eRect.right - cRect.left, y: eRect.top + eRect.height / 2 - cRect.top },
        left: { x: eRect.left - cRect.left, y: eRect.top + eRect.height / 2 - cRect.top },
      };
    };

    const makeCurve = (from, to) => {
      if (!from || !to) return null;
      const dx = (to.x - from.x) * 0.5;
      return `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
    };

    const nodeForm = get('node-form');
    const nodeAI = get('node-ai');
    const nodeRouter = get('node-router');
    const nodeHubspot = get('node-hubspot');
    const nodeSlack = get('node-slack');
    const nodeMailchimp = get('node-mailchimp');

    const newPaths = [
      nodeForm && nodeAI && makeCurve(nodeForm.right, nodeAI.left),
      nodeAI && nodeRouter && makeCurve(nodeAI.right, nodeRouter.left),
      nodeRouter && nodeHubspot && makeCurve(nodeRouter.right, nodeHubspot.left),
      nodeHubspot && nodeSlack && makeCurve(nodeHubspot.right, nodeSlack.left),
      nodeRouter && nodeMailchimp && makeCurve(nodeRouter.right, nodeMailchimp.left),
    ].filter(Boolean);

    setPaths(newPaths);
  }, []);

  useEffect(() => {
    // Small delay to let DOM settle
    const timer = setTimeout(calcPaths, 200);
    window.addEventListener('resize', calcPaths);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calcPaths);
    };
  }, [calcPaths]);

  const logContent = [
    // Step 0 — Form
    <div key="0" className="animate-fade-up">
      <p className="text-slate-400 mb-2"># Webhook incoming payload</p>
      <p>{'{'}</p>
      <p className="pl-4">"source": <span className="text-green-300">"Website Form"</span>,</p>
      <p className="pl-4">"name": <span className="text-green-300">"Alex Mercer"</span>,</p>
      <p className="pl-4">"company": <span className="text-green-300">"TechFlow Inc"</span>,</p>
      <p className="pl-4">"employees": <span className="text-green-300">"50-200"</span>,</p>
      <p className="pl-4">"budget": <span className="text-green-300">"$10k+"</span>,</p>
      <p className="pl-4">"message": <span className="text-green-300">"We need help automating..."</span></p>
      <p>{'}'}</p>
    </div>,
    // Step 1 — AI
    <div key="1" className="animate-fade-up">
      <p className="text-emerald-400 mb-2"># OpenAI JSON response</p>
      <p>{'{'}</p>
      <p className="pl-4">"score": <span className="text-purple-300">9</span>,</p>
      <p className="pl-4">"intent_level": <span className="text-green-300">"High"</span>,</p>
      <p className="pl-4">"key_pain_points": [</p>
      <p className="pl-8 text-green-300">"Sales inefficiency",</p>
      <p className="pl-8 text-green-300">"Manual data entry"</p>
      <p className="pl-4">],</p>
      <p className="pl-4">"recommendation": <span className="text-green-300">"Fast-track to AE"</span></p>
      <p>{'}'}</p>
    </div>,
    // Step 2 — Router
    <div key="2" className="animate-fade-up">
      <p className="text-purple-400 mb-2"># Router evaluation</p>
      <p className="text-neutral-500 mt-4">Path A (Score &gt; 7)...</p>
      <p className="pl-4 text-emerald-400">Condition met: 9 &gt; 7</p>
      <p className="text-neutral-500 mt-4">Path B (Score &le; 7)...</p>
      <p className="pl-4 text-red-400">Condition failed: 9 &le; 7</p>
    </div>,
    // Step 3 — CRM + Slack
    <div key="3" className="animate-fade-up">
      <p className="text-orange-400 mb-2"># HubSpot API</p>
      <p>Status: <span className="text-emerald-400">201 Created</span></p>
      <p>Deal ID: <span className="text-purple-300">#98421</span></p>
      <div className="my-3 border-t border-white/10 border-dashed"></div>
      <p className="text-red-400 mb-2"># Slack Webhook</p>
      <p>Status: <span className="text-emerald-400">200 OK</span></p>
      <p className="text-white bg-white/5 p-3 rounded mt-2 text-[11px] leading-relaxed">
        <strong className="text-orange-400">New High-Value Lead!</strong><br />
        Name: Alex Mercer<br />
        Company: TechFlow Inc<br />
        AI Score: 9/10
      </p>
    </div>,
    // Step 4 — Mailchimp
    <div key="4" className="animate-fade-up">
      <p className="text-yellow-400 mb-2"># Mailchimp API</p>
      <p>Status: <span className="text-emerald-400">200 OK</span></p>
      <p className="mt-3">Audience: <span className="text-green-300">"Lead Nurture Q3"</span></p>
      <p>Tag: <span className="text-green-300">"Low-Intent"</span></p>
      <p className="text-neutral-500 mt-3">5-day drip sequence triggered.</p>
    </div>,
  ];

  return (
    <div className="min-h-screen py-[8rem] px-6 lg:px-12 bg-white overflow-hidden relative">
      <div className="max-w-[100rem] mx-auto">
        {/* Back link */}
        <div className="mb-8">
          <Link to="/" className="btn-outline text-sm">
            <iconify-icon icon="solar:arrow-left-linear"></iconify-icon> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 reveal-up">
          <div className="editorial-badge mb-[2rem]">MAKE.COM SCENARIO</div>
          <h1 className="text-h2 text-black mb-6">
            LEAD QUALIFICATION
          </h1>
          <p className="text-body text-[#52525B] max-w-3xl mx-auto">
            See exactly how we build intelligent pipelines that score inbound leads, update your CRM, and alert your team in under 5 seconds.
          </p>
        </div>

        {/* ─── Node-based Workflow Canvas ─── */}
        <div
          ref={(el) => { containerRef.current = el; canvasRef.current = el; }}
          className="relative glass-panel-dark rounded-lg p-8 md:p-12 lg:p-16 mb-16 reveal-up overflow-x-auto"
        >
          {/* Dot grid background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}></div>

          <Connections paths={paths} />

          {/* Nodes layout */}
          <div className="relative z-10 flex items-start gap-8 min-w-[1100px]">

            {/* Column 1 — Trigger */}
            <div className="flex flex-col items-center pt-12">
              <span className="text-[10px] text-neutral-600 uppercase tracking-widest mb-3">Trigger</span>
              <div className="relative">
                <Port side="right" color="bg-blue-500" />
                <WorkflowNode
                  id="node-form"
                  icon="solar:document-text-linear"
                  title="Web Form"
                  subtitle="Webhook Trigger"
                  colorClass="bg-slate-700"
                  active={activeStep === 0}
                  onClick={() => setActiveStep(0)}
                >
                  <p className="italic text-neutral-500">"A new lead submits your intake form..."</p>
                  <div className="mt-2 bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2 text-neutral-600">
                    Type what you want to capture
                  </div>
                  <button className="mt-3 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                    <iconify-icon icon="solar:play-linear" width="12"></iconify-icon> CAPTURE
                  </button>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 2 — AI Analysis */}
            <div className="flex flex-col items-center pt-12">
              <span className="text-[10px] text-neutral-600 uppercase tracking-widest mb-3">Analyze</span>
              <div className="relative">
                <Port side="left" color="bg-blue-500" />
                <Port side="right" color="bg-emerald-500" />
                <WorkflowNode
                  id="node-ai"
                  icon="simple-icons:openai"
                  title="ChatGPT"
                  subtitle="Analyze & Score"
                  colorClass="bg-emerald-600"
                  active={activeStep === 1}
                  onClick={() => setActiveStep(1)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">model</span>
                    <span className="text-yellow-400">gpt-4o</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">temperature</span>
                    <span className="text-purple-300">0.3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">output</span>
                    <span className="text-green-300">JSON</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 3 — Router */}
            <div className="flex flex-col items-center pt-12">
              <span className="text-[10px] text-neutral-600 uppercase tracking-widest mb-3">Route</span>
              <div className="relative">
                <Port side="left" color="bg-emerald-500" />
                <Port side="right" color="bg-purple-500" />
                <WorkflowNode
                  id="node-router"
                  icon="solar:routing-2-linear"
                  title="Router"
                  subtitle="Split Flow"
                  colorClass="bg-purple-600"
                  active={activeStep === 2}
                  onClick={() => setActiveStep(2)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Path A: score &gt; 7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span>Path B: score &le; 7</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 4 — Outputs (stacked) */}
            <div className="flex flex-col gap-6 pt-0">
              {/* Path A — HubSpot + Slack */}
              <div>
                <span className="text-[10px] text-emerald-500/60 uppercase tracking-widest mb-3 block text-center">Path A / High Value</span>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Port side="left" color="bg-purple-500" />
                    <Port side="right" color="bg-orange-500" />
                    <WorkflowNode
                      id="node-hubspot"
                      icon="simple-icons:hubspot"
                      title="HubSpot"
                      subtitle="Create Deal"
                      colorClass="bg-orange-500"
                      active={activeStep === 3}
                      onClick={() => setActiveStep(3)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">pipeline</span>
                        <span className="text-orange-300">Sales</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">stage</span>
                        <span className="text-green-300">Qualified</span>
                      </div>
                    </WorkflowNode>
                  </div>

                  <div className="relative">
                    <Port side="left" color="bg-orange-500" />
                    <WorkflowNode
                      id="node-slack"
                      icon="simple-icons:slack"
                      title="Slack"
                      subtitle="Alert Team"
                      colorClass="bg-red-500"
                      active={activeStep === 3}
                      onClick={() => setActiveStep(3)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">channel</span>
                        <span className="text-red-300">#sales-alerts</span>
                      </div>
                    </WorkflowNode>
                  </div>
                </div>
              </div>

              {/* Path B — Mailchimp */}
              <div>
                <span className="text-[10px] text-yellow-500/60 uppercase tracking-widest mb-3 block text-center">Path B / Nurture</span>
                <div className="relative">
                  <Port side="left" color="bg-purple-500" />
                  <WorkflowNode
                    id="node-mailchimp"
                    icon="simple-icons:mailchimp"
                    title="Mailchimp"
                    subtitle="Nurture Email"
                    colorClass="bg-yellow-600"
                    active={activeStep === 4}
                    onClick={() => setActiveStep(4)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">audience</span>
                      <span className="text-yellow-300">Nurture Q3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">journey</span>
                      <span className="text-green-300">5-day drip</span>
                    </div>
                  </WorkflowNode>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── Bottom: Steps + Live Log ─── */}
        <div ref={bottomRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start reveal-up">
          {/* Step descriptions */}
          <div className="space-y-3">
            <h3 className="text-h3 text-black mb-8">How the engine works:</h3>

            {[
              { step: 0, num: '01', title: 'Instant Capture', desc: 'A custom webhook listens 24/7, catching incoming lead data from your website form instantly.' },
              { step: 1, num: '02', title: 'AI Qualification', desc: 'Lead responses are sent to OpenAI which analyzes company size, budget, and intent, returning a score from 1-10.' },
              { step: 2, num: '03', title: 'Smart Routing', desc: "Make.com's router evaluates the AI score. High-value leads get fast-tracked, lower intent leads go to nurture." },
              { step: 3, num: '04A', title: 'VIP Treatment', desc: 'Leads scoring > 7: a Deal is created in HubSpot and a Slack alert notifies your sales team instantly.' },
              { step: 4, num: '04B', title: 'Automated Nurture', desc: 'Leads scoring ≤ 7: they are added to a Mailchimp drip sequence to educate them over time.' },
            ].map((item) => (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-5 rounded-lg border transition-all duration-300 cursor-pointer ${
                  activeStep === item.step
                    ? 'bg-gray-50 border-black/30 shadow-lg'
                    : 'bg-transparent border-black/5 opacity-50 hover:opacity-100 hover:bg-gray-50'
                }`}
              >
                <h4 className="text-lg font-bold text-black mb-1 flex items-center gap-3">
                  <span className="text-black font-mono text-xs">{item.num}</span> {item.title}
                </h4>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Live log terminal */}
          <div className="glass-panel-dark rounded-lg p-6 lg:sticky lg:top-32 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Scenario Log
              </span>
            </div>
            <div className="font-mono text-sm text-neutral-300 space-y-4 min-h-[300px]">
              {logContent[activeStep]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
