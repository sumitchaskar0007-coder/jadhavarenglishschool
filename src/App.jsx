// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Academics from "./pages/Academics";
import SchoolPrograms from "./pages/SchoolPrograms";
import JuniorCollegePrograms from "./pages/JuniorCollegePrograms";
import Admissions from "./pages/Admissions";
import Facilities from "./pages/Facilities";
import Departments from "./pages/Departments";
import Gallery from "./pages/Gallery";
import Achievements from "./pages/Achievements";
import Notices from "./pages/Notices";
import ContactUs from "./pages/ContactUs";
import UdanPage from "./pages/UdanPage.jsx";
import Faculties from "./pages/Faculties.jsx";
import Career from "./pages/Career.jsx";
// In your main App.jsx or router file
import Blog from "./pages/Blog";
import BlogAdmin from "./pages/admin/BlogAdmin";
import BlogDetail from "./pages/BlogDetail";
import FeeStructure from "./pages/FeeStructure";
import AcademicCalendar from "./pages/AcademicCalendar";
import SmcMembers from "./pages/SmcMembers";
import PtaMembers from "./pages/PtaMembers";
import BoardResult from "./pages/BoardResult";
import DeoCertificate from "./pages/DeoCertificate";
import WaterHealthCertificate from "./pages/WaterHealthCertificate";
// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import AnnouncementAdmin from "./pages/admin/AnnouncementAdmin";
import NoticeAdmin from './pages/admin/NoticeAdmin.jsx';
// import FacultyAdmin from "./pages/admin/FacultyAdmin";
import CareerAdmin from "./pages/admin/CareerAdmin";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/academics/school" element={<SchoolPrograms />} />
          <Route path="/academics/junior-college" element={<JuniorCollegePrograms />} />
          <Route path="/udan/:id" element={<UdanPage />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/fee-structure" element={<FeeStructure />} />

<Route path="/academic-calendar" element={<AcademicCalendar />} />

<Route path="/smc-members" element={<SmcMembers />} />

<Route path="/pta-members" element={<PtaMembers />} />

<Route path="/board-result" element={<BoardResult />} />

<Route path="/deo-certificate" element={<DeoCertificate />} />

<Route
  path="/water-health-certificate"
  element={<WaterHealthCertificate />}
/>


          {/* Admin Login (Public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/gallery" element={
            <ProtectedRoute>
              <GalleryAdmin />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/announcements" element={
            <ProtectedRoute>
              <AnnouncementAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/blogs" element={
            <ProtectedRoute>
              <BlogAdmin />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/notices" element={
            <ProtectedRoute>
              <NoticeAdmin />
            </ProtectedRoute>
          } />
          
          {/* <Route path="/admin/faculties" element={
            <ProtectedRoute>
              <FacultyAdmin />
            </ProtectedRoute>
          } /> */}
          
          <Route path="/admin/career" element={
            <ProtectedRoute>
              <CareerAdmin />
            </ProtectedRoute>
          } />

          {/* Redirect to home for any unknown route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;