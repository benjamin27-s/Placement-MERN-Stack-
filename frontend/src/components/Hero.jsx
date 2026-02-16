const heroBgMatches = import.meta.glob("../assets/Images/hero-bg.png", {
  eager: true,
  query: "?url",
});

const heroBgModule = Object.values(heroBgMatches)[0];
const heroBgUrl =
  typeof heroBgModule === "string" ? heroBgModule : heroBgModule?.default;

export default function Hero() {
  return (
    <section
      className="hero"
      style={heroBgUrl ? { backgroundImage: `url(${heroBgUrl})` } : undefined}
    >
      <div className="hero__inner">
        <h1 className="hero__title">
          Look to Hire or Offer Pro Services
          <br />
          SignUp Now!
        </h1>
      </div>
    </section>
  );
}

