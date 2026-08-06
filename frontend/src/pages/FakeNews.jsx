import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function FakeNews() {
  const [news, setNews] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeNews = async () => {
    if (!news.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: news }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setError("Analysis failed. Please try again.");
      }
    } catch (err) {
      console.error("Backend Connection Error:", err);
      setError("Unable to connect to local TruthLens AI backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Fake News Detection</h1>

        <p className="text-gray-400 mb-8">
          Paste a news article or headline and let TruthLens AI analyze its credibility.
        </p>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <Textarea
              placeholder="Paste your news article here..."
              value={news}
              onChange={(e) => setNews(e.target.value)}
              className="min-h-[180px] bg-black border-gray-700 text-white placeholder:text-gray-500"
            />

            <Button
              onClick={analyzeNews}
              disabled={loading || !news.trim()}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Analyzing with Local DistilBERT..." : "Analyze News"}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <div className="mt-6 p-4 bg-red-950/50 border border-red-800 rounded-lg text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {result && (
          <Card className="bg-gray-900 border-gray-800 mt-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Analysis Result</h2>

                <Badge
                  className={
                    result.verdict === "REAL NEWS"
                      ? "bg-emerald-600 text-white"
                      : "bg-red-600 text-white"
                  }
                >
                  {result.verdict}
                </Badge>
              </div>

              <p className="mt-5 text-gray-200">
                <strong className="text-white">Confidence:</strong> {result.confidence}
              </p>

              <p className="mt-3 text-gray-400">
                {result.reason}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default FakeNews;