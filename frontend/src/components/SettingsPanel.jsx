import { useNavigate } from "react-router-dom";

export default function SettingsPanel({ onLogout, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!onLogout) return;
    onLogout();
    navigate("/");
  };

  return (
    <section className="dashboardPanel" aria-label="Settings">
      <div className="dashboardPanel__card">
        <header className="dashboardPanel__header">
          <h2 className="dashboardPanel__title">Settings</h2>
          <button className="dashboardPanel__close" type="button" onClick={onClose}>
            Close
          </button>
        </header>

        <p className="dashboardPanel__hint">
          Manage your account settings and preferences.
        </p>

        <div className="dashboardPanel__actions">
          <button className="dashboardPanel__danger" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
