# HeroSearcher 🦸‍♂️

[![License: ISC](https://img.shields.io/badge/License-ISC_2026-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000.svg?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748.svg?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57.svg?logo=sqlite&logoColor=white)](https://www.sqlite.org/)

> **HeroSearcher** is a full‑stack superhero and villain search engine with authentication, favorites management, and a modern monorepo architecture using React, Express, Prisma, and SQLite.

_Live demo: Coming soon._

---

## 📘 Project Description

**HeroSearcher** showcases professional full‑stack patterns through a search experience for comic characters.  
Users authenticate, explore heroes and villains via the Superhero API, and persist their favorite characters and power stats in a relational SQLite database behind a secure Express API.

---

## ✨ Key Features

- **Hero Search Engine**: Search an extensive catalog of superheroes and villains using the public Superhero API.
- **Random Hero Carousel**: Browse a rotating carousel of random characters directly from the home screen.
- **Favorites Management**: Add heroes to a personal favorites list backed by a relational database.
- **Authentication Flow**: Auth integration (via Firebase-style `auth` module) with protected and public routes.
- **Character Power Stats**: Store and display detailed power statistics (intelligence, strength, speed, durability, power, combat).
- **Responsive UI**: Optimized for desktop and mobile viewing.
- **Monorepo Setup**: Unified root scripts orchestrate both API and React client.

---

## 🛠️ Tech Stack

- **Frontend**
  - **React 18.3.1** with functional components and hooks
  - **React Router 6** for client-side routing
  - **CSS3** with custom stylesheets
  - **Superhero API** as the external data source

- **Backend**
  - **Node.js 18+**
  - **Express 4.18**
  - **Helmet** for HTTP header hardening
  - **CORS** for cross-origin configuration

- **Database**
  - **SQLite 3** as the relational data store
  - **Prisma ORM 5.22** with migrations and a type-safe client
  - Schema:
    - `User` with `favorites` relation
    - `Favorite` with hero name, image, and power stats

- **Developer Tooling**
  - **Concurrently** for running API and client together
  - **Nodemon** for auto-reloading the API
  - **dotenv** for environment variable management

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** 18+  
- **npm** 9+  

### 💾 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/enekomb/HeroSearcher.git
   cd HeroSearcher
   ```

2. **Install all dependencies (root, API, client)**

   ```bash
   npm run install-all
   ```

3. **Configure environment variables**

   Create a root `.env` file from the example and add your Superhero API configuration:

   ```bash
   cp .env.example .env
   ```

   Minimal required variables:

   ```env
   REACT_APP_SUPERHERO_API_KEY=your_api_key_here
   REACT_APP_API_URL=http://localhost:3001
   ```

4. **Initialize the database**

   ```bash
   cd api
   npx prisma migrate dev
   cd ..
   ```

5. **Start the development environment**

   ```bash
   npm run dev
   ```

   This runs:
   - API on `http://localhost:3001`
   - React client on `http://localhost:3000`

6. **Open the application**

   Navigate to `http://localhost:3000` and sign in to start searching and saving heroes.

---

## 🧩 Monorepo Scripts

Root `package.json`:

| **Command**         | **Description**                                      |
|---------------------|------------------------------------------------------|
| `npm run install-all` | Install dependencies for root, `api`, and `client` |
| `npm run dev`       | Run API (`dev:api`) and client (`dev:client`) in parallel |
| `npm run dev:api`   | Start the Express API in watch mode                  |
| `npm run dev:client`| Start the React development server                   |
| `npm run build`     | Build the React client for production                |
| `npm test`          | Run client tests                                     |

**API scripts** (`api/package.json`)

```bash
cd api
npm run dev        # Start API with nodemon
npm run start      # Start API without nodemon
npm run seed       # Seed initial data if applicable
npm run db:generate
npm run db:migrate
npm run db:push
```

**Client scripts** (`client/package.json`)

```bash
cd client
npm start          # Start React dev server
npm run build      # Build for production
npm test           # Run React tests
```

---

## 🔭 Future Enhancements

- **Advanced search filters** (alignment, publisher, power thresholds).
- **Hero comparison view** for side‑by‑side stat comparisons.
- **Team builder** for assembling and persisting custom hero teams.
- **PWA support** for offline usage and installable experience.
- **Production OAuth flows** (Google/GitHub) with JWT-based sessions.
- **Dockerized development and CI/CD pipeline** for automated builds and tests.

---

## 📝 License

This project is licensed under the **ISC License (2026)**.  
See the `LICENSE` file in this repository for full details.

---

## 🌐 Other Projects & Portfolio

- **CoWorkoholics** – Full‑stack coworking space management platform with real-time room booking and calendar views:  
  `https://github.com/enekomb/CoWorkoholics`
- **ComicSants** – Internal POS and inventory management system for hobby stores:  
  `https://github.com/enekomb/ComicSants`
- **ComoSapiens** – Burger order management system with custom builder and real-time pricing:  
  `https://github.com/enekomb/ComoSapiens`
- **GitHub Portfolio** – Explore more projects and product case studies:  
  `https://github.com/enekomb`

---

**Made with ❤️ as part of the HeroSearcher product suite.**

