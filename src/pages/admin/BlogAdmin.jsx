import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import { useNavigate } from "react-router-dom";

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const loadBlogs = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/blogs`);
    setBlogs(res.data);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // ================= SUBMIT =================

  const submit = async () => {
    if (!title || !description) return alert("Fill all fields");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    if (editId) {
      await axios.put(`${API_BASE_URL}/api/blogs/${editId}`, formData);
    } else {
      await axios.post(`${API_BASE_URL}/api/blogs`, formData);
    }

    resetForm();
    loadBlogs();
  };

  // ================= EDIT =================

  const editBlog = blog => {
    setEditId(blog._id);
    setTitle(blog.title);
    setDescription(blog.description);
  };

  // ================= DELETE =================

  const del = async id => {
    if (window.confirm("Delete this blog?")) {
      await axios.delete(`${API_BASE_URL}/api/blogs/${id}`);
      loadBlogs();
    }
  };

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto", marginTop: 60 }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Blog Admin Panel</h2>

        <button
          onClick={() => navigate("/admin")}
          style={{
            background: "#00adb5",
            border: "none",
            color: "#fff",
            padding: "8px 15px",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          ← Dashboard
        </button>
      </div>

      {/* FORM */}
      <div style={{ boxShadow: "0 5px 15px rgba(0,0,0,.1)", padding: 20, borderRadius: 10 }}>

        <label>Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            border: "1px solid #ccc",
            borderRadius: 6
          }}
        />

        <label>Description</label>
        <textarea
          rows="4"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            border: "1px solid #ccc",
            borderRadius: 6
          }}
        />

        <label>Image</label>
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
          style={{ border: "1px solid #ccc", padding: 6, borderRadius: 6 }}
        />

        <br /><br />

        <button
          onClick={submit}
          style={{
            background: "#00adb5",
            color: "#fff",
            border: "none",
            padding: "10px 25px",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          {editId ? "Update Blog" : "Publish Blog"}
        </button>

        {editId && (
          <button
            onClick={resetForm}
            style={{
              marginLeft: 10,
              padding: "10px 25px",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        )}

      </div>

      {/* BLOG LIST */}
      <h3 style={{ marginTop: 40 }}>Published Blogs</h3>

      {blogs.map(blog => (
        <div
          key={blog._id}
          style={{
            boxShadow: "0 3px 10px rgba(0,0,0,.08)",
            padding: 15,
            borderRadius: 8,
            marginTop: 15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <b>{blog.title}</b><br />
            <small>{new Date(blog.createdAt).toDateString()}</small>
          </div>

          <div>
            <button
              onClick={() => editBlog(blog)}
              style={{
                background: "#00adb5",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                marginRight: 10,
                borderRadius: 5,
                cursor: "pointer"
              }}
            >
              Edit
            </button>

            <button
              onClick={() => del(blog._id)}
              style={{
                background: "crimson",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: 5,
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}
