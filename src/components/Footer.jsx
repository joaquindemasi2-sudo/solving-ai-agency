import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-black/10 py-[6rem] relative z-10 font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-widest text-[#52525B]">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-[4rem] md:gap-[2rem]">

        <div className="col-span-1 md:col-span-4 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" stroke="black" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="black" />
            </svg>
            <span className="font-sans font-semibold text-base tracking-tight text-black uppercase">Solving.</span>
          </div>
          <p className="mt-2">AI_AUTOMATION_AGENCY</p>
        </div>

        <div className="col-span-1 md:col-span-4 flex justify-between md:justify-around">
          <div className="flex flex-col gap-4">
            <span className="text-black mb-2">Services</span>
            <Link to="/lead-qualification" className="hover:text-black transition-colors">Lead Qualification</Link>
            <Link to="/smart-scheduling" className="hover:text-black transition-colors">Scheduling</Link>
            <Link to="/review-management" className="hover:text-black transition-colors">Reviews</Link>
            <Link to="/workflow-automation" className="hover:text-black transition-colors">Automation</Link>
            <Link to="/web-redesign" className="hover:text-black transition-colors">Web Redesign</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-black mb-2">Company</span>
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <Link to="/about" className="hover:text-black transition-colors">About</Link>
            <Link to="/book" className="hover:text-black transition-colors">Contact</Link>
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 flex flex-col md:items-end gap-4">
          <div className="flex gap-4 text-xl text-black mb-4">
            <a href="https://www.linkedin.com/in/joaquin-de-masi-994a10392/" target="_blank" rel="noopener noreferrer" className="hover:text-black/60 transition-colors"><iconify-icon icon="simple-icons:linkedin"></iconify-icon></a>
          </div>
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          <span className="mt-4 text-black/30">&copy; {new Date().getFullYear()} Solving AI.</span>
        </div>

      </div>
    </footer>
  );
}
