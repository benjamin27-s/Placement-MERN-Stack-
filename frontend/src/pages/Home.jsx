import Navbar from "../components/Navbar.jsx";
import LandingSections from "../components/LandingSections.jsx";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <LandingSections />
      </main>
    </div>
  );
}

