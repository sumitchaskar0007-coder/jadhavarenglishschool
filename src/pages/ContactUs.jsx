import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! (Backend integration pending)");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Contact Us | Jadhavar English Medium School</title>
      </Helmet>

      {/* ======================== HERO SECTION ======================== */}
      <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-20 px-4 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          We’re here to help! Reach out for any queries, admissions, or support.
        </motion.p>
      </div>

      {/* ======================== MAIN PAGE CONTENT ======================== */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* GRID WRAPPER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT: CONTACT DETAILS */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* CONTACT CARD */}
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray-200">
              <h3 className="text-2xl font-semibold text-slate-900">
                Get in Touch
              </h3>

              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600 text-white rounded-xl shadow">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-lg font-medium text-gray-800">
                    8459775447
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600 text-white rounded-xl shadow">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium text-gray-800">
                     jemschool8@gmail.com 

                  </p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600 text-white rounded-xl shadow">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-lg font-medium text-gray-800 leading-6">
                    Adv. Shardulrao Sudhakarrao Jadhavar <br />
                    Educational Campus No. 2, Narhe, Pune-41
                  </p>
                </div>
              </div>
            </div>

            {/* MAP SECTION */}
            <motion.div
              className="w-full h-72 rounded-2xl overflow-hidden shadow-md border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <iframe
                title="School Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=Adv.+Shardulrao+Sudhakarrao+Jadhavar+Educational+Campus+No.+2,+Narhe,+Pune-41&output=embed`}
              ></iframe>
            </motion.div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-2xl p-8 border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Send Us a Message
            </h3>

            {/* NAME */}
            <div className="mb-5">
              <label className="block text-gray-600 mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* EMAIL */}
            <div className="mb-5">
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* PHONE */}
            <div className="mb-5">
              <label className="block text-gray-600 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            {/* MESSAGE */}
            <div className="mb-5">
              <label className="block text-gray-600 mb-2">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg shadow transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
