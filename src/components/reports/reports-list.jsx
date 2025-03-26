"use strict";

import * as React from "react";
import { useReports } from "../../contexts/reports-context";
import { useLanguage } from "../../contexts/language-context";
import { cn } from "../../lib/utils";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  investigating: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

export function ReportsList() {
  const { reports } = useReports();
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = React.useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("myReports")}</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={cn(
                "p-4 rounded-xl border cursor-pointer transition-colors",
                "hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg",
                selectedReport?.id === report.id
                  ? "border-blue-500 dark:border-blue-400 shadow-md"
                  : "border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {report.incidentType}
                </h3>
                <span
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-full",
                    statusColors[report.status]
                  )}
                >
                  {t(`statuses.${report.status}`)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {report.description}
              </p>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {t("submittedAt")}: {formatDate(report.submittedAt)}
              </div>
            </div>
          ))}
          {reports.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No reports submitted yet
            </p>
          )}
        </div>

        {selectedReport && (
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t("reportDetails")}
            </h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("incidentType")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {selectedReport.incidentType}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("description")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                  {selectedReport.description}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("date")}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {selectedReport.date}
                </dd>
              </div>
              {!selectedReport.isAnonymous && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("email")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedReport.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("contact")}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedReport.contact}
                    </dd>
                  </div>
                </>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("status")}
                </dt>
                <dd className="mt-1">
                  <span
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-full",
                      statusColors[selectedReport.status]
                    )}
                  >
                    {t(`statuses.${selectedReport.status}`)}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}