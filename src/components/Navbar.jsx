import { Link, useLocation } from 'react-router-dom';
export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (id) => {
    if (!isHome) return;
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b-0 border-black/5">
      <div className="w-full max-w-[100rem] mx-auto flex items-center justify-between px-6 lg:px-12 h-[5rem]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-90 transition-transform duration-500 ease-in-out">
            <rect x="2" y="2" width="20" height="20" stroke="black" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="4" fill="black" />
          </svg>
          <span className="font-sans font-semibold text-lg tracking-tight text-black uppercase">Solving.</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center justify-center gap-[3rem] text-[clamp(0.75rem,1vw,0.875rem)] font-medium text-[#52525B]">
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('services')} className="hover:text-black transition-colors">Services</button>
              <button onClick={() => scrollToSection('metrics')} className="hover:text-black transition-colors">Results</button>
              <Link to="/blog" className="hover:text-black transition-colors">Blog</Link>
              <Link to="/about" className="hover:text-black transition-colors">About</Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <Link to="/blog" className="hover:text-black transition-colors">Blog</Link>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            to="/book"
            className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-widest text-black border border-black/20 px-4 py-2 hover:bg-black hover:text-white transition-all duration-300"
          >
            Work With Us
          </Link>
        </div>

        <button className="md:hidden text-black">
          <iconify-icon icon="solar:hamburger-menu-linear" className="text-2xl"></iconify-icon>
        </button>
      </div>
    </nav>
  );
}
