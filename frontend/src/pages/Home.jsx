import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Newspaper,
  Globe,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Fake News Detection",
      desc: "Detect misinformation using AI-powered NLP models.",
      path: "/fake-news",
      icon: <Newspaper className="w-8 h-8 text-blue-400" />,
      badge: "AI",
    },
    {
      title: "Website Scanner",
      desc: "Scan suspicious websites and inspect SSL security.",
      path: "/website-checker",
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      badge: "Secure",
    },
    {
      title: "Phishing Detector",
      desc: "Detect phishing messages and social engineering attacks.",
      path: "/phishing-checker",
      icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
      badge: "Protection",
    },
  ];

  return (
    <div className="min-h-screen text-white">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">

              <Sparkles className="text-cyan-400 w-4 h-4" />

              <span className="text-sm text-cyan-300">
                AI Powered Cyber Security
              </span>

            </div>

            <h1 className="text-6xl font-black leading-tight mb-6">

              Verify Truth

              <br />

              <span className="gradientText">
                Before You Trust
              </span>

            </h1>

            <p className="text-gray-400 text-lg leading-8 mb-10">

              TruthLens AI helps detect Fake News, Malicious Websites and
              Phishing Attacks using AI and heuristic security engines.

            </p>

            <div className="flex flex-wrap gap-5">

              <Link
                to="/fake-news"
                className="glowButton px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
              >
                Start Scanning
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/dashboard"
                className="glass px-8 py-4 rounded-xl font-semibold"
              >
                Live Dashboard
              </Link>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            className="relative"
          >

            <div className="glass p-8">

              <div className="flex justify-between">

                <h3 className="font-bold text-xl">
                  Threat Analysis
                </h3>

                <span className="text-green-400">
                  SAFE
                </span>

              </div>

              <div className="mt-8">

                <h1 className="text-7xl font-black gradientText">
                  98%
                </h1>

                <p className="text-gray-400 mt-2">
                  AI Trust Score
                </p>

              </div>

              <div className="mt-10 space-y-4">

                <div className="glass p-4 flex justify-between">
                  <span>Fake News</span>
                  <span className="text-green-400">Detected</span>
                </div>

                <div className="glass p-4 flex justify-between">
                  <span>Website SSL</span>
                  <span className="text-blue-400">Verified</span>
                </div>

                <div className="glass p-4 flex justify-between">
                  <span>Phishing Risk</span>
                  <span className="text-purple-400">Low</span>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-6">

          {[
            ["98%", "Detection Accuracy"],
            ["10K+", "Threats Analyzed"],
            ["<100ms", "AI Response"],
            ["24/7", "Monitoring"],
          ].map((item) => (

            <div
              key={item[1]}
              className="glass p-8 text-center hover:scale-105 transition"
            >

              <h2 className="text-4xl font-bold gradientText">
                {item[0]}
              </h2>

              <p className="text-gray-400 mt-3">
                {item[1]}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          Core Security Suite
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature) => (

            <motion.div
              whileHover={{ y: -10 }}
              key={feature.title}
              className="glass p-8"
            >

              <div className="mb-6">

                {feature.icon}

              </div>

              <span className="text-xs bg-blue-600 px-3 py-1 rounded-full">
                {feature.badge}
              </span>

              <h3 className="text-2xl font-bold mt-5 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400 mb-8">
                {feature.desc}
              </p>

              <Link
                to={feature.path}
                className="text-cyan-400 font-semibold flex items-center gap-2"
              >
                Open Tool
                <ArrowRight size={18} />
              </Link>

            </motion.div>

          ))}

        </div>

      </section>

    </div>
  );
}