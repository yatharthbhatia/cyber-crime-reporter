"use strict";

import * as React from "react";
import { createContext, useContext, useState } from "react";

const initialState = {
  reports: [],
  addReport: () => null,
  updateReportStatus: () => null,
  isAnonymous: false,
  setIsAnonymous: () => null,
  emergencyContacts: [],
  addEmergencyContact: () => null,
  updateEmergencyContact: () => null,
  removeEmergencyContact: () => null,
  escalateReport: () => null,
};

const ReportsContext = createContext(initialState);

function ReportsProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

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

  const addEmergencyContact = (contact) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };
    setEmergencyContacts((prev) => [...prev, newContact]);
    return newContact.id;
  };

  const updateEmergencyContact = (id, updatedContact) => {
    setEmergencyContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  const removeEmergencyContact = (id) => {
    setEmergencyContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const escalateReport = (id, authorityDetails) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id
          ? {
              ...report,
              status: 'investigating',
              escalatedTo: authorityDetails,
              escalatedAt: new Date().toISOString(),
            }
          : report
      )
    );
  };

  const value = {
    reports,
    addReport,
    updateReportStatus,
    isAnonymous,
    setIsAnonymous,
    emergencyContacts,
    addEmergencyContact,
    updateEmergencyContact,
    removeEmergencyContact,
    escalateReport,
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