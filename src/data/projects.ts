import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "robia",
    status: "private",
    icon: "server",
    titleKey: "proj_robia_title",
    descKey: "proj_robia_desc",
    tags: [
      { label: "Python", tone: "neutral" },
      { label: "Backend Architecture", tone: "blue" },
    ],
  },
  {
    id: "ocean",
    status: "public",
    icon: "globe",
    titleKey: "proj_ocean_title",
    descKey: "proj_ocean_desc",
    link: "https://github.com/Nirina-fifalin/ocean-data-story",
    reversed: true,
    tags: [
      { label: "Dataviz", tone: "green" },
      { label: "NetCDF 3D", tone: "neutral" },
      { label: "HTML/JS", tone: "neutral" },
    ],
  },
  {
    id: "dtb",
    status: "public",
    icon: "gamepad",
    titleKey: "proj_dtb_title",
    descKey: "proj_dtb_desc",
    link: "https://github.com/Nirina-fifalin/DTB-Prototype-2",
    tags: [
      { label: "C#", tone: "neutral" },
      { label: "ShaderLab", tone: "neutral" },
      { label: "Game Jam+", tone: "purple" },
    ],
  },
];
