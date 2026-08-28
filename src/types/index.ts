import type { TranslationKey } from "../i18n/translations";

export type Lang = "fr" | "en";

export interface ExpertiseCard {
  id: string;
  icon: "backend" | "data" | "ai" | "gamedev";
  titleKey: TranslationKey;
  descKey: TranslationKey;
  tags?: string[];
}

export interface SkillBar {
  id: string;
  label: string;
  levelKey: TranslationKey;
  percent: number;
  color: string;
  hoverColor: string;
}

export interface SkillCategory {
  id: string;
  titleKey: TranslationKey;
  skills: SkillBar[];
}

export type ProjectStatus = "private" | "public";

export interface Project {
  id: string;
  status: ProjectStatus;
  tags: { label: string; tone: "blue" | "green" | "purple" | "neutral" }[];
  titleKey: TranslationKey;
  descKey: TranslationKey;
  icon: "server" | "globe" | "gamepad";
  link?: string;
  reversed?: boolean;
}
