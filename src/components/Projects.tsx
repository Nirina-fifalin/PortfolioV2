import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { Reveal } from "./Reveal";
import { projects } from "../data/projects";
import { ExternalArrowIcon, GamepadIcon, GlobeIcon, LockIcon, ServerIcon } from "./icons";
import type { TranslationKey } from "../i18n/translations";

const iconMap = { server: ServerIcon, globe: GlobeIcon, gamepad: GamepadIcon };

const toneClasses: Record<string, string> = {
  blue: "bg-accent-blue/10 text-accent-blue",
  green: "bg-accent-green/10 text-accent-green",
  purple: "bg-purple-100 text-purple-700",
  neutral: "bg-gray-100 text-gray-700",
};

const ctaKeyByProject: Record<string, TranslationKey> = {
  ocean: "proj_ocean_cta",
  dtb: "proj_dtb_cta",
};

export function Projects() {
  const { t } = useLang();

  return (
    <section id="projects" className="py-24 border-t border-gray-100">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">{t("projects_title")}</h2>
      </Reveal>

      <div className="space-y-12">
        {projects.map((project) => {
          const Icon = iconMap[project.icon];
          return (
            <Reveal
              key={project.id}
              className={`bg-white rounded-[2rem] border border-gray-100 p-6 md:p-10 shadow-soft flex flex-col gap-10 items-center group hover:shadow-float transition-shadow ${
                project.reversed ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl aspect-video border border-gray-100 flex items-center justify-center overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-50 opacity-50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                <Icon className="w-16 h-16 text-gray-300 relative z-10" />
              </div>

              <div className="w-full md:w-1/2">
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag.label} className={`px-3 py-1 text-xs font-bold rounded-full ${toneClasses[tag.tone]}`}>
                      {tag.label}
                    </span>
                  ))}
                  {project.status === "private" && (
                    <span className="text-xs font-mono text-gray-400 border border-gray-200 px-2 py-1 rounded">
                      Dépôt Privé
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-brand-dark mb-4">{t(project.titleKey)}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{t(project.descKey)}</p>

                {project.status === "private" ? (
                  <span className="inline-flex items-center gap-2 text-gray-400 font-semibold cursor-not-allowed">
                    <LockIcon />
                    {t("proj_robia_private")}
                  </span>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-brand-dark font-semibold hover:text-accent-blue transition-colors"
                  >
                    {t(ctaKeyByProject[project.id])}
                    <ExternalArrowIcon />
                  </a>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
