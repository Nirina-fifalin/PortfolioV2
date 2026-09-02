import { About } from "./components/About";
import { ContactModal } from "./components/ContactModal";
import { Expertise } from "./components/Expertise";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { ScrollProgress } from "./components/ScrollProgress";
import { Technologies } from "./components/Technologies";
import { Aquarium } from "./components/aquarium/Aquarium";
import { ContactProvider } from "./context/ContactContext";
import { LangProvider } from "./i18n/LangContext";

function App() {
  return (
    <LangProvider>
      <ContactProvider>
        <Aquarium />

        <div className="relative z-10">
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
        </div>

        <ContactModal />
      </ContactProvider>
    </LangProvider>
  );
}

export default App;