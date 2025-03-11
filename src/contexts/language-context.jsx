"use strict";

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";

const translations = {
  en: {
    reportCyberCrime: "Report Cyber Crime",
    incidentType: "Type of Incident",
    description: "Incident Description",
    date: "Date of Incident",
    evidence: "Evidence Upload",
    email: "Email",
    contact: "Contact Number",
    submit: "Submit Report",
    reset: "Reset",
    terms: "I declare that the information provided is true to the best of my knowledge",
    selectIncident: "Select incident type",
    phishing: "Phishing",
    malware: "Malware",
    fraud: "Online Fraud",
    harassment: "Cyber Harassment",
    hacking: "Hacking",
    other: "Other",
    myReports: "My Reports",
    reportDetails: "Report Details",
    status: "Status",
    submittedAt: "Submitted At",
    anonymous: "Submit Anonymously",
    language: "Language",
    validationErrors: {
      description: "Please provide a detailed description (at least 50 characters)",
      contact: "Please enter a valid 10-digit contact number",
      terms: "Please accept the terms"
    },
    statuses: {
      pending: "Pending",
      investigating: "Under Investigation",
      resolved: "Resolved",
      closed: "Closed"
    }
  },
  hi: {
    reportCyberCrime: "साइबर अपराध की रिपोर्ट करें",
    incidentType: "घटना का प्रकार",
    description: "घटना का विवरण",
    date: "घटना की तिथि",
    evidence: "सबूत अपलोड करें",
    email: "ईमेल",
    contact: "संपर्क नंबर",
    submit: "रिपोर्ट जमा करें",
    reset: "रीसेट",
    terms: "मैं घोषणा करता/करती हूं कि दी गई जानकारी मेरी जानकारी के अनुसार सत्य है",
    selectIncident: "घटना का प्रकार चुनें",
    phishing: "फ़िशिंग",
    malware: "मालवेयर",
    fraud: "ऑनलाइन धोखाधड़ी",
    harassment: "साइबर उत्पीड़न",
    hacking: "हैकिंग",
    other: "अन्य",
    myReports: "मेरी रिपोर्ट",
    reportDetails: "रिपोर्ट विवरण",
    status: "स्थिति",
    submittedAt: "जमा किया गया",
    anonymous: "गुमनाम रूप से जमा करें",
    language: "भाषा",
    validationErrors: {
      description: "कृपया विस्तृत विवरण प्रदान करें (कम से कम 50 अक्षर)",
      contact: "कृपया एक वैध 10-अंकों का संपर्क नंबर दर्ज करें",
      terms: "कृपया नियमों को स्वीकार करें"
    },
    statuses: {
      pending: "लंबित",
      investigating: "जांच के अधीन",
      resolved: "समाधान हो गया",
      closed: "बंद"
    }
  }
};

const initialState = {
  language: "en",
  setLanguage: () => null,
  t: (key) => "",
};

const LanguageContext = createContext(initialState);

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let value = translations[language];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
    [language]
  );

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};

export { LanguageProvider };