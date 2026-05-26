# Jadhavar English Medium School & Jr. College - Website

A modern, responsive, and SEO-optimized website for Jadhavar English Medium School & Jr. College built with React, Tailwind CSS, and Node.js.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design inspired by SPM Public School
- **Fully Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **SEO Optimized**: React Helmet Async for meta tags and page titles
- **REST API Backend**: Node.js + Express with MongoDB
- **Multiple Pages**: Home, About, Academics, Admissions, Facilities, Departments, Activities, Gallery, Achievements, Notices, Contact
- **Dynamic Content**: Backend API for managing notices, gallery, and achievements

## 📋 Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Helmet Async** - SEO management
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (via Mongoose)
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling

## 📁 Project Structure

```
lagad_website/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── HeroBanner.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── Card.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── AboutUs.jsx
│   │   ├── Academics.jsx
│   │   ├── SchoolPrograms.jsx
│   │   ├── JuniorCollegePrograms.jsx
│   │   ├── Admissions.jsx
│   │   ├── Facilities.jsx
│   │   ├── Departments.jsx
│   │   ├── Activities.jsx
│   │   ├── Gallery.jsx
│   │   ├── Achievements.jsx
│   │   ├── Notices.jsx
│   │   └── ContactUs.jsx
│   ├── hooks/               # Custom React hooks
│   ├── data/                # Static data
│   ├── assets/              # Images and static assets
│   ├── App.jsx              # Main app component with routes
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── backend/
│   ├── config/              # Configuration files
│   │   └── db.js            # Database connection
│   ├── controllers/         # Route controllers
│   │   ├── noticesController.js
│   │   ├── galleryController.js
│   │   └── achievementsController.js
│   ├── models/              # MongoDB models
│   │   ├── Notice.js
│   │   ├── GalleryImage.js
│   │   └── Achievement.js
│   ├── routes/              # API routes
│   │   ├── noticesRoutes.js
│   │   ├── galleryRoutes.js
│   │   └── achievementsRoutes.js
│   ├── middleware/          # Express middleware
│   ├── server.js            # Express server
│   └── package.json         # Backend dependencies
├── public/                  # Public assets
├── package.json             # Frontend dependencies
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Primary**: `#003366` (Deep Blue)
- **Secondary**: `#FFD700` (Gold)
- **Accent**: `#1E3A5F` (Dark Blue)

### Typography
- **Headings**: Merriweather (Serif)
- **Body**: Open Sans (Sans-serif)

### Spacing
- Consistent spacing using Tailwind's spacing scale
- Section padding: `py-16 px-4 md:px-8 lg:px-16`

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

3. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jadhavar-school
   NODE_ENV=development
   ```
   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jadhavar-school
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

## 📡 API Endpoints

### Notices
- `GET /api/notices` - Get all active notices
- `GET /api/notices/:id` - Get single notice
- `POST /api/notices` - Create new notice
- `PUT /api/notices/:id` - Update notice
- `DELETE /api/notices/:id` - Delete notice

### Gallery
- `GET /api/gallery` - Get all gallery images (optional query: `?category=campus`)
- `GET /api/gallery/:id` - Get single image
- `POST /api/gallery` - Upload new image
- `PUT /api/gallery/:id` - Update image
- `DELETE /api/gallery/:id` - Delete image

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:id` - Get single achievement
- `POST /api/achievements` - Create new achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Delete achievement

## 📝 Adding/Updating Content

### Adding Notices

1. **Via API** (Recommended for production):
   ```bash
   POST /api/notices
   Body: {
     "title": "Notice Title",
     "description": "Notice description",
     "category": "Admission",
     "date": "2024-01-15",
     "file": "/path/to/file.pdf"
   }
   ```

2. **Directly in code**: Edit `src/pages/Notices.jsx` and update the sample data array

### Adding Gallery Images

1. **Via API**:
   ```bash
   POST /api/gallery
   Body: {
     "title": "Image Title",
     "url": "https://example.com/image.jpg",
     "category": "campus",
     "description": "Image description"
   }
   ```

2. **Directly in code**: Edit `src/pages/Gallery.jsx` and update the `galleryImages` array

### Adding Achievements

1. **Via API**:
   ```bash
   POST /api/achievements
   Body: {
     "title": "Achievement Title",
     "description": "Achievement description",
     "category": "Academic",
     "year": "2024",
     "image": "https://example.com/image.jpg"
   }
   ```

2. **Directly in code**: Edit `src/pages/Achievements.jsx` and update the `achievements` array

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**:
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

### Backend Deployment

1. **Railway**:
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

2. **Heroku**:
   ```bash
   heroku create jadhavar-school-api
   heroku config:set MONGODB_URI=your_mongodb_uri
   git push heroku main
   ```

3. **Vercel Serverless**:
   - Deploy as serverless functions
   - Configure environment variables

### Environment Variables for Production

**Frontend** (if using environment variables):
- `VITE_API_URL` - Backend API URL

**Backend**:
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (production/development)

## 🔍 SEO Optimization

Each page includes:
- Unique page title
- Meta description
- Keywords (where applicable)
- Semantic HTML structure
- Alt text for images

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎭 Animations

Framer Motion animations include:
- Fade-in on scroll
- Hover effects
- Page transitions
- Button interactions
- Hero banner animations

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   - Change PORT in backend `.env` file
   - Or kill the process using the port

2. **MongoDB connection error**:
   - Ensure MongoDB is running locally
   - Or check MongoDB Atlas connection string

3. **CORS errors**:
   - Ensure backend CORS is configured correctly
   - Check API URL in frontend

4. **Build errors**:
   - Clear `node_modules` and reinstall
   - Check Node.js version compatibility

## 📄 License

This project is created for Jadhavar English Medium School & Jr. College.

## 👥 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for Jadhavar English Medium School & Jr. College**
#   j a d h a v a r e n g l i s h s c h o o l  
 