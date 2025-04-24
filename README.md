# DustAggregator

A modern, feature-rich React + TypeScript web application template, powered by Vite and TailwindCSS. This project leverages shadcn/ui, Radix UI primitives, and a robust set of developer tools for rapid UI development and scalable codebases.

---

## Features
- **React 18 + TypeScript**: Type-safe, component-driven development.
- **Vite**: Lightning-fast build tool and dev server.
- **TailwindCSS**: Utility-first CSS for rapid prototyping.
- **shadcn/ui**: Beautiful, accessible components.
- **Radix UI**: Low-level UI primitives for building custom components.
- **React Router**: Declarative routing for single-page applications.
- **React Query**: Powerful async state management.
- **Form Handling**: react-hook-form and @hookform/resolvers.
- **Date Utilities**: date-fns for date manipulation.
- **Charts**: recharts for data visualization.
- **Embla Carousel**: Touch-friendly carousels.
- **Lucide Icons**: Modern icon set.
- **Theming**: next-themes for light/dark mode.
- **ESLint & TypeScript**: Strict linting and type checking for code quality.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun (bun.lockb included for Bun users)

### Install Dependencies
```sh
npm install
```
_or, if using Bun:_
```sh
bun install
```

### Run the Development Server
```sh
npm run dev
```

### Build for Production
```sh
npm run build
```

### Preview Production Build
```sh
npm run preview
```

---

## Project Structure
```
DustAggregator/
├── src/                # Main application source code
├── components.json     # Custom component registry
├── index.html          # HTML entry point
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # TailwindCSS config
├── postcss.config.js   # PostCSS config
├── tsconfig*.json      # TypeScript configs
├── package.json        # Project metadata & scripts
├── README.md           # Project documentation
└── ...
```

---

## Scripts
- `dev` – Start the Vite dev server
- `build` – Build the app for production
- `preview` – Preview the production build
- `lint` – Run ESLint

---

## Customization & Extending
- **UI Components**: Use shadcn/ui and Radix primitives for accessible, composable UI.
- **Styling**: TailwindCSS utilities and custom themes via next-themes.
- **Routing**: Add routes in `src` and configure with React Router.
- **APIs & Data**: Use React Query for async data fetching and caching.

---

## License
See [LICENSE](./LICENSE) for details.

---

## Credits
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Recharts](https://recharts.org/)
- [Embla Carousel](https://www.embla-carousel.com/)

---

## Contact
For questions or contributions, please open an issue or submit a pull request.
