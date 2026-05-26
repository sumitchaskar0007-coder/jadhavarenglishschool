import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroBanner from "../components/HeroBanner";
import SectionTitle from "../components/SectionTitle";
import axios from "axios";
import { FaFileDownload, FaCalendarAlt, FaTag } from "react-icons/fa";
import API_BASE_URL from "../config";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Admission", "Event", "Meeting", "Academic", "General"];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/notices`);
        setNotices(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError("Failed to load notices. Please try again later.");
        setNotices([]);
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = selectedCategory === "All" 
    ? notices 
    : notices.filter(notice => notice.category === selectedCategory);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>
          Notices & Announcements - Jadhavar English Medium School & Jr. College
        </title>
        <meta
          name="description"
          content="Access the latest circulars, news, and important announcements from Jadhavar English Medium School & Jr. College. Stay updated with school events and information."
        />
      </Helmet>

      <HeroBanner
        title="Notices & Announcements"
        subtitle="Stay Updated with Latest Information"
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920"
        showCTA={false}
        showScrollIndicator={false}
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            title="Latest Notices"
            subtitle="Important announcements and circulars"
          />

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <FaTag className="text-xs" />
                {category}
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-500">Loading notices...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-500">{error}</div>
          )}

          {!loading && !error && filteredNotices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No notices available in the selected category.</p>
            </div>
          )}

          {!loading && !error && filteredNotices.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotices.map((notice, index) => (
                <motion.div
                  key={notice._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold flex items-center gap-1">
                        <FaTag className="text-xs" /> {notice.category || "General"}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" /> {formatDate(notice.date || notice.createdAt)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {notice.title || "Untitled Notice"}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {notice.description || "No description available."}
                    </p>
                    
                    <div className="mt-auto">
                      {(notice.fileUrl || notice.file) && (
                        <a
                          href={`${API_BASE_URL}${notice.fileUrl || notice.file}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
                        >
                          <FaFileDownload /> View Attachment
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredNotices.length > 0 && (
            <div className="mt-8 text-center text-gray-500 text-sm">
              Showing {filteredNotices.length} of {notices.length} notices
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Notices;