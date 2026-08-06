import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, Zap } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Fake News", path: "/fake-news" },
    { name: "Website", path: "/website-checker" },
    { name: "Phishing", path: "/phishing-checker" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 transition-transform duration-300 group-hover:scale-110">
            <ShieldCheck size={24} className="text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              TruthLens
              <span className="text-cyan-400"> AI</span>
            </h1>

            <p className="text-xs text-gray-400">
              AI Cyber Intelligence
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2">

          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Status */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>

            <span className="text-xs font-semibold text-emerald-300">
              Engine Online
            </span>
          </div>

          {/* CTA */}
          <Link
            to="/fake-news"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
          >
            <Zap size={16} />
            Analyze Now
          </Link>
        </div>

      </div>
    </nav>
  );
}