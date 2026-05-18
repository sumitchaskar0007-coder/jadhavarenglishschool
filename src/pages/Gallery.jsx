// src/pages/Gallery.jsx
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaSpinner, FaImage, FaCalendar, FaTrophy, FaSchool, FaUsers, FaVideo, FaPlay } from 'react-icons/fa';
import API_BASE_URL from '../config';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaFilter, setMediaFilter] = useState('all'); // 'all', 'image', 'video'

  // Categories with icons and colors
  const categories = [
    { id: 'all', label: 'All', icon: FaImage, color: 'from-purple-500 to-pink-500', count: 0 },
    { id: 'campus', label: 'Campus', icon: FaSchool, color: 'from-blue-500 to-cyan-500', count: 0 },
    { id: 'events', label: 'Events', icon: FaCalendar, color: 'from-green-500 to-emerald-500', count: 0 },
    { id: 'classroom', label: 'Classrooms', icon: FaUsers, color: 'from-orange-500 to-red-500', count: 0 },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy, color: 'from-yellow-500 to-amber-500', count: 0 },
    { id: 'video', label: 'Videos', icon: FaVideo, color: 'from-red-500 to-pink-500', count: 0 },
  ];

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/gallery`);
      const data = await res.json();
      
      if (res.ok) {
        setGalleryItems(data);
      } else {
        console.error("Failed to fetch items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Calculate category counts
  const calculateCategoryCounts = () => {
    const counts = {
      all: galleryItems.length,
      campus: galleryItems.filter(item => item.category === 'campus').length,
      events: galleryItems.filter(item => item.category === 'events').length,
      classroom: galleryItems.filter(item => item.category === 'classroom').length,
      achievements: galleryItems.filter(item => item.category === 'achievements').length,
      video: galleryItems.filter(item => item.category === 'video').length,
      other: galleryItems.filter(item => item.category === 'other').length,
    };
    return counts;
  };

  // Filter items based on category, media type, and search
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesMedia = mediaFilter === 'all' || item.mediaType === mediaFilter;
    const matchesSearch = searchTerm === '' || 
                         item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesMedia && matchesSearch;
  });

  const categoryCounts = calculateCategoryCounts();

  return (
    <>
      <Helmet>
        <title>Gallery - Jadhavar English Medium School & Jr. College</title>
        <meta name="description" content="Explore our gallery showcasing campus life, events, classrooms, videos and student achievements at Jadhavar English Medium School." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Photo & Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Gallery</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-blue-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Capturing Moments of Excellence, Learning, and Growth
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span>{galleryItems.length}+ Memorable Moments</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span>{categoryCounts.video} Videos</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span>{categories.length - 1} Categories</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Header with Search */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Gallery</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Explore our vibrant campus life through captivating moments, videos and memorable events
            </p>

            {/* Search and Filter Container */}
            <div className="flex flex-col md:flex-row justify-center gap-4 max-w-4xl mx-auto mb-6">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Media Type Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setMediaFilter('all')}
                  className={`px-4 py-3 rounded-xl font-medium ${mediaFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}`}
                >
                  All Media
                </button>
                <button
                  onClick={() => setMediaFilter('image')}
                  className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 ${mediaFilter === 'image' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}`}
                >
                  <FaImage /> Images
                </button>
                <button
                  onClick={() => setMediaFilter('video')}
                  className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 ${mediaFilter === 'video' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}`}
                >
                  <FaVideo /> Videos
                </button>
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              const count = categoryCounts[category.id] || 0;
              
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  <IconComponent />
                  <span>{category.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id 
                      ? 'bg-white/20' 
                      : 'bg-gray-100'
                  }`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <FaSpinner className="animate-spin text-4xl text-blue-600" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <FaImage className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No items found</h3>
              <p className="text-gray-500">Try selecting a different category or search term</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      {/* Image/Video Container */}
                      <div className="relative overflow-hidden aspect-square">
                        {item.mediaType === 'video' ? (
                          <>
                            <img
                              src={item.thumbnailUrl || `https://img.youtube.com/vi/${item.videoUrl?.split('v=')[1]}/hqdefault.jpg` || "https://via.placeholder.com/400"}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
                                <FaPlay className="text-xl ml-1" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={item.imageUrl || "https://via.placeholder.com/400"}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                          </>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                            {item.category}
                          </span>
                        </div>

                        {/* Media Type Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.mediaType === 'video' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.mediaType === 'video' ? 'Video' : 'Image'}
                          </span>
                        </div>

                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                              <FaSearch className="text-xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Item Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                          {item.mediaType === 'video' && item.views > 0 && (
                            <span className="text-xs text-gray-500">
                              {item.views} views
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Item Modal */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl z-10"
              >
                <FaTimes />
              </button>
              
              <div className="bg-white rounded-2xl overflow-hidden">
                {selectedItem.mediaType === 'video' ? (
                  <div className="relative pt-[56.25%] bg-black">
                    {selectedItem.videoUrl?.includes('youtube.com') || selectedItem.videoUrl?.includes('youtu.be') ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedItem.videoUrl?.split('v=')[1] || ''}`}
                        className="absolute top-0 left-0 w-full h-full"
                        allowFullScreen
                        title={selectedItem.title}
                      />
                    ) : (
                      <video
                        src={selectedItem.videoUrl}
                        controls
                        className="absolute top-0 left-0 w-full h-full"
                        poster={selectedItem.thumbnailUrl}
                      />
                    )}
                  </div>
                ) : (
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-auto max-h-[70vh] object-contain bg-gray-100"
                  />
                )}
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedItem.mediaType === 'video' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedItem.mediaType === 'video' ? 'Video' : 'Image'}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      {selectedItem.category}
                    </span>
                    {selectedItem.isFeatured && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {selectedItem.title}
                  </h3>
                  
                  {selectedItem.description && (
                    <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-gray-500 text-sm">
                      Added: {new Date(selectedItem.createdAt).toLocaleDateString()}
                    </span>
                    {selectedItem.mediaType === 'video' && selectedItem.views > 0 && (
                      <span className="text-gray-500 text-sm">
                        {selectedItem.views} views
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;