import * as React from "react";
import { useTheme } from "../theme-provider";
import { useLanguage } from "../../contexts/language-context";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {t("settings")}
      </h2>

      <div className="space-y-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {t("appearance")}
          </h3>
          <div className="space-y-4">
            <div>
              <Label>{t("theme")}</Label>
              <div className="mt-2 flex gap-4">
                <Button
                  onClick={() => setTheme("light")}
                  variant={theme === "light" ? "default" : "outline"}
                >
                  {t("light")}
                </Button>
                <Button
                  onClick={() => setTheme("dark")}
                  variant={theme === "dark" ? "default" : "outline"}
                >
                  {t("dark")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {t("language")}
          </h3>
          <div className="space-y-4">
            <div>
              <Label>{t("selectLanguage")}</Label>
              <div className="mt-2 flex gap-4">
                <Button
                  onClick={() => setLanguage("en")}
                  variant={language === "en" ? "default" : "outline"}
                >
                  English
                </Button>
                <Button
                  onClick={() => setLanguage("hi")}
                  variant={language === "hi" ? "default" : "outline"}
                >
                  हिंदी
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}