import { useMemo, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import HireFreelancerPanel from "../components/HireFreelancerPanel.jsx";
import ProfileSetupWizard from "../components/ProfileSetupWizard.jsx";
import BrowseJobsPanel from "../components/BrowseJobsPanel.jsx";
import ProfileMenu from "../components/ProfileMenu.jsx";
import ProfilePanel from "../components/ProfilePanel.jsx";
import SettingsPanel from "../components/SettingsPanel.jsx";
import { clearProfile, getProfile, saveProfile } from "../utils/profileStorage.js";

export default function Dashboard() {
  const [profile, setProfile] = useState(() => getProfile());
  const [activePanel, setActivePanel] = useState(null); // "profile" | "settings" | null

  const initials = useMemo(() => {
    const fromWords = (value, maxLen = 2) =>
      String(value || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, maxLen)
        .map((w) => w[0]?.toUpperCase())
        .join("")
        .slice(0, maxLen);

    const freelancerInitials = fromWords(profile?.freelancer?.fullName, 2);
    if (freelancerInitials) return freelancerInitials;

    const companyInitials = fromWords(profile?.hirer?.companyName, 2);
    if (companyInitials) return companyInitials;

    const username = String(profile?.account?.username || "").trim();
    if (username) return username.slice(0, 2).toUpperCase();

    const email = String(profile?.account?.email || "").trim();
    if (email) return email[0]?.toUpperCase() ?? "U";

    return "U";
  }, [profile]);

  const onMenuSelect = (next) => {
    setActivePanel((prev) => (prev === next ? null : next));
  };

  const onResetProfile = () => {
    clearProfile();
    setActivePanel(null);
    setProfile(getProfile());
  };

  if (!profile?.completed) {
    return (
      <div className="app">
        <Navbar right={null} />
        <main>
          <ProfileSetupWizard
            initialAccount={profile?.account}
            onComplete={(nextProfile) => {
              saveProfile(nextProfile);
              setProfile(nextProfile);
            }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar
        right={
          <ProfileMenu initials={initials} onSelect={onMenuSelect} />
        }
      />
      <main>
        {activePanel === "profile" ? (
          <ProfilePanel profile={profile} onClose={() => setActivePanel(null)} />
        ) : null}
        {activePanel === "settings" ? (
          <SettingsPanel
            onReset={onResetProfile}
            onClose={() => setActivePanel(null)}
          />
        ) : null}

        {profile?.type === "hirer" ? (
          <HireFreelancerPanel initialWorkId="fullstack" />
        ) : (
          <BrowseJobsPanel />
        )}
      </main>
    </div>
  );
}
