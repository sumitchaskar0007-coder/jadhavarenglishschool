// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChartBar, FaImages, FaBullhorn, FaStickyNote, FaBook, FaBriefcase, FaSignOutAlt, FaSun, FaMoon, FaBars, FaTimes, FaSearch, FaUserShield, FaBell, FaCog, FaHome, FaBlog } from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState(3);

  const [menuItems, setMenuItems] = useState([
    { title: "Dashboard", path: "/admin/dashboard", icon: <FaChartBar />, description: "Overview and analytics", color: "from-blue-500 to-blue-600" },
    { title: "Gallery", path: "/admin/gallery", icon: <FaImages />, description: "Manage gallery images", color: "from-green-500 to-green-600" },
    { title: "Announcements", path: "/admin/announcements", icon: <FaBullhorn />, description: "Manage announcements", color: "from-yellow-500 to-yellow-600" },
    { title: "Notices", path: "/admin/notices", icon: <FaStickyNote />, description: "Manage notices", color: "from-purple-500 to-purple-600" },
    { title: "Blog", path: "/admin/blogs", icon: <FaBlog />, description: "Manage blog posts", color: "from-pink-500 to-pink-600" },
    // { title: "Courses", path: "/admin/courses", icon: <FaBook />, description: "Course management", color: "from-indigo-500 to-indigo-600" },
    { title: "Career", path: "/admin/career", icon: <FaBriefcase />, description: "Manage job openings", color: "from-red-500 to-red-600" },
  ]);

  // 🛑 PROTECT ROUTE (Redirect if not logged in)
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Fetch mock stats + activity
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStats([
          { label: "Total Announcements", value: 12, change: "+5", icon: "📢", trend: "up" },
          { label: "Gallery Items", value: 156, change: "+12", icon: "🖼️", trend: "up" },
          { label: "Active Notices", value: 8, change: "-2", icon: "📋", trend: "down" },
          { label: "Blog Posts", value: 24, change: "+3", icon: "📝", trend: "up" },
          { label: "Job Openings", value: 5, change: "+1", icon: "💼", trend: "up" },
          { label: "Today's Visitors", value: 342, change: "+42", icon: "👁️", trend: "up" },
        ]);

        setActivities([
          { action: "New blog post published", time: "1 hour ago", icon: "📝", type: "blog" },
          { action: "New announcement published", time: "2 hours ago", icon: "📢", type: "announcement" },
          { action: "Gallery updated with 5 new images", time: "5 hours ago", icon: "🖼️", type: "gallery" },
          { action: "Job opening posted for Mathematics Teacher", time: "1 day ago", icon: "💼", type: "career" },
          { action: "Notice board updated with exam schedule", time: "2 days ago", icon: "📋", type: "notice" },
        ]);
      } catch (error) {
        console.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  // Dark Mode Initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin_theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("admin_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("admin_theme", "light");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_theme");
    navigate("/admin/login");
  };

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900"
      }`}
    >
      {/* ─── SIDEBAR ─────────────────────────────────────────────── */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-2xl w-80 border-r ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        {/* Sidebar Header */}
        <div className={`p-6 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaUserShield className="text-white text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Jadhavar Educational Institute
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
              }`}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b dark:border-gray-700 sticky top-0 bg-inherit z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
            <FaSearch className={`absolute left-3 top-3.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link
            to="/"
            className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              <FaHome className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
            </div>
            <div>
              <div className="font-medium">Home Page</div>
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Back to main website
              </div>
            </div>
          </Link>
          
          {filteredMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-all group ${
                location.pathname === item.path
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-[1.02]`
                  : isDarkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className={`p-3 rounded-lg ${location.pathname === item.path ? "bg-white/20" : isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <div className={location.pathname === item.path ? "text-white" : isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  {item.icon}
                </div>
              </div>
              <div>
                <div className="font-medium">{item.title}</div>
                <div className={`text-sm ${location.pathname === item.path ? "text-blue-100" : isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          <button
            onClick={logout}
            className={`w-full p-4 rounded-xl flex items-center justify-center space-x-3 transition-all ${
              isDarkMode 
                ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800" 
                : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            } text-white shadow-lg hover:shadow-xl`}
          >
            <FaSignOutAlt />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* ─── MAIN CONTENT ────────────────────────────────────────── */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-80" : "ml-0"}`}>
        {/* Header */}
        <header
          className={`fixed top-0 right-0 left-0 z-40 border-b backdrop-blur-lg transition-all ${isSidebarOpen ? "ml-80" : "ml-0"} ${
            isDarkMode ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`p-3 rounded-xl ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors`}
              >
                <FaBars />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className={`relative p-3 rounded-xl ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors`}
              >
                <FaBell />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </header>

        {/* Body Content with Top Margin */}
        <main className="p-6 space-y-8 mt-24">
          {/* Welcome Banner */}
          <div className="rounded-2xl p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, Administrator! 👋</h2>
                <p className="text-blue-100 text-lg">Manage your educational institute efficiently from one place.</p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors border border-white/30">
                View Analytics
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02] ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-2xl p-3 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    {stat.icon}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      stat.trend === "up"
                        ? isDarkMode ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"
                        : isDarkMode ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-2">{stat.value.toLocaleString()}</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Quick Actions ⚡</h3>
                <button className={`text-sm ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}>
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {menuItems.slice(0, 4).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-4 p-4 rounded-xl border transition-all hover:shadow-md ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-700/50 hover:bg-gray-700"
                        : "border-gray-200 bg-gray-50 hover:bg-white"
                    }`}
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color}`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Recent Activity 📈</h3>
                <button className={`text-sm ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}>
                  See All
                </button>
              </div>

              <div className="space-y-4">
                {activities.map((activity, i) => (
                  <div
                    key={i}
                    className={`flex items-center space-x-4 p-4 rounded-xl border transition-colors ${
                      isDarkMode 
                        ? "border-gray-700 hover:bg-gray-700/50" 
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`text-2xl p-3 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                      {activity.icon}
                    </div>

                    <div className="flex-1">
                      <div className="font-medium">{activity.action}</div>
                      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {activity.time}
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.type === 'announcement' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                      activity.type === 'gallery' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                      activity.type === 'career' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                      activity.type === 'notice' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                      activity.type === 'blog' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' :
                      'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className="text-xl font-bold mb-6">System Status 🛡️</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-4 rounded-xl border ${isDarkMode ? "border-green-700 bg-green-900/20" : "border-green-200 bg-green-50"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${isDarkMode ? "text-green-300" : "text-green-700"}`}>Server Status</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-green-400" : "text-green-600"}`}>All systems operational</p>
              </div>
              
              <div className={`p-4 rounded-xl border ${isDarkMode ? "border-blue-700 bg-blue-900/20" : "border-blue-200 bg-blue-50"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>Database</span>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>Connected & synced</p>
              </div>
              
              <div className={`p-4 rounded-xl border ${isDarkMode ? "border-purple-700 bg-purple-900/20" : "border-purple-200 bg-purple-50"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}>Last Backup</span>
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>Today, 02:00 AM</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}