# CampusNotes

CampusNotes is a full-stack notes sharing platform for students. It lets users discover study material, upload their own notes, manage personal contributions, and keep important resources pinned in a cleaner workspace.

- **Website**: [campusnotes-in.netlify.app](https://campusnotes-in.netlify.app/)

## Highlights

- Create, edit, delete, and pin notes from a polished notes dashboard
- Browse notes by category with search, filters, and pinned-first organization
- Upload PDF or DOCX files with thumbnails
- Preview supported documents in the browser and download notes on demand
- View contributor profiles and note ownership
- JWT-based authentication with admin-aware permissions
- Responsive React UI with light and dark theme support

## Tech Stack

### Frontend

- React 18
- React Router
- Redux Toolkit
- Tailwind CSS
- Vite
- React Toastify
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS

## Project Structure

```text
CampusNotes2/
|- frontend/
|  |- src/
|  |  |- app/
|  |  |- components/
|  |  |  |- Auth/
|  |  |  |- Notes/
|  |  |  |- Profile/
|  |  |- features/
|  |  |- App.jsx
|  |- package.json
|- backend/
|  |- config/
|  |- controllers/
|  |- middleware/
|  |- models/
|  |- routes/
|  |- server.js
|- README.md
```

## Core Notes Experience

The notes area now focuses on fast everyday use:

- Notes metadata is fetched first for fast page load
- Thumbnails load separately per card
- Full document data is only requested on preview or download
- Owners can edit, delete, and pin their own notes
- Admins can manage all notes

## Installation

### Prerequisites

- Node.js 18 or newer recommended
- MongoDB database
- npm

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Run the frontend:

```bash
npm run dev
```

Open `http://localhost:5173`.

## API Overview

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Notes

- `GET /api/notes`
- `GET /api/notes/:id`
- `POST /api/notes/upload`
- `PUT /api/notes/:id`
- `PATCH /api/notes/:id/pin`
- `GET /api/notes/thumbnail/:id`
- `GET /api/notes/preview/:id`
- `GET /api/notes/download/:id`
- `DELETE /api/notes/:id`

### Users

- `GET /api/users/:id`

### Contact

- `POST /api/contact`

## Current Note Fields

- Title
- Description
- Category
- Course
- Semester
- File
- Thumbnail
- Uploaded by
- Pinned status

## Deployment Notes

- Frontend can be deployed on Netlify or Vercel
- Backend can be deployed on Render
- Set `VITE_BACKEND_URL` to your deployed backend URL
- Make sure your deployed backend allows the frontend origin through CORS

## Verification

Recent UI and notes-management changes were verified with:

- `npm run build` in `frontend`
- `node --check controllers/noteController.js` in `backend`
- `node --check routes/noteRoutes.js` in `backend`

## Author

Anmol Jadgilwar  
Founder and Full Stack Developer
