import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row">

        {/* Left */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <Badge className="mb-6 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Powered Cyber Intelligence
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
            Verify Truth
            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              in the Age of AI
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-gray-400">
            Detect fake news, phishing attacks and malicious websites using
            intelligent AI analysis with real-time trust scoring.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link to="/fake-news">
              <Button className="bg-cyan-500 hover:bg-cyan-400 px-8 py-6 rounded-xl">
                Analyze Now
                <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button
                variant="outline"
                className="px-8 py-6 rounded-xl border-white/10"
              >
                Dashboard
              </Button>
            </Link>

          </div>

        </motion.div>

        {/* Right */}
        <motion.div
          className="flex flex-1 justify-center"
          initial={{ opacity: 0, scale: .8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-cyan-500 blur-[100px] opacity-20 animate-pulse"></div>

            <div className="relative flex h-80 w-80 items-center justify-center rounded-full border border-cyan-500/20 bg-white/5 backdrop-blur-xl">

              <ShieldCheck
                size={130}
                className="text-cyan-400"
              />

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}