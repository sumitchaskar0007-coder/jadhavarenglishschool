// src/pages/admin/AnnouncementAdmin.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaBullhorn, FaTrash, FaEdit, FaPlus, FaSignOutAlt, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import API_BASE_URL from "../../config";

const AnnouncementAdmin = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "",
    priority: "normal"
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const priorities = [
    { value: "high", label: "High Priority", color: "bg-red-100 text-red-800" },
    { value: "normal", label: "Normal", color: "bg-blue-100 text-blue-800" },
    { value: "low", label: "Low Priority", color: "bg-green-100 text-green-800" }
  ];

  // -------------------------------
  // AUTHENTICATION CHECK
  // -------------------------------
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login");
        return false;
      }
      return true;
    };

    const isAuthenticated = checkAuth();
    if (isAuthenticated) {
      setAuthLoading(false);
    }
  }, [navigate]);

  // -------------------------------
  // FETCH ANNOUNCEMENTS (only if authenticated)
  // -------------------------------
  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/announcements`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      // Sort by date, newest first
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAnnouncements(sortedData);
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("Failed to fetch announcements. Please try again.");
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchAnnouncements();
    }
  }, [authLoading]);

  // -------------------------------
  // SUBMIT NEW OR UPDATE ANNOUNCEMENT
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check authentication
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setError("Session expired. Please login again.");
      setTimeout(() => navigate("/admin/login"), 1500);
      return;
    }

    // Validation
    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required");
      return;
    }

    if (formData.title.length > 100) {
      setError("Title must be less than 100 characters");
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_BASE_URL}/api/announcements/${editingId}`
        : `${API_BASE_URL}/api/announcements`;

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/admin/login"), 2000);
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Success
      const message = editingId ? "Announcement updated successfully!" : "Announcement added successfully!";
      setSuccess(message);
      setError("");

      // Reset form
      setFormData({ title: "", description: "", priority: "normal" });
      setEditingId(null);

      // Refresh announcements
      fetchAnnouncements();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      console.error("Error saving announcement:", err);
      setError("Failed to save announcement. Please try again.");
    }
  };

  // -------------------------------
  // DELETE ANNOUNCEMENT
  // -------------------------------
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/announcements/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setSuccess("Announcement deleted successfully!");
      fetchAnnouncements();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      console.error(err);
      setError("Failed to delete announcement. Please try again.");
    }
  };

  // -------------------------------
  // LOAD ANNOUNCEMENT INTO FORM FOR EDIT
  // -------------------------------
  const handleEdit = (announcement) => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setFormData({
      title: announcement.title,
      description: announcement.description,
      priority: announcement.priority || "normal"
    });
    setEditingId(announcement._id);
    setError("");
    setSuccess("");
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------
  // CANCEL EDIT
  // -------------------------------
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", priority: "normal" });
    setError("");
    setSuccess("");
  };

  // -------------------------------
  // LOGOUT
  // -------------------------------
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  // -------------------------------
  // BACK TO DASHBOARD
  // -------------------------------
  const handleBackToDashboard = () => {
    navigate("/admin");
  };

  // -------------------------------
  // RENDER LOADING
  // -------------------------------
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="p-6 max-w-6xl mx-auto pt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaBullhorn className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Announcement Management</h1>
              <p className="text-gray-600 mt-2">Manage school announcements and broadcasts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToDashboard}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaArrowLeft /> Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg"
          >
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg"
          >
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>{success}</span>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow-xl rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <FaPlus className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {editingId ? "Edit Announcement" : "Create New Announcement"}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter announcement title"
                  required
                  maxLength={100}
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {formData.title.length}/100 characters
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  {priorities.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter announcement details"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <FaPlus /> {editingId ? "Update Announcement" : "Create Announcement"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Announcements List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">All Announcements</h2>
                <p className="text-gray-600 mt-1">Total: {announcements.length} announcements</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FaCalendarAlt />
                <span>Sorted by latest</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading announcements...</p>
                </div>
              </div>
            ) : announcements.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📢</div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Announcements Found</h3>
                <p className="text-gray-500">Start by creating your first announcement using the form above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement) => {
                  const priority = priorities.find(p => p.value === announcement.priority) || priorities[1];
                  return (
                    <motion.div
                      key={announcement._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${priority.color}`}>
                              {priority.label}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <FaCalendarAlt className="text-xs" />
                              {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-2 text-gray-800">
                            {announcement.title}
                          </h3>
                          <p className="text-gray-600 whitespace-pre-line">
                            {announcement.description}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 md:flex-col lg:flex-row">
                          <button
                            onClick={() => handleEdit(announcement)}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(announcement._id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnnouncementAdmin;