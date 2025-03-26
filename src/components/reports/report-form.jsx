import { useState } from "react";
import { useReports } from "../../contexts/reports-context";
import { useLanguage } from "../../contexts/language-context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ReportForm({ showHeading = true, showShadow = true}) {
  const { t } = useLanguage();
  const { addReport } = useReports();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    addReport(newReport);
    setFormData({
      title: "",
      description: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
    <div className={`space-y-6 bg-white dark:bg-gray-800 ${showShadow ? 'shadow-xl' : ''} rounded-lg p-6`}>
      {showHeading && <h2 className="text-2xl font-bold tracking-tight">{t("Create Report")}</h2>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="px-1.5" htmlFor="title">{t("Title")}</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label  className="px-1.5" htmlFor="description">{t("Description")}</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label className="px-1.5" htmlFor="location">{t("Location")}</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label className="px-1.5" htmlFor="date">{t("Date")}</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">{t("submit")}</Button>
      </form>
    </div>
    </>
  );
}