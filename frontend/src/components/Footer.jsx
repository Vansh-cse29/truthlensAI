export default function Footer() {
  return (
    <footer className="border-t border-gray-800/80 bg-black text-gray-500 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} TruthLens AI. Built for high-reliability AI security.</p>
        <div className="flex items-center gap-6">
          <span className="text-gray-400">Offline Transformers</span>
          <span className="text-gray-400">FastAPI</span>
          <span className="text-gray-400">React + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}