import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      title: "Fake News Detection",
      desc: "Real-time stylistic and deep NLP analysis powered by local fine-tuned DistilBERT models.",
      path: "/fake-news",
      icon: "📰",
      badge: "Local ML",
    },
    {
      title: "Website Security",
      desc: "Instant URL inspection for IP masking, SSL validation, and malicious domain structures.",
      path: "/website-checker",
      icon: "🛡️",
      badge: "Real-time",
    },
    {
      title: "Phishing Guard",
      desc: "Deep text scanning to catch social engineering, urgency tactics, and credential harvesting.",
      path: "/phishing-checker",
      icon: "🎣",
      badge: "Heuristic",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center relative z-10">
        <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
          ⚡ Hackathon Ready • 100% Offline Capable
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Verify Truth in the Age of <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            AI Misinformation
          </span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          TruthLens AI combines fine-tuned local transformers and heuristic threat engines to detect fake news, malicious URLs, and phishing attacks instantly.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/fake-news"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-lg shadow-blue-600/25 transition-all"
          >
            Try News Verifier →
          </Link>
          <Link
            to="/dashboard"
            className="border border-gray-800 bg-gray-900/50 hover:bg-gray-800 text-gray-300 px-6 py-3 rounded-xl text-sm transition-all"
          >
            View Analytics
          </Link>
        </div>

        {/* Live Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 p-6 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-md">
          <div>
            <h3 className="text-2xl font-bold text-white">0ms</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">External API Delay</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-emerald-400">99.9%</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Demo Uptime</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-400">&lt;100ms</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Local Latency</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-indigo-400">3-in-1</h3>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Security Engines</p>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <h2 className="text-xl font-bold mb-8 text-center text-gray-200">
          Core Threat Detection Suite
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="bg-gray-800 text-gray-300 border border-gray-700 text-xs px-2.5 py-1 rounded-full">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                {item.desc}
              </p>
              <Link
                to={item.path}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                Launch Detector →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}