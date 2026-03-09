# Code Quiz

A modern web app that generates **Code Quiz Q&A** for any programming technology. Pick a tech, difficulty level, and count — get a list of questions and answers powered by OpenAI GPT.

![Code Quiz](public/header.jpg)

---

## Features

- **Customizable**: Choose programming technology (e.g. React, TypeScript), difficulty (Beginner / Intermediate / Advanced), and number of questions (1–10).
- **GPT-powered**: Uses OpenAI to generate realistic interview questions and answers.
- **Responsive UI**: Bootstrap 5 + React Bootstrap; works on desktop and mobile.
- **Validation**: Required fields and range checks with inline error messages.
- **Stable UX**: Ignores stale responses when you click "Go" again before the previous request finishes.

---

## Tech Stack

| Area        | Stack                    |
| ----------- | ------------------------ |
| Build       | Vite 7                   |
| UI          | React 19, Bootstrap 5, react-bootstrap |
| Forms       | react-hook-form          |
| API         | OpenAI SDK (Chat Completions) |
| Language    | TypeScript 5.9 (strict)  |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (or 20+ recommended)
- An **OpenAI API key**

### Install

```bash
git clone <repo-url>
cd code-quiz
npm install
```

### Configure

Create a `.env` file in the project root:

```env
VITE_CHATGPT_API_KEY=sk-your-openai-api-key
```

> **Security note:** The app currently calls OpenAI from the browser. The API key is exposed in the client. For production, use a backend proxy so the key stays on the server.

### Run

```bash
npm start
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

Artifacts are in the `dist/` folder.

---

## Project Structure

```
src/
├── Components/
│   ├── LayoutArea/Layout/     # Navbar, header image, main container
│   ├── JobInterview/
│   │   ├── Input/             # Form (technology, level, count)
│   │   ├── Manager/           # Orchestrates request, loading, result
│   │   └── Output/            # Accordion list of Q&A
│   └── SharedArea/Spinner/    # Loading indicator
├── Models/                    # TypeScript interfaces (QnA, Prompt, InputModel)
├── Services/
│   ├── GptService.ts          # OpenAI API wrapper
│   └── PromptService.ts       # Builds prompt, parses GPT response to QnA[]
├── Utils/
│   ├── AppConfig.ts           # Reads env (e.g. API key)
│   └── Helper.ts              # Extract JSON array from response text
├── index.css                  # Global styles and Bootstrap overrides
└── main.tsx                   # Entry point
```

---

## Scripts

| Command       | Description                |
| ------------- | -------------------------- |
| `npm start`   | Start dev server           |
| `npm run dev` | Same as start              |
| `npm run build` | TypeScript + Vite build  |
| `npm run preview` | Serve `dist/` locally   |
| `npm run lint` | Run ESLint               |

---

## License

MIT 
Copyright © 2026 David Veryutin
