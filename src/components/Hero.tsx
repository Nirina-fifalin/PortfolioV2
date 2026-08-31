import { motion, type Variants } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { GitHubIcon } from "./icons";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

export function Hero() {
  const { t } = useLang();

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-[70vh] flex flex-col justify-center items-start md:items-center md:text-center relative"
    >
      <motion.h1
        variants={item}
        className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-brand-dark mb-6 leading-tight"
      >
        {t("hero_title_1")}
        <br />
        <span className="text-gradient">{t("hero_title_2")}</span>
      </motion.h1>

      <motion.p variants={item} className="text-lg md:text-xl text-gray-500 max-w-2xl font-medium mb-10">
        {t("hero_desc")}
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="px-8 py-4 bg-brand-dark text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-float hover:-translate-y-1"
        >
          {t("hero_cta_projects")}
        </a>
        <a
          href="https://github.com/Nirina-fifalin"
          target="_blank"
          rel="noreferrer"
          className="px-8 py-4 bg-white text-brand-dark border border-gray-200 rounded-full font-medium hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <GitHubIcon />
          {t("hero_cta_github")}
        </a>
      </motion.div>
    </motion.section>
  );
}