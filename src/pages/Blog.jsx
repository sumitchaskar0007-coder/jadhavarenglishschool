import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/blogs`).then(res => setBlogs(res.data));
  }, []);

  return (
    <div style={{ padding: 40, marginTop: 60 }}> {/* ✅ TOP SPACE ADDED */}

      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        Latest Blogs
      </h1>

      {/* HORIZONTAL BLOG ROW */}
      <div
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          paddingBottom: 15,
          maxWidth: 1000,
          margin: "auto"
        }}
      >
        {blogs.map(blog => (
          <div
            key={blog._id}
            style={{
              minWidth: 260,
              maxWidth: 260,
              boxShadow: "0 6px 15px rgba(0,0,0,.12)",
              borderRadius: 10,
              overflow: "hidden",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              height: 400
            }}
          >
            <img
              src={`${API_BASE_URL}${blog.image}`}
              style={{
                width: "100%",
                height: 170,
                objectFit: "cover"
              }}
            />

            <div style={{ padding: 15, flex: 1 }}>

              <h4 style={{ margin: "5px 0" }}>{blog.title}</h4>

              <small style={{ color: "#777" }}>
                {new Date(blog.createdAt).toDateString()}
              </small>

              <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.4 }}>
                {blog.description.slice(0, 85)}...
              </p>

            </div>

            <button
              onClick={() => navigate(`/blog/${blog._id}`)}
              style={{
                border: "none",
                padding: 12,
                background: "#00adb5",
                color: "#fff",
                cursor: "pointer",
                fontSize: 13
              }}
            >
              Read More →
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
