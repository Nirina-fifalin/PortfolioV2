# Nirina Fifaliana — Portfolio

Portfolio personnel, migré de HTML/Tailwind CDN vers **React + TypeScript + Vite**, avec des animations dynamiques via **Framer Motion**.

## Stack

- [Vite](https://vite.dev/) + React 19 + TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com/) (plugin Vite natif, pas de config PostCSS séparée)
- [Framer Motion](https://motion.dev/) pour les animations (reveal au scroll, stagger du hero, barres de compétences animées, barre de progression de scroll, menu mobile)
- i18n FR/EN maison, typé via `TranslationKey`

## Structure

```
src/
  components/     # Navbar, Hero, About, Expertise, Technologies, Projects, Footer, Reveal, icons
  data/           # projects.ts, skills.ts (données typées)
  i18n/           # translations.ts + LangContext.tsx (contexte FR/EN)
  types/          # types partagés (Project, SkillBar, ExpertiseCard...)
```

## Démarrer en local

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build   # tsc -b && vite build -> dossier dist/
npm run preview # sert le build localement
```

## Personnaliser le contenu

- Textes FR/EN : `src/i18n/translations.ts`
- Projets : `src/data/projects.ts`
- Compétences / barres de progression : `src/data/skills.ts`
- Lien LinkedIn : `src/components/Footer.tsx`

## Déploiement

Le build (`dist/`) est un site statique — déployable directement sur **GitHub Pages**, **Vercel** ou **Netlify**.

### Pousser sur GitHub

```bash
git init
git add .
git commit -m "Initial commit: portfolio React/TS"
git branch -M main
git remote add origin https://github.com/Nirina-fifalin/<nom-du-repo>.git
git push -u origin main
```