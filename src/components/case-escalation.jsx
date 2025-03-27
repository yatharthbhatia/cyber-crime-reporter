"use strict";

import * as React from "react";
import { useState } from "react";
import { useReports } from "../contexts/reports-context";
import { useLanguage } from "../contexts/language-context";
import { cn } from "../lib/utils";
import toast from "react-hot-toast";

export function CaseEscalation({ reportId }) {
  const { reports, escalateReport } = useReports();
  const { t } = useLanguage();
  const [authority, setAuthority] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [isEscalating, setIsEscalating] = useState(false);
  
  const report = reports.find(r => r.id === reportId);
  
  if (!report) {
    return <div className="text-red-500">Report not found</div>;
  }
  
  const generateReferenceNumber = () => {
    const prefix = authority.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleEscalate = (e) => {
    e.preventDefault();
    
    if (!authority) {
      toast.error(t("Please select an authority"));
      return;
    }
    
    setIsEscalating(true);
    try {
      const referenceNumber = generateReferenceNumber();
      const escalationDetails = {
        name: authority,
        referenceNumber,
        details,
        priority
      };
      
      escalateReport(reportId, escalationDetails);
      toast.success(t("Case escalated successfully"));
    } catch (error) {
      toast.error(t("Failed to escalate case"));
      console.error("Escalation error:", error);
    }
    setIsEscalating(false);
  };
  
  if (report.status === "ESCALATED" || report.escalatedTo) {
    const escalationDetails = report.escalatedTo || { 
      name: authority, 
      referenceNumber: referenceNumber,
      details: details
    };
    
    return (
      <div className="space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          {t("escalation.escalated")}
        </h2>
        
        <div className="space-y-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-50">
              {t("escalation.tracking")}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t("escalation.authority")}: {escalationDetails.name}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t("escalation.reference")}: <span className="font-mono font-bold text-gray-900 dark:text-gray-50">{escalationDetails.referenceNumber}</span>
            </p>
            {escalationDetails.details && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {t("escalation.details")}: {escalationDetails.details}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t("submittedAt")}: {new Date(report.escalatedAt || Date.now()).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
        {t("escalation.title")}
      </h2>
      
      <form onSubmit={handleEscalate} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="authority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("escalation.authority")}
            </label>
            <select
              id="authority"
              value={authority}
              onChange={(e) => setAuthority(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 dark:border-gray-600"
              disabled={isEscalating}
            >
              <option value="">{t("Select authority")}</option>
              <option value="CYBER_CELL">{t("Cyber Cell")}</option>
              <option value="POLICE">{t("Police Department")}</option>
              <option value="FBI">{t("Federal Bureau")}</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("escalation.priority")}
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 dark:border-gray-600"
              disabled={isEscalating}
            >
              <option value="LOW">{t("Low Priority")}</option>
              <option value="NORMAL">{t("Normal Priority")}</option>
              <option value="HIGH">{t("High Priority")}</option>
              <option value="CRITICAL">{t("Critical Priority")}</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("escalation.details")}
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 dark:border-gray-600"
              disabled={isEscalating}
              placeholder={t("Enter escalation details")}
            />
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {t("By escalating this case, the report will be forwarded to the selected authority for further investigation.")}
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isEscalating}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
          >
            {isEscalating ? t("escalation.processing") : t("escalation.confirm")}
          </button>
        </div>
      </form>
    </div>
  );
}