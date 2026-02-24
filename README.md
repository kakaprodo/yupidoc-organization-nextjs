# 🎓 Yupidoc Organization

[![Next.js](https://img.shields.io/badge/Next.js-15%2F16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v5-5850ec?style=for-the-badge&logo=daisyui)](https://daisyui.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-latest-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)

**Yupidoc** est une plateforme de gestion d'apprentissage (LMS) de nouvelle génération conçue spécifiquement pour les centres de formation et les organisations éducatives. Alliant performance, design académique et scalabilité, elle permet de diffuser des cours, des modules et des programmes certifiants à une échelle mondiale.

---

## ✨ Fonctionnalités Clés

- 🌍 **Internationalisation (i18n)** : Support complet multi-langues (FR/EN) avec détection automatique et routage optimisé via `next-intl`.
- 🌙 **Thématisation Dynamique** : Mode Clair et Sombre (Dark Mode) natif respectant une charte graphique institutionnelle.
- 🚀 **Performance Extrême** : Propulsé par **Next.js 16 (Turbopack)** pour des temps de chargement ultra-rapides.
- 📱 **Design Responsive & Bento** : Interface moderne basée sur Tailwind v4 et DaisyUI, optimisée pour tous les écrans.
- 🎭 **Animations Premium** : Transitions fluides et effets 3D sur les cartes de cours via **Framer Motion**.

---

## 🛠 Stack Technique

- **Framework** : Next.js 15/16 (App Router)
- **Langage** : TypeScript (Strict Mode)
- **Styles** : Tailwind CSS v4 + DaisyUI v5 (Beta)
- **Gestion d'état** : Redux Toolkit (RTK)
- **Animations** : Framer Motion
- **Internationalisation** : next-intl
- **Icônes** : Lucide React & HeroIcons

---

## 🚀 Installation et Démarrage

### 1. Cloner le projet
```bash
git clone https://github.com/votre-compte/yupidoc-organization-nextjs.git
cd yupidoc-organization-nextjs
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
Accédez à `http://localhost:3000` pour voir l'application.

---

## 4. 📂 Structure du Projet

```text
src/
├── app/                 # Routes Next.js (App Router)
│   ├── [locale]/        # Pages internationales
│   ├── icon.tsx         # Génération dynamique du Favicon
│   └── apple-icon.tsx   # Icône Apple dynamique
├── components/          # Composants réutilisables
│   ├── cards/           # CourseCard, ModuleCard, TeamCard
│   ├── layout/          # Header, Footer, Navigation
│   └── sections/        # Hero, PageHero, Carousel
├── i18n/                # Configuration next-intl (request.ts)
├── messages/            # Fichiers de traduction JSON (FR, EN, etc.)
├── redux/               # Store et Slices (Global State)
├── navigation.ts        # Configuration du routage partagé
└── proxy.ts             # Middleware
```

---

## 🎨 Charte Graphique

- **Primary (Indigo)** : `#5850ec` (Utilisé pour les actions principales et le branding).
- **Surface (Base)** : 
  - Light : `bg-base-100` (Blanc) / `bg-base-200` (Gris très clair).
  - Dark : `bg-base-100` (Bleu nuit profond) / `bg-base-200` (Gris anthracite).
- **Typography** : Police **Inter** pour une lisibilité maximale.

---
**Développé par l'équipe Yupidoc.**