import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt, FaFileUpload, FaEye, FaDownload, FaArrowLeft } from "react-icons/fa";
import API_BASE_URL from "../../config";

export default function NoticeAdmin() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Admission",
    file: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const categories = ["Admission", "Event", "Meeting", "Academic", "General"];

  // Check authentication
  const checkAuth = async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return false;
    }
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.valid;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      } else {
        setAuthLoading(false);
      }
    };
    
    verifyAuth();
  }, [navigate]);

  // Fetch notices
  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      
      const res = await axios.get(`${API_BASE_URL}/api/notices`);
      setNotices(res.data);
    } catch (err) {
      console.error("Error fetching notices:", err);
      setError("Failed to fetch notices. Please try again.");
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchNotices();
    }
  }, [authLoading]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setError("Session expired. Please login again.");
      setTimeout(() => navigate("/admin/login"), 1500);
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      if (formData.file) data.append("file", formData.file);

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/notices/${editingId}`, data, config);
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE_URL}/api/notices`, data, config);
      }

      setFormData({ title: "", description: "", category: "Admission", file: null });
      setError("");
      fetchNotices();
    } catch (err) {
      console.error("Error saving notice:", err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem("admin_token");
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/admin/login"), 2000);
      } else {
        setError(err.response?.data?.message || "Failed to save notice");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/notices/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchNotices();
    } catch (err) {
      console.error(err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      } else {
        setError("Failed to delete notice");
      }
    }
  };

  const handleEdit = (notice) => {
    setEditingId(notice._id);
    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      file: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      category: "Admission",
      file: null,
    });
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBackToDashboard = () => {
    navigate("/admin");
  };

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Notice Management</h2>
            <p className="text-gray-600 mt-1">Manage school notices and announcements</p>
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

        {/* Error Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-lg ${
            error.includes("Session expired") 
              ? "bg-red-100 border border-red-300 text-red-700" 
              : "bg-yellow-100 border border-yellow-300 text-yellow-700"
          }`}>
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaPlus className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">
              {editingId ? "Edit Notice" : "Add New Notice"}
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter notice title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Enter notice description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                rows={4}
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachment (Optional)
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <FaFileUpload className="text-gray-600 text-xl" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">PDF, Word, or Image files only (Max 5MB)</p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus /> {editingId ? "Update Notice" : "Add Notice"}
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
        </div>

        {/* Notices List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">All Notices</h3>
            <div className="text-sm text-gray-500">
              Total: {notices.length} notices
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading notices...</p>
              </div>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📋</div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">No Notices Found</h4>
              <p className="text-gray-500">Start by adding your first notice using the form above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice._id} className="border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {notice.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(notice.date || notice.createdAt)}
                        </span>
                      </div>
                      
                      <h4 className="font-semibold text-lg mb-2">{notice.title}</h4>
                      <p className="text-gray-600 mb-4">{notice.description}</p>
                      
                      {(notice.fileUrl || notice.file) && (
                        <div className="flex gap-2">
                          <a 
                            href={`${API_BASE_URL}${notice.fileUrl || notice.file}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                          >
                            <FaEye /> View
                          </a>
                          <a 
                            href={`${API_BASE_URL}${notice.fileUrl || notice.file}`} 
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                          >
                            <FaDownload /> Download
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button 
                        onClick={() => handleEdit(notice)}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(notice._id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}