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
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass} ${active ? 'shadow-lg' : ''}`}>
          <iconify-icon icon={icon} width="18" className="text-white"></iconify-icon>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm leading-tight">{title}</h4>
          <p className="text-[#A1A1AA] text-[10px] uppercase tracking-wider">{subtitle}</p>
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

function Port({ side = 'right', color = 'bg-amber-500' }) {
  const pos = side === 'right' ? '-right-[7px]' : '-left-[7px]';
  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${pos} w-3.5 h-3.5 rounded-full border-2 border-black ${color} z-20`}></div>
  );
}

function Connections({ paths }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="reviewLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="url(#reviewLineGrad)" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export default function ReviewManagement() {
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

    const nodeGoogle = get('node-google');
    const nodeSentiment = get('node-sentiment');
    const nodeRouter = get('node-router');
    const nodeAI = get('node-ai');
    const nodePost = get('node-post');
    const nodeAlert = get('node-alert');

    const newPaths = [
      nodeGoogle && nodeSentiment && makeCurve(nodeGoogle.right, nodeSentiment.left),
      nodeSentiment && nodeRouter && makeCurve(nodeSentiment.right, nodeRouter.left),
      nodeRouter && nodeAI && makeCurve(nodeRouter.right, nodeAI.left),
      nodeAI && nodePost && makeCurve(nodeAI.right, nodePost.left),
      nodeRouter && nodeAlert && makeCurve(nodeRouter.right, nodeAlert.left),
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
    // Step 0 — New Review
    <div key="0" className="animate-fade-in">
      <p className="text-amber-400 mb-2"># New Google Review detected</p>
      <p>{'{'}</p>
      <p className="pl-4">"platform": <span className="text-green-300">"Google Business"</span>,</p>
      <p className="pl-4">"author": <span className="text-green-300">"Sarah M."</span>,</p>
      <p className="pl-4">"rating": <span className="text-yellow-300">4</span>,</p>
      <p className="pl-4">"text": <span className="text-green-300">"Great crew, finished the deck on time. Only issue was some paint touch-ups needed after."</span>,</p>
      <p className="pl-4">"date": <span className="text-green-300">"2026-04-05"</span></p>
      <p>{'}'}</p>
    </div>,
    // Step 1 — Sentiment
    <div key="1" className="animate-fade-in">
      <p className="text-emerald-400 mb-2"># Sentiment Analysis</p>
      <p>{'{'}</p>
      <p className="pl-4">"sentiment": <span className="text-green-300">"Positive"</span>,</p>
      <p className="pl-4">"confidence": <span className="text-purple-300">0.87</span>,</p>
      <p className="pl-4">"key_topics": [</p>
      <p className="pl-8 text-green-300">"timeliness",</p>
      <p className="pl-8 text-yellow-300">"paint quality"</p>
      <p className="pl-4">],</p>
      <p className="pl-4">"requires_attention": <span className="text-yellow-300">true</span>,</p>
      <p className="pl-4">"category": <span className="text-green-300">"Mixed Positive"</span></p>
      <p>{'}'}</p>
    </div>,
    // Step 2 — Router
    <div key="2" className="animate-fade-in">
      <p className="text-orange-400 mb-2"># Router evaluation</p>
      <p className="text-neutral-500 mt-4">Path A (rating &ge; 3 stars)...</p>
      <p className="pl-4 text-emerald-400">Condition met: 4 &ge; 3</p>
      <p className="text-neutral-500 mt-4">Path B (rating &lt; 3 stars)...</p>
      <p className="pl-4 text-red-400">Condition failed: 4 &lt; 3</p>
      <p className="text-neutral-500 mt-4 text-xs">Routing to AI response drafting...</p>
    </div>,
    // Step 3 — AI Draft
    <div key="3" className="animate-fade-in">
      <p className="text-emerald-400 mb-2"># ChatGPT drafting response</p>
      <p className="text-neutral-500 mb-3">Prompt: "Write an on-brand, warm reply..."</p>
      <p className="text-white bg-white/5 p-4 rounded-lg text-[11px] leading-relaxed">
        "Thank you so much, Sarah! We're glad the deck turned out great and was done on schedule. We've already spoken with our paint crew about the touch-ups and will have someone swing by this week to make it perfect. Thanks for trusting us with your project!"
      </p>
      <p className="mt-3">Tone: <span className="text-green-300">Friendly, Professional</span></p>
      <p>Word count: <span className="text-purple-300">47</span></p>
    </div>,
    // Step 4 — Post Reply
    <div key="4" className="animate-fade-in">
      <p className="text-blue-400 mb-2"># POST Google Business API</p>
      <p>Status: <span className="text-emerald-400">200 OK</span></p>
      <p>Reply ID: <span className="text-purple-300">#rev-7842</span></p>
      <p className="mt-3 text-neutral-500">Response posted to Google Business Profile</p>
      <div className="my-3 border-t border-white/10 border-dashed"></div>
      <p className="text-neutral-500">Response time: <span className="text-emerald-400">12 seconds</span></p>
      <p className="text-neutral-500">Average manual time: <span className="text-red-400">~45 minutes</span></p>
    </div>,
    // Step 5 — Alert
    <div key="5" className="animate-fade-in">
      <p className="text-red-400 mb-2"># Urgent Alert triggered</p>
      <p>Status: <span className="text-emerald-400">Sent</span></p>
      <p className="text-white bg-white/5 p-3 rounded mt-3 text-[11px] leading-relaxed">
        <strong className="text-red-400">Negative Review Alert</strong><br /><br />
        Platform: Google Business<br />
        Rating: 1 star<br />
        Author: Mike T.<br />
        Issue: "Crew showed up late 3 days in a row..."<br /><br />
        <span className="text-yellow-400">Action needed: Owner response required</span>
      </p>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto py-[8rem] px-6 lg:px-12">
        <div className="mb-8">
          <Link to="/" className="btn-outline text-sm">
            <iconify-icon icon="solar:arrow-left-linear"></iconify-icon> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 reveal-up">
          <div className="editorial-badge mb-[2rem]">MAKE.COM_SCENARIO</div>
          <h1 className="text-h2 text-black mb-6">
            Review Management
          </h1>
          <p className="text-body text-[#52525B] max-w-3xl mx-auto">
            Automatically monitor, analyze, and respond to customer reviews across all platforms. On-brand replies posted in seconds, not hours.
          </p>
        </div>

        {/* Node-based Workflow Canvas */}
        <div
          ref={(el) => { containerRef.current = el; canvasRef.current = el; }}
          className="relative glass-panel-dark rounded-lg p-8 md:p-12 lg:p-16 mb-16 reveal-up overflow-x-auto"
        >
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}></div>

          <Connections paths={paths} />

          <div className="relative z-10 flex items-start gap-8 min-w-[1100px]">

            {/* Column 1 — Trigger */}
            <div className="flex flex-col items-center pt-12">
              <span className="text-[10px] text-neutral-600 uppercase tracking-widest mb-3">Trigger</span>
              <div className="relative">
                <Port side="right" color="bg-amber-500" />
                <WorkflowNode
                  id="node-google"
                  icon="simple-icons:google"
                  title="Google Reviews"
                  subtitle="New Review Webhook"
                  colorClass="bg-blue-600"
                  active={activeStep === 0}
                  onClick={() => setActiveStep(0)}
                >
                  <p className="italic text-neutral-500">"A customer leaves a new review..."</p>
                  <div className="flex items-center gap-1 mt-2">
                    <iconify-icon icon="solar:star-bold" className="text-yellow-400" width="14"></iconify-icon>
                    <iconify-icon icon="solar:star-bold" className="text-yellow-400" width="14"></iconify-icon>
                    <iconify-icon icon="solar:star-bold" className="text-yellow-400" width="14"></iconify-icon>
                    <iconify-icon icon="solar:star-bold" className="text-yellow-400" width="14"></iconify-icon>
                    <iconify-icon icon="solar:star-linear" className="text-neutral-600" width="14"></iconify-icon>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 2 — Sentiment Analysis */}
            <div className="flex flex-col items-center pt-12">
              <span className="text-[10px] text-neutral-600 uppercase tracking-widest mb-3">Analyze</span>
              <div className="relative">
                <Port side="left" color="bg-amber-500" />
                <Port side="right" color="bg-emerald-500" />
                <WorkflowNode
                  id="node-sentiment"
                  icon="simple-icons:openai"
                  title="Sentiment AI"
                  subtitle="Classify & Score"
                  colorClass="bg-emerald-600"
                  active={activeStep === 1}
                  onClick={() => setActiveStep(1)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">model</span>
                    <span className="text-yellow-400">gpt-4o</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">task</span>
                    <span className="text-green-300">Sentiment</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">output</span>
                    <span className="text-purple-300">Score + Topics</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 3 — Router */}
            <div className="flex flex-col items-center pt-12">
              <span className="text-[10px] text-neutral-600 uppercase tracking-widest mb-3">Route</span>
              <div className="relative">
                <Port side="left" color="bg-emerald-500" />
                <Port side="right" color="bg-orange-500" />
                <WorkflowNode
                  id="node-router"
                  icon="solar:routing-2-linear"
                  title="Router"
                  subtitle="Split Flow"
                  colorClass="bg-orange-500"
                  active={activeStep === 2}
                  onClick={() => setActiveStep(2)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Path A: &ge; 3 stars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    <span>Path B: &lt; 3 stars</span>
                  </div>
                </WorkflowNode>
              </div>
            </div>

            {/* Column 4 — Outputs */}
            <div className="flex flex-col gap-6 pt-0">
              {/* Path A / Auto Reply */}
              <div>
                <span className="text-[10px] text-emerald-500/60 uppercase tracking-widest mb-3 block text-center">Path A / Auto Reply</span>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Port side="left" color="bg-orange-500" />
                    <Port side="right" color="bg-blue-500" />
                    <WorkflowNode
                      id="node-ai"
                      icon="simple-icons:openai"
                      title="ChatGPT"
                      subtitle="Draft Reply"
                      colorClass="bg-emerald-600"
                      active={activeStep === 3}
                      onClick={() => setActiveStep(3)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">tone</span>
                        <span className="text-green-300">On-brand</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">max words</span>
                        <span className="text-purple-300">60</span>
                      </div>
                    </WorkflowNode>
                  </div>

                  <div className="relative">
                    <Port side="left" color="bg-blue-500" />
                    <WorkflowNode
                      id="node-post"
                      icon="simple-icons:google"
                      title="Google API"
                      subtitle="Post Reply"
                      colorClass="bg-blue-600"
                      active={activeStep === 4}
                      onClick={() => setActiveStep(4)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">action</span>
                        <span className="text-blue-300">Reply</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">speed</span>
                        <span className="text-emerald-300">&lt; 15s</span>
                      </div>
                    </WorkflowNode>
                  </div>
                </div>
              </div>

              {/* Path B — Urgent Alert */}
              <div>
                <span className="text-[10px] text-red-500/60 uppercase tracking-widest mb-3 block text-center">Path B / Escalate</span>
                <div className="relative">
                  <Port side="left" color="bg-orange-500" />
                  <WorkflowNode
                    id="node-alert"
                    icon="simple-icons:slack"
                    title="Slack Alert"
                    subtitle="Owner Notification"
                    colorClass="bg-red-500"
                    active={activeStep === 5}
                    onClick={() => setActiveStep(5)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">channel</span>
                      <span className="text-red-300">#reviews-urgent</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">priority</span>
                      <span className="text-red-300">High</span>
                    </div>
                  </WorkflowNode>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom: Steps + Live Log */}
        <div ref={bottomRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start reveal-up">
          <div className="space-y-3">
            <h3 className="text-h3 text-black mb-8">How the engine works:</h3>

            {[
              { step: 0, num: '01', title: 'Review Detection', desc: 'A webhook monitors Google Business, Yelp, and Facebook 24/7. The moment a new review appears, the automation fires.' },
              { step: 1, num: '02', title: 'Sentiment Analysis', desc: 'AI reads the review, classifies sentiment, extracts key topics, and flags anything that needs human attention.' },
              { step: 2, num: '03', title: 'Smart Routing', desc: 'Positive and mixed reviews get auto-replied. Negative reviews are escalated directly to you with full context.' },
              { step: 3, num: '04A', title: 'AI Response Draft', desc: 'ChatGPT writes a personalized, on-brand reply that addresses specific points the customer mentioned.' },
              { step: 4, num: '04B', title: 'Auto-Post Reply', desc: 'The response is posted directly to the platform via API. Average response time: 12 seconds.' },
              { step: 5, num: '04C', title: 'Urgent Escalation', desc: 'Negative reviews trigger an instant Slack alert with review details so you can respond personally when it matters.' },
            ].map((item) => (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-5 rounded-lg border transition-all duration-300 cursor-pointer ${
                  activeStep === item.step
                    ? 'bg-gray-50 border-black/30 shadow-lg'
                    : 'bg-transparent border-black/5 opacity-50 hover:opacity-100 hover:bg-gray-50/50'
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
          <div className="glass-panel-dark rounded-lg p-6 lg:sticky lg:top-32 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                Review Log
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
