// src/pages/admin/GalleryAdmin.jsx
import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaVideo, FaImage, FaSpinner, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";

const emptyForm = {
  title: "",
  description: "",
  category: "campus",
  mediaType: "image",
  imageUrl: "",
  videoUrl: "",
  isFeatured: false,
};

export default function GalleryAdmin() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch all gallery items
  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("Failed to load gallery items. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Input handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    switch (name) {
      case 'imageFile':
        setImageFile(file);
        setForm(prev => ({ ...prev, imageUrl: "" }));
        break;
      case 'videoFile':
        setVideoFile(file);
        setForm(prev => ({ ...prev, videoUrl: "" }));
        break;
      case 'thumbnailFile':
        setThumbnailFile(file);
        break;
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    if (form.mediaType === "image" && !imageFile && !form.imageUrl) {
      setError("Please upload an image or provide an image URL");
      return;
    }

    if (form.mediaType === "video" && !videoFile && !form.videoUrl) {
      setError("Please upload a video or provide a YouTube URL");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("mediaType", form.mediaType);
    formData.append("isFeatured", form.isFeatured);

    if (form.mediaType === "image") {
      if (imageFile) {
        formData.append("galleryupload", imageFile);
      } else if (form.imageUrl) {
        formData.append("imageUrl", form.imageUrl);
      }
    } else if (form.mediaType === "video") {
      if (videoFile) {
        formData.append("videoupload", videoFile);
        if (thumbnailFile) {
          formData.append("thumbnail", thumbnailFile);
        }
      } else if (form.videoUrl) {
        formData.append("videoUrl", form.videoUrl);
      }
    }

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const url = editingId ? `${API_BASE_URL}/api/gallery/${editingId}` : `${API_BASE_URL}/api/gallery`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setSuccess(editingId ? "Item updated successfully!" : "Item created successfully!");
      
      // Reset form
      setForm(emptyForm);
      setImageFile(null);
      setVideoFile(null);
      setThumbnailFile(null);
      setEditingId(null);
      
      // Refresh list
      fetchItems();
      
      // Clear success message
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.message || "Failed to save item. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description || "",
      category: item.category || "campus",
      mediaType: item.mediaType,
      imageUrl: item.imageUrl || "",
      videoUrl: item.videoUrl || "",
      isFeatured: item.isFeatured || false,
    });
    setImageFile(null);
    setVideoFile(null);
    setThumbnailFile(null);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setVideoFile(null);
    setThumbnailFile(null);
    setError("");
    setSuccess("");
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Delete failed");
      }

      setSuccess("Item deleted successfully!");
      fetchItems();
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("Failed to delete item");
    }
  };

  // Switch media type
  const switchMediaType = (type) => {
    setForm(prev => ({ ...prev, mediaType: type }));
    setImageFile(null);
    setVideoFile(null);
    setThumbnailFile(null);
  };

  const handleBackToDashboard = () => {
    navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl pt-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gallery Management
            </h1>
            <p className="text-gray-600">
              Manage your gallery images and videos
            </p>
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
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editingId ? "Edit Gallery Item" : "Add New Gallery Item"}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Media Type Toggle */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => switchMediaType("image")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${form.mediaType === "image" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                <FaImage /> Image
              </button>
              <button
                type="button"
                onClick={() => switchMediaType("video")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${form.mediaType === "video" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                <FaVideo /> Video
              </button>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter title"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Enter description"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="campus">Campus</option>
                <option value="events">Events</option>
                <option value="classroom">Classroom</option>
                <option value="achievements">Achievements</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Image Upload Section */}
            {form.mediaType === "image" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image *
                </label>
                <div className="space-y-4">
                  <div>
                    <input
                      type="file"
                      name="imageFile"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload an image file (JPG, PNG, GIF, WebP) up to 10MB
                    </p>
                  </div>
                  <div className="text-center text-gray-500">OR</div>
                  <div>
                    <input
                      type="url"
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Or enter image URL (https://...)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Video Upload Section */}
            {form.mediaType === "video" && (
              <div className="space-y-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={form.videoUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                
                <div className="text-center text-gray-500">OR</div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Video *
                  </label>
                  <input
                    type="file"
                    name="videoFile"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a video file (MP4, AVI, MOV, etc.) up to 100MB
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail (Optional)
                  </label>
                  <input
                    type="file"
                    name="thumbnailFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Custom thumbnail for uploaded videos
                  </p>
                </div>
              </div>
            )}

            {/* Featured Checkbox */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Mark as Featured</span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    {editingId ? "Updating..." : "Creating..."}
                </>
                ) : (
                  <>
                    <FaPlus />
                    {editingId ? "Update Item" : "Create Item"}
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Gallery Items List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Gallery Items</h2>
            <div className="text-sm text-gray-500">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FaSpinner className="animate-spin text-3xl text-blue-600" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📷</div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Items Found</h3>
              <p className="text-gray-500">Start by adding your first gallery item above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {item.mediaType === "video" ? (
                      <div className="relative h-full">
                        <img
                          src={item.thumbnailUrl || `https://img.youtube.com/vi/${item.videoUrl?.split('v=')[1]}/hqdefault.jpg` || "/placeholder-video.jpg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                            <FaVideo className="text-white text-xl" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.imageUrl || "/placeholder-image.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {item.isFeatured && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                    
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {item.mediaType === "video" ? "Video" : "Image"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description || "No description"}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {item.category}
                      </span>
                      {item.mediaType === "video" && item.views > 0 && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {item.views} views
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-4 pb-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
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