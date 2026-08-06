import { useState } from "react";

export default function FakeNews() {
  const [inputText, setInputText] = useState("");
  const [useCloudAI, setUseCloudAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          use_cloud: useCloudAI,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.result);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Fake News Verifier</h1>
      <p className="text-gray-400 text-sm mb-6">
        Analyze news headlines using local ML or Cloud AI.
      </p>

      {/* Engine Toggle Switch */}
      <div className="flex items-center justify-between bg-gray-900 border border-gray-800 p-4 rounded-xl mb-6">
        <div>
          <span className="font-semibold text-sm">Engine Mode:</span>
          <p className="text-xs text-gray-400">
            {useCloudAI
              ? "Cloud AI (Deep reasoning online)"
              : "Local DistilBERT (Fast & 100% Offline)"}
          </p>
        </div>
        <button
          onClick={() => setUseCloudAI(!useCloudAI)}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            useCloudAI ? "bg-purple-600 text-white" : "bg-blue-600 text-white"
          }`}
        >
          {useCloudAI ? "☁️ Cloud Mode" : "💻 Offline Mode"}
        </button>
      </div>

      {/* Headline Input */}
      <textarea
        rows={5}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste headline or news content..."
        className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-blue-500 mb-4"
      />

      {/* Submit Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze News"}
      </button>

      {/* Output Card */}
      {result && (
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                result.verdict === "REAL NEWS"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {result.verdict}
            </span>
            <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
              Engine: {result.engine}
            </span>
          </div>
          <p className="text-2xl font-bold mb-2">
            Confidence: <span className="text-blue-400">{result.confidence}</span>
          </p>
          <p className="text-sm text-gray-300">{result.reason}</p>
        </div>
      )}
    </div>
  );
}