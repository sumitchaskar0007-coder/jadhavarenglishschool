// src/components/Header.jsx

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Dropdown from "./Dropdown";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenSubmenus({});
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },

    { path: "/about-us", label: "About Us" },

    {
      label: "Academics",
      submenu: [
        {
          path: "/academics/school",
          label: "School (Nursery - 10th)",
        },
        {
          path: "/academics/junior-college",
          label: "Junior College (11th & 12th)",
        },
      ],
    },

    {
      label: "Mandatory Disclosure",
      submenu: [
        {
          path: "/fee-structure",
          label: "Fee Structure",
        },
        {
          path: "/academic-calendar",
          label: "Academic Calendar",
        },
        {
          path: "/smc-members",
          label: "SMC Members",
        },
        {
          path: "/pta-members",
          label: "PTA Members",
        },
        {
          path: "/board-result",
          label: "Board Result",
        },
        {
          path: "/deo-certificate",
          label: "DEO Certificate",
        },
        {
          path: "/water-health-certificate",
          label: "Water Health Certificate",
        },
      ],
    },

    {
      label: "Udan",
      submenu: Array.from({ length: 8 }, (_, i) => ({
        path: `/udan/${i + 1}`,
        label: `Udan ${i + 1}`,
      })),
    },

    { path: "/admissions", label: "Admissions" },

    { path: "/blog", label: "Blog" },

    {
      label: "More",
      submenu: [
        { path: "/facilities", label: "Facilities" },
        { path: "/departments", label: "Departments" },
        { path: "/gallery", label: "Gallery" },
        { path: "/achievements", label: "Achievements" },
        { path: "/notices", label: "Notices" },
        { path: "/career", label: "Career" },
        { path: "/contact-us", label: "Contact Us" },
      ],
    },
  ];

  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "shadow-xl" : ""
      }`}
    >
      {/* ================= TOP BAR ================= */}

      <div className="bg-white">
        <div className="container mx-auto px-4 flex items-center justify-between py-2">
          
          {/* LOGO */}

          <Link to="/" className="flex items-center">
            <img
              src="/assets/images/logo/logo1.png"
              alt="School Logo"
              className="h-10 sm:h-11 md:h-12 w-auto"
            />
          </Link>

          {/* TITLE */}

          <div className="hidden lg:block text-center px-4">
            <h2 className="text-lg font-extrabold text-blue-900 leading-tight">
              Jadhavar English Medium School & Jr. College
            </h2>
          </div>

          {/* UDISE */}

          <div className="hidden lg:block text-right">
            <p className="text-xs font-bold text-blue-900">
              UDISE:
              <span className="text-gray-800">
                {" "}
                27250509921 / 27
              </span>
            </p>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-blue-900 text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}

      <nav className="bg-[#0a1f44]">
        
        {/* DESKTOP NAV */}

        <div className="hidden lg:flex justify-center gap-4 py-3 border-t border-blue-800 flex-wrap">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {!link.submenu ? (
                <Link
                  to={link.path}
                  className="text-sm font-extrabold text-white hover:text-yellow-300 transition px-3"
                >
                  {link.label}
                </Link>
              ) : (
                <Dropdown
                  trigger={
                    <span className="flex items-center gap-1 text-sm font-extrabold text-white hover:text-yellow-300 cursor-pointer px-3">
                      {link.label} ▼
                    </span>
                  }
                  items={link.submenu.map((item) => ({
                    label: item.label,
                    href: item.path,
                  }))}
                />
              )}
            </div>
          ))}
        </div>

        {/* MOBILE NAV */}

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-[#0a1f44] text-white px-4 py-4 overflow-y-auto"
            >
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="border-b border-blue-800"
                >
                  {!link.submenu ? (
                    <Link
                      to={link.path}
                      className="block py-3 font-bold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleSubmenu(link.label)}
                        className="w-full flex justify-between items-center py-3 font-bold"
                      >
                        {link.label}

                        <span>
                          {openSubmenus[link.label] ? "▲" : "▼"}
                        </span>
                      </button>

                      {openSubmenus[link.label] && (
                        <div className="pl-4 pb-2">
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className="block py-2 text-yellow-300"
                              onClick={() =>
                                setIsMobileMenuOpen(false)
                              }
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;