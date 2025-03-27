import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import { DashboardLayout } from './components/layout/dashboard-layout'
import { Dashboard } from './components/dashboard/dashboard'
import { ReportsList } from './components/reports/reports-list'
import { ReportForm } from './components/reports/report-form'
import { EmergencyContacts } from './components/emergency-contacts'
import { EducationResources } from './components/education-resources'
import { Settings } from './components/settings/settings'
import { cn } from './lib/utils'
import { ThemeProvider } from './components/theme-provider'
import { LanguageProvider } from './contexts/language-context'
import { ReportsProvider } from './contexts/reports-context'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'report':
        return <ReportForm />
      case 'reports':
        return <ReportsList />
      case 'contacts':
        return <EmergencyContacts />
      case 'resources':
        return <EducationResources />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ReportsProvider>
          <DashboardLayout onViewChange={setCurrentView}>
            {renderView()}
          </DashboardLayout>
          <Toaster
            position="top-right"
            toastOptions={{
              className: '',
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                padding: '16px',
              },
              success: {
                style: {
                  background: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #065F46',
                },
              },
              error: {
                style: {
                  background: '#FEE2E2',
                  color: '#991B1B',
                  border: '1px solid #991B1B',
                },
              },
              duration: 4000,
            }}
          />
        </ReportsProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
