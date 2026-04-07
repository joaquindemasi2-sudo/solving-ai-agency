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

const portfolio = [
  {
    name: 'Summit Roofing Co.',
    industry: 'Roofing',
    location: 'Denver, CO',
    description: 'Complete rebrand and website overhaul. From a dated template to a conversion-focused site with instant quote requests and real-time job gallery.',
    results: ['3x more quote requests', '45% lower bounce rate', 'Mobile-first design'],
    accent: 'bg-orange-500',
    icon: 'solar:home-angle-linear',
  },
  {
    name: 'Precision Plumbing',
    industry: 'Plumbing',
    location: 'Atlanta, GA',
    description: 'Emergency service landing page with click-to-call, service area map, and automated booking system integrated with their CRM.',
    results: ['60% increase in calls', 'Booking form live 24/7', 'Google Maps integration'],
    accent: 'bg-blue-500',
    icon: 'solar:water-linear',
  },
  {
    name: 'Iron Valley Welding',
    industry: 'Welding & Fabrication',
    location: 'Pittsburgh, PA',
    description: 'Portfolio-driven website showcasing custom metalwork. High-res project gallery with filterable categories and inquiry forms per project.',
    results: ['2x project inquiries', 'Portfolio loads in <2s', 'SEO optimized'],
    accent: 'bg-zinc-500',
    icon: 'solar:fire-linear',
  },
  {
    name: 'GreenScape Landscaping',
    industry: 'Landscaping',
    location: 'Austin, TX',
    description: 'Seasonal service pages, before/after sliders, and an AI-powered instant estimate calculator based on yard size and service type.',
    results: ['85% mobile traffic handled', '4x estimate requests', 'Seasonal auto-updates'],
    accent: 'bg-emerald-500',
    icon: 'solar:leaf-linear',
  },
  {
    name: 'ProCoat Painters',
    industry: 'Painting',
    location: 'Nashville, TN',
    description: 'Clean, minimal design with color visualization tool. Customers pick colors and see them on sample rooms before requesting a quote.',
    results: ['5x time on site', '70% quote completion', 'Color tool went viral locally'],
    accent: 'bg-violet-500',
    icon: 'solar:pallete-2-linear',
  },
  {
    name: 'AllStar Electric',
    industry: 'Electrical',
    location: 'Phoenix, AZ',
    description: 'Service-focused site with emergency banner, licensing/insurance badges, and a scheduling system connected to their field management software.',
    results: ['40% more bookings', 'Trust badges boosted CVR', 'Jobber integration'],
    accent: 'bg-yellow-500',
    icon: 'solar:bolt-linear',
  },
  {
    name: 'Ridgeline Concrete',
    industry: 'Concrete & Masonry',
    location: 'Salt Lake City, UT',
    description: 'Heavy visual design featuring drone footage stills of completed projects. Quote request form feeds directly into HubSpot pipeline.',
    results: ['Commercial leads +120%', 'Avg session 4+ min', 'HubSpot pipeline live'],
    accent: 'bg-stone-500',
    icon: 'solar:buildings-2-linear',
  },
  {
    name: 'ClearView Windows',
    industry: 'Window Cleaning',
    location: 'Seattle, WA',
    description: 'Subscription-based service model showcased with pricing tiers, recurring booking portal, and referral program landing page.',
    results: ['Recurring revenue +200%', 'Referral page = 30% leads', 'Stripe integration'],
    accent: 'bg-sky-500',
    icon: 'solar:window-frame-linear',
  },
  {
    name: 'Titan HVAC',
    industry: 'HVAC',
    location: 'Chicago, IL',
    description: 'Seasonal campaign pages for heating and cooling. Real-time availability checker and financing calculator built into every service page.',
    results: ['Seasonal pages +90% traffic', 'Financing calc = 3x leads', 'Page speed 98/100'],
    accent: 'bg-red-500',
    icon: 'solar:temperature-linear',
  },
  {
    name: 'Heartland Fencing',
    industry: 'Fencing',
    location: 'Kansas City, MO',
    description: 'Fence style configurator where customers choose material, height, and color, then get an instant ballpark estimate and can book a site visit.',
    results: ['Configurator = 65% engagement', 'Site visits +80%', 'Zero dev maintenance'],
    accent: 'bg-amber-600',
    icon: 'solar:shield-check-linear',
  },
];

/* =====================================================
   10 UNIQUE MINI-WEBSITE DESIGNS
   Each is a self-contained component rendered inside
   a browser chrome frame at 380px height.
   ===================================================== */

/* 1 — Summit Roofing: Dark luxury, oversized serif type */
function Site1() {
  return (
    <div className="h-full bg-[#0c0c0c] relative overflow-hidden select-none">
      {/* Warm gradient accent */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-950/30 to-transparent" />
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-5">
        <span className="text-white font-black text-[15px] tracking-[-0.03em]">SUMMIT</span>
        <div className="flex items-center gap-5 text-[9px] text-white/40 font-medium tracking-wide">
          <span>Projects</span><span>About</span>
          <span className="bg-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-[8px]">FREE QUOTE</span>
        </div>
      </div>
      {/* Hero */}
      <div className="relative z-10 px-7 mt-8">
        <div className="text-[9px] text-orange-400 font-bold tracking-[0.25em] uppercase mb-3">Denver, Colorado</div>
        <div className="text-white text-[42px] font-black leading-[0.9] tracking-[-0.04em]">
          Built<br/>Above<br/><span className="text-orange-400">Standard.</span>
        </div>
      </div>
      {/* Bottom stats */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-7 pb-5 flex items-end justify-between">
        <div className="flex gap-6">
          <div>
            <div className="text-white text-[28px] font-black leading-none">500+</div>
            <div className="text-white/30 text-[8px] mt-1 tracking-wider">PROJECTS</div>
          </div>
          <div>
            <div className="text-white text-[28px] font-black leading-none">15yr</div>
            <div className="text-white/30 text-[8px] mt-1 tracking-wider">WARRANTY</div>
          </div>
        </div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* 2 — Precision Plumbing: Clean white, blue accent, trust-forward */
function Site2() {
  return (
    <div className="h-full bg-white relative overflow-hidden select-none">
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-blue-50 to-transparent" />
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-[#1a1a1a] font-black text-[13px] tracking-tight">PRECISION</span>
        </div>
        <div className="flex items-center gap-5 text-[9px] text-[#1a1a1a]/40 font-medium">
          <span>Services</span><span>Areas</span>
          <span className="bg-blue-500 text-white px-3 py-1.5 rounded-full font-bold text-[8px]">BOOK NOW</span>
        </div>
      </div>
      {/* Hero */}
      <div className="relative z-10 px-7 mt-7">
        <div className="text-[9px] text-blue-500 font-bold tracking-[0.2em] uppercase mb-2">24/7 Emergency Service</div>
        <div className="text-[#1a1a1a] text-[38px] font-black leading-[0.92] tracking-[-0.03em]">
          Fast.<br/>Reliable.<br/><span className="text-blue-500">Guaranteed.</span>
        </div>
        <p className="text-[#1a1a1a]/40 text-[10px] mt-4 leading-relaxed max-w-[55%]">Atlanta's most trusted plumbing team. Licensed, insured, and background-checked.</p>
      </div>
      {/* Trust row */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-black/5 bg-white">
        <div className="flex">
          {[
            { n: '4.9', l: 'Google Rating' },
            { n: '2K+', l: 'Jobs Done' },
            { n: '<1hr', l: 'Response' },
            { n: '100%', l: 'Licensed' },
          ].map((s, i) => (
            <div key={i} className="flex-1 text-center py-3 border-r border-black/5 last:border-r-0">
              <div className="text-[#1a1a1a] text-[16px] font-black">{s.n}</div>
              <div className="text-[#1a1a1a]/30 text-[7px] tracking-wider uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 3 — Iron Valley Welding: Dark editorial, real photo grid */
const weldingPhotos = [
  { src: '/welding1.jpg', label: 'Steel Frame' },
  { src: '/welding2.jpg', label: 'MIG Welding' },
  { src: '/welding3.jpg', label: 'Arc Work' },
  { src: '/welding4.png', label: 'Fabrication' },
  { src: '/welding5.jpg', label: 'TIG Welding' },
  { src: '/welding1.jpg', label: 'Finish Weld' },
];

function Site3() {
  return (
    <div className="h-full bg-[#0a0a0a] relative overflow-hidden select-none flex flex-col">
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-5 pb-4">
        <span className="text-white font-black text-[15px] tracking-[0.15em] uppercase">Iron Valley</span>
        <div className="flex items-center gap-5 text-[9px] text-white/30 font-medium">
          <span>Work</span><span>Process</span><span>Inquiry</span>
        </div>
      </div>
      {/* Photo gallery grid */}
      <div className="relative z-10 px-5 grid grid-cols-3 grid-rows-2 gap-[4px] flex-1 min-h-0">
        {weldingPhotos.map((photo, i) => (
          <div key={i} className="relative overflow-hidden group/tile">
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full h-full object-cover brightness-75 group-hover/tile:brightness-100 group-hover/tile:scale-110 transition-all duration-700"
              loading="lazy"
            />
            {/* Overlay label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500" />
            <span className="absolute bottom-2 left-2.5 text-[8px] text-white font-bold tracking-wider uppercase opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500 drop-shadow-lg">
              {photo.label}
            </span>
          </div>
        ))}
      </div>
      {/* Bottom bar */}
      <div className="relative z-10 px-7 py-4 flex items-center justify-between bg-gradient-to-t from-[#0a0a0a] to-transparent">
        <div>
          <div className="text-white/20 text-[8px] tracking-[0.3em] uppercase mb-0.5">Custom Metalwork</div>
          <div className="text-white text-[22px] font-black leading-[0.9] tracking-[-0.04em]">Craft in Every Weld.</div>
        </div>
        <div className="bg-white text-black px-4 py-2 text-[9px] font-bold rounded-full">View All</div>
      </div>
    </div>
  );
}

/* 4 — GreenScape Landscaping: Fresh, organic, green gradients */
function Site4() {
  return (
    <div className="h-full bg-[#f7faf5] relative overflow-hidden select-none">
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-200/50 rounded-full blur-[80px]" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-300/20 rounded-full blur-[60px]" />
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <span className="text-[#1a2e1a] font-black text-[13px]">GreenScape</span>
        </div>
        <div className="flex items-center gap-5 text-[9px] text-[#1a2e1a]/35 font-medium">
          <span>Services</span><span>Gallery</span>
          <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full font-bold text-[8px]">ESTIMATE</span>
        </div>
      </div>
      {/* Hero */}
      <div className="relative z-10 px-7 mt-8">
        <div className="text-[9px] text-emerald-600 font-bold tracking-[0.2em] uppercase mb-2">Austin, Texas</div>
        <div className="text-[#1a2e1a] text-[40px] font-black leading-[0.88] tracking-[-0.04em]">
          Your Yard,<br/><span className="text-emerald-500">Reimagined.</span>
        </div>
        <p className="text-[#1a2e1a]/35 text-[10px] mt-4 leading-relaxed max-w-[60%]">Design, install, maintain. Full landscape transformations with instant estimates.</p>
      </div>
      {/* Estimate calculator card */}
      <div className="absolute bottom-5 left-7 right-7 z-10 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-emerald-600 text-[8px] font-bold tracking-[0.15em] uppercase">Instant Estimate</span>
          <div className="flex gap-1">
            {[1,2,3].map(i => <div key={i} className="w-5 h-1 rounded-full bg-emerald-200" />)}
            <div className="w-5 h-1 rounded-full bg-emerald-500" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-[#f7faf5] rounded-lg px-3 py-2">
            <div className="text-[7px] text-emerald-800/30 font-bold uppercase">Sqft</div>
            <div className="text-[#1a2e1a] text-[13px] font-bold">2,400</div>
          </div>
          <div className="flex-1 bg-[#f7faf5] rounded-lg px-3 py-2">
            <div className="text-[7px] text-emerald-800/30 font-bold uppercase">Service</div>
            <div className="text-[#1a2e1a] text-[13px] font-bold">Full Design</div>
          </div>
          <div className="bg-emerald-500 text-white rounded-lg px-4 flex items-center">
            <span className="text-[10px] font-bold">Go</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 5 — ProCoat Painters: Full-bleed paint photo, before/after feel */
function Site5() {
  return (
    <div className="h-full bg-[#1a1a1a] relative overflow-hidden select-none">
      {/* Full photo — person painting a wall */}
      <img
        src="/painting.png"
        alt="Spray painting in workshop"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.35] animate-ken-burns"
        loading="lazy"
      />
      {/* Paint color overlays — diagonal streaks like fresh paint */}
      <div className="absolute top-0 right-0 w-[30%] h-full bg-gradient-to-l from-teal-500/25 to-transparent skew-x-[-6deg] translate-x-8" />
      <div className="absolute top-0 right-[15%] w-[8%] h-full bg-gradient-to-l from-amber-400/15 to-transparent skew-x-[-6deg]" />

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white" />
          <span className="text-white font-black text-[15px] tracking-tight">ProCoat</span>
        </div>
        <div className="flex items-center gap-5 text-[9px] text-white/40 font-medium">
          <span>Gallery</span><span>Services</span>
          <span className="bg-white text-black px-3 py-1.5 rounded-full font-bold text-[8px]">FREE QUOTE</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 px-7 mt-10">
        <div className="text-[9px] text-teal-300 font-bold tracking-[0.25em] uppercase mb-2">Nashville, TN</div>
        <div className="text-white text-[44px] font-black leading-[0.86] tracking-[-0.04em]">
          Fresh<br/>Coat.<br/><span className="text-teal-300">New Life.</span>
        </div>
        <p className="text-white/30 text-[10px] mt-4 leading-relaxed max-w-[55%]">Interior & exterior residential painting. See your colors on real walls before we start.</p>
      </div>

      {/* Bottom — Before/After + Color palette card */}
      <div className="absolute bottom-5 left-7 right-7 z-10 flex gap-3">
        {/* Before/After card */}
        <div className="flex-1 bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/[0.06]">
          <div className="flex h-full">
            <div className="w-1/2 p-3 border-r border-white/[0.06]">
              <div className="text-white/20 text-[7px] font-bold tracking-widest uppercase mb-1">Before</div>
              <div className="h-[40px] rounded bg-[#8B7D6B]/40 border border-white/5" />
            </div>
            <div className="w-1/2 p-3">
              <div className="text-teal-300/60 text-[7px] font-bold tracking-widest uppercase mb-1">After</div>
              <div className="h-[40px] rounded bg-teal-500/30 border border-teal-400/20" />
            </div>
          </div>
        </div>
        {/* Color palette */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/[0.06] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-[6px]">
            <div className="w-5 h-5 rounded-full bg-teal-400 ring-2 ring-teal-300/50 ring-offset-1 ring-offset-black/40" />
            <div className="w-5 h-5 rounded-full bg-amber-300" />
            <div className="w-5 h-5 rounded-full bg-rose-400" />
            <div className="w-5 h-5 rounded-full bg-slate-600" />
            <div className="w-5 h-5 rounded-full bg-white border border-white/20" />
          </div>
          <span className="text-white/20 text-[7px] tracking-widest uppercase">850+ Homes</span>
        </div>
      </div>
    </div>
  );
}

/* 6 — AllStar Electric: Dark, neon yellow accent, bold */
function Site6() {
  return (
    <div className="h-full bg-[#0a0a0a] relative overflow-hidden select-none">
      {/* Electric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-400/10 rounded-full blur-[80px]" />
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-5">
        <div className="flex items-center gap-2">
          <div className="text-yellow-400 text-[18px] font-black leading-none">A</div>
          <span className="text-white font-bold text-[12px] tracking-tight">AllStar</span>
        </div>
        <div className="flex items-center gap-5 text-[9px] text-white/30 font-medium">
          <span>Services</span><span>Areas</span>
          <span className="bg-yellow-400 text-black px-3 py-1.5 rounded-full font-bold text-[8px]">CALL NOW</span>
        </div>
      </div>
      {/* Hero centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-10">
        <div className="text-[8px] text-yellow-400/60 tracking-[0.3em] uppercase font-bold mb-3">Phoenix, AZ</div>
        <div className="text-white text-[48px] font-black leading-[0.85] tracking-[-0.05em]">
          Power<br/>Done<br/><span className="text-yellow-400">Right.</span>
        </div>
      </div>
      {/* Service pills at bottom */}
      <div className="absolute bottom-5 left-7 right-7 z-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {['Panel Upgrades', 'EV Chargers', 'Rewiring', 'Smart Home', 'Emergency'].map(s => (
            <div key={s} className="border border-white/10 text-white/50 px-3 py-1.5 rounded-full text-[8px] font-medium">
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 7 — Ridgeline Concrete: Cinematic full-bleed video feel */
function Site7() {
  return (
    <div className="h-full bg-black relative overflow-hidden select-none">
      {/* Full-bleed photo with Ken Burns animation */}
      <img
        src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&h=600&fit=crop&q=80"
        alt="Concrete work"
        className="absolute inset-0 w-full h-full object-cover animate-ken-burns brightness-[0.4]"
        loading="lazy"
      />
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
      {/* Cinematic bars */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />

      {/* REC indicator top-left */}
      <div className="absolute top-5 left-7 z-30 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-rec-blink shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
        <span className="text-white/60 text-[9px] font-mono tracking-wider">REC 4K</span>
      </div>

      {/* Timecode top-right */}
      <div className="absolute top-5 right-7 z-30">
        <span className="text-white/30 text-[9px] font-mono tracking-wider">00:01:24:07</span>
      </div>

      {/* Nav overlay */}
      <div className="absolute top-12 left-0 right-0 z-30 flex items-center justify-between px-7">
        <span className="text-white font-black text-[18px] tracking-[0.1em] uppercase">Ridgeline</span>
        <div className="flex items-center gap-5 text-[9px] text-white/40 font-medium">
          <span>Projects</span><span>Services</span>
          <span className="bg-white text-black px-3 py-1.5 rounded-full font-bold text-[8px]">QUOTE</span>
        </div>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center">
        <div className="text-white/30 text-[9px] font-bold tracking-[0.35em] uppercase mb-3">Salt Lake City, Utah</div>
        <div className="text-white text-[52px] font-black leading-[0.85] tracking-[-0.04em]">
          Built to<br/>Last.
        </div>
        <p className="text-white/30 text-[10px] mt-3 max-w-[280px] leading-relaxed">Driveways. Foundations. Patios. Commercial slabs. 200+ projects and counting.</p>
        {/* Play button */}
        <div className="mt-5 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[12px] border-l-white/80 ml-1" />
        </div>
        <span className="text-white/20 text-[8px] font-bold tracking-[0.2em] uppercase mt-2">Watch Our Reel</span>
      </div>

      {/* Bottom video progress bar */}
      <div className="absolute bottom-4 left-7 right-7 z-30">
        <div className="flex items-center gap-3">
          <span className="text-white/25 text-[8px] font-mono">01:24</span>
          <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white/50 rounded-full animate-progress-grow" />
          </div>
          <span className="text-white/25 text-[8px] font-mono">03:42</span>
        </div>
        {/* Stats row */}
        <div className="flex justify-between mt-3">
          {[
            { n: '200+', l: 'Projects' },
            { n: '15yr', l: 'Warranty' },
            { n: '4.9', l: 'Rating' },
            { n: '24hr', l: 'Quotes' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-white/70 text-[14px] font-black">{s.n}</div>
              <div className="text-white/20 text-[7px] tracking-wider uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 8 — ClearView Windows: Light, airy, glass-morphism pricing */
function Site8() {
  return (
    <div className="h-full bg-gradient-to-br from-sky-50 via-white to-blue-50 relative overflow-hidden select-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-200/40 rounded-full blur-[100px]" />
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md border-2 border-sky-400 bg-sky-50" />
          <span className="text-sky-900 font-black text-[13px]">ClearView</span>
        </div>
        <div className="flex items-center gap-5 text-[9px] text-sky-800/35 font-medium">
          <span>Plans</span><span>Refer</span>
          <span className="bg-sky-500 text-white px-3 py-1.5 rounded-full font-bold text-[8px]">SUBSCRIBE</span>
        </div>
      </div>
      {/* Headline */}
      <div className="relative z-10 px-7 mt-5 text-center">
        <div className="text-[8px] text-sky-500 font-bold tracking-[0.25em] uppercase mb-1">Seattle, WA</div>
        <div className="text-sky-900 text-[28px] font-black leading-[0.92] tracking-[-0.03em]">Crystal Clear.<br/>Every Time.</div>
      </div>
      {/* Pricing cards */}
      <div className="relative z-10 px-5 mt-4 flex gap-2.5 items-end">
        {[
          { name: 'Basic', price: '89', features: ['12 windows', 'Monthly'], h: 'h-[135px]' },
          { name: 'Pro', price: '149', features: ['25 windows', 'Bi-weekly', 'Gutters'], popular: true, h: 'h-[150px]' },
          { name: 'Elite', price: '249', features: ['Unlimited', 'Weekly', 'Full exterior'], h: 'h-[135px]' },
        ].map(plan => (
          <div key={plan.name} className={`flex-1 ${plan.h} rounded-xl p-3 flex flex-col ${
            plan.popular
              ? 'bg-sky-500 text-white shadow-[0_8px_30px_rgba(14,165,233,0.3)]'
              : 'bg-white/70 backdrop-blur-sm text-sky-900 border border-sky-100 shadow-sm'
          }`}>
            {plan.popular && <span className="text-[6px] font-black bg-white/20 rounded-full px-2 py-0.5 w-fit mb-1 uppercase tracking-wider">Most Popular</span>}
            <span className="text-[8px] font-bold opacity-50 uppercase">{plan.name}</span>
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="text-[11px] opacity-50">$</span>
              <span className="text-[24px] font-black leading-none">{plan.price}</span>
              <span className="text-[8px] opacity-40">/mo</span>
            </div>
            <div className="mt-auto space-y-1">
              {plan.features.map(f => (
                <div key={f} className="text-[7px] opacity-50 flex items-center gap-1">
                  <div className={`w-1 h-1 rounded-full ${plan.popular ? 'bg-white/60' : 'bg-sky-400'}`} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 9 — Titan HVAC: Clean thermostat UI, no ghost text */
function Site9() {
  return (
    <div className="h-full bg-[#0e0e0e] relative overflow-hidden select-none flex flex-col">
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-blue-500" />
          <span className="text-white font-black text-[13px] tracking-tight">Titan HVAC</span>
        </div>
        <div className="flex items-center gap-5 text-[9px] text-white/30 font-medium">
          <span>Heating</span><span>Cooling</span>
          <span className="bg-white text-black px-3 py-1.5 rounded-full font-bold text-[8px]">SCHEDULE</span>
        </div>
      </div>
      {/* Central thermostat */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        {/* Outer ring */}
        <div className="relative w-[200px] h-[200px]">
          {/* Glow behind */}
          <div className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-red-500/8 via-transparent to-blue-500/8" />
          {/* Track ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
            {/* Red arc (heating) */}
            <circle cx="100" cy="100" r="88" fill="none" stroke="url(#hvacGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="553" strokeDashoffset="180" />
            <defs>
              <linearGradient id="hvacGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-[52px] font-black leading-none tracking-[-0.04em]">72°</span>
            <span className="text-white/25 text-[9px] font-bold tracking-[0.2em] uppercase mt-1">Cooling Mode</span>
            {/* Toggle */}
            <div className="flex items-center gap-3 mt-4 bg-white/[0.04] rounded-full px-1 py-1">
              <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-[8px] font-bold">Heat</div>
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-[8px] font-bold shadow-[0_0_12px_rgba(59,130,246,0.4)]">Cool</div>
              <div className="bg-transparent text-white/30 px-3 py-1 rounded-full text-[8px] font-bold">Auto</div>
            </div>
          </div>
        </div>
      </div>
      {/* Service cards row */}
      <div className="relative z-10 px-7 pb-5">
        <div className="flex gap-2">
          {[
            { icon: 'from-red-500/15 to-red-500/5', label: 'Furnace', sub: 'Install & Repair', color: 'text-red-400' },
            { icon: 'from-blue-500/15 to-blue-500/5', label: 'AC Units', sub: 'All Brands', color: 'text-blue-400' },
            { icon: 'from-amber-500/15 to-amber-500/5', label: 'Financing', sub: 'From $49/mo', color: 'text-amber-400' },
          ].map(card => (
            <div key={card.label} className={`flex-1 bg-gradient-to-br ${card.icon} rounded-xl p-3 border border-white/[0.04]`}>
              <div className={`${card.color} text-[13px] font-black`}>{card.label}</div>
              <div className="text-white/25 text-[8px] mt-0.5">{card.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 10 — Heartland Fencing: Clean dark layout with real fence photo + config */
function Site10() {
  return (
    <div className="h-full bg-[#0e0c0a] relative overflow-hidden select-none flex flex-col">
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-5">
        <span className="text-amber-200 font-black text-[15px] tracking-tight">Heartland</span>
        <div className="flex items-center gap-5 text-[9px] text-white/25 font-medium">
          <span>Styles</span><span>Gallery</span>
          <span className="bg-amber-600 text-white px-3 py-1.5 rounded-full font-bold text-[8px]">GET ESTIMATE</span>
        </div>
      </div>
      {/* Hero */}
      <div className="relative z-10 px-7 mt-6">
        <div className="text-[9px] text-amber-500/60 font-bold tracking-[0.25em] uppercase mb-2">Kansas City, MO</div>
        <div className="text-white text-[40px] font-black leading-[0.88] tracking-[-0.04em]">
          Your Fence.<br/><span className="text-amber-400">Your Style.</span>
        </div>
        <p className="text-white/25 text-[10px] mt-3 leading-relaxed max-w-[60%]">Design your perfect fence with our interactive builder. Cedar, pine, or vinyl. See your estimate instantly.</p>
      </div>
      {/* Configurator card */}
      <div className="relative z-10 mx-7 mt-auto mb-5 bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-start justify-between gap-6">
          {/* Options */}
          <div className="flex-1">
            <span className="text-amber-400 text-[8px] font-bold tracking-[0.2em] uppercase">Build Your Fence</span>
            <div className="mt-3 flex gap-5">
              <div>
                <span className="text-white/20 text-[7px] font-bold tracking-wider uppercase block mb-1.5">Material</span>
                <div className="flex gap-1.5">
                  {['Cedar', 'Pine', 'Vinyl'].map((m, i) => (
                    <div key={m} className={`px-3 py-1.5 rounded-full text-[8px] font-bold ${
                      i === 0 ? 'bg-amber-500 text-white' : 'bg-white/[0.04] text-white/30 border border-white/[0.06]'
                    }`}>{m}</div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-white/20 text-[7px] font-bold tracking-wider uppercase block mb-1.5">Height</span>
                <div className="flex gap-1.5">
                  {['4 ft', '6 ft', '8 ft'].map((h, i) => (
                    <div key={h} className={`px-3 py-1.5 rounded-full text-[8px] font-bold ${
                      i === 1 ? 'bg-amber-500 text-white' : 'bg-white/[0.04] text-white/30 border border-white/[0.06]'
                    }`}>{h}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="text-right shrink-0">
            <span className="text-white/15 text-[7px] font-bold tracking-wider uppercase">Estimate</span>
            <div className="text-amber-400 text-[36px] font-black leading-none mt-0.5">$3,200</div>
            <div className="bg-amber-500 text-white rounded-full px-5 py-2 text-[9px] font-bold mt-2">Book Site Visit</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const siteDesigns = [Site1, Site2, Site3, Site4, Site5, Site6, Site7, Site8, Site9, Site10];

function ProjectCard({ project, index }) {
  const ref = useReveal();
  const SiteDesign = siteDesigns[index];

  return (
    <div
      ref={ref}
      className="reveal-up group"
      style={{ transitionDelay: `${(index % 2) * 100}ms` }}
    >
      {/* Browser frame */}
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] hover:border-white/20 transition-all duration-500 shadow-2xl shadow-black/30">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#161616] border-b border-white/[0.06]">
          <div className="flex gap-[6px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-2">
            <div className="bg-white/[0.04] rounded-md px-3 py-[5px] text-[10px] font-mono text-white/25 text-center flex items-center justify-center gap-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/15"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              {project.name.toLowerCase().replace(/[\s&'.]/g, '')}
            </div>
          </div>
        </div>

        {/* Site design */}
        <div className="h-[380px] overflow-hidden">
          <SiteDesign />
        </div>
      </div>

      {/* Info below */}
      <div className="pt-6 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-sans font-semibold text-[1.1rem] text-white tracking-tight">{project.name}</h3>
            <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest">{project.location}</span>
          </div>
          <span className={`shrink-0 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest ${project.accent} text-white rounded-full`}>
            {project.industry}
          </span>
        </div>
        <p className="text-[#A1A1AA] text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.results.map((r, i) => (
            <span key={i} className="px-3 py-1.5 border border-white/10 text-[11px] font-mono text-[#A1A1AA] rounded-full">
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WebRedesign() {
  const headerRef = useReveal();
  const processRef = useReveal();
  const ctaRef = useReveal();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const process = [
    { num: '01', title: 'Audit', desc: 'We analyze your current site, competitors, and what your customers actually need to see before they call you.', icon: 'solar:magnifer-linear' },
    { num: '02', title: 'Strategy', desc: 'We map out pages, conversion points, and integrations with your existing tools (CRM, booking, reviews).', icon: 'solar:map-linear' },
    { num: '03', title: 'Design & Build', desc: 'Custom design. Fast, mobile-first, SEO-optimized. No templates. No WordPress bloat.', icon: 'solar:code-square-linear' },
    { num: '04', title: 'Automate', desc: 'We wire your site into your automation stack: forms to CRM, chat to Slack, bookings to calendar.', icon: 'solar:cpu-linear' },
    { num: '05', title: 'Launch & Optimize', desc: 'Go live, track results, and iterate. We stay with you to make sure conversions keep climbing.', icon: 'solar:rocket-2-linear' },
  ];

  return (
    <main className="relative z-10 w-full">

      {/* HERO */}
      <section className="pt-[10rem] pb-[8rem] bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] max-w-[1000px] max-h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-[4rem]">
            <Link to="/" className="btn-outline text-sm">
              <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
              Back to Home
            </Link>
          </div>

          <div ref={headerRef} className="reveal-up max-w-[55rem]">
            <div className="editorial-badge mb-[2rem]">WEB_REDESIGN</div>
            <h1 className="text-h1 text-white mb-6">
              Websites that work<br/>
              <span className="text-[#A1A1AA]">as hard as you do.</span>
            </h1>
            <p className="text-body max-w-[36rem] mb-[3rem]">
              Your website is your 24/7 salesperson. We build fast, modern, conversion-focused sites for trade businesses. Wired directly into your automation stack.
            </p>
            <Link to="/book" className="btn-editorial group">
              <span className="relative z-10 flex items-center gap-3">
                Start a Project
                <iconify-icon icon="solar:arrow-right-up-linear" className="text-xl icon-arrow"></iconify-icon>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-[8rem] bg-black border-y border-white/10">
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12">
          <div ref={processRef} className="reveal-up">
            <div className="editorial-badge mb-[2rem]">OUR_PROCESS</div>
            <h2 className="text-h3 text-white mb-[4rem]">From audit to launch<br/>in weeks, not months.</h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {process.map((step) => (
                <div key={step.num} className="p-6 border border-white/10 hover:border-white/25 transition-all group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-widest">{step.num}</span>
                    <iconify-icon icon={step.icon} className="text-2xl text-white/50 group-hover:text-white transition-colors"></iconify-icon>
                  </div>
                  <h3 className="font-sans font-semibold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-[8rem] bg-black">
        <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[4rem] gap-6">
            <div>
              <div className="editorial-badge mb-[2rem]">PORTFOLIO</div>
              <h2 className="text-h3 text-white">10 businesses.<br/>10 transformations.</h2>
            </div>
            <p className="text-body max-w-[24rem]">
              Real results for real trade companies. Every site built for speed, trust, and conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {portfolio.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[12rem] bg-white text-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}></div>

        <div ref={ctaRef} className="w-full max-w-[100rem] mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center reveal-up">
          <div className="editorial-badge mb-[2rem] text-black/50 before:bg-black/50">YOUR_TURN</div>
          <h2 className="text-h1 text-black mb-6 max-w-[50rem]">
            Your competitors already redesigned.
          </h2>
          <p className="text-body text-black/70 mb-[4rem] max-w-[30rem]">
            A bad website costs you jobs every single day. Let's fix that.
          </p>
          <Link to="/book" className="bg-black text-white px-8 py-4 font-sans font-semibold text-sm hover:bg-black/80 transition-colors flex items-center gap-2 group">
            Start Your Redesign
            <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
          </Link>
        </div>
      </section>

    </main>
  );
}
