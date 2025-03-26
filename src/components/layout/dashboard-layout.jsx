import * as React from "react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme-provider";
import { useLanguage } from "../../contexts/language-context";
import { Moon, Sun, LayoutDashboard, FileText, Users, BookOpen, Settings, LogOut } from "lucide-react";

export function DashboardLayout({ children, onViewChange }) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [activeItem, setActiveItem] = React.useState("dashboard");

  const menuItems = [
    { id: "report", label: "Report Crime", icon: FileText },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "contacts", label: "Emergency Contacts", icon: Users },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-500 flex items-center justify-center border rounded-xl">
            <span className="text-white font-bold select-none cursor-help">CC</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white select-none cursor-help">CyberCrime</h1>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  onViewChange(item.id);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-full transition-all hover:shadow-md",
                  activeItem === item.id
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-4">
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
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 transition-all hover:shadow-md">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}