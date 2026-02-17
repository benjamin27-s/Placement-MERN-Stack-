import { useMemo, useState } from "react";

const workOptions = [
  { id: "frontend", label: "Frontend Development (React)" },
  { id: "backend", label: "Backend API Development" },
  { id: "fullstack", label: "Full-Stack Development" },
  { id: "mobile", label: "Mobile App Development" },
  { id: "uiux", label: "UI/UX Design" },
  { id: "devops", label: "DevOps & Cloud" },
  { id: "data", label: "Data Engineering" },
  { id: "aiml", label: "AI / Machine Learning" },
  { id: "security", label: "Cybersecurity" },
  { id: "qa", label: "QA Automation & Testing" },
];

const jobMetaByWorkId = {
  frontend: {
    projectTitles: [
      "React Admin Dashboard",
      "Landing Page Redesign",
      "Design System UI Kit",
      "E-commerce Product Page",
      "Customer Portal UI",
    ],
    projectTypes: ["Web App", "UI/UX Design", "Frontend"],
    roles: ["Frontend Developer", "React Developer", "UI Engineer"],
    skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Redux", "Vite"],
  },
  backend: {
    projectTitles: [
      "REST API for Mobile App",
      "Authentication + Roles System",
      "Payment Integration Service",
      "Microservice Refactor",
      "Reporting API + Exports",
    ],
    projectTypes: ["API / Backend", "DevOps / Cloud", "Data / Analytics"],
    roles: ["Backend Developer", "API Engineer", "Node.js Developer"],
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs", "JWT", "Redis", "Docker"],
  },
  fullstack: {
    projectTitles: [
      "SaaS MVP Build",
      "Marketplace Web App",
      "Internal Tooling Platform",
      "Booking + Payments App",
      "Client Portal MVP",
    ],
    projectTypes: ["Web App", "API / Backend", "DevOps / Cloud"],
    roles: ["Full-Stack Developer", "Software Engineer", "Web App Developer"],
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "CI/CD", "Docker", "Testing"],
  },
  mobile: {
    projectTitles: [
      "React Native MVP",
      "Mobile UI + API Integration",
      "Push Notifications Setup",
      "Offline-first Mobile App",
      "App Store Release Support",
    ],
    projectTypes: ["Mobile App", "Web App", "API / Backend"],
    roles: ["Mobile Developer", "React Native Developer", "iOS/Android Engineer"],
    skills: ["React Native", "Flutter", "iOS", "Android", "APIs", "Firebase", "Testing"],
  },
  uiux: {
    projectTitles: [
      "UX Audit + Recommendations",
      "Design System Refresh",
      "Mobile App Wireframes",
      "SaaS Product Redesign",
      "Prototype for Investor Demo",
    ],
    projectTypes: ["UI/UX Design", "Web App", "Mobile App"],
    roles: ["UI/UX Designer", "Product Designer", "UX Researcher"],
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems", "UX Writing", "Accessibility"],
  },
  devops: {
    projectTitles: [
      "CI/CD Pipeline Setup",
      "Dockerization + Deploy",
      "Cloud Cost Optimization",
      "Kubernetes Migration",
      "Monitoring + Alerts",
    ],
    projectTypes: ["DevOps / Cloud", "API / Backend", "Data / Analytics"],
    roles: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"],
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
  },
  data: {
    projectTitles: [
      "Data Pipeline ETL",
      "Analytics Dashboard Backend",
      "dbt Models + Docs",
      "SQL Performance Tuning",
      "Event Tracking + Warehouse",
    ],
    projectTypes: ["Data / Analytics", "API / Backend", "DevOps / Cloud"],
    roles: ["Data Engineer", "ETL Developer", "Analytics Engineer"],
    skills: ["SQL", "Python", "Airflow", "dbt", "BigQuery", "Spark", "Data Warehousing"],
  },
  aiml: {
    projectTitles: [
      "Document Classification MVP",
      "Chatbot Proof of Concept",
      "Recommendation System",
      "Model Deployment Pipeline",
      "Forecasting Prototype",
    ],
    projectTypes: ["AI / ML", "API / Backend", "Data / Analytics"],
    roles: ["ML Engineer", "AI Engineer", "Data Scientist"],
    skills: ["Python", "PyTorch", "TensorFlow", "NLP", "MLOps", "Model Serving", "Pandas"],
  },
  security: {
    projectTitles: [
      "Security Review + Fixes",
      "OWASP Hardening",
      "Threat Modeling Workshop",
      "Pen Test Remediation",
      "Auth & Session Audit",
    ],
    projectTypes: ["Cybersecurity", "API / Backend", "Web App"],
    roles: ["Security Engineer", "Penetration Tester", "Security Analyst"],
    skills: ["Threat Modeling", "OWASP", "AppSec", "Network Security", "SIEM", "Incident Response"],
  },
  qa: {
    projectTitles: [
      "E2E Test Suite Setup",
      "Regression Automation",
      "Playwright Coverage Expansion",
      "Test Strategy + Tooling",
      "CI Test Stabilization",
    ],
    projectTypes: ["QA / Testing", "Web App", "API / Backend"],
    roles: ["QA Automation Engineer", "SDET", "Test Engineer"],
    skills: ["Playwright", "Cypress", "Selenium", "API Testing", "Jest", "CI", "Bug Reporting"],
  },
};

const companyNames = [
  "Nimbus Labs",
  "Orbitify",
  "Copperline Studio",
  "BluePeak Ventures",
  "AtlasWorks",
  "Northstar Media",
  "BrightCart",
  "CivicCloud",
  "Sunrise Health",
  "Pinecone Analytics",
  "HarborPay",
  "Trellis HQ",
  "Voyager Systems",
  "Keystone Retail",
  "Aurora Logistics",
  "Vertex Learning",
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "India",
  "Pakistan",
  "Bangladesh",
  "Nigeria",
  "South Africa",
  "Brazil",
  "Mexico",
  "Australia",
  "Philippines",
  "Vietnam",
  "Japan",
];

const budgetOptions = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Hourly",
];

const timelineOptions = [
  "Immediately",
  "Within 1 week",
  "Within 2 weeks",
  "Within 1 month",
  "1-3 months",
  "3+ months",
  "Flexible",
];

const randomInt = (minInclusive, maxInclusive) =>
  Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;

const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

const pickManyUnique = (arr, count) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
};

const descTemplates = [
  ({ companyName, projectTitle, workLabel, timeline }) =>
    `${companyName} is hiring for ${workLabel.toLowerCase()} to deliver "${projectTitle}" (${timeline.toLowerCase()}).`,
  ({ projectTitle }) =>
    `We need help building "${projectTitle}" with clean code, great UX, and strong communication.`,
  ({ companyName, projectTitle, timeline }) =>
    `${companyName} is looking for a contractor to ship "${projectTitle}" (${timeline.toLowerCase()}) and support iteration after launch.`,
];

const buildJobs = (workId, workLabel, count = 10) => {
  const meta = jobMetaByWorkId[workId] ?? jobMetaByWorkId.fullstack;
  const usedCompanies = new Set();

  return Array.from({ length: count }, (_, index) => {
    let companyName = "";
    for (let tries = 0; tries < 25; tries += 1) {
      const candidate = pickOne(companyNames);
      if (!usedCompanies.has(candidate)) {
        companyName = candidate;
        usedCompanies.add(candidate);
        break;
      }
    }
    if (!companyName) companyName = pickOne(companyNames);

    const country = pickOne(countries);
    const projectTitle = pickOne(meta.projectTitles);
    const projectType = pickOne(meta.projectTypes);
    const budget = pickOne(budgetOptions);
    const timeline = pickOne(timelineOptions);
    const skills = pickManyUnique(meta.skills, randomInt(4, 6));

    const roles = pickManyUnique(meta.roles, randomInt(1, Math.min(3, meta.roles.length))).map(
      (title) => ({ title, count: randomInt(1, 3) })
    );

    const description = pickOne(descTemplates)({
      companyName,
      projectTitle,
      workLabel,
      timeline,
    });

    return {
      id: `${workId}-${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
      companyName,
      country,
      projectTitle,
      projectType,
      budget,
      timeline,
      skills,
      roles,
      description,
      teamSize: String(randomInt(1, 25)),
    };
  });
};

export default function BrowseJobsPanel() {
  const defaultWorkId = "fullstack";
  const defaultLabel =
    workOptions.find((o) => o.id === defaultWorkId)?.label ?? "IT";

  const [selectedWorkId, setSelectedWorkId] = useState(defaultWorkId);
  const [jobs, setJobs] = useState(() => buildJobs(defaultWorkId, defaultLabel, 10));

  const selectedWork = useMemo(
    () => workOptions.find((o) => o.id === selectedWorkId) ?? null,
    [selectedWorkId]
  );

  const handlePick = async (workId) => {
    const workLabel = workOptions.find((o) => o.id === workId)?.label ?? "IT";
    setSelectedWorkId(workId);

    // Try fetching real jobs from API
    try {
      const res = await fetch(`/api/jobs?category=${workId}&limit=10`);
      if (res.ok) {
        const data = await res.json();
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs.map((j) => ({ ...j, id: j._id || j.id })));
          return;
        }
      }
    } catch {
      // API not available, use mock data
    }
    setJobs(buildJobs(workId, workLabel, 10));
  };

  return (
    <section className="hirePanel" aria-label="People hiring">
      <div className="hirePanel__inner">
        <div className="hirePanel__header">
          <div>
            <h2 className="hirePanel__title">People hiring right now</h2>
            <p className="hirePanel__subtitle">
              Browse example projects (mock data until backend is connected).
            </p>
          </div>
        </div>

        <div className="hirePanel__options" role="list">
          {workOptions.map((opt) => {
            const active = opt.id === selectedWorkId;
            return (
              <button
                key={opt.id}
                className={`hirePanel__option${active ? " hirePanel__option--active" : ""}`}
                type="button"
                onClick={() => handlePick(opt.id)}
                aria-pressed={active}
              >
                <span className="hirePanel__optionLabel">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {selectedWork ? (
          <div className="hirePanel__results" aria-live="polite">
            <h3 className="hirePanel__resultsTitle">
              Showing {jobs.length} posts for: {selectedWork.label}
            </h3>

            <ul className="jobGrid">
              {jobs.map((job) => (
                <li key={job.id} className="jobCard">
                  <div className="jobCard__top">
                    <div>
                      <div className="jobCard__name">{job.projectTitle}</div>
                      <div className="jobCard__meta">
                        {job.companyName} • {job.country} • {job.projectType}
                      </div>
                    </div>

                    <div className="jobCard__stats">
                      <span className="jobCard__stat">{job.budget}</span>
                      <span className="jobCard__stat">{job.timeline}</span>
                    </div>
                  </div>

                  <p className="jobCard__bio">{job.description}</p>

                  <div className="jobCard__chips" aria-label="Skills">
                    {job.skills.map((skill) => (
                      <span className="chip" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="jobCard__footer">
                    <span>
                      {job.roles.map((r) => `${r.title} x${r.count}`).join(", ")}
                    </span>
                    <span>Team: {job.teamSize}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
