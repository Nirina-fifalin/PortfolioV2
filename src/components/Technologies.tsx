import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { Reveal } from "./Reveal";
import { skillCategories } from "../data/skills";

export function Technologies() {
  const { t } = useLang();

  return (
    <section id="technologies" className="py-24 border-t border-gray-100">
      <Reveal className="text-center mb-16">
        <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">{t("tech_eyebrow")}</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-brand-dark">{t("tech_title")}</h3>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 max-w-5xl mx-auto">
        {skillCategories.map((category, catIndex) => (
          <Reveal key={category.id} delay={catIndex * 0.1} className="space-y-6">
            <h4 className="text-sm font-bold text-gray-400 uppercase border-b border-gray-100 pb-2 mb-6">
              {t(category.titleKey)}
            </h4>

            {category.skills.map((skill) => (
              <div className="group" key={skill.id}>
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="font-semibold text-brand-dark transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.color = skill.hoverColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    {skill.label}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{t(skill.levelKey)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
                  />
                </div>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
