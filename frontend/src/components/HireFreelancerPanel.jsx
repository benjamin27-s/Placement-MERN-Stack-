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

const profilesByWorkId = {
  frontend: {
    titles: ["React Frontend Developer", "UI Engineer", "Frontend Developer"],
    skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Redux", "Vite"],
    rate: [28, 85],
  },
  backend: {
    titles: ["Backend Developer", "API Engineer", "Node.js Developer"],
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs", "JWT", "Redis", "Docker"],
    rate: [30, 95],
  },
  fullstack: {
    titles: ["Full-Stack Developer", "Software Engineer", "Web App Developer"],
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "CI/CD", "Docker", "Testing"],
    rate: [35, 110],
  },
  mobile: {
    titles: ["Mobile Developer", "React Native Developer", "iOS/Android Engineer"],
    skills: ["React Native", "Flutter", "iOS", "Android", "APIs", "Firebase", "Testing"],
    rate: [30, 100],
  },
  uiux: {
    titles: ["UI/UX Designer", "Product Designer", "UX Researcher"],
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems", "UX Writing", "Accessibility"],
    rate: [25, 90],
  },
  devops: {
    titles: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"],
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
    rate: [40, 130],
  },
  data: {
    titles: ["Data Engineer", "ETL Developer", "Analytics Engineer"],
    skills: ["SQL", "Python", "Airflow", "dbt", "BigQuery", "Spark", "Data Warehousing"],
    rate: [35, 120],
  },
  aiml: {
    titles: ["ML Engineer", "AI Engineer", "Data Scientist"],
    skills: ["Python", "PyTorch", "TensorFlow", "NLP", "MLOps", "Model Serving", "Pandas"],
    rate: [45, 150],
  },
  security: {
    titles: ["Security Engineer", "Penetration Tester", "Security Analyst"],
    skills: ["Threat Modeling", "OWASP", "AppSec", "Network Security", "SIEM", "Incident Response"],
    rate: [45, 160],
  },
  qa: {
    titles: ["QA Automation Engineer", "SDET", "Test Engineer"],
    skills: ["Playwright", "Cypress", "Selenium", "API Testing", "Jest", "CI", "Bug Reporting"],
    rate: [25, 90],
  },
};

const firstNames = [
  "Ava",
  "Liam",
  "Noah",
  "Mia",
  "Ethan",
  "Sophia",
  "Aisha",
  "Arjun",
  "Mateo",
  "Zara",
  "Daniel",
  "Hana",
  "Omar",
  "Sofia",
  "Amir",
  "Lea",
  "Grace",
  "Leo",
  "Fatima",
  "Kai",
];

const lastNames = [
  "Smith",
  "Khan",
  "Patel",
  "Garcia",
  "Nguyen",
  "Brown",
  "Hernandez",
  "Silva",
  "Kim",
  "Singh",
  "Ali",
  "Martin",
  "Lopez",
  "Wilson",
  "Davis",
  "Taylor",
  "Anderson",
  "Lee",
  "Clark",
  "Walker",
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
  "Argentina",
  "Australia",
  "New Zealand",
  "Philippines",
  "Vietnam",
  "Japan",
];

const availabilityOptions = [
  "Available now",
  "Available in 48 hours",
  "Available next week",
  "Part-time (20 hrs/week)",
  "Full-time (40 hrs/week)",
];

const bioTemplates = [
  ({ title, years, workLabel }) =>
    `${title} with ${years}+ years of experience delivering ${workLabel.toLowerCase()} projects on time and on budget.`,
  ({ title, years, workLabel }) =>
    `${title} (${years}+ yrs). Strong communicator with a focus on clean, maintainable solutions for ${workLabel.toLowerCase()}.`,
  ({ title, years, workLabel }) =>
    `${title} with ${years}+ years. I can help you plan, build, and ship high-quality ${workLabel.toLowerCase()} work fast.`,
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

const buildFreelancers = (workId, workLabel, count = 10) => {
  const profile = profilesByWorkId[workId] ?? profilesByWorkId.fullstack;
  const usedNames = new Set();

  return Array.from({ length: count }, (_, index) => {
    let name = "";
    for (let tries = 0; tries < 25; tries += 1) {
      const candidate = `${pickOne(firstNames)} ${pickOne(lastNames)}`;
      if (!usedNames.has(candidate)) {
        name = candidate;
        usedNames.add(candidate);
        break;
      }
    }
    if (!name) name = `${pickOne(firstNames)} ${pickOne(lastNames)}`;

    const title = pickOne(profile.titles);
    const years = randomInt(2, 12);
    const rate = randomInt(profile.rate[0], profile.rate[1]);
    const rating = Number((4.2 + Math.random() * 0.8).toFixed(1));
    const projects = randomInt(12, 140);
    const skills = pickManyUnique(profile.skills, randomInt(4, 6));
    const country = pickOne(countries);
    const availability = pickOne(availabilityOptions);
    const bio = pickOne(bioTemplates)({ title, years, workLabel });

    return {
      id: `${workId}-${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`,
      name,
      country,
      title,
      years,
      rate,
      rating,
      projects,
      availability,
      skills,
      bio,
    };
  });
};

const resolveInitialWorkId = (candidate) => {
  if (!candidate) return null;
  if (workOptions.some((o) => o.id === candidate)) return candidate;
  return workOptions[0]?.id ?? null;
};

export default function HireFreelancerPanel({ onClose, initialWorkId }) {
  const [selectedWorkId, setSelectedWorkId] = useState(() =>
    resolveInitialWorkId(initialWorkId)
  );
  const [freelancers, setFreelancers] = useState(() => {
    const workId = resolveInitialWorkId(initialWorkId);
    if (!workId) return [];
    const workLabel = workOptions.find((o) => o.id === workId)?.label ?? "IT";
    return buildFreelancers(workId, workLabel, 10);
  });

  const selectedWork = useMemo(
    () => workOptions.find((o) => o.id === selectedWorkId) ?? null,
    [selectedWorkId]
  );

  const handlePick = (workId) => {
    const workLabel = workOptions.find((o) => o.id === workId)?.label ?? "IT";
    setSelectedWorkId(workId);
    setFreelancers(buildFreelancers(workId, workLabel, 10));
  };

  return (
    <section className="hirePanel" aria-label="Hire a freelancer">
      <div className="hirePanel__inner">
        <div className="hirePanel__header">
          <div>
            <h2 className="hirePanel__title">What sort of work are you looking for?</h2>
            <p className="hirePanel__subtitle">
              Choose a category to see 10 example freelancer profiles.
            </p>
          </div>

          {onClose ? (
            <button className="hirePanel__close" type="button" onClick={onClose}>
              Close
            </button>
          ) : null}
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
              Showing {freelancers.length} profiles for: {selectedWork.label}
            </h3>

            <ul className="freelancerGrid">
              {freelancers.map((p) => (
                <li key={p.id} className="freelancerCard">
                  <div className="freelancerCard__top">
                    <div>
                      <div className="freelancerCard__name">{p.name}</div>
                      <div className="freelancerCard__meta">
                        {p.title} • {p.country}
                      </div>
                    </div>

                    <div className="freelancerCard__stats">
                      <span className="freelancerCard__stat">⭐ {p.rating}</span>
                      <span className="freelancerCard__stat">${p.rate}/hr</span>
                    </div>
                  </div>

                  <p className="freelancerCard__bio">{p.bio}</p>

                  <div className="freelancerCard__chips" aria-label="Skills">
                    {p.skills.map((skill) => (
                      <span className="chip" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="freelancerCard__footer">
                    <span>
                      {p.years}+ yrs • {p.projects} projects
                    </span>
                    <span>{p.availability}</span>
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
