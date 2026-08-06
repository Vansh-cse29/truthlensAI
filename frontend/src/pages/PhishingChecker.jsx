import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function PhishingChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPhishing = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/check-phishing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.success) setResult(data.result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Phishing Email & Text Detector</h1>
        <p className="text-gray-400 mb-8">Scan suspicious emails or SMS messages for phishing attempts.</p>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <Textarea
              placeholder="Paste email or text message content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[180px] bg-black border-gray-700 text-white"
            />
            <Button onClick={checkPhishing} disabled={loading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
              {loading ? "Scanning Content..." : "Analyze Content"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="bg-gray-900 border-gray-800 mt-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Phishing Analysis</h2>
                <Badge className={result.verdict.includes("CLEAN") ? "bg-emerald-600" : "bg-red-600"}>
                  {result.verdict}
                </Badge>
              </div>
              <p className="mt-4"><strong>Confidence:</strong> {result.confidence}</p>
              <p className="mt-2 text-gray-400">{result.reason}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default PhishingChecker;