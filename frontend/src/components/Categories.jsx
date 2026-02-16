const categories = [
  "Graphics & Design",
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Business",
  "Finance",
  "AI Services",
  "Personal Growth",
  "Consulting",
  "Data",
  "Photography",
];

export default function Categories() {
  return (
    <section className="categories" aria-label="Categories">
      <div className="categories__inner">
        <ul className="categories__list">
          {categories.map((label) => (
            <li key={label} className="categories__item">
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

