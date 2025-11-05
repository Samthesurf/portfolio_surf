# Portfolio Surf Project Analysis

## Project Overview
This is a **Next.js portfolio website** built with the latest React 19 and Next.js 16 stack. The project uses the App Router architecture and is designed to be a professional portfolio showcasing web development work.

## Project Type & Tech Stack

### Core Technologies
- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript 5.x
- **Frontend**: React 19.2.0
- **Styling**: Tailwind CSS 4.x
- **Typography**: Geist & Geist Mono fonts from Google Fonts
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint with Next.js configuration

### Configuration Files
- **Next.js**: `next.config.ts` - Basic Next.js configuration (currently minimal)
- **TypeScript**: `tsconfig.json` - Strict TypeScript configuration with path aliases
- **ESLint**: `eslint.config.mjs` - Next.js ESLint configuration with core web vitals and TypeScript rules
- **PostCSS**: `postcss.config.mjs` - Tailwind CSS PostCSS configuration
- **Tailwind**: `app/globals.css` - Tailwind CSS configuration with custom theme variables

## Project Structure

```
portfolio_surf/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout with font loading and metadata
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles and Tailwind configuration
├── public/                # Static assets
│   ├── next.svg          # Next.js logo
│   ├── vercel.svg         # Vercel logo
│   ├── globe.svg          # Globe icon
│   ├── file.svg           # File icon
│   └── window.svg         # Window icon
├── node_modules/          # Dependencies
├── .git/                 # Git repository
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies and scripts
├── CLAUDE.md             # This documentation file
├── next-env.d.ts        # Next.js environment types
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Next.js README
```

## Key Directories and Their Purposes

### `/app/` - Application Directory
- **`layout.tsx`**: Root layout component that handles:
  - Font loading (Geist and Geist Mono)
  - HTML structure with dark/light mode support
  - Global metadata and title management
  - Root provider structure

- **`page.tsx`**: Home page component featuring:
  - Responsive layout with Tailwind CSS
  - Dark/light theme support
  - Next.js Image optimization
  - Professional portfolio layout placeholders
  - Links to deployment and documentation

- **`globals.css`**: Global styles including:
  - Tailwind CSS imports
  - CSS custom properties for theming
  - Dark mode media query handling
  - Font family variables

### `/public/` - Static Assets
Contains SVG icons and static assets for the portfolio, including logos and icons for deployment and documentation links.

## Available NPM Scripts

From `package.json`, the following scripts are available:

### Development Scripts
- `npm run dev` - Start the development server on `http://localhost:3000`
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

### Alternative Package Managers
The project supports:
- `yarn dev`
- `pnpm dev` 
- `bun dev`

## Architecture Patterns

### 1. **Next.js App Router**
- Uses the latest Next.js 16 App Router architecture
- Server-side rendering capabilities
- File-based routing system

### 2. **Component-Based Architecture**
- React functional components with TypeScript
- Props interface definitions
- Responsive design patterns

### 3. **Styling Approach**
- Tailwind CSS utility-first styling
- CSS custom properties for theming
- Dark mode support via media queries

### 4. **TypeScript Configuration**
- Strict mode enabled
- Path aliases for imports (`@/*`)
- Modern ES target (ES2017)
- JSX React transformation

### 5. **Image Optimization**
- Next.js Image component for optimized images
- Lazy loading and responsive sizing
- WebP format support

## Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled, no `any` types allowed
- **ESLint**: Next.js recommended rules with core web vitals
- **Naming**: PascalCase for components, camelCase for variables
- **File Structure**: Follow Next.js App Router conventions

### Best Practices
- Use TypeScript interfaces for component props
- Leverage Tailwind CSS utility classes for styling
- Implement responsive design with mobile-first approach
- Use Next.js Image component for all images
- Follow semantic HTML5 structure

### Dark Mode Support
The project includes automatic dark mode support based on system preferences:
- Uses CSS custom properties for theming
- Media queries for `prefers-color-scheme: dark`
- Smooth transitions between themes

### Performance Considerations
- Next.js automatic code splitting
- Image optimization with WebP support
- Font optimization with Geist fonts
- Core Web Vitals monitoring via ESLint

## Current State
This is a fresh Next.js project with minimal customization. The default template provides a solid foundation that can be extended with:
- Custom portfolio components
- Additional pages and routing
- Project showcases and case studies
- Contact forms and interactive elements
- Blog functionality
- SEO optimization

## Deployment Ready
The project is configured for easy deployment on:
- **Vercel** (recommended with Next.js)
- Netlify
- Any static hosting platform

## Dependencies
- **Production**: React, React DOM, Next.js
- **Development**: TypeScript, ESLint, Tailwind CSS, PostCSS
- **Type Definitions**: Node, React, React DOM

## Notes for Development
1. The project uses modern React patterns with hooks
2. TypeScript is configured for strict type checking
3. Tailwind CSS v4 provides the latest styling capabilities
4. Next.js 16 includes the latest React Server Components
5. Geist fonts provide modern, professional typography

This codebase represents a modern, production-ready portfolio website foundation with excellent developer experience and performance characteristics.
