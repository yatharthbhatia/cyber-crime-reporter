"use strict";

import * as React from "react";
import { useState } from "react";
import { useReports } from "../contexts/reports-context";
import { useLanguage } from "../contexts/language-context";
import { cn } from "../lib/utils";

export function EmergencyContacts() {
  const { emergencyContacts, addEmergencyContact, updateEmergencyContact, removeEmergencyContact } = useReports();
  const { t } = useLanguage();
  const [editingContact, setEditingContact] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
    const newErrors = {};

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      newErrors.name = 'validationErrors.emergencyName';
    }

    // Contact validation
    if (!data.contact || !/^\d{10}$/.test(data.contact)) {
      newErrors.contact = 'validationErrors.emergencyContact';
    }

    // Relation validation
    if (!data.relation || data.relation.trim().length < 2) {
      newErrors.relation = 'validationErrors.emergencyRelation';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setFormErrors({});

    if (editingContact) {
      updateEmergencyContact(editingContact.id, data);
      setEditingContact(null);
    } else {
      addEmergencyContact(data);
    }

    // Reset form
    e.target.reset();
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormErrors({});
  };

  const handleCancel = () => {
    setEditingContact(null);
    setFormErrors({});
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
        {t("emergencyContact.title")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="px-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("emergencyContact.name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={editingContact?.name || ""}
              className={cn(
                "w-full px-3 py-2 border rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                formErrors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              )}
            />
            {formErrors.name && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">{t(formErrors.name)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="contact" className="px-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("emergencyContact.contact")}
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              required
              defaultValue={editingContact?.contact || ""}
              placeholder="10-digit mobile number"
              className={cn(
                "w-full px-3 py-2 border rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                formErrors.contact ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              )}
            />
            {formErrors.contact && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">{t(formErrors.contact)}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="px-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("emergencyContact.email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={editingContact?.email || ""}
              className="w-full px-3 py-2 border rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="relation" className="px-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("emergencyContact.relation")}
            </label>
            <input
              type="text"
              id="relation"
              name="relation"
              required
              defaultValue={editingContact?.relation || ""}
              className={cn(
                "w-full px-3 py-2 border rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                formErrors.relation ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              )}
            />
            {formErrors.relation && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">{t(formErrors.relation)}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
            >
              {editingContact ? t("emergencyContact.update") : t("emergencyContact.add")}
            </button>
            {editingContact && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
          {t("emergencyContact.title")}
        </h3>
        {emergencyContacts.length > 0 ? (
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-50">{contact.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{contact.relation}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{contact.contact}</p>
                    {contact.email && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">{contact.email}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="px-3 py-1.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      {t("emergencyContact.update")}
                    </button>
                    <button
                      onClick={() => removeEmergencyContact(contact.id)}
                      className="px-3 py-1.5 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                    >
                      {t("emergencyContact.remove")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            {t("emergencyContact.noContacts")}
          </p>
        )}
      </div>
    </div>
  );
}