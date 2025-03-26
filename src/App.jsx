import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { DashboardLayout } from './components/layout/dashboard-layout'
import { Dashboard } from './components/dashboard/dashboard'
import { ReportsList } from './components/reports/reports-list'
import { EmergencyContacts } from './components/emergency-contacts'
import { EducationResources } from './components/education-resources'
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
      case 'reports':
        return <ReportsList />
      case 'contacts':
        return <EmergencyContacts />
      case 'resources':
        return <EducationResources />
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
          <ToastContainer position="top-right" />
        </ReportsProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
