import { useState } from "react";

const toggles = [
  { id: "emailAlerts",    label: "Email Alerts",         desc: "Receive transaction summaries via email" },
  { id: "budgetWarnings", label: "Budget Warnings",      desc: "Alert when spending exceeds budget limits" },
  { id: "weeklyReport",   label: "Weekly Report",        desc: "Get a weekly expense report every Monday" },
  { id: "newLogin",       label: "New Login Alerts",     desc: "Notify on new device sign-ins" },
  { id: "pushNotifs",     label: "Push Notifications",   desc: "Browser push notifications for activity" },
];

const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200
      ${enabled ? "bg-purple-600" : "bg-gray-200"}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
        ${enabled ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailAlerts:    true,
    budgetWarnings: true,
    weeklyReport:   false,
    newLogin:       true,
    pushNotifs:     false,
  });

  const handleToggle = (id) =>
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSave = () => {
    // dispatch(updateNotificationSettings(settings))
    console.log("Notification settings saved", settings);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
        <p className="text-sm text-gray-500 mt-1">Choose what you want to be notified about</p>
      </div>

      <div className="divide-y divide-gray-100">
        {toggles.map(({ id, label, desc }) => (
          <div key={id} className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-semibold text-gray-700">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
            <Toggle enabled={settings[id]} onToggle={() => handleToggle(id)} />
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl
                     font-semibold text-sm transition-colors shadow-md shadow-purple-200"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;