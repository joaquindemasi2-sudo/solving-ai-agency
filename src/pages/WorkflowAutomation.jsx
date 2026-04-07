import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

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

function WorkflowNode({ id, icon, title, subtitle, colorClass, active, onClick, children }) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative flex flex-col border transition-all duration-300 cursor-pointer min-w-[220px] max-w-[260px] overflow-hidden ${
        active
          ? 'bg-black border-white/40 scale-[1.03] z-10'
          : 'bg-[#0A0A0A] border-white/10 hover:border-white/20 hover:bg-black'
      }`}
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className={`w-9 h-9 flex items-center justify-center shrink-0 ${colorClass} ${active ? 'shadow-lg' : ''}`}>
          <iconify-icon icon={icon} width="18" className="text-white"></iconify-icon>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm leading-tight">{title}</h4>
          <p className="text-[#A1A1AA] text-[10px] uppercase tracking-wider font-mono">{subtitle}</p>
        </div>
        <div className={`ml-auto w-2 h-2 rounded-full ${active ? 'bg-white animate-pulse' : 'bg-white/20'}`}></div>
      </div>
      {children && (
        <div className="px-5 py-4 text-xs text-[#A1A1AA] space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function Port({ side = 'right', color = 'bg-white' }) {
  const pos = side === 'right' ? '-right-[7px]' : '-left-[7px]';
  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${pos} w-3.5 h-3.5 rounded-full border-2 border-black ${color} z-20`}></div>
  );
}

function Connections({ paths }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wfLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="url(#wfLineGrad)" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export default function WorkflowAutomation() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const [paths, setPaths] = useState([]);

  const headerRef = useReveal();
  const canvasRef = useReveal();
  const bottomRef = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    const nodeTrigger = get('node-trigger');
    const nodeCollect = get('node-collect');
    const nodeAI = get('node-ai');
    const nodeProposal = get('node-proposal');
    const nodeSlack = get('node-slack');

    const newPaths = [
      nodeTrigger && nodeCollect && makeCurve(nodeTrigger.right, nodeCollect.left),
      nodeCollect && nodeAI && makeCurve(nodeCollect.right, nodeAI.left),
      nodeAI && nodeProposal && makeCurve(nodeAI.right, nodeProposal.left),
      nodeProposal && nodeSlack && makeCurve(nodeProposal.right, nodeSlack.left),
    ].filter(Boolean);

    setPaths(newPaths);
  }, []);

  useEffect(() => {
    const timer = setTimeout(calcPaths, 200);
    window.addEventListener('resize', calcPaths);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calcPaths);
    };
  }, [calcPaths]);

  const logContent = [
    // Step 0 — Schedule trigger
    <div key="0">
      <p className="text-green-400 mb-2"># Scheduled trigger fired</p>
      <p>{'{'}</p>
      <p className="pl-4">"trigger": <span className="text-green-300">"Daily @ 6:00 AM"</span>,</p>
      <p className="pl-4">"workflow": <span className="text-green-300">"Morning Briefing"</span>,</p>
      <p className="pl-4">"status": <span className="text-emerald-400">"Running"</span>,</p>
      <p className="pl-4">"timestamp": <span className="text-green-300">"2026-04-06T06:00:00Z"</span></p>
      <p>{'}'}</p>
    </div>,
    // Step 1 — Data collection
    <div key="1">
      <p className="text-blue-400 mb-2"># Multi-source data pull</p>
      <div className="space-y-2 mt-3">
        <p><span className="text-green-300">QuickBooks</span> <span className="text-emerald-400">OK</span> 3 new invoices, $8,400 receivable</p>
        <p><span className="text-green-300">Google Calendar</span> <span className="text-emerald-400">OK</span> 4 meetings today</p>
        <p><span className="text-green-300">HubSpot</span> <span className="text-emerald-400">OK</span> 2 deals closing this week</p>
        <p><span className="text-green-300">Weather API</span> <span className="text-emerald-400">OK</span> 72 F, clear skies</p>
        <p><span className="text-green-300">Jobber</span> <span className="text-emerald-400">OK</span> 6 jobs scheduled today</p>
      </div>
      <p className="mt-3 text-[#A1A1AA]">All sources fetched in <span className="text-emerald-400">1.2s</span></p>
    </div>,
    // Step 2 — AI summarize
    <div key="2">
      <p className="text-emerald-400 mb-2"># AI daily briefing generated</p>
      <div className="text-white bg-white/5 p-4 rounded-lg text-[11px] leading-relaxed mt-3">
        <p className="text-green-400 font-bold mb-2">Good morning! Here's your April 6 briefing:</p>
        <p className="mb-2"><span className="text-yellow-300">Revenue:</span> $8,400 in pending invoices. 2 overdue &gt; 30 days ($2,100).</p>
        <p className="mb-2"><span className="text-cyan-300">Today:</span> 6 jobs across 3 crews. 4 meetings (first at 9 AM with TechFlow).</p>
        <p className="mb-2"><span className="text-purple-300">Pipeline:</span> 2 deals worth $14K closing this week. Follow up with Johnson Roofing today.</p>
        <p><span className="text-emerald-300">Weather:</span> 72 F, clear. Good conditions for exterior work.</p>
      </div>
    </div>,
    // Step 3 — Proposal
    <div key="3">
      <p className="text-purple-400 mb-2"># Auto-generated proposal</p>
      <p>Client: <span className="text-green-300">Johnson Roofing Co.</span></p>
      <p>Template: <span className="text-green-300">Service Agreement v3</span></p>
      <div className="mt-3 space-y-1">
        <p>Line items: <span className="text-purple-300">4</span></p>
        <p>Total: <span className="text-green-300">$7,200</span></p>
        <p>Format: <span className="text-blue-300">PDF</span></p>
      </div>
      <div className="my-3 border-t border-white/10 border-dashed"></div>
      <p>Google Drive: <span className="text-emerald-400">Uploaded</span></p>
      <p>Email draft: <span className="text-emerald-400">Ready to send</span></p>
    </div>,
    // Step 4 — Slack delivery
    <div key="4">
      <p className="text-red-400 mb-2"># Slack delivery</p>
      <p>Channel: <span className="text-green-300">#daily-ops</span></p>
      <p>Status: <span className="text-emerald-400">200 OK</span></p>
      <div className="text-white bg-white/5 p-3 rounded-lg mt-3 text-[11px] leading-relaxed">
        <strong className="text-green-400">Daily Ops Briefing / Apr 6</strong><br /><br />
        6 jobs today | $8.4K receivable | 2 deals closing<br />
        Weather: 72 F clear<br /><br />
        Proposal for Johnson Roofing attached ($7,200)<br />
        <span className="text-yellow-400">Action: 2 overdue invoices need follow-up</span>
      </div>
      <div className="my-3 border-t border-white/10 border-dashed"></div>
      <p className="text-[#A1A1AA]">Email briefing sent to: <span className="text-green-300">joaquin@solving.ai</span></p>
      <p className="text-[#A1A1AA]">Total execution time: <span className="text-emerald-400">4.7 seconds</span></p>
    </div>,
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 bg-white overflow-hidden relative">

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="btn-outline text-sm">
            <iconify-icon icon="solar:arrow-left-linear"></iconify-icon> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 reveal-up">
          <div className="editorial-badge mb-[2rem]">MAKE.COM SCENARIO</div>
          <h1 className="text-h2 text-black mb-6">
            WORKFLOW AUTOMATION
          </h1>
          <p className="text-body text-[#52525B] max-w-3xl mx-auto">
            Connect your disjointed tools into one engine. Daily briefings, auto-generated proposals, and reports delivered before your first coffee.
          </p>
        </div>

        {/* Node-based Workflow Canvas */}
        <div
          ref={(el) => { containerRef.current = el; if (canvasRef.current !== el) canvasRef.current = el; }}
          className="relative glass-panel-dark rounded-lg p-8 md:p-12 lg:p-16 mb-16 reveal-up overflow-x-auto"
        >
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}></div>

          <Connections paths={paths} />

          <div className="relative z-10 flex items-center gap-8 min-w-[1100px] justify-center">

            {/* Column 1 — Trigger */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-3 font-mono">Trigger</span>
              <div className="relative">
                <Port side="right" color="bg-white" />
                <WorkflowNode
                  id="node-trigger"
                  icon="solar:alarm-linear"
                  title="Daily Schedule"
                  subtitle="Cron Trigger"
                  colorClass="bg-green-600"
                  active={activeStep === 0}
                  onClick={() => setActiveStep(0)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">time</span>
                    <span className="text-green-300">6:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">days</span>
                    <span className="text-green-300">Mon-Fri</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 2 — Data Collection */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-3 font-mono">Collect</span>
              <div className="relative">
                <Port side="left" color="bg-white" />
                <Port side="right" color="bg-white" />
                <WorkflowNode
                  id="node-collect"
                  icon="solar:database-linear"
                  title="Multi-Source"
                  subtitle="Fetch Data"
                  colorClass="bg-blue-600"
                  active={activeStep === 1}
                  onClick={() => setActiveStep(1)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">sources</span>
                    <span className="text-blue-300">5 APIs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">speed</span>
                    <span className="text-emerald-300">Parallel</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 3 — AI Summarize */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-3 font-mono">Summarize</span>
              <div className="relative">
                <Port side="left" color="bg-white" />
                <Port side="right" color="bg-white" />
                <WorkflowNode
                  id="node-ai"
                  icon="simple-icons:openai"
                  title="ChatGPT"
                  subtitle="Briefing + Proposals"
                  colorClass="bg-emerald-600"
                  active={activeStep === 2}
                  onClick={() => setActiveStep(2)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">task</span>
                    <span className="text-green-300">Summarize</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">output</span>
                    <span className="text-purple-300">Briefing + PDF</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 4 — Generate Docs */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-3 font-mono">Generate</span>
              <div className="relative">
                <Port side="left" color="bg-white" />
                <Port side="right" color="bg-white" />
                <WorkflowNode
                  id="node-proposal"
                  icon="solar:document-text-linear"
                  title="Google Docs"
                  subtitle="Proposals & Reports"
                  colorClass="bg-purple-600"
                  active={activeStep === 3}
                  onClick={() => setActiveStep(3)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">type</span>
                    <span className="text-purple-300">Proposal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">storage</span>
                    <span className="text-blue-300">Google Drive</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 5 — Deliver */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-3 font-mono">Deliver</span>
              <div className="relative">
                <Port side="left" color="bg-white" />
                <WorkflowNode
                  id="node-slack"
                  icon="simple-icons:slack"
                  title="Slack + Email"
                  subtitle="Deliver Briefing"
                  colorClass="bg-red-500"
                  active={activeStep === 4}
                  onClick={() => setActiveStep(4)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">channel</span>
                    <span className="text-red-300">#daily-ops</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">email</span>
                    <span className="text-green-300">Owner</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom: Steps + Live Log */}
        <div ref={bottomRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start reveal-up">
          <div className="space-y-3">
            <h3 className="text-h3 text-black mb-8 tracking-tight">How the engine works:</h3>

            {[
              { step: 0, num: '01', title: 'Scheduled Trigger', desc: 'Every weekday at 6 AM, the automation fires before you even wake up. No buttons to press, no apps to open.' },
              { step: 1, num: '02', title: 'Multi-Source Pull', desc: 'Data is pulled in parallel from QuickBooks, Google Calendar, HubSpot, weather APIs, and your job management tool.' },
              { step: 2, num: '03', title: 'AI Briefing', desc: 'ChatGPT processes all the data and generates a clean daily briefing with revenue, schedule, pipeline, and action items.' },
              { step: 3, num: '04', title: 'Auto Proposals', desc: 'If deals are ready, the system auto-generates proposals from templates, fills in line items and pricing, and saves to Drive.' },
              { step: 4, num: '05', title: 'Delivery', desc: 'The briefing hits your Slack channel and inbox with attached proposals. Total execution: under 5 seconds.' },
            ].map((item) => (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-5 border transition-all duration-300 cursor-pointer ${
                  activeStep === item.step
                    ? 'bg-gray-50 border-black/30 shadow-lg'
                    : 'bg-transparent border-black/5 opacity-50 hover:opacity-100 hover:bg-gray-50'
                }`}
              >
                <h4 className="text-lg font-bold text-black mb-1 flex items-center gap-3">
                  <span className="text-black font-mono text-xs">{item.num}</span> {item.title}
                </h4>
                <p className="text-[#52525B] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Live log terminal */}
          <div className="glass-panel-dark p-6 lg:sticky lg:top-32">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="flex items-center gap-2 text-xs font-mono text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Workflow Log
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
