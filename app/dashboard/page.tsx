import { DashboardLayout } from "@/components/template/DashboardLayout";
import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";
import { ArrowUpRight, Users, CreditCard, Activity } from "lucide-react";

export default function DashboardPage() {
  // In a real app, this would come from authentication
  const user = {
    name: "Jane Smith",
    email: "jane@example.com",
  };

  const stats = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+12%",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+7%",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Active Projects",
      value: "28",
      change: "+3%",
      icon: <Activity className="h-5 w-5" />,
    },
  ];

  return (
    <DashboardLayout userName={user.name} userEmail={user.email}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button>
            <span>New Project</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="flex flex-row items-center justify-between pb-2">
                <Typography
                  variant="small"
                  className="font-medium text-gray-600"
                >
                  {stat.title}
                </Typography>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div>
                <Typography as="div" className="text-2xl font-bold">
                  {stat.value}
                </Typography>
                <Typography variant="muted" className="flex items-center mt-1">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </Typography>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <Typography as="h3" variant="h3" className="mb-6">
            Recent Activity
          </Typography>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <Typography variant="small" className="font-medium">
                    Activity {i}
                  </Typography>
                  <Typography variant="muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </div>
                <Typography variant="muted" className="text-xs">
                  {i}h ago
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
