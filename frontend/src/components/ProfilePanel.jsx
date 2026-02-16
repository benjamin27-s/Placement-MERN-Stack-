const splitCsv = (value) =>
  String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const formatDateTime = (iso) => {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return String(iso);
  return date.toLocaleString();
};

const fileLabel = (fileMeta) => {
  if (!fileMeta?.name) return "-";
  const kb = Number.isFinite(fileMeta.size) ? Math.round(fileMeta.size / 1024) : null;
  return kb ? `${fileMeta.name} (${kb} KB)` : fileMeta.name;
};

export default function ProfilePanel({ profile, onClose }) {
  const isHirer = profile?.type === "hirer";
  const account = profile?.account ?? {};
  const freelancer = profile?.freelancer ?? {};
  const hirer = profile?.hirer ?? {};
  const roles = Array.isArray(hirer.roles) ? hirer.roles : [];

  return (
    <section className="dashboardPanel" aria-label="Profile">
      <div className="dashboardPanel__card">
        <header className="dashboardPanel__header">
          <h2 className="dashboardPanel__title">Profile</h2>
          <button className="dashboardPanel__close" type="button" onClick={onClose}>
            Close
          </button>
        </header>

        <div className="profileSetup__review" aria-label="Profile details">
          <div className="profileSetup__reviewRow">
            <div className="profileSetup__reviewKey">Profile type</div>
            <div className="profileSetup__reviewVal">{isHirer ? "Hirer" : "Freelancer"}</div>
          </div>

          <div className="profileSetup__reviewRow">
            <div className="profileSetup__reviewKey">Created</div>
            <div className="profileSetup__reviewVal">
              {formatDateTime(profile?.createdAt)}
            </div>
          </div>

          <div className="profileSetup__reviewRow">
            <div className="profileSetup__reviewKey">Username</div>
            <div className="profileSetup__reviewVal">{account.username || "-"}</div>
          </div>

          <div className="profileSetup__reviewRow">
            <div className="profileSetup__reviewKey">Email</div>
            <div className="profileSetup__reviewVal">{account.email || "-"}</div>
          </div>

          {isHirer ? (
            <>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Company</div>
                <div className="profileSetup__reviewVal">{hirer.companyName || "-"}</div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Country</div>
                <div className="profileSetup__reviewVal">
                  {hirer.companyCountry || "-"}
                </div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Website</div>
                <div className="profileSetup__reviewVal">
                  {hirer.companyWebsite ? (
                    <a href={hirer.companyWebsite} target="_blank" rel="noreferrer">
                      {hirer.companyWebsite}
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Project title</div>
                <div className="profileSetup__reviewVal">{hirer.projectTitle || "-"}</div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Project type</div>
                <div className="profileSetup__reviewVal">{hirer.projectType || "-"}</div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Budget</div>
                <div className="profileSetup__reviewVal">{hirer.budgetRange || "-"}</div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Timeline</div>
                <div className="profileSetup__reviewVal">{hirer.timeline || "-"}</div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Team size</div>
                <div className="profileSetup__reviewVal">{hirer.teamSize || "-"}</div>
              </div>

              <div className="profileSetup__reviewRow profileSetup__reviewRow--stack">
                <div className="profileSetup__reviewKey">Roles needed</div>
                <div className="profileSetup__reviewVal">
                  {roles.length ? (
                    <ul className="profileSetup__reviewList">
                      {roles.map((role) => (
                        <li key={role.id || `${role.title}-${role.count}`}>
                          {role.title} (x{role.count}){role.skills ? ` — ${role.skills}` : ""}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "-"
                  )}
                </div>
              </div>

              <div className="profileSetup__reviewRow profileSetup__reviewRow--stack">
                <div className="profileSetup__reviewKey">Description</div>
                <div className="profileSetup__reviewVal">
                  {hirer.projectDescription?.trim() ? hirer.projectDescription.trim() : "-"}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Name</div>
                <div className="profileSetup__reviewVal">{freelancer.fullName || "-"}</div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Location</div>
                <div className="profileSetup__reviewVal">
                  {[freelancer.city, freelancer.country].filter(Boolean).join(", ") || "-"}
                </div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Title</div>
                <div className="profileSetup__reviewVal">
                  {freelancer.professionalTitle || "-"}
                </div>
              </div>
              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Experience</div>
                <div className="profileSetup__reviewVal">
                  {freelancer.yearsExp ? `${freelancer.yearsExp} yrs` : "-"}
                </div>
              </div>

              <div className="profileSetup__reviewRow profileSetup__reviewRow--stack">
                <div className="profileSetup__reviewKey">Skills</div>
                <div className="profileSetup__reviewVal">
                  {splitCsv(freelancer.skills).length ? (
                    <div className="dashboardPanel__chips" aria-label="Skills">
                      {splitCsv(freelancer.skills).map((skill) => (
                        <span className="chip" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
              </div>

              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Portfolio</div>
                <div className="profileSetup__reviewVal">
                  {freelancer.portfolioUrl?.trim() ? (
                    <a href={freelancer.portfolioUrl} target="_blank" rel="noreferrer">
                      {freelancer.portfolioUrl}
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
              </div>

              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">Resume</div>
                <div className="profileSetup__reviewVal">{fileLabel(freelancer.resume)}</div>
              </div>

              <div className="profileSetup__reviewRow">
                <div className="profileSetup__reviewKey">LinkedIn</div>
                <div className="profileSetup__reviewVal">
                  {freelancer.linkedinUrl?.trim()
                    ? freelancer.linkedinUrl.trim()
                    : fileLabel(freelancer.linkedinPdf)}
                </div>
              </div>

              <div className="profileSetup__reviewRow profileSetup__reviewRow--stack">
                <div className="profileSetup__reviewKey">Bio</div>
                <div className="profileSetup__reviewVal">
                  {freelancer.bio?.trim() ? freelancer.bio.trim() : "-"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

