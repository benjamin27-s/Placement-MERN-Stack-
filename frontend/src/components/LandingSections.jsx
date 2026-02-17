import Hero from "./Hero.jsx";
import Categories from "./Categories.jsx";
import LogoLoop from "./LogoLoop.jsx";
import Footer from "./Footer.jsx";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    desc: "Sign up for free and set up your profile as a freelancer or a hirer in minutes.",
  },
  {
    number: "02",
    title: "Post or browse",
    desc: "Post a project brief as a hirer, or browse available jobs as a freelancer.",
  },
  {
    number: "03",
    title: "Connect & collaborate",
    desc: "Get matched with top talent or exciting projects and start working together.",
  },
];

const testimonials = [
  {
    name: "Ava Chen",
    role: "Full-Stack Developer",
    text: "ProConnect helped me land three great projects within my first week. The UI is clean and the matching is spot-on!",
  },
  {
    name: "Liam Patel",
    role: "Startup Founder",
    text: "We found an amazing React developer through ProConnect in just two days. Highly recommend for any hiring team.",
  },
  {
    name: "Sofia Martinez",
    role: "UI/UX Designer",
    text: "The platform is beautifully designed and makes it so easy to showcase your skills. I've been consistently booked since joining.",
  },
];

export default function LandingSections() {
  return (
    <>
      <Hero />
      <Categories />

      <section className="logoStrip" aria-label="Technology partners">
        <div className="logoStrip__frame">
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={60}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="howItWorks" aria-label="How it works">
        <div className="howItWorks__inner">
          <h2 className="howItWorks__title">How it works</h2>
          <div className="howItWorks__grid">
            {steps.map((step) => (
              <div key={step.number} className="howItWorks__step">
                <span className="howItWorks__number">{step.number}</span>
                <h3 className="howItWorks__stepTitle">{step.title}</h3>
                <p className="howItWorks__stepDesc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" aria-label="Testimonials">
        <div className="testimonials__inner">
          <h2 className="testimonials__title">What people say</h2>
          <div className="testimonials__grid">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="testimonials__card">
                <p className="testimonials__text">"{t.text}"</p>
                <footer className="testimonials__author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
