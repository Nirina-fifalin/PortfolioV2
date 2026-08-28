import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { Reveal } from "./Reveal";
import { AiIcon, BackendIcon, DataIcon, GamepadIcon } from "./icons";
import type { ExpertiseCard } from "../types";

const cards: ExpertiseCard[] = [
  { id: "backend", icon: "backend", titleKey: "exp_backend_title", descKey: "exp_backend_desc", tags: ["NestJS", "FastAPI", "Java"] },
  { id: "data", icon: "data", titleKey: "exp_data_title", descKey: "exp_data_desc", tags: ["SQL/NoSQL", "Data Warehouse"] },
  { id: "ai", icon: "ai", titleKey: "exp_ai_title", descKey: "exp_ai_desc" },
  { id: "gamedev", icon: "gamedev", titleKey: "exp_gamedev_title", descKey: "exp_gamedev_desc" },
];

const iconMap = { backend: BackendIcon, data: DataIcon, ai: AiIcon, gamedev: GamepadIcon };

export function Expertise() {
  const { t } = useLang();

  return (
    <section id="expertise" className="py-24">
      <Reveal as="section">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-12 text-center">{t("expertise_title")}</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => {
          const Icon = iconMap[card.icon];
          return (
            <Reveal key={card.id} delay={(i % 2) * 0.1} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-float transition-shadow group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100"
              >
                <Icon />
              </motion.div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">{t(card.titleKey)}</h3>
              <p className={card.tags ? "text-gray-500 mb-6" : "text-gray-500"}>{t(card.descKey)}</p>
              {card.tags && (
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-mono rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
