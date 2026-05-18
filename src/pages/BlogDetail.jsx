import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { useParams, useNavigate } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/blogs`).then(res => {
      const found = res.data.find(b => b._id === id);
      setBlog(found);
    });
  }, [id]);

  if (!blog) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: 50, maxWidth: 900, margin: "auto", marginTop: 60 }}> {/* ✅ TOP SPACE */}

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/blog")}
        style={{
          marginBottom: 20,
          background: "transparent",
          border: "none",
          color: "#00adb5",
          cursor: "pointer",
          fontSize: 14
        }}
      >
        ← Back to Blogs
      </button>

      <img
        src={`${API_BASE_URL}${blog.image}`}
        style={{
          width: "100%",
          height: 350,
          objectFit: "cover",
          borderRadius: 10
        }}
      />

      <h1 style={{ marginTop: 20 }}>{blog.title}</h1>

      <small style={{ color: "#777" }}>
        {new Date(blog.createdAt).toDateString()}
      </small>

      <p style={{ marginTop: 20, lineHeight: 1.7 }}>
        {blog.description}
      </p>

    </div>
  );
}
