import type { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    titleKey: "tech_cat_languages",
    skills: [
      { id: "java", label: "Java", levelKey: "level_expert", percent: 95, color: "#e76f00", hoverColor: "#e76f00" },
      { id: "typescript", label: "TypeScript", levelKey: "level_advanced", percent: 90, color: "#2563eb", hoverColor: "#2563eb" },
      { id: "python", label: "Python", levelKey: "level_advanced", percent: 85, color: "#0a0a0a", hoverColor: "#3776ab" },
    ],
  },
  {
    id: "backend",
    titleKey: "tech_cat_backend",
    skills: [
      { id: "nestjs", label: "NestJS", levelKey: "level_advanced", percent: 85, color: "#ea2845", hoverColor: "#ea2845" },
      { id: "fastapi", label: "FastAPI", levelKey: "level_intermediate", percent: 75, color: "#10b981", hoverColor: "#10b981" },
      { id: "sql", label: "SQL / Data Struct.", levelKey: "level_advanced", percent: 80, color: "#0a0a0a", hoverColor: "#2563eb" },
    ],
  },
  {
    id: "gamedev",
    titleKey: "tech_cat_gamedev",
    skills: [
      { id: "csharp", label: "C# (Unity)", levelKey: "level_intermediate", percent: 65, color: "#9b4f96", hoverColor: "#9b4f96" },
      { id: "cpp", label: "C++", levelKey: "level_intermediate", percent: 60, color: "#00599c", hoverColor: "#00599c" },
      { id: "shaderlab", label: "ShaderLab / Phys.", levelKey: "level_progress", percent: 40, color: "#d1d5db", hoverColor: "#10b981" },
    ],
  },
];
