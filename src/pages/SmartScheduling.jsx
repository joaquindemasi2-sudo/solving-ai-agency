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

function WorkflowNode({ id, icon, title, subtitle, colorClass, active, onClick, children }) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative flex flex-col rounded-lg border transition-all duration-300 cursor-pointer min-w-[220px] max-w-[260px] overflow-hidden ${
        active
          ? 'bg-black border-white/40 scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.06)] z-10'
          : 'bg-[#0A0A0A] border-white/10 hover:border-white/20 hover:bg-black'
      }`}
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass} ${active ? 'shadow-lg' : ''}`}>
          <iconify-icon icon={icon} width="18" className="text-white"></iconify-icon>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm leading-tight">{title}</h4>
          <p className="text-[#A1A1AA] text-[10px] uppercase tracking-wider font-mono">{subtitle}</p>
        </div>
        <div className={`ml-auto w-2 h-2 rounded-full ${active ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-700'}`}></div>
      </div>
      {children && (
        <div className="px-5 py-4 text-xs text-[#A1A1AA] space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function Port({ side = 'right', color = 'bg-cyan-500' }) {
  const pos = side === 'right' ? '-right-[7px]' : '-left-[7px]';
  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${pos} w-3.5 h-3.5 rounded-full border-2 border-black ${color} z-20`}></div>
  );
}

function Connections({ paths }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="schedLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="url(#schedLineGrad)" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export default function SmartScheduling() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const [paths, setPaths] = useState([]);

  const revealHeader = useReveal();
  const revealCanvas = useReveal();
  const revealBottom = useReveal();

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

    const nodeEmail = get('node-email');
    const nodeAI = get('node-ai');
    const nodeCalendar = get('node-calendar');
    const nodeConfirm = get('node-confirm');
    const nodeCRM = get('node-crm');

    const newPaths = [
      nodeEmail && nodeAI && makeCurve(nodeEmail.right, nodeAI.left),
      nodeAI && nodeCalendar && makeCurve(nodeAI.right, nodeCalendar.left),
      nodeCalendar && nodeConfirm && makeCurve(nodeCalendar.right, nodeConfirm.left),
      nodeConfirm && nodeCRM && makeCurve(nodeConfirm.right, nodeCRM.left),
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
    // Step 0 — Email/SMS
    <div key="0">
      <p className="text-cyan-400 mb-2"># Incoming scheduling request</p>
      <p>{'{'}</p>
      <p className="pl-4">"channel": <span className="text-green-300">"Email"</span>,</p>
      <p className="pl-4">"from": <span className="text-green-300">"mike@techflow.com"</span>,</p>
      <p className="pl-4">"subject": <span className="text-green-300">"Re: Meeting next week?"</span>,</p>
      <p className="pl-4">"body": <span className="text-green-300">"Hey, can we meet Tuesday or Wednesday afternoon? I'm free after 2pm both days."</span>,</p>
      <p className="pl-4">"timestamp": <span className="text-green-300">"2026-04-06T09:14:00Z"</span></p>
      <p>{'}'}</p>
    </div>,
    // Step 1 — AI Parse
    <div key="1">
      <p className="text-emerald-400 mb-2"># AI intent extraction</p>
      <p>{'{'}</p>
      <p className="pl-4">"intent": <span className="text-green-300">"Schedule meeting"</span>,</p>
      <p className="pl-4">"preferred_days": [</p>
      <p className="pl-8 text-green-300">"Tuesday",</p>
      <p className="pl-8 text-green-300">"Wednesday"</p>
      <p className="pl-4">],</p>
      <p className="pl-4">"time_constraint": <span className="text-green-300">"after 2:00 PM"</span>,</p>
      <p className="pl-4">"duration_guess": <span className="text-purple-300">30</span>,</p>
      <p className="pl-4">"urgency": <span className="text-green-300">"Normal"</span></p>
      <p>{'}'}</p>
    </div>,
    // Step 2 — Calendar
    <div key="2">
      <p className="text-blue-400 mb-2"># Google Calendar availability check</p>
      <p className="text-[#A1A1AA] mt-3">Scanning: Tue Apr 7 &amp; Wed Apr 8...</p>
      <div className="mt-3 space-y-2">
        <p><span className="text-cyan-300">Tue 2:00 PM</span> <span className="text-red-400">Busy</span></p>
        <p><span className="text-cyan-300">Tue 2:30 PM</span> <span className="text-red-400">Busy</span></p>
        <p><span className="text-cyan-300">Tue 3:00 PM</span> <span className="text-emerald-400">Available</span></p>
        <p><span className="text-cyan-300">Wed 2:00 PM</span> <span className="text-emerald-400">Available</span></p>
        <p><span className="text-cyan-300">Wed 3:00 PM</span> <span className="text-emerald-400">Available</span></p>
      </div>
      <p className="mt-3 text-[#A1A1AA]">Best match: <span className="text-emerald-400">Tue 3:00 PM</span></p>
    </div>,
    // Step 3 — Confirm
    <div key="3">
      <p className="text-cyan-400 mb-2"># Auto-reply sent</p>
      <p>To: <span className="text-green-300">mike@techflow.com</span></p>
      <p>Subject: <span className="text-green-300">Re: Meeting next week?</span></p>
      <div className="mt-3 text-white bg-white/5 p-4 rounded-lg text-[11px] leading-relaxed">
        "Hi Mike! I've got Tuesday at 3:00 PM open. I just sent you a calendar invite with a video call link. If that doesn't work, Wednesday at 2:00 PM or 3:00 PM also works. Looking forward to it!"
      </div>
      <div className="my-3 border-t border-white/10 border-dashed"></div>
      <p className="text-[#A1A1AA]">Calendar event created: <span className="text-emerald-400">Tue Apr 7, 3:00 PM</span></p>
      <p className="text-[#A1A1AA]">Meet link: <span className="text-blue-300">meet.google.com/abc-defg-hij</span></p>
    </div>,
    // Step 4 — CRM
    <div key="4">
      <p className="text-orange-400 mb-2"># HubSpot CRM update</p>
      <p>Status: <span className="text-emerald-400">200 OK</span></p>
      <p className="mt-3">Contact: <span className="text-green-300">Mike (TechFlow)</span></p>
      <p>Deal stage: <span className="text-purple-300">Meeting Scheduled</span></p>
      <p>Next activity: <span className="text-cyan-300">Tue Apr 7, 3:00 PM</span></p>
      <div className="my-3 border-t border-white/10 border-dashed"></div>
      <p className="text-[#A1A1AA]">Timeline note added automatically</p>
      <p className="text-[#A1A1AA]">Reminder set: <span className="text-emerald-400">30 min before</span></p>
    </div>,
  ];

  return (
    <div className="min-h-screen py-[8rem] px-6 lg:px-12 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="btn-outline text-sm">
            <iconify-icon icon="solar:arrow-left-linear"></iconify-icon> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div ref={revealHeader} className="reveal-up text-center mb-16">
          <div className="editorial-badge mb-[2rem]">MAKE.COM SCENARIO</div>
          <h1 className="text-h2 text-black mb-6">
            SMART SCHEDULING
          </h1>
          <p className="text-body text-[#52525B] max-w-3xl mx-auto">
            AI reads emails and SMS, checks your calendar, negotiates times, and books appointments directly into your CRM. Zero back-and-forth.
          </p>
        </div>

        {/* Node-based Workflow Canvas */}
        <div
          ref={(el) => {
            containerRef.current = el;
            revealCanvas.current = el;
          }}
          className="reveal-up glass-panel-dark rounded-lg p-8 md:p-12 lg:p-16 mb-16 overflow-x-auto relative"
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
                <Port side="right" color="bg-cyan-500" />
                <WorkflowNode
                  id="node-email"
                  icon="solar:letter-linear"
                  title="Email / SMS"
                  subtitle="Incoming Request"
                  colorClass="bg-cyan-600"
                  active={activeStep === 0}
                  onClick={() => setActiveStep(0)}
                >
                  <p className="italic text-[#A1A1AA]">"Can we meet Tuesday or Wednesday?"</p>
                  <div className="flex items-center gap-2 mt-2">
                    <iconify-icon icon="solar:letter-linear" className="text-cyan-400" width="14"></iconify-icon>
                    <span className="text-cyan-400">Email detected</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 2 — AI Parse */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-3 font-mono">Parse</span>
              <div className="relative">
                <Port side="left" color="bg-cyan-500" />
                <Port side="right" color="bg-emerald-500" />
                <WorkflowNode
                  id="node-ai"
                  icon="simple-icons:openai"
                  title="ChatGPT"
                  subtitle="Extract Intent"
                  colorClass="bg-emerald-600"
                  active={activeStep === 1}
                  onClick={() => setActiveStep(1)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">task</span>
                    <span className="text-green-300">NLP Parse</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">extract</span>
                    <span className="text-purple-300">Dates & Times</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 3 — Calendar Check */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-3 font-mono">Check</span>
              <div className="relative">
                <Port side="left" color="bg-emerald-500" />
                <Port side="right" color="bg-blue-500" />
                <WorkflowNode
                  id="node-calendar"
                  icon="solar:calendar-mark-linear"
                  title="Google Calendar"
                  subtitle="Check Availability"
                  colorClass="bg-blue-600"
                  active={activeStep === 2}
                  onClick={() => setActiveStep(2)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">scan</span>
                    <span className="text-blue-300">Next 7 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">match</span>
                    <span className="text-emerald-300">Best slot</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 4 — Auto Reply */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-3 font-mono">Confirm</span>
              <div className="relative">
                <Port side="left" color="bg-blue-500" />
                <Port side="right" color="bg-orange-500" />
                <WorkflowNode
                  id="node-confirm"
                  icon="solar:letter-linear"
                  title="Auto Reply"
                  subtitle="Send & Book"
                  colorClass="bg-cyan-600"
                  active={activeStep === 3}
                  onClick={() => setActiveStep(3)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">reply</span>
                    <span className="text-green-300">Email</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">invite</span>
                    <span className="text-blue-300">Google Meet</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 5 — CRM */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A1A1AA] uppercase tracking-widest mb-3 font-mono">Update</span>
              <div className="relative">
                <Port side="left" color="bg-orange-500" />
                <WorkflowNode
                  id="node-crm"
                  icon="simple-icons:hubspot"
                  title="HubSpot"
                  subtitle="Update CRM"
                  colorClass="bg-orange-500"
                  active={activeStep === 4}
                  onClick={() => setActiveStep(4)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">stage</span>
                    <span className="text-orange-300">Meeting Set</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A1A1AA]">reminder</span>
                    <span className="text-emerald-300">30 min</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom: Steps + Live Log */}
        <div ref={revealBottom} className="reveal-up grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-3">
            <h3 className="text-h3 text-black mb-8">How the engine works:</h3>

            {[
              { step: 0, num: '01', title: 'Request Detection', desc: 'AI monitors your inbox and SMS for scheduling requests. The moment someone asks to meet, the automation kicks in.' },
              { step: 1, num: '02', title: 'Intent Extraction', desc: 'ChatGPT reads the message, extracts preferred days, time constraints, and meeting type using natural language processing.' },
              { step: 2, num: '03', title: 'Calendar Check', desc: 'The system cross-references your Google Calendar in real time, finds available slots that match the request, and picks the best one.' },
              { step: 3, num: '04', title: 'Auto Confirm', desc: 'A natural reply is sent with the proposed time, a calendar invite is created, and a video call link is attached. All in seconds.' },
              { step: 4, num: '05', title: 'CRM Update', desc: 'HubSpot is updated automatically with the meeting details, deal stage changes to "Meeting Scheduled", and a reminder is set.' },
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
                <p className="text-[#52525B] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Live log terminal */}
          <div className="glass-panel-dark rounded-lg p-6 lg:sticky lg:top-32">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Scheduling Log
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
