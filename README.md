# CampusNotes 📚

**Empowering Students with Free Notes**

CampusNotes is a community-driven platform designed to make education accessible by providing **notes for free**. Our mission is to help college students access quality academic resources effortlessly.

## 🚀 Key Features

- 🌐 **Accessible for All**: No hidden costs or barriers—education should be free and open.
- 🤝 **Community Contribution**: Upload and share your notes to help peers succeed.
- 📚 **Browse & Download**: Search notes by category and download them instantly.
- 👤 **User Profiles**: View profiles of note contributors and their uploaded materials.
- 🎨 **Dark Mode Support**: Comfortable viewing experience with light and dark themes.
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
- 🔐 **Secure Authentication**: JWT-based authentication with encrypted passwords.

## 💻 Tech Stack

### Frontend

- **React 18** - UI library
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

## 📁 Project Structure

```
CampusNotes2/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Auth/        # Login & Signup
│   │   │   ├── Notes/       # Notes display & upload
│   │   │   ├── Profile/     # User profiles
│   │   │   └── ...
│   │   ├── features/        # Redux slices
│   │   ├── app/             # Redux store
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # Express API
    ├── controllers/         # Route handlers
    ├── models/              # MongoDB schemas
    ├── routes/              # API routes
    ├── middleware/          # Auth, admin checks
    ├── config/              # Database config
    ├── uploads/             # File storage
    ├── package.json
    └── server.js
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
JWT_SECRET=your_secret_key_here
```

Start backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:

```
VITE_BACKEND_URL=http://localhost:4000
```

Start frontend development server:

```bash
npm run dev
```

Visit http://localhost:5173 in your browser.

## 📚 How It Works

1. **Sign Up**: Create an account with username, email, and password.
2. **Browse Notes**: Explore available notes by category.
3. **Upload Notes**: Share your PDF/DOCX notes with the community.
4. **Download**: Download notes for offline study.
5. **Manage Profile**: View your profile and uploaded materials.

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Notes

- `GET /api/notes` - Get all notes (with optional category filter)
- `POST /api/notes/upload` - Upload new note (authenticated)
- `GET /api/notes/download/:id` - Download note (authenticated)
- `DELETE /api/notes/:id` - Delete note (admin only)

### Users

- `GET /api/users/:id` - Get user profile and uploaded notes

### Contact

- `POST /api/contact` - Submit contact form

## 📝 Features in Detail

### User Authentication

- Secure JWT-based authentication
- Password hashing with bcryptjs
- Token expires in 24 hours
- First user registration becomes admin

### Note Upload

- Support for PDF and DOCX files
- Automatic thumbnail generation
- File size limit: 8MB
- Metadata: title, category, subject

### Categories

HTML, CSS, Javascript, C, C++, JAVA, PYTHON, SQL, REACT JS, Other

## 🚀 Deployment

### Backend (Render/Heroku)

```bash
git push origin main
```

### Frontend (Netlify)

```bash
npm run build
# Deploy the dist/ folder
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For support and inquiries:

- **Email**: developer.anmol108@gmail.com
- **Location**: Yavatmal, India
- **Website**: [campusnotes-in.netlify.app](https://campusnotes-in.netlify.app/)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Authors

**Anmol Jadgilwar** - Founder & Full Stack Developer

---

**Together, we can make learning accessible for everyone!** 🎓

help peers succeed.

- 📚 **Browse & Download**: Search notes by category and download them instantly.
