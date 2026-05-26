// src/pages/admin/CareerAdmin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBriefcase, FaTrash, FaEdit, FaPlus, FaSignOutAlt, FaGraduationCap, FaClock, FaListAlt, FaArrowLeft } from "react-icons/fa";
import API_BASE_URL from "../../config";

export default function CareerAdmin() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    qualifications: "",
    experience: "",
    location: "",
    salary: "",
    jobType: "full-time"
  });

  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const jobTypes = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" }
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
  // FETCH CAREERS (only if authenticated)
  // -------------------------------
  const fetchCareers = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const res = await axios.get(`${API_BASE_URL}/api/careers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Sort by date, newest first
      const sortedCareers = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCareers(sortedCareers);
    } catch (err) {
      console.error("Error fetching careers:", err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      } else {
        setError("Failed to fetch career opportunities. Please try again.");
      }
      
      setCareers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchCareers();
    }
  }, [authLoading]);

  // -------------------------------
  // FORM HANDLERS
  // -------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // -------------------------------
  // SUBMIT FORM
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
    if (!form.title.trim() || !form.description.trim() || !form.qualifications.trim()) {
      setError("Title, description, and qualifications are required");
      return;
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      if (editId) {
        await axios.put(`${API_BASE_URL}/api/careers/${editId}`, form, config);
        setSuccess("Job updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/careers`, form, config);
        setSuccess("Job added successfully!");
      }

      // Reset form and states
      setForm({
        title: "",
        description: "",
        qualifications: "",
        experience: "",
        location: "",
        salary: "",
        jobType: "full-time"
      });
      setEditId(null);
      setError("");

      // Refresh careers list
      fetchCareers();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      console.error("Error saving career:", err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem("admin_token");
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/admin/login"), 2000);
      } else {
        setError(err.response?.data?.message || "Failed to save job opportunity");
      }
    }
  };

  // -------------------------------
  // EDIT CAREER
  // -------------------------------
  const handleEdit = (career) => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setEditId(career._id);
    setForm({
      title: career.title,
      description: career.description,
      qualifications: career.qualifications,
      experience: career.experience || "",
      location: career.location || "",
      salary: career.salary || "",
      jobType: career.jobType || "full-time"
    });
    setError("");
    setSuccess("");
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------
  // CANCEL EDIT
  // -------------------------------
  const handleCancelEdit = () => {
    setEditId(null);
    setForm({
      title: "",
      description: "",
      qualifications: "",
      experience: "",
      location: "",
      salary: "",
      jobType: "full-time"
    });
    setError("");
    setSuccess("");
  };

  // -------------------------------
  // DELETE CAREER
  // -------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job opening?")) return;

    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/careers/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccess("Job opening deleted successfully!");
      fetchCareers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      console.error(err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
      } else {
        setError("Failed to delete job opening. Please try again.");
      }
    }
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
      <div className="container mx-auto px-4 py-8 max-w-6xl pt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FaBriefcase className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Career Management</h1>
              <p className="text-gray-600 mt-2">Manage job openings and career opportunities</p>
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
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>{success}</span>
            </div>
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <FaPlus className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {editId ? "Edit Job Opening" : "Create New Job Opening"}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Mathematics Teacher"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                >
                  {jobTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Mumbai, Maharashtra"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salary"
                  placeholder="e.g., ₹25,000 - ₹35,000 per month"
                  value={form.salary}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Required
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="experience"
                    placeholder="e.g., 2+ years of teaching experience"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pl-10"
                  />
                  <FaClock className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualifications *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="qualifications"
                    placeholder="e.g., M.A., B.Ed. with minimum 60% marks"
                    value={form.qualifications}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pl-10"
                    required
                  />
                  <FaGraduationCap className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pl-10"
                  rows="5"
                  required
                />
                <FaListAlt className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <FaPlus /> {editId ? "Update Job Opening" : "Create Job Opening"}
              </button>

              {editId && (
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

        {/* Careers List */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">All Job Openings</h2>
                <p className="text-gray-600 mt-1">Total: {careers.length} positions available</p>
              </div>
              <div className="text-sm text-gray-500">
                Showing latest opportunities first
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading job openings...</p>
                </div>
              </div>
            ) : careers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">💼</div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Job Openings Found</h3>
                <p className="text-gray-500">Start by creating your first job opening using the form above.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {careers.map((career) => {
                  const jobType = jobTypes.find(t => t.value === career.jobType) || jobTypes[0];
                  return (
                    <div
                      key={career._id}
                      className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h3 className="font-bold text-xl text-gray-800">{career.title}</h3>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                              {jobType.label}
                            </span>
                            {career.location && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                📍 {career.location}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {career.salary && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="font-medium">Salary:</span>
                                <span>{career.salary}</span>
                              </div>
                            )}
                            
                            {career.experience && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <FaClock className="text-gray-400" />
                                <span>{career.experience}</span>
                              </div>
                            )}
                          </div>

                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <FaGraduationCap /> Qualifications
                            </h4>
                            <p className="text-gray-600">{career.qualifications}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <FaListAlt /> Description
                            </h4>
                            <p className="text-gray-600 whitespace-pre-line">{career.description}</p>
                          </div>

                          <div className="mt-4 text-sm text-gray-500">
                            Posted: {new Date(career.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>

                        <div className="flex gap-2 lg:flex-col xl:flex-row">
                          <button
                            onClick={() => handleEdit(career)}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(career._id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}