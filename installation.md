```bash
1. npm install -g express-generator
2. express --no-view .
3. npm install

4. npm install mongoose
5. npm install multer
6. npm install dotenv
7. npm install cors
or
install at once using
8. npm install mongoose multer dotenv cors

9. npm install bcryptjs jsonwebtoken
```

//folder structure

campusnotes/
├── backend/
│ ├── uploads/
│ │ └── notes/ # PDF files stored here
│ ├── models/
│ │ ├── User.js # User model
│ │ └── Note.js # Note model
│ ├── controllers/
│ │ ├── authController.js # Login/Register
│ │ └── noteController.js # Upload/Download notes
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── noteRoutes.js
│ └── server.js
└── frontend/
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ │ ├── Login.jsx
│ │ │ └── Signup.jsx
│ │ ├── Notes/
│ │ │ ├── Notes.jsx # Notes list
│ │ │ ├── NoteCard.jsx # Single note display
│ │ │ └── UploadNote.jsx
│ │ ├── Navbar.jsx
│ │ └── Hero.jsx
│ └── App.jsx
