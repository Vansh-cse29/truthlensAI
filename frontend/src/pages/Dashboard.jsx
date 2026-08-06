import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function Dashboard() {
  const recentActivity = [
    {
      type: "📰 Fake News",
      title: "Breaking News Analysis",
      status: "Verified",
    },
    {
      type: "🌐 Website Check",
      title: "https://github.com",
      status: "Safe",
    },
    {
      type: "🛡️ Phishing Scan",
      title: "Suspicious Email",
      status: "Warning",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Dashboard
        </h1>

        <p className="text-gray-400 mb-10">
          Overview of TruthLens AI analysis and recent activity.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="Total Scans"
            value="156"
          />

          <StatCard
            title="Fake News"
            value="23"
          />

          <StatCard
            title="Safe Websites"
            value="98"
          />

          <StatCard
            title="Phishing Alerts"
            value="35"
          />

        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-900 border-gray-800">

          <CardContent className="p-6">

            <h2 className="text-2xl font-semibold mb-6">
              Recent Activity
            </h2>

            <div className="space-y-4">

              {recentActivity.map((item, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-800 pb-4"
                >

                  <div>

                    <p className="font-semibold">
                      {item.type}
                    </p>

                    <p className="text-gray-400 text-sm">
                      {item.title}
                    </p>

                  </div>

                  <Badge>
                    {item.status}
                  </Badge>

                </div>

              ))}

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all">

      <CardContent className="p-6">

        <p className="text-gray-400">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-3">
          {value}
        </h2>

      </CardContent>

    </Card>
  );
}

export default Dashboard;