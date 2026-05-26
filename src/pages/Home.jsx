// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StudentLifeSlider from "../components/StudentLifeSlider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import admissionsImage from "/assets/images/admissions-image.png";
import SectionTitle from "../components/SectionTitle";
import admissionPopupImg from "/assets/images/popup/popup.png";
import ReviewForm from "../components/ReviewForm";

// PROFESSIONAL ICONS
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaFlask,
  FaBook,
  FaUsers,
  FaAward,
  FaCheckCircle,
  FaPlay,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaLaptopCode,
  FaMicroscope,
  FaBookOpen,
  FaDumbbell,
  FaBus,
  FaShieldAlt,
  FaCalendarAlt,
  FaTrophy,
  FaPaperPlane,
  FaStar,
  FaUserGraduate,
  FaUserFriends,
  FaMobileAlt,
  FaDesktop
} from "react-icons/fa";

const Home = () => {
  // Announcement States
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showAdmissionPopup, setShowAdmissionPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // REVIEWS STATES
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("https://english-vvdk.onrender.com/api/announcements");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAnnouncements([]);
    }
  };

  // Fetch reviews from backend
  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const res = await fetch("https://english-vvdk.onrender.com/api/reviews");
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();

      // Limit to 10 latest reviews for slider (newest first)
      const limited = Array.isArray(data)
        ? [...data].reverse().slice(0, 10)
        : [];

      setReviews(limited);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchReviews();

    const popupTimer = setTimeout(() => setShowAdmissionPopup(true), 2000);
    return () => clearTimeout(popupTimer);
  }, []);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleClosePopup = () => setShowAdmissionPopup(false);

  /* -----------------------
     REVIEW SLIDER COMPONENT
     - Lightweight, no external library
     - Autoplay with pause on hover
     - Prev/Next controls and indicators
     ----------------------- */
  const ReviewSlider = ({ reviews = [], loading = false, autoplay = true, autoplayDelay = 5000 }) => {
    const [index, setIndex] = useState(0);
    const autoplayRef = useRef(null);
    const hoverRef = useRef(false);

    useEffect(() => {
      // reset index if reviews change
      setIndex(0);
    }, [reviews.length]);

    useEffect(() => {
      if (!autoplay || reviews.length <= 1) return;

      const start = () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => {
          if (!hoverRef.current) {
            setIndex((prev) => (prev + 1) % reviews.length);
          }
        }, autoplayDelay);
      };

      start();
      return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      };
    }, [reviews, autoplay, autoplayDelay]);

    const goPrev = () => {
      setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const goNext = () => {
      setIndex((prev) => (prev + 1) % reviews.length);
    };

    if (loading) {
      return (
        <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      );
    }

    if (!reviews || reviews.length === 0) {
      return (
        <div className="p-8 bg-white rounded-2xl shadow-lg text-center">
          <div className="text-4xl mb-4">💬</div>
          <p className="text-gray-600">No reviews yet — be the first to share your experience!</p>
        </div>
      );
    }

    return (
      <div
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        onMouseEnter={() => { hoverRef.current = true; }}
        onMouseLeave={() => { hoverRef.current = false; }}
        aria-roledescription="carousel"
      >
        {/* Slide */}
        <div className="p-6 md:p-10 min-h-[160px] flex items-center">
          <motion.div
            key={reviews[index]._id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-xl md:text-2xl font-bold text-blue-600">
                { (reviews[index].name || "A").slice(0,1).toUpperCase() }
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-gray-900">
                      {reviews[index].name || "Anonymous"}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">{reviews[index].relation || "Parent / Student"}</p>
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    {new Date(reviews[index].createdAt || reviews[index].date || Date.now()).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
                  {reviews[index].message?.length > 260
                    ? `${reviews[index].message.slice(0, 260)}…`
                    : reviews[index].message}
                </p>

                {reviews[index].rating && (
                  <div className="mt-2 md:mt-3 flex items-center gap-2">
                    <div className="text-yellow-500 flex text-sm md:text-base">
                      {"★".repeat(Math.round(reviews[index].rating))}
                      {"☆".repeat(5 - Math.round(reviews[index].rating))}
                    </div>
                    <span className="text-xs md:text-sm text-gray-400">({reviews[index].rating}/5)</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <button
          aria-label="Previous review"
          onClick={goPrev}
          className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 md:p-2 rounded-full shadow-md focus:outline-none transition-transform hover:scale-110"
        >
          <FaChevronLeft className="text-gray-700 text-sm md:text-base" />
        </button>

        <button
          aria-label="Next review"
          onClick={goNext}
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 md:p-2 rounded-full shadow-md focus:outline-none transition-transform hover:scale-110"
        >
          <FaChevronRight className="text-gray-700 text-sm md:text-base" />
        </button>

        {/* Indicators */}
        <div className="w-full flex justify-center gap-1.5 md:gap-2 py-3 md:py-4 bg-white/0">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-transform ${i === index ? "scale-125 bg-blue-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
      <Helmet>
        <title>Jadhavar English Medium School & Jr. College - Quality Education in Pune</title>
        <meta
          name="description"
          content="Jadhavar English Medium School & Jr. College, Pune — delivering holistic SSC-based education, modern labs, experienced faculty, outstanding board results and thriving co-curricular programs."
        />
        <meta name="keywords" content="Jadhavar School Pune, best school Pune, SSC school Pune, junior college, holistic education, science labs, sports, admissions Pune, school reviews, parent testimonials" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Jadhavar English Medium School & Jr. College" />
        <meta property="og:description" content="Empowering Minds, Shaping Futures - Quality education with modern facilities and experienced faculty in Pune." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Jadhavar School" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Structured data for SEO (Organization / School) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Jadhavar English Medium School & Jr. College",
            "url": "https://www.jadhavarschool.com",
            "logo": "https://www.jadhavarschool.com/logo.png",
            "sameAs": [],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            },
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "information"
            }],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": reviews.length
            }
          })}
        </script>
      </Helmet>

      {/* --------------------------------------------------------
        RESPONSIVE HERO SECTION
      --------------------------------------------------------- */}
  <section
  className="
    relative w-full
    pt-8 md:pt-12 pb-8 md:pb-12
    min-h-[320px] md:min-h-[360px] lg:min-h-[420px]
    bg-sky-300
    lg:bg-[url('/assets/images/hero2.png')]
    lg:bg-no-repeat
    lg:bg-cover
    lg:bg-center
    flex items-center
  "
>
  {/* Mobile sky-blue overlay ONLY */}
  {isMobile && (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-100"></div>
  )}

  {/* ❌ Desktop overlay REMOVED */}

  <div className="container-custom relative z-10 h-full flex items-center px-4 sm:px-6">
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 md:space-y-6"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Jadhavar English Medium School & Jr. College
        </h1>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          Providing a well-rounded SSC curriculum with an emphasis on academic excellence,
          practical science education, and character development. Our experienced faculty,
          industry-standard laboratories, and co-curricular programs nurture confident learners
          prepared for higher studies and real-world challenges.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Link
            to="/admissions"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold shadow hover:scale-105 transition text-sm sm:text-base"
          >
            <FaGraduationCap className="text-sm" /> Apply Now
          </Link>

          <Link
            to="/about-us"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-50 transition text-sm sm:text-base"
          >
            <FaPlay className="text-xs" /> Learn About Our Approach
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4">
          <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm flex items-start gap-3">
            <div className="text-xl md:text-2xl text-blue-600">
              <FaTrophy />
            </div>
            <div>
              <div className="text-xs md:text-sm text-gray-500">Academic Excellence</div>
              <div className="font-semibold text-gray-900 text-sm md:text-base">
                100% board-focused mentoring
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm flex items-start gap-3">
            <div className="text-xl md:text-2xl text-green-500">
              <FaMicroscope />
            </div>
            <div>
              <div className="text-xs md:text-sm text-gray-500">Hands-on Science</div>
              <div className="font-semibold text-gray-900 text-sm md:text-base">
                Lab-based practical learning
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>



      {/* --------------------------------------------------------
        QUICK STATS SECTION
      --------------------------------------------------------- */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { number: "8+", label: "Years Experience", icon: <FaAward /> },
              { number: "500+", label: "Students Enrolled", icon: <FaUsers /> },
              { number: "27+", label: "Expert Faculty", icon: <FaChalkboardTeacher /> },
              { number: "100%", label: "Board Results", icon: <FaGraduationCap /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="text-center p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="text-2xl md:text-3xl text-blue-600 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------
        WHY CHOOSE US (ENHANCED)
      --------------------------------------------------------- */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom px-4 sm:px-6">
          <SectionTitle
            title="Why Choose Jadhavar School?"
            subtitle="A balanced education — academic rigor, practical skills, and character formation"
          />

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mt-6 md:mt-8">
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: <FaChalkboardTeacher />,
                  title: "Experienced Faculty",
                  description: "Qualified teachers providing mentorship and subject mastery."
                },
                {
                  icon: <FaFlask />,
                  title: "Modern Laboratories",
                  description: "Physics, Chemistry, Biology & Computer labs equipped for practical learning."
                },
                {
                  icon: <FaBookOpen />,
                  title: "Comprehensive Curriculum",
                  description: "SSC-aligned curriculum with skill-based modules and value education."
                },
                {
                  icon: <FaUsers />,
                  title: "Student Support",
                  description: "Counseling, remedial classes and personalized mentoring."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="flex gap-3 md:gap-4 items-start p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-sm md:text-lg flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg mt-6 md:mt-0">
              <img 
                src={admissionsImage} 
                alt="School campus and facilities" 
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------
        CAMPUS FACILITIES (PROFESSIONAL)
      --------------------------------------------------------- */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom px-4 sm:px-6">
          <SectionTitle
            title="Campus Facilities"
            subtitle="Purpose-built facilities to support academic and extracurricular excellence"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
            {[
              {
                title: "Advanced Computer Lab",
                description: "Modern computers, coding curriculum & digital literacy programs.",
                icon: <FaLaptopCode />
              },
              {
                title: "Science Laboratories",
                description: "Fully-equipped physics, chemistry & biology labs for experiential learning.",
                icon: <FaMicroscope />
              },
              {
                title: "Library & Resource Centre",
                description: "Extensive physical and digital resources to support research and reading habits.",
                icon: <FaBookOpen />
              },
              {
                title: "Sports & Fitness",
                description: "Playfields, indoor courts, and professional coaching for all major sports.",
                icon: <FaDumbbell />
              },
              {
                title: "Safe Transport",
                description: "GPS-enabled buses, vetted drivers and safe pick-up/drop routines.",
                icon: <FaBus />
              },
              {
                title: "Secure Campus",
                description: "24/7 security, CCTV coverage and strict visitor policies.",
                icon: <FaShieldAlt />
              }
            ].map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-2xl md:text-3xl text-blue-600 mb-3 md:mb-4">{facility.icon}</div>
                <h4 className="font-semibold text-gray-900 text-sm md:text-base mb-1 md:mb-2">{facility.title}</h4>
                <p className="text-xs md:text-sm text-gray-600">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------
        ACHIEVEMENTS + UPCOMING EVENTS
      --------------------------------------------------------- */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom px-4 sm:px-6 grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div>
            <SectionTitle title="Achievements" subtitle="Pride in academic & extracurricular success" />
            <div className="mt-4 md:mt-6 grid gap-3 md:gap-4">
              <div className="flex items-start gap-3 md:gap-4 bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <div className="text-2xl md:text-3xl text-yellow-500"><FaTrophy /></div>
                <div>
                  <div className="text-xs md:text-sm text-gray-500">National Level</div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">Science Olympiad Top 10 — 2024</div>
                  <div className="text-xs text-gray-400 mt-1">Guided project-based learning & mentoring.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                <div className="text-2xl md:text-3xl text-green-500"><FaAward /></div>
                <div>
                  <div className="text-xs md:text-sm text-gray-500">State Board</div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">Outstanding Board Results — 100% pass</div>
                  <div className="text-xs text-gray-400 mt-1">Comprehensive coaching and exam readiness.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <SectionTitle title="Upcoming Events" subtitle="Mark your calendar" />
            <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
              {[
                { date: "2025-01-10", title: "Annual Science Fair", desc: "Student projects and interactive demonstrations." },
                { date: "2025-02-18", title: "Sports Day", desc: "Inter-house sports and competitions." },
                { date: "2025-03-05", title: "Career Guidance Workshop", desc: "Experts counselling for senior students." }
              ].map((ev, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4 bg-gradient-to-r from-white to-blue-50 p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-100">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-500">{ new Date(ev.date).toLocaleDateString('en-IN') }</div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">{ev.title}</div>
                    <div className="text-xs md:text-sm text-gray-600 mt-1">{ev.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------
        STUDENT LIFE SECTION
      --------------------------------------------------------- */}
      <StudentLifeSlider />

      {/* --------------------------------------------------------
        ANNOUNCEMENTS (ENHANCED)
      --------------------------------------------------------- */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom px-4 sm:px-6">
          <SectionTitle title="News & Announcements" subtitle="Latest updates from the school" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
            {announcements.length === 0 ? (
              <div className="col-span-full text-center py-8 md:py-12">
                <div className="text-gray-400 text-4xl md:text-6xl mb-4">📢</div>
                <p className="text-gray-500 text-base md:text-lg">No announcements at the moment.</p>
                <p className="text-gray-400 text-sm md:text-base mt-2">Please check back later for updates.</p>
              </div>
            ) : (
              announcements.map((item, i) => (
                <motion.div
                  key={item._id || i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-xl md:rounded-2xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100 p-4 md:p-6"
                  onClick={() => handleAnnouncementClick(item)}
                >
                  <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{item.title}</h3>
                      <div className="text-xs text-gray-400 mt-1">{new Date(item.date || item.createdAt).toLocaleDateString('en-IN')}</div>
                    </div>
                    <div className="text-xl md:text-2xl text-blue-600">→</div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600 line-clamp-3">{item.description}</p>
                </motion.div>
              ))
            )}
          </div>

          {announcements.length > 0 && (
            <div className="text-center mt-6 md:mt-8">
              <Link 
                to="/notices" 
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold transition text-sm md:text-base"
              >
                View All Announcements
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------
        ENHANCED REVIEWS SECTION
        - Slider + Form layout
        - Animated design
        - SEO optimized
      --------------------------------------------------------- */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50" id="reviews">
        <div className="container-custom px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full mb-3 md:mb-4 text-xs md:text-sm">
                <FaQuoteLeft className="text-xs" />
                <span className="font-semibold">Testimonials</span>
              </span>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
                What Our <span className="text-blue-600">Community Says</span>
              </h2>
              
              <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Hear from parents, students, and alumni about their experiences at Jadhavar School.
                Your feedback helps us grow and improve.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">
            {/* REVIEW SLIDER (Left Side) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl md:rounded-3xl shadow-lg md:shadow-2xl p-4 md:p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                    Community Voices
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm text-gray-500">Latest Reviews</span>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Slider Container */}
                <div className="relative">
                  <ReviewSlider
                    reviews={reviews}
                    loading={reviewsLoading}
                    autoplay={true}
                    autoplayDelay={4000}
                  />
                  
                  {/* Stats */}
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-blue-600">{reviews.length}</div>
                        <div className="text-xs md:text-sm text-gray-600">Total Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-green-600">
                          {reviews.length > 0 
                            ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
                            : "5.0"
                          }
                        </div>
                        <div className="text-xs md:text-sm text-gray-600">Average Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-purple-600">100%</div>
                        <div className="text-xs md:text-sm text-gray-600">Verified Feedback</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* REVIEW FORM (Right Side) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-xl md:rounded-3xl shadow-lg md:shadow-2xl p-4 md:p-8 border border-gray-100 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <FaPaperPlane className="text-white text-sm md:text-lg" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                        Share Your Experience
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        Your voice matters to us
                      </p>
                    </div>
                  </div>

                  <ReviewForm
                    onSubmitStart={() => setReviewsLoading(true)}
                    onSubmitEnd={() => setReviewsLoading(false)}
                    onSuccess={(newReview) => {
                      // Add new review at the beginning
                      setReviews(prev => [newReview, ...prev.slice(0, 9)]);
                      
                      // Show success toast
                      toast.success("🎉 Thank you for your review! It will appear after approval.");
                    }}
                  />
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-4 md:mt-8 grid grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaShieldAlt className="text-blue-600 text-sm md:text-base" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-gray-900">100% Secure</p>
                    <p className="text-xs text-gray-500">Your data is protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 text-sm md:text-base" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-gray-900">Verified Reviews</p>
                    <p className="text-xs text-gray-500">Authentic feedback only</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Reviews Grid */}
          {reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 md:mt-20"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                Recent Community Feedback
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {reviews.slice(0, 6).map((review, index) => (
                  <div
                    key={review._id || index}
                    className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center font-bold text-blue-600 text-sm md:text-base">
                          {(review.name || "A").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                            {review.name || "Anonymous"}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-500">{review.relation}</p>
                        </div>
                      </div>
                      <div className="text-yellow-500 text-sm md:text-base">
                        {"★".repeat(Math.round(review.rating || 5))}
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 line-clamp-4 mb-3 md:mb-4">
                      {review.message}
                    </p>
                    <div className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------
        CTA SECTION
      --------------------------------------------------------- */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white">
        <div className="container-custom px-4 sm:px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4"
          >
            Ready to Join Our Family?
          </motion.h2>

          <p className="text-sm md:text-lg text-blue-100 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
            Admissions open for the upcoming academic year — limited seats available. Apply early for assessments and scholarship consideration.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              to="/admissions" 
              className="bg-white text-blue-600 px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold shadow text-sm md:text-base"
            >
              Apply For Admission
            </Link>
            <Link 
              to="/contact-us" 
              className="border border-white/30 px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm md:text-base"
            >
              Schedule Campus Visit
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------
        ADMISSION POPUP (ENHANCED)
      --------------------------------------------------------- */}
      {showAdmissionPopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="bg-white rounded-xl md:rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden"
          >
            <div className="relative">
              <button 
                onClick={handleClosePopup} 
                className="absolute top-2 right-2 md:top-4 md:right-4 z-10 text-xl md:text-2xl bg-white/90 hover:bg-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg"
              >
                ×
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative">
                  <img 
                    src={admissionPopupImg} 
                    alt="Admissions Open" 
                    className="w-full h-48 md:h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 md:p-6 text-white">
                      <h3 className="text-lg md:text-2xl font-bold">Limited Seats Available</h3>
                      <p className="text-blue-200 text-sm md:text-base">Secure your child's future today</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-8">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-3 py-1 md:px-4 md:py-2 rounded-full mb-3 md:mb-4 text-xs md:text-sm">
                    <FaAward />
                    <span className="font-semibold">Admissions Open</span>
                  </div>

                  <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-900">
                    Admissions <span className="text-blue-600">2026-27</span>
                  </h2>

                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex items-center gap-2 md:gap-3">
                      <FaCheckCircle className="text-green-500 flex-shrink-0 text-sm md:text-base" />
                      <span className="text-gray-700 text-sm md:text-base"><strong>📆 From:</strong> January 10, 2026</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <FaCheckCircle className="text-green-500 flex-shrink-0 text-sm md:text-base" />
                      <span className="text-gray-700 text-sm md:text-base"><strong>🎯 Classes:</strong> Nursery to Junior College</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <FaCheckCircle className="text-green-500 flex-shrink-0 text-sm md:text-base" />
                      <span className="text-gray-700 text-sm md:text-base"><strong>📍 Limited Seats:</strong> Early application recommended</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link 
                      to="/admissions" 
                      onClick={handleClosePopup} 
                      className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 md:px-6 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-lg shadow-lg"
                    >
                      Apply Now
                    </Link>

                    <button 
                      onClick={handleClosePopup} 
                      className="w-full border border-gray-300 hover:bg-gray-50 py-2.5 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-base"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Home;