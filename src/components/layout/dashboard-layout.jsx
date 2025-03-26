import * as React from "react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme-provider";
import { useLanguage } from "../../contexts/language-context";
import { Moon, Sun, LayoutDashboard, FileText, Users, BookOpen, Settings, LogOut } from "lucide-react";

export function DashboardLayout({ children, onViewChange }) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [activeItem, setActiveItem] = React.useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const menuItems = [
    { id: "report", label: "Report Crime", icon: FileText },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "contacts", label: "Emergency Contacts", icon: Users },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col transition-all duration-300 ease-in-out h-screen`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:block absolute -right-3 top-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg
            className={`h-4 w-4 text-gray-600 dark:text-gray-300 transform transition-transform ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className={`flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'} mb-8 mt-12`}>
          <div className="w-10 h-10 bg-blue-500 flex items-center justify-center border rounded-xl">
            <span className="text-white font-bold select-none cursor-help">CC</span>
          </div>
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white select-none cursor-help">CyberCrime</h1>
          )}
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  onViewChange(item.id);
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-full transition-all hover:shadow-md",
                  activeItem === item.id
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <Icon className="h-5 w-5" />
                {isSidebarOpen && item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-4">
          {isSidebarOpen && (
            <div className="flex items-center justify-between px-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-300"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:shadow-sm"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          )}
          <button 
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 transition-all hover:shadow-md",
              !isSidebarOpen && "justify-center"
            )}
            title={!isSidebarOpen ? "Sign Out" : undefined}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:ml-0 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}