# Student Notes CRUD Micro-App

A full-stack MERN application for creating, viewing, and deleting student notes. The React interface updates immediately after every create or delete operation without a page refresh.

## Candidate details

- **Name:** Amit Kumar Singh
- **Student ID:** 2026201021
- **GitHub repository:** https://github.com/aksinghanp/2026201021_MERN_Lab

## Features

- Create notes with a required title and content
- View notes in reverse chronological order
- Delete notes with immediate client-side state synchronization
- Loading, empty, validation, and server-error states
- Responsive interface for desktop and mobile screens
- REST API backed by MongoDB and Mongoose

## Project structure

```text
.
├── client/          React + Vite user interface
├── server/          Express + Mongoose REST API
├── screenshots/     Submission screenshots
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB running locally on its default port (`27017`)

## Setup and run

Open a terminal in the project root and install the server dependencies:

```bash
cd server
npm install
npm start
```

The API will be available at `http://localhost:5000` and connects to `mongodb://localhost:27017/notes_db`.

Open a second terminal in the project root and start the client:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in a browser.

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/notes` | Create a note |
| `GET` | `/api/notes` | Get all notes, newest first |
| `DELETE` | `/api/notes/:id` | Delete a note by MongoDB ID |

Example create request:

```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"React Hooks","content":"Revise useState and useEffect."}'
```

## Screenshot checklist

After adding at least two notes, save the browser view as `screenshots/ui-preview.png`. Then open the browser DevTools Network tab, delete a note, select the successful `DELETE` request showing status `200 OK`, and save that view as `screenshots/delete-action.png`.

## Submission

Stop both development servers and remove any generated `node_modules` or `dist` directories before creating the archive if your zip tool does not exclude them automatically. Name the final archive:

```text
2026201021_MERN_Lab.zip
```
