**CampusNotes2**:

## 🎓 Project Overview: CampusNotes2

**CampusNotes2** is a full-stack web application designed to provide university students with free, community-driven access to study materials and notes. It's built as a platform where students can upload, share, and download academic notes specific to their universities and courses.

### 🏗️ **Architecture & Technology Stack**

**Frontend:**

- **React 18** with Vite as the build tool
- **Tailwind CSS** for styling with dark/light theme support
- **React Router** for navigation
- **Axios** for API communication
- **React Hook Form** for form handling
- **JWT** for authentication

**Backend:**

- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

### �� **Key Features**

1. **User Authentication System**

   - User registration and login
   - JWT-based authentication
   - Protected routes for authenticated users
   - Admin role support

2. **Notes Management**

   - Upload notes with file attachments
   - Categorize notes by subject, course, and semester
   - Support for both general and university-specific notes
   - Thumbnail generation for uploaded files
   - Search and filter functionality

3. **University-Specific Content**

   - Notes organized by university and course
   - Course-based filtering (BCA, BBA, etc.)
   - Semester-wise organization

4. **Modern UI/UX**

   - Responsive design with mobile support
   - Dark/light theme toggle
   - Modern gradient designs
   - Intuitive navigation

5. **File Management**
   - File upload with size validation
   - Thumbnail generation
   - Secure file serving
   - Multiple file format support

### 📁 **Project Structure**

```
CampusNotes2/
├── backend/                 # Node.js/Express API
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Authentication & validation
│   ├── config/           # Database & upload config
│   └── uploads/          # File storage
└── frontend/              # React application
    ├── src/
    │   ├── components/    # React components
    │   ├── context/       # React context (Auth)
    │   └── Routes.jsx     # Route definitions
    └── public/           # Static assets
```

### 🎯 **Core Functionality**

1. **Home Page**: Landing page with feature highlights and call-to-action buttons
2. **Authentication**: Login/Signup forms with validation
3. **Notes Browsing**: View and search through uploaded notes
4. **Note Upload**: Protected route for authenticated users to upload notes
5. **University Notes**: Specialized view for university-specific content
6. **Contact & About**: Information pages
7. **Profile Management**: User profile and settings

### 🔧 **API Endpoints**

- `/api/auth` - Authentication routes (login, signup, logout)
- `/api/notes` - Notes CRUD operations
- `/api/contact` - Contact form submissions

### 🎨 **Design Philosophy**

The application follows a modern, educational theme with:

- Purple gradient color scheme
- Clean, minimalist interface
- Responsive design for all devices
- Accessibility considerations
- Intuitive user experience

### 🎓 **Target Audience**

- University students seeking study materials
- Educators wanting to share resources
- Academic communities looking for collaborative learning

This is a well-structured, full-stack application that successfully bridges the gap between students and educational resources, providing a platform for knowledge sharing in the academic community.
