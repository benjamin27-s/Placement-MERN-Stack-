import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import HireFreelancerPanel from "../components/HireFreelancerPanel.jsx";
import ProfileSetupWizard from "../components/ProfileSetupWizard.jsx";
import BrowseJobsPanel from "../components/BrowseJobsPanel.jsx";
import ProfileMenu from "../components/ProfileMenu.jsx";
import ProfilePanel from "../components/ProfilePanel.jsx";
import SettingsPanel from "../components/SettingsPanel.jsx";

export default function Dashboard() {
  const { user, updateProfile, logout } = useAuth();
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

    const freelancerInitials = fromWords(user?.freelancer?.fullName, 2);
    if (freelancerInitials) return freelancerInitials;

    const companyInitials = fromWords(user?.hirer?.companyName, 2);
    if (companyInitials) return companyInitials;

    const username = String(user?.username || "").trim();
    if (username) return username.slice(0, 2).toUpperCase();

    const email = String(user?.email || "").trim();
    if (email) return email[0]?.toUpperCase() ?? "U";

    return "U";
  }, [user]);

  const onMenuSelect = (next) => {
    if (next === "logout") {
      logout();
      return;
    }
    setActivePanel((prev) => (prev === next ? null : next));
  };

  // Build a profile-like object for components that still expect the old format
  const profile = useMemo(() => {
    if (!user) return { completed: false };
    return {
      completed: user.completed,
      type: user.type,
      createdAt: user.createdAt,
      account: {
        username: user.username,
        email: user.email,
      },
      hirer: user.hirer,
      freelancer: user.freelancer,
    };
  }, [user]);

  if (!user?.completed) {
    return (
      <div className="app">
        <Navbar right={null} />
        <main>
          <ProfileSetupWizard
            initialAccount={{ username: user?.username, email: user?.email }}
            onComplete={async (nextProfile) => {
              try {
                await updateProfile({
                  type: nextProfile.type,
                  hirer: nextProfile.hirer,
                  freelancer: nextProfile.freelancer,
                });
              } catch (err) {
                console.error("Profile update failed:", err);
                alert("Failed to save profile. Please try again.");
              }
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
            onLogout={logout}
            onClose={() => setActivePanel(null)}
          />
        ) : null}

        {user?.type === "hirer" ? (
          <HireFreelancerPanel initialWorkId="fullstack" />
        ) : (
          <BrowseJobsPanel />
        )}
      </main>
    </div>
  );
}
