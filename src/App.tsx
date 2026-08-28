import { About } from "./components/About";
import { Expertise } from "./components/Expertise";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { ScrollProgress } from "./components/ScrollProgress";
import { Technologies } from "./components/Technologies";
import { LangProvider } from "./i18n/LangContext";

function App() {
  return (
    <LangProvider>
      <ScrollProgress />
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <Hero />
        <About />
        <Expertise />
        <Technologies />
        <Projects />
      </main>

      <Footer />
    </LangProvider>
  );
}

export default App;
