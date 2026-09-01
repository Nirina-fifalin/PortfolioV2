import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useContact } from "../context/ContactContext";
import { useLang } from "../i18n/LangContext";

const navLinks: { href: string; key: "nav_about" | "nav_expertise" | "nav_projects" }[] = [
  { href: "#about", key: "nav_about" },
  { href: "#expertise", key: "nav_expertise" },
  { href: "#projects", key: "nav_projects" },
];

export function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const { open: openContact } = useContact();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="glass-nav fixed w-full top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="font-bold text-xl tracking-tight flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white text-sm font-bold">N.</span>
          </div>
          Nirina Fifaliana
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <a key={link.key} href={link.href} className="hover:text-brand-dark transition-colors">
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="text-xs font-bold text-gray-500 hover:text-brand-dark transition-colors tracking-widest"
            aria-label="Toggle language"
          >
            {lang === "fr" ? "FR / EN" : "EN / FR"}
          </button>
          <button
            onClick={openContact}
            className="px-5 py-2.5 bg-brand-dark text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all shadow-float hover:-translate-y-0.5"
          >
            {t("nav_contact")}
          </button>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className="w-6 h-0.5 bg-brand-dark block origin-center"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-brand-dark block"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className="w-6 h-0.5 bg-brand-dark block origin-center"
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-600">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-brand-dark transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}
              <button onClick={toggleLang} className="text-left text-xs font-bold text-gray-500 tracking-widest">
                {lang === "fr" ? "FR / EN" : "EN / FR"}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openContact();
                }}
                className="px-5 py-2.5 bg-brand-dark text-white text-sm font-medium rounded-full text-center"
              >
                {t("nav_contact")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}