import { useLang } from "../i18n/LangContext";
import { Reveal } from "./Reveal";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <Reveal as="section" className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">{t("footer_title")}</h2>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">{t("footer_desc")}</p>

        <a
          href="mailto:nirin.fifalin@gmail.com"
          className="inline-block px-10 py-5 bg-brand-dark text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-float hover:-translate-y-1 text-lg mb-16"
        >
          nirin.fifalin@gmail.com
        </a>

        <div className="flex justify-center items-center gap-8 border-t border-gray-100 pt-10">
          <a
            href="https://github.com/Nirina-fifalin"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-brand-dark transition-colors font-medium"
          >
            GitHub
          </a>
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          <a href="#" className="text-gray-400 hover:text-brand-dark transition-colors font-medium">
            LinkedIn
          </a>
        </div>

        <p className="text-gray-400 text-sm mt-8">{t("footer_credit")}</p>
      </Reveal>
    </footer>
  );
}
