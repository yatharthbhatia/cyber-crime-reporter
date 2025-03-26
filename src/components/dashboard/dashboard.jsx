import * as React from "react";
import { useReports } from "../../contexts/reports-context";
import { useLanguage } from "../../contexts/language-context";
import { cn } from "../../lib/utils";
import { FileText, Search, CheckCircle, Clock } from "lucide-react";
import { CrimeDistributionChart, ReportTrendsChart } from "./charts";

export function Dashboard() {
  const { reports } = useReports();
  const { t } = useLanguage();

  const stats = [
    {
      id: "total-reports",
      label: "Total Reports",
      value: "467",
      change: "+13%",
      icon: FileText,
    },
    {
      id: "under-investigation",
      label: "Under Investigation",
      value: "245",
      change: "+8%",
      icon: Search,
    },
    {
      id: "resolved-cases",
      label: "Resolved Cases",
      value: "182",
      change: "+14%",
      icon: CheckCircle,
    },
    {
      id: "pending-review",
      label: "Pending Review",
      value: "40",
      change: "-5%",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isNegative = stat.change.startsWith("-");
          return (
            <div
              key={stat.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
                <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                  {stat.value}
                </div>
                <div
                  className={cn(
                    "text-sm font-medium",
                    isNegative
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  )}
                >
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Crime Type Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
            Crime Type Distribution
          </h3>
          <div className="h-[300px]">
            <CrimeDistributionChart />
          </div>
        </div>

        {/* Report Status Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
            Report Status Trends
          </h3>
          <div className="h-[300px]">
            <ReportTrendsChart />
          </div>
        </div>
      </div>
    </div>
  );
}