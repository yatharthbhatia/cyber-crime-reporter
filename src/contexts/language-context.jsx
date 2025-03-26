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
      terms: "Please accept the terms",
      emergencyName: "Please enter a valid name",
      emergencyContact: "Please enter a valid contact number",
      emergencyRelation: "Please specify the relationship"
    },
    statuses: {
      pending: "Pending",
      investigating: "Under Investigation",
      resolved: "Resolved",
      closed: "Closed"
    },
    emergencyContact: {
      title: "Emergency Contact Information",
      name: "Full Name",
      contact: "Contact Number",
      email: "Email Address",
      relation: "Relationship",
      add: "Add Emergency Contact",
      update: "Update Contact",
      remove: "Remove",
      noContacts: "No emergency contacts added"
    },
    escalation: {
      title: "Case Escalation",
      escalate: "Escalate to Authorities",
      authority: "Select Authority",
      police: "Cyber Crime Police",
      cert: "CERT-In",
      other: "Other Authority",
      details: "Additional Details",
      confirm: "Confirm Escalation",
      escalated: "Case Escalated",
      tracking: "Tracking Information",
      reference: "Reference Number"
    },
    resources: {
      title: "Education & Resources",
      prevention: "Prevention Tips",
      awareness: "Awareness",
      reporting: "Reporting Guidelines",
      support: "Support Services",
      faq: "Frequently Asked Questions",
      helplines: "Helplines",
      learnMore: "Learn More"
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
      terms: "कृपया नियमों को स्वीकार करें",
      emergencyName: "कृपया एक वैध नाम दर्ज करें",
      emergencyContact: "कृपया एक वैध संपर्क नंबर दर्ज करें",
      emergencyRelation: "कृपया रिश्ता निर्दिष्ट करें"
    },
    statuses: {
      pending: "लंबित",
      investigating: "जांच के अधीन",
      resolved: "समाधान हो गया",
      closed: "बंद"
    },
    emergencyContact: {
      title: "आपातकालीन संपर्क जानकारी",
      name: "पूरा नाम",
      contact: "संपर्क नंबर",
      email: "ईमेल पता",
      relation: "रिश्ता",
      add: "आपातकालीन संपर्क जोड़ें",
      update: "संपर्क अपडेट करें",
      remove: "हटाएं",
      noContacts: "कोई आपातकालीन संपर्क नहीं जोड़ा गया"
    },
    escalation: {
      title: "केस एस्केलेशन",
      escalate: "अधिकारियों को भेजें",
      authority: "अधिकारी चुनें",
      police: "साइबर क्राइम पुलिस",
      cert: "CERT-In",
      other: "अन्य अधिकारी",
      details: "अतिरिक्त विवरण",
      confirm: "एस्केलेशन की पुष्टि करें",
      escalated: "केस एस्केलेट किया गया",
      tracking: "ट्रैकिंग जानकारी",
      reference: "संदर्भ संख्या"
    },
    resources: {
      title: "शिक्षा और संसाधन",
      prevention: "रोकथाम के टिप्स",
      awareness: "जागरूकता",
      reporting: "रिपोर्टिंग दिशानिर्देश",
      support: "सहायता सेवाएं",
      faq: "अक्सर पूछे जाने वाले प्रश्न",
      helplines: "हेल्पलाइन",
      learnMore: "अधिक जानें"
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