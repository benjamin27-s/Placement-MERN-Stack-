export default function SettingsPanel({ onReset, onClose }) {
  const reset = () => {
    if (!onReset) return;
    const ok = window.confirm(
      "Reset profile?\n\nThis will clear your saved profile data in this browser and return you to the setup wizard."
    );
    if (!ok) return;
    onReset();
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
          Profile data is stored locally for now (backend not connected yet).
        </p>

        <div className="dashboardPanel__actions">
          <button className="dashboardPanel__danger" type="button" onClick={reset}>
            Reset profile
          </button>
        </div>
      </div>
    </section>
  );
}

