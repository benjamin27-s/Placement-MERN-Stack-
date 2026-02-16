import { useMemo, useState } from "react";

const projectTypes = [
  "Web App",
  "Mobile App",
  "API / Backend",
  "DevOps / Cloud",
  "Data / Analytics",
  "AI / ML",
  "UI/UX Design",
  "QA / Testing",
];

const countryOptions = [
  "United States",
  "Canada",
  "United Kingdom",
  "Ireland",
  "Australia",
  "New Zealand",
  "India",
  "Pakistan",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Vietnam",
  "Thailand",
  "Japan",
  "South Korea",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
  "Turkey",
  "Israel",
  "Egypt",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Morocco",
  "Germany",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "Portugal",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Switzerland",
  "Austria",
  "Belgium",
  "Poland",
  "Czechia",
  "Romania",
  "Greece",
  "Hungary",
  "Brazil",
  "Mexico",
  "Argentina",
  "Chile",
  "Colombia",
  "Peru",
];

const budgetRangeOptions = [
  "Not sure yet",
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Hourly",
];

const timelineOptions = [
  "Not sure yet",
  "Immediately",
  "Within 1 week",
  "Within 2 weeks",
  "Within 1 month",
  "1-3 months",
  "3+ months",
  "Flexible",
];

const roleTitleOptions = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "DevOps Engineer",
  "QA Engineer",
  "Data Analyst",
  "Data Scientist",
  "Project Manager",
  "Product Manager",
  "Content Writer",
  "Marketing Specialist",
  "Virtual Assistant",
];

const professionalTitleOptions = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "Graphic Designer",
  "DevOps Engineer",
  "QA Engineer",
  "Data Analyst",
  "Data Scientist",
  "Product Manager",
  "Project Manager",
  "Content Writer",
  "Marketing Specialist",
  "Virtual Assistant",
];

const skillOptions = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Sass",
  "Node.js",
  "Express",
  "Next.js",
  "Vue",
  "Angular",
  "Svelte",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring",
  "C#",
  ".NET",
  "PHP",
  "Laravel",
  "Ruby",
  "Rails",
  "Go",
  "Rust",
  "SQL",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "AWS",
  "Azure",
  "GCP",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Git",
  "CI/CD",
  "REST APIs",
  "GraphQL",
  "Jest",
  "Cypress",
  "Playwright",
  "Figma",
  "UI Design",
  "UX Research",
];

const teamSizeOptions = Array.from({ length: 50 }, (_, i) => String(i + 1));
const roleCountOptions = Array.from({ length: 20 }, (_, i) => String(i + 1));
const yearsExpOptions = Array.from({ length: 31 }, (_, i) => String(i));

const splitCsv = (value) =>
  String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const toggleCsvToken = (csv, token) => {
  const set = new Set(splitCsv(csv));
  if (set.has(token)) set.delete(token);
  else set.add(token);
  return Array.from(set)
    .sort((a, b) => a.localeCompare(b))
    .join(", ");
};

const selectionSummary = (selected, emptyLabel) => {
  if (!selected.length) return emptyLabel;
  if (selected.length <= 3) return selected.join(", ");
  return `${selected.slice(0, 3).join(", ")} +${selected.length - 3} more`;
};

const newRole = () => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title: "",
  titleCustomMode: false,
  count: "1",
  skills: "",
});

const fileMeta = (file) =>
  file
    ? { name: file.name, size: file.size, lastModified: file.lastModified }
    : null;

export default function ProfileSetupWizard({ initialAccount, onComplete }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null); // "hirer" | "freelancer"
  const [companyCountryOther, setCompanyCountryOther] = useState(false);
  const [freelancerCountryOther, setFreelancerCountryOther] = useState(false);
  const [freelancerTitleOther, setFreelancerTitleOther] = useState(false);

  const [hirer, setHirer] = useState({
    companyName: "",
    companyCountry: "",
    companyWebsite: "",
    projectTitle: "",
    projectType: "",
    projectDescription: "",
    teamSize: "1",
    budgetRange: "",
    timeline: "",
    roles: [newRole()],
  });

  const [freelancer, setFreelancer] = useState({
    fullName: "",
    country: "",
    city: "",
    professionalTitle: "",
    skills: "",
    yearsExp: "",
    portfolioUrl: "",
    bio: "",
    resume: null,
    linkedinUrl: "",
    linkedinPdf: null,
  });

  const account = useMemo(() => {
    const username = initialAccount?.username ?? "";
    const email = initialAccount?.email ?? "";
    return { username, email };
  }, [initialAccount]);

  const canContinueStep1 = !!type;

  const hirerValid = useMemo(() => {
    const teamSizeNum = Number(hirer.teamSize);
    if (!hirer.companyName.trim()) return false;
    if (!hirer.companyCountry.trim()) return false;
    if (!hirer.projectTitle.trim()) return false;
    if (!hirer.projectType) return false;
    if (!hirer.projectDescription.trim()) return false;
    if (!Number.isFinite(teamSizeNum) || teamSizeNum <= 0) return false;
    if (!Array.isArray(hirer.roles) || hirer.roles.length < 1) return false;
    for (const role of hirer.roles) {
      if (!role.title.trim()) return false;
      const c = Number(role.count);
      if (!Number.isFinite(c) || c <= 0) return false;
      if (!role.skills.trim()) return false;
    }
    return true;
  }, [hirer]);

  const freelancerValid = useMemo(() => {
    if (!freelancer.fullName.trim()) return false;
    if (!freelancer.country.trim()) return false;
    if (!freelancer.city.trim()) return false;
    if (!freelancer.professionalTitle.trim()) return false;
    if (!freelancer.skills.trim()) return false;
    if (!freelancer.resume) return false;
    const hasLinkedIn =
      !!freelancer.linkedinPdf || !!freelancer.linkedinUrl.trim();
    if (!hasLinkedIn) return false;
    return true;
  }, [freelancer]);

  const canContinueStep2 = type === "hirer" ? hirerValid : freelancerValid;

  const goNext = () => setStep((s) => Math.min(3, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const updateHirer = (key) => (e) => {
    const value = e.target.value;
    setHirer((prev) => ({ ...prev, [key]: value }));
  };

  const updateFreelancer = (key) => (e) => {
    const value = e.target.value;
    setFreelancer((prev) => ({ ...prev, [key]: value }));
  };

  const freelancerSkillsSelected = useMemo(
    () => splitCsv(freelancer.skills),
    [freelancer.skills]
  );

  const toggleFreelancerSkill = (skill) => {
    setFreelancer((prev) => ({
      ...prev,
      skills: toggleCsvToken(prev.skills, skill),
    }));
  };

  const updateRole = (roleId, key) => (e) => {
    const value = e.target.value;
    setHirer((prev) => ({
      ...prev,
      roles: prev.roles.map((r) => (r.id === roleId ? { ...r, [key]: value } : r)),
    }));
  };

  const addRole = () => {
    setHirer((prev) => ({ ...prev, roles: [...prev.roles, newRole()] }));
  };

  const removeRole = (roleId) => {
    setHirer((prev) => {
      const next = prev.roles.filter((r) => r.id !== roleId);
      return { ...prev, roles: next.length ? next : [newRole()] };
    });
  };

  const toggleRoleSkill = (roleId, skill) => {
    setHirer((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.id === roleId ? { ...r, skills: toggleCsvToken(r.skills, skill) } : r
      ),
    }));
  };

  const onPickResume = (e) => {
    const file = e.target.files?.[0] ?? null;
    setFreelancer((prev) => ({ ...prev, resume: fileMeta(file) }));
  };

  const onPickLinkedInPdf = (e) => {
    const file = e.target.files?.[0] ?? null;
    setFreelancer((prev) => ({ ...prev, linkedinPdf: fileMeta(file) }));
  };

  const complete = () => {
    if (step !== 3) return;
    if (!type) return;
    const createdAt = new Date().toISOString();

    const payload = {
      completed: true,
      type,
      createdAt,
      account,
      hirer: type === "hirer" ? hirer : null,
      freelancer: type === "freelancer" ? freelancer : null,
    };

    onComplete?.(payload);
  };

  const companyCountryIsPreset = countryOptions.includes(hirer.companyCountry);
  const companyCountrySelectValue =
    companyCountryOther || (!companyCountryIsPreset && hirer.companyCountry)
      ? "__other__"
      : hirer.companyCountry;

  const freelancerCountryIsPreset = countryOptions.includes(freelancer.country);
  const freelancerCountrySelectValue =
    freelancerCountryOther || (!freelancerCountryIsPreset && freelancer.country)
      ? "__other__"
      : freelancer.country;

  const freelancerTitleIsPreset = professionalTitleOptions.includes(
    freelancer.professionalTitle
  );
  const freelancerTitleSelectValue =
    freelancerTitleOther ||
    (!freelancerTitleIsPreset && freelancer.professionalTitle)
      ? "__other__"
      : freelancer.professionalTitle;

  return (
    <section className="profileSetup" aria-label="Profile creation">
      <div className="profileSetup__card">
        <header className="profileSetup__header">
          <div>
            <h1 className="profileSetup__title">Create your profile</h1>
            {account.username || account.email ? (
              <p className="profileSetup__hint">
                Account: {account.username || "User"}
                {account.email ? ` (${account.email})` : ""}
              </p>
            ) : (
              <p className="profileSetup__hint">
                Tell us a bit about you so we can personalize your dashboard.
              </p>
            )}
          </div>

          <div className="profileSetup__stepper" aria-label="Progress">
            Step {step} of 3
          </div>
        </header>

        {step === 1 ? (
          <div className="profileSetup__body">
            <h2 className="profileSetup__sectionTitle">What do you want to do?</h2>
            <div className="profileSetup__typeGrid" role="list">
              <button
                type="button"
                className={`profileSetup__typeCard${
                  type === "hirer" ? " profileSetup__typeCard--active" : ""
                }`}
                onClick={() => setType("hirer")}
                aria-pressed={type === "hirer"}
              >
                <div className="profileSetup__typeHeading">Hire a freelancer</div>
                <div className="profileSetup__typeDesc">
                  Create a company profile and describe your project requirements.
                </div>
              </button>

              <button
                type="button"
                className={`profileSetup__typeCard${
                  type === "freelancer" ? " profileSetup__typeCard--active" : ""
                }`}
                onClick={() => setType("freelancer")}
                aria-pressed={type === "freelancer"}
              >
                <div className="profileSetup__typeHeading">Be a freelancer</div>
                <div className="profileSetup__typeDesc">
                  Build your freelancer profile and upload resume / LinkedIn.
                </div>
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 && type === "hirer" ? (
          <div className="profileSetup__body">
            <h2 className="profileSetup__sectionTitle">Company & project details</h2>

            <div className="profileSetup__grid">
              <label className="auth__field">
                <span className="auth__label">Company name *</span>
                <input
                  className="auth__input"
                  value={hirer.companyName}
                  onChange={updateHirer("companyName")}
                  required
                />
              </label>

              <div className="auth__field">
                <span className="auth__label">Company country *</span>
                <select
                  className="auth__input"
                  value={companyCountrySelectValue}
                  onChange={(e) => {
                    const next = e.target.value;
                    if (next === "__other__") {
                      setCompanyCountryOther(true);
                      setHirer((prev) => ({
                        ...prev,
                        companyCountry: countryOptions.includes(prev.companyCountry)
                          ? ""
                          : prev.companyCountry,
                      }));
                      return;
                    }

                    setCompanyCountryOther(false);
                    setHirer((prev) => ({ ...prev, companyCountry: next }));
                  }}
                  required
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {countryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="__other__">Other...</option>
                </select>

                {companyCountrySelectValue === "__other__" ? (
                  <input
                    className="auth__input profileSetup__subInput"
                    value={hirer.companyCountry}
                    onChange={updateHirer("companyCountry")}
                    placeholder="Type your country"
                    aria-label="Company country (other)"
                    required
                  />
                ) : null}
              </div>

              <label className="auth__field profileSetup__span2">
                <span className="auth__label">Company website</span>
                <input
                  className="auth__input"
                  value={hirer.companyWebsite}
                  onChange={updateHirer("companyWebsite")}
                  placeholder="https://"
                />
              </label>

              <label className="auth__field profileSetup__span2">
                <span className="auth__label">Project title *</span>
                <input
                  className="auth__input"
                  value={hirer.projectTitle}
                  onChange={updateHirer("projectTitle")}
                  required
                />
              </label>

              <label className="auth__field">
                <span className="auth__label">Project type *</span>
                <select
                  className="auth__input"
                  value={hirer.projectType}
                  onChange={updateHirer("projectType")}
                  required
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="auth__field">
                <span className="auth__label">
                  How many people are you looking for? *
                </span>
                <select
                  className="auth__input"
                  value={hirer.teamSize}
                  onChange={updateHirer("teamSize")}
                  required
                >
                  {teamSizeOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>

              <label className="auth__field profileSetup__span2">
                <span className="auth__label">Project description *</span>
                <textarea
                  className="auth__input profileSetup__textarea"
                  value={hirer.projectDescription}
                  onChange={updateHirer("projectDescription")}
                  rows={3}
                  required
                />
              </label>

              <label className="auth__field">
                <span className="auth__label">Budget range</span>
                <select
                  className="auth__input"
                  value={hirer.budgetRange}
                  onChange={updateHirer("budgetRange")}
                >
                  <option value="">Select a budget</option>
                  {budgetRangeOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="auth__field">
                <span className="auth__label">Timeline / start date</span>
                <select
                  className="auth__input"
                  value={hirer.timeline}
                  onChange={updateHirer("timeline")}
                >
                  <option value="">Select a timeline</option>
                  {timelineOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="profileSetup__subsection">
              <div className="profileSetup__subHeader">
                <h3 className="profileSetup__subTitle">Roles needed *</h3>
                <button className="profileSetup__miniBtn" type="button" onClick={addRole}>
                  + Add role
                </button>
              </div>

              <div className="roleList" role="list">
                {hirer.roles.map((role, idx) => {
                  const roleTitleIsPreset = roleTitleOptions.includes(role.title);
                  const roleTitleSelectValue =
                    role.titleCustomMode || (role.title && !roleTitleIsPreset)
                      ? "__other__"
                      : role.title;
                  const roleSkillsSelected = splitCsv(role.skills);

                  return (
                    <div className="roleRow" key={role.id} role="listitem">
                      <div className="roleRow__top">
                        <div className="roleRow__label">Role #{idx + 1}</div>
                        <button
                          className="roleRow__remove"
                          type="button"
                          onClick={() => removeRole(role.id)}
                          disabled={hirer.roles.length <= 1}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="roleRow__inputs">
                        <div className="auth__field">
                          <span className="auth__label">Role title *</span>
                          <select
                            className="auth__input"
                            value={roleTitleSelectValue}
                            onChange={(e) => {
                              const next = e.target.value;
                              setHirer((prev) => ({
                                ...prev,
                                roles: prev.roles.map((r) =>
                                  r.id === role.id
                                    ? next === "__other__"
                                      ? {
                                          ...r,
                                          titleCustomMode: true,
                                          title: roleTitleOptions.includes(r.title) ? "" : r.title,
                                        }
                                      : { ...r, titleCustomMode: false, title: next }
                                    : r
                                ),
                              }));
                            }}
                            required
                          >
                            <option value="" disabled>
                              Select a role
                            </option>
                            {roleTitleOptions.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                            <option value="__other__">Other...</option>
                          </select>

                          {roleTitleSelectValue === "__other__" ? (
                            <input
                              className="auth__input profileSetup__subInput"
                              value={role.title}
                              onChange={updateRole(role.id, "title")}
                              placeholder="Type role title"
                              aria-label={`Role #${idx + 1} title (other)`}
                              required
                            />
                          ) : null}
                        </div>

                        <label className="auth__field">
                          <span className="auth__label">Count *</span>
                          <select
                            className="auth__input"
                            value={role.count}
                            onChange={updateRole(role.id, "count")}
                            required
                          >
                            {roleCountOptions.map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </label>

                        <div className="auth__field roleRow__span2">
                          <span className="auth__label">Key skills *</span>
                          <details className="multiSelect">
                            <summary className="multiSelect__summary">
                              {selectionSummary(roleSkillsSelected, "Select key skills")}
                            </summary>
                            <div
                              className="multiSelect__menu"
                              role="listbox"
                              aria-label={`Role #${idx + 1} skills`}
                            >
                              {skillOptions.map((skill) => (
                                <label key={skill} className="multiSelect__item">
                                  <input
                                    type="checkbox"
                                    checked={roleSkillsSelected.includes(skill)}
                                    onChange={() => toggleRoleSkill(role.id, skill)}
                                  />
                                  <span>{skill}</span>
                                </label>
                              ))}
                            </div>
                          </details>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {step === 2 && type === "freelancer" ? (
          <div className="profileSetup__body">
            <h2 className="profileSetup__sectionTitle">Freelancer details</h2>

            <div className="profileSetup__grid">
              <label className="auth__field profileSetup__span2">
                <span className="auth__label">Full name *</span>
                <input
                  className="auth__input"
                  value={freelancer.fullName}
                  onChange={updateFreelancer("fullName")}
                  required
                />
              </label>

              <div className="auth__field">
                <span className="auth__label">Country *</span>
                <select
                  className="auth__input"
                  value={freelancerCountrySelectValue}
                  onChange={(e) => {
                    const next = e.target.value;
                    if (next === "__other__") {
                      setFreelancerCountryOther(true);
                      setFreelancer((prev) => ({
                        ...prev,
                        country: countryOptions.includes(prev.country) ? "" : prev.country,
                      }));
                      return;
                    }

                    setFreelancerCountryOther(false);
                    setFreelancer((prev) => ({ ...prev, country: next }));
                  }}
                  required
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {countryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="__other__">Other...</option>
                </select>

                {freelancerCountrySelectValue === "__other__" ? (
                  <input
                    className="auth__input profileSetup__subInput"
                    value={freelancer.country}
                    onChange={updateFreelancer("country")}
                    placeholder="Type your country"
                    aria-label="Country (other)"
                    required
                  />
                ) : null}
              </div>

              <label className="auth__field">
                <span className="auth__label">City *</span>
                <input
                  className="auth__input"
                  value={freelancer.city}
                  onChange={updateFreelancer("city")}
                  required
                />
              </label>

              <div className="auth__field profileSetup__span2">
                <span className="auth__label">Professional title *</span>
                <select
                  className="auth__input"
                  value={freelancerTitleSelectValue}
                  onChange={(e) => {
                    const next = e.target.value;
                    if (next === "__other__") {
                      setFreelancerTitleOther(true);
                      setFreelancer((prev) => ({
                        ...prev,
                        professionalTitle: professionalTitleOptions.includes(
                          prev.professionalTitle
                        )
                          ? ""
                          : prev.professionalTitle,
                      }));
                      return;
                    }

                    setFreelancerTitleOther(false);
                    setFreelancer((prev) => ({ ...prev, professionalTitle: next }));
                  }}
                  required
                >
                  <option value="" disabled>
                    Select a title
                  </option>
                  {professionalTitleOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                  <option value="__other__">Other...</option>
                </select>

                {freelancerTitleSelectValue === "__other__" ? (
                  <input
                    className="auth__input profileSetup__subInput"
                    value={freelancer.professionalTitle}
                    onChange={updateFreelancer("professionalTitle")}
                    placeholder="Type your title"
                    aria-label="Professional title (other)"
                    required
                  />
                ) : null}
              </div>

              <div className="auth__field profileSetup__span2">
                <span className="auth__label">Skills *</span>
                <details className="multiSelect">
                  <summary className="multiSelect__summary">
                    {selectionSummary(freelancerSkillsSelected, "Select skills")}
                  </summary>
                  <div className="multiSelect__menu" role="listbox" aria-label="Skills">
                    {skillOptions.map((skill) => (
                      <label key={skill} className="multiSelect__item">
                        <input
                          type="checkbox"
                          checked={freelancerSkillsSelected.includes(skill)}
                          onChange={() => toggleFreelancerSkill(skill)}
                        />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                </details>
              </div>

              <label className="auth__field">
                <span className="auth__label">Years of experience</span>
                <select
                  className="auth__input"
                  value={freelancer.yearsExp}
                  onChange={updateFreelancer("yearsExp")}
                >
                  <option value="">Select years</option>
                  {yearsExpOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                  <option value="30+">30+</option>
                </select>
              </label>

              <label className="auth__field">
                <span className="auth__label">Portfolio URL</span>
                <input
                  className="auth__input"
                  value={freelancer.portfolioUrl}
                  onChange={updateFreelancer("portfolioUrl")}
                  placeholder="https://"
                />
              </label>

              <label className="auth__field profileSetup__span2">
                <span className="auth__label">Short bio</span>
                <textarea
                  className="auth__input profileSetup__textarea"
                  value={freelancer.bio}
                  onChange={updateFreelancer("bio")}
                  rows={2}
                />
              </label>
            </div>

            <div className="profileSetup__subsection">
              <h3 className="profileSetup__subTitle">Uploads</h3>

              <div className="profileSetup__uploads">
                <label className="profileSetup__upload">
                  <span className="auth__label">Resume (PDF/DOC/DOCX) *</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={onPickResume}
                    required
                  />
                  <span className="profileSetup__fileMeta">
                    {freelancer.resume ? freelancer.resume.name : "No file selected"}
                  </span>
                </label>

                <label className="profileSetup__upload">
                  <span className="auth__label">LinkedIn URL</span>
                  <input
                    className="auth__input"
                    value={freelancer.linkedinUrl}
                    onChange={updateFreelancer("linkedinUrl")}
                    placeholder="https://linkedin.com/in/..."
                  />
                </label>

                <label className="profileSetup__upload">
                  <span className="auth__label">LinkedIn PDF (optional, but required if no URL) *</span>
                  <input type="file" accept=".pdf" onChange={onPickLinkedInPdf} />
                  <span className="profileSetup__fileMeta">
                    {freelancer.linkedinPdf ? freelancer.linkedinPdf.name : "No file selected"}
                  </span>
                </label>
              </div>

              <p className="profileSetup__note">
                Note: files are stored as metadata only (no uploads).
              </p>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="profileSetup__body">
            <h2 className="profileSetup__sectionTitle">Review</h2>

            <div className="profileSetup__review">
              <div className="profileSetup__reviewRow">
                <span className="profileSetup__reviewKey">Profile type</span>
                <span className="profileSetup__reviewVal">
                  {type === "hirer" ? "Hire a freelancer" : "Be a freelancer"}
                </span>
              </div>

              {type === "hirer" ? (
                <>
                  <div className="profileSetup__reviewRow">
                    <span className="profileSetup__reviewKey">Company</span>
                    <span className="profileSetup__reviewVal">
                      {hirer.companyName} ({hirer.companyCountry})
                    </span>
                  </div>
                  <div className="profileSetup__reviewRow">
                    <span className="profileSetup__reviewKey">Project</span>
                    <span className="profileSetup__reviewVal">
                      {hirer.projectTitle} • {hirer.projectType} • {hirer.teamSize} people
                    </span>
                  </div>
                  <div className="profileSetup__reviewRow profileSetup__reviewRow--stack">
                    <span className="profileSetup__reviewKey">Roles</span>
                    <span className="profileSetup__reviewVal">
                      <ul className="profileSetup__reviewList">
                        {hirer.roles.map((r) => (
                          <li key={r.id}>
                            {r.title} (x{r.count}) — {r.skills}
                          </li>
                        ))}
                      </ul>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="profileSetup__reviewRow">
                    <span className="profileSetup__reviewKey">Name</span>
                    <span className="profileSetup__reviewVal">{freelancer.fullName}</span>
                  </div>
                  <div className="profileSetup__reviewRow">
                    <span className="profileSetup__reviewKey">Location</span>
                    <span className="profileSetup__reviewVal">
                      {freelancer.city}, {freelancer.country}
                    </span>
                  </div>
                  <div className="profileSetup__reviewRow">
                    <span className="profileSetup__reviewKey">Title</span>
                    <span className="profileSetup__reviewVal">
                      {freelancer.professionalTitle}
                    </span>
                  </div>
                  <div className="profileSetup__reviewRow profileSetup__reviewRow--stack">
                    <span className="profileSetup__reviewKey">Skills</span>
                    <span className="profileSetup__reviewVal">
                      {freelancer.skills}
                    </span>
                  </div>
                  <div className="profileSetup__reviewRow">
                    <span className="profileSetup__reviewKey">Resume</span>
                    <span className="profileSetup__reviewVal">
                      {freelancer.resume?.name ?? "-"}
                    </span>
                  </div>
                  <div className="profileSetup__reviewRow">
                    <span className="profileSetup__reviewKey">LinkedIn</span>
                    <span className="profileSetup__reviewVal">
                      {freelancer.linkedinUrl.trim()
                        ? freelancer.linkedinUrl
                        : freelancer.linkedinPdf?.name ?? "-"}
                    </span>
                  </div>
                </>
              )}
            </div>

            <p className="profileSetup__note">
              When you click “Complete profile”, you’ll be taken to your dashboard.
            </p>
          </div>
        ) : null}

        <footer className="profileSetup__actions">
          <button
            className="profileSetup__btn profileSetup__btn--ghost"
            type="button"
            onClick={goBack}
            disabled={step === 1}
          >
            Back
          </button>

          {step === 1 ? (
            <button
              className="profileSetup__btn profileSetup__btn--solid"
              type="button"
              onClick={goNext}
              disabled={!canContinueStep1}
            >
              Continue
            </button>
          ) : null}

          {step === 2 ? (
            <button
              className="profileSetup__btn profileSetup__btn--solid"
              type="button"
              onClick={goNext}
              disabled={!canContinueStep2}
            >
              Continue
            </button>
          ) : null}

          {step === 3 ? (
            <button
              className="profileSetup__btn profileSetup__btn--solid"
              type="button"
              onClick={complete}
            >
              Complete profile
            </button>
          ) : null}
        </footer>
      </div>
    </section>
  );
}
