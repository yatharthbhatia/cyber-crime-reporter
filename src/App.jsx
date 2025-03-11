import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { cn } from './lib/utils'
import { useTheme } from './components/theme-provider'
import { Moon, Sun, Globe } from 'lucide-react'
import { LanguageProvider, useLanguage } from './contexts/language-context'
import { ReportsProvider, useReports } from './contexts/reports-context'
import { ReportsList } from './components/reports/reports-list'

function AppContent() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { isAnonymous, setIsAnonymous, addReport } = useReports()
  const [submitted, setSubmitted] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const [file, setFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    
    const newErrors = {}

    // Incident description validation
    if (data.description && data.description.length < 50) {
      newErrors.description = 'Please provide a detailed description (at least 50 characters)'
    }

    // Contact validation
    if (data.contact && !/^\d{10}$/.test(data.contact)) {
      newErrors.contact = 'Please enter a valid 10-digit contact number'
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors)
      return
    }

    if (data.terms !== 'true') {
      setFormErrors({ terms: 'Please accept the terms' })
      return
    }

    // Clear errors and submit
    setFormErrors({})
    const reportId = addReport({ ...data, evidence: file?.name })
    setSubmitted({ ...data, evidence: file?.name, id: reportId })
    toast.success(t('Report submitted successfully!'))
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 relative p-4 sm:p-6 lg:p-8">
      <div className="fixed top-6 right-6 z-10">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>
      <ToastContainer position="top-right" theme={theme} />
      <div className="container mx-auto py-4">
        <div className="flex justify-end gap-4 mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 dark:border-gray-600"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
        <div className="max-w-2xl mx-auto text-left">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">{t('reportCyberCrime')}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('incidentType')}</label>
                  <select
                    id="incidentType"
                    name="incidentType"
                    required
                    className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 dark:border-gray-600"
                  >
                    <option value="">{t('selectIncident')}</option>
                    <option value="phishing">{t('phishing')}</option>
                    <option value="malware">{t('malware')}</option>
                    <option value="fraud">{t('fraud')}</option>
                    <option value="harassment">{t('harassment')}</option>
                    <option value="hacking">{t('hacking')}</option>
                    <option value="other">{t('other')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('description')}</label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                      formErrors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    )}
                    placeholder={t('description')}
                  />
                  {formErrors.description && (
                    <p className="text-sm text-red-500 dark:text-red-400 mt-1">{t('validationErrors.description')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('date')}</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="evidence" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('evidence')}</label>
                  <input
                    type="file"
                    id="evidence"
                    name="evidence"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    accept="image/*,.pdf,.doc,.docx"
                    className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                      formErrors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('contact')}</label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    required
                    placeholder="10-digit mobile number"
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
                      formErrors.contact ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                    )}
                  />
                  {formErrors.contact && (
                    <p className="text-sm text-red-500 dark:text-red-400 mt-1">{t('validationErrors.contact')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
                      {t('anonymous')}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      value="true"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                      {t('terms')}
                    </label>
                  </div>
                  {formErrors.terms && (
                    <p className="text-sm text-red-500 dark:text-red-400 mt-1">{t('validationErrors.terms')}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Submit Report
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      setSubmitted(null);
                      setFile(null);
                      setFormErrors({});
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
        
        <div className="mt-8">
          <ReportsList />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <ReportsProvider>
        <AppContent />
      </ReportsProvider>
    </LanguageProvider>
  )
}

export default App
