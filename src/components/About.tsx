import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { Reveal } from "./Reveal";
import { ArrowRightIcon } from "./icons";

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="py-24 border-t border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Reveal className="lg:col-span-2 bg-white rounded-3xl p-10 shadow-soft border border-gray-100">
          <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">{t("about_eyebrow")}</h2>
          <h3 className="text-3xl font-bold text-brand-dark mb-6 leading-snug">{t("about_title")}</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {t("about_p1_pre")}
            <strong className="text-brand-dark">{t("about_p1_strong")}</strong>
            {t("about_p1_post")}
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">{t("about_p2")}</p>
        </Reveal>

        <Reveal delay={0.1} className="bg-brand-dark rounded-3xl p-10 text-white flex flex-col justify-between shadow-float">
          <div>
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6"
            >
              <ArrowRightIcon className="text-white" />
            </motion.div>
            <h4 className="text-xl font-bold mb-2">{t("about_approach_title")}</h4>
            <p className="text-gray-400">{t("about_approach_desc")}</p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 font-mono text-sm">
            <span className="block text-accent-green mb-1">{"> process.run()"}</span>
            <span className="block">Build.</span>
            <span className="block">Experiment.</span>
            <span className="block">Learn.</span>
            <span className="block">Repeat.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
