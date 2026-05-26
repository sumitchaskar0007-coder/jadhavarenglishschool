import API_BASE_URL from "../config.js";

const API_URL = `${API_BASE_URL}/api/blogs`;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

export const blogService = {
  // Get all blogs
  getBlogs: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}?${queryParams}`);
    return handleResponse(response);
  },

  // Get single blog
  getBlogById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response);
  },

  // Create blog
  createBlog: async (blogData) => {
    const formData = new FormData();
    
    // Append all fields to formData
    Object.keys(blogData).forEach(key => {
      if (key === "tags" && Array.isArray(blogData[key])) {
        formData.append(key, blogData[key].join(","));
      } else if (blogData[key] !== null && blogData[key] !== undefined) {
        formData.append(key, blogData[key]);
      }
    });

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    return handleResponse(response);
  },

  // Update blog
  updateBlog: async (id, blogData) => {
    const formData = new FormData();
    
    Object.keys(blogData).forEach(key => {
      if (key === "tags" && Array.isArray(blogData[key])) {
        formData.append(key, blogData[key].join(","));
      } else if (blogData[key] !== null && blogData[key] !== undefined) {
        formData.append(key, blogData[key]);
      }
    });

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: formData,
    });
    return handleResponse(response);
  },

  // Delete blog
  deleteBlog: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  // Get categories
  getCategories: async () => {
    const response = await fetch(`${API_URL}/categories/all`);
    return handleResponse(response);
  },

  // Get tags
  getTags: async () => {
    const response = await fetch(`${API_URL}/tags/all`);
    return handleResponse(response);
  },
};