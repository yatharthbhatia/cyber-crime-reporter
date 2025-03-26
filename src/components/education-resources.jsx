"use strict";

import * as React from "react";
import { useLanguage } from "../contexts/language-context";

export function EducationResources() {
  const { t } = useLanguage();

  const resources = [
    {
      id: "prevention",
      title: t("resources.prevention"),
      content: [
        "Use strong, unique passwords for each account",
        "Enable two-factor authentication when available",
        "Keep your software and operating systems updated",
        "Be cautious of suspicious emails, links, and attachments",
        "Regularly backup your important data",
        "Use reputable antivirus and anti-malware software"
      ]
    },
    {
      id: "awareness",
      title: t("resources.awareness"),
      content: [
        "Be aware of common phishing techniques",
        "Verify the identity of individuals or organizations before sharing information",
        "Check website URLs carefully before entering sensitive information",
        "Be cautious about what you share on social media",
        "Monitor your accounts regularly for suspicious activity"
      ]
    },
    {
      id: "reporting",
      title: t("resources.reporting"),
      content: [
        "Document all evidence of the cyber crime",
        "Report incidents to local cyber crime units",
        "File complaints with relevant national agencies",
        "Notify affected services (banks, email providers, etc.)",
        "Follow up on your case regularly"
      ]
    },
    {
      id: "support",
      title: t("resources.support"),
      content: [
        "Seek professional help if you've been a victim of identity theft",
        "Consider counseling if you've experienced cyber harassment",
        "Join support groups for cyber crime victims",
        "Consult with legal experts about your options"
      ]
    }
  ];

  const helplines = [
    {
      name: "National Cyber Crime Reporting Portal",
      contact: "www.cybercrime.gov.in",
      description: "Official portal for reporting cyber crimes online in India"
    },
    {
      name: "Cyber Crime Helpline",
      contact: "1930",
      description: "24/7 helpline for reporting cyber crimes"
    },
    {
      name: "Women Helpline",
      contact: "181",
      description: "For women facing online harassment or cyber crimes"
    },
    {
      name: "CERT-In",
      contact: "incident@cert-in.org.in",
      description: "Indian Computer Emergency Response Team for cyber security incidents"
    }
  ];

  const faqs = [
    {
      question: "What is phishing?",
      answer: "Phishing is a cyber attack where criminals disguise themselves as trustworthy entities to trick individuals into revealing sensitive information such as passwords, credit card numbers, or personal data."
    },
    {
      question: "How can I protect myself from ransomware?",
      answer: "Regularly backup your data, keep your software updated, use reputable security software, be cautious with email attachments and links, and avoid visiting suspicious websites."
    },
    {
      question: "What should I do if my personal information is stolen?",
      answer: "Change your passwords immediately, contact relevant financial institutions, monitor your accounts for suspicious activity, place a fraud alert on your credit reports, and report the incident to appropriate authorities."
    },
    {
      question: "How can I report online harassment?",
      answer: "Document the harassment (screenshots, messages), block the harasser, report to the platform where it occurred, and file a complaint with local cyber crime authorities."
    }
  ];

  return (
    <div className="space-y-8 bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          {t("resources.title")}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Learn how to protect yourself online and what to do if you become a victim
        </p>
      </div>

      {/* Prevention and Awareness Resources */}
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <div key={resource.id} className="rounded-2xl p-10 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
              {resource.title}
            </h3>
            <ul className="space-y-2">
              {resource.content.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Helplines Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          {t("resources.helplines")}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 rounded-2xl overflow-hidden">
            <thead className="bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-600 rounded-b-2xl">
              {helplines.map((helpline, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                    {helpline.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {helpline.contact}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    {helpline.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          {t("resources.faq")}
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-2xl hover:shadow-md transition-all">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
                {faq.question}
              </h4>
              <p className="text-gray-700 dark:text-gray-200">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* External Resources */}
      <div className="mt-10 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
          External Resources
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <a 
            href="https://www.cybercrime.gov.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="ml-3">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-50">National Cyber Crime Portal</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">Official portal for reporting cyber crimes in India</p>
            </div>
          </a>
          <a 
            href="https://www.cert-in.org.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="ml-3">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-50">CERT-In</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">Indian Computer Emergency Response Team</p>
            </div>
          </a>
          <a 
            href="https://www.mha.gov.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="ml-3">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-50">Ministry of Home Affairs</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">Government resources on cyber security</p>
            </div>
          </a>
          <a 
            href="https://www.nciipc.gov.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="ml-3">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-50">NCIIPC</h4>
              <p className="text-sm text-gray-500 dark:text-gray-300">National Critical Information Infrastructure Protection Centre</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}