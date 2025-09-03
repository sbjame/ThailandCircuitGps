[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

# Thailand Circuit Map

[Demo](https://thailand-circuit-gps.vercel.app)

## Screenshot
![Screenshot](./public/images/demo-screenshot.png)

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)

## About
An interactive **map application for racing circuits in Thailand**, built with **Next.js + React**.  
It allows users to explore race tracks, view details, and check additional information such as weather.

## Features
- Interactive map of racing circuits in Thailand  
- Display track location and details  
- Search and select tracks easily  
- Weather data integration (via API)  
- Responsive UI for both Desktop and Mobile  


## Tech Stack
- [Next.js](https://nextjs.org/) – React framework  
- [React](https://react.dev/) – Frontend library  
- [Tailwind CSS](https://tailwindcss.com/) – CSS framework  
- [Axios](https://axios-http.com/) – HTTP client  
- [SWR](https://swr.vercel.app/) – React data fetching  
- [Headless UI](https://headlessui.dev/) – UI components  
- [React Icons](https://react-icons.github.io/react-icons/) – Icon set  

## Getting Started
### Prerequisites
- Node.js (v24 or newer)
- npm or yarn

### Installation

```bash
# Clone the project:
git clone https://github.com/your-username/thailandcircuitmap.git
cd thailandcircuitmap
```

### Environment Variables
```bash
# API
BASE_URL=your_api_url_from_other_project
```
BASE_API setup
The value of BASE_URL comes from another project. 👉 [API](https://github.com/sbjame/ThailandCircuitGpsApi/tree/main)

Clone and run the other project.

Find the API base URL (usually something like http://localhost:5000/api).

Copy that URL and paste it into BASE_URL in this project’s .env

### Running Locally
```bash
# Development
npm run dev
Then open http://localhost:3000 in your browser.
```

## Project Structure
```text
 ├── public/              # Static assets (images, icons)
 ├── src/                 # Main application source
 │   ├── components/      # UI components
 │   ├── pages/           # Next.js pages and routes
 │   ├── styles/          # CSS / Tailwind styles
 │   └── utils/           # Helper functions
 ├── package.json         # Dependencies & scripts
 ├── next.config.ts       # Next.js configuration
 ├── postcss.config.mjs   # PostCSS configuration
 └── tsconfig.json        # TypeScript configuration
```
