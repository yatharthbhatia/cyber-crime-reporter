"use strict";

import * as React from "react";
import { useState } from "react";
import { useReports } from "../contexts/reports-context";
import { useLanguage } from "../contexts/language-context";
import { cn } from "../lib/utils";
import { toast } from "react-toastify";

export function CaseEscalation({ reportId }) {
  const { reports, escalateReport } = useReports();
  const { t } = useLanguage();
  const [authority, setAuthority] = useState("");
  const [details, setDetails] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isEscalated, setIsEscalated] = useState(false);
  
  const report = reports.find(r => r.id === reportId);
  
  if (!report) {
    return <div className="text-red-500">Report not found</div>;
  }
  
  const handleEscalate = (e) => {
    e.preventDefault();
    
    if (!authority) {
      toast.error(t("Please select an authority"));
      return;
    }
    
    // Generate a reference number for tracking
    const generatedReference = `CR-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    setReferenceNumber(generatedReference);
    
    const authorityDetails = {
      name: authority,
      details: details,
      referenceNumber: generatedReference,
    };
    
    escalateReport(reportId, authorityDetails);
    setIsEscalated(true);
    toast.success(t("Case escalated successfully"));
  };
  
  if (isEscalated || report.escalatedTo) {
    const escalationDetails = report.escalatedTo || { 
      name: authority, 
      referenceNumber: referenceNumber,
      details: details
    };
    
    return (
      <div className="space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("escalation.escalated")}
        </h2>
        
        <div className="space-y-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {t("escalation.tracking")}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t("escalation.authority")}: {escalationDetails.name}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t("escalation.reference")}: <span className="font-mono font-bold">{escalationDetails.referenceNumber}</span>
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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
              required
            >
              <option value="">{t("selectIncident")}</option>
              <option value="police">{t("escalation.police")}</option>
              <option value="cert">{t("escalation.cert")}</option>
              <option value="other">{t("escalation.other")}</option>
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
            />
          </div>
          
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {t("By escalating this case, the report will be forwarded to the selected authority for further investigation.")}
            </p>
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {t("escalation.confirm")}
          </button>
        </div>
      </form>
    </div>
  );
}