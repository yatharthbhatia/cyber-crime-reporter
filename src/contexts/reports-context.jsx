"use strict";

import * as React from "react";
import { createContext, useContext, useState } from "react";

const initialState = {
  reports: [],
  addReport: () => null,
  updateReportStatus: () => null,
  isAnonymous: false,
  setIsAnonymous: () => null,
};

const ReportsContext = createContext(initialState);

function ReportsProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const addReport = (report) => {
    const newReport = {
      ...report,
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
      isAnonymous,
    };
    setReports((prev) => [newReport, ...prev]);
    return newReport.id;
  };

  const updateReportStatus = (id, status) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status } : report
      )
    );
  };

  const value = {
    reports,
    addReport,
    updateReportStatus,
    isAnonymous,
    setIsAnonymous,
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
}

export const useReports = () => {
  const context = useContext(ReportsContext);

  if (context === undefined)
    throw new Error("useReports must be used within a ReportsProvider");

  return context;
};

export { ReportsProvider };