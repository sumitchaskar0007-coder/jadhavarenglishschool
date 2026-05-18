import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaUserGraduate, FaUserFriends, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const ReviewForm = ({ onSubmitStart, onSubmitEnd, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    relation: "Parent",
    rating: 5,
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const relations = [
    { value: "Parent", label: "Parent", icon: <FaUserFriends /> },
    { value: "Student", label: "Student", icon: <FaUserGraduate /> },
    { value: "Alumni", label: "Alumni" },
    { value: "Teacher", label: "Teacher" },
    { value: "Other", label: "Other" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Review message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Review must be at least 10 characters";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    onSubmitStart?.();
    
    try {
      const response = await fetch("https://english-vvdk.onrender.com/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }
      
      toast.success("🎉 Review submitted successfully! It will appear after approval.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        relation: "Parent",
        rating: 5,
        message: ""
      });
      setErrors({});
      
      // Call success callback with new review data
      onSuccess?.({
        ...formData,
        _id: data.review?._id || Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: "pending"
      });
      
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
      onSubmitEnd?.();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Rating Stars */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Your Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              className="text-2xl transition-transform hover:scale-110 focus:outline-none"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <FaStar
                className={`
                  ${star <= formData.rating 
                    ? "text-yellow-500 fill-yellow-500" 
                    : "text-gray-300"
                  }
                  transition-colors duration-200
                `}
              />
            </button>
          ))}
          <span className="ml-3 text-sm font-medium text-gray-600">
            {formData.rating} out of 5
          </span>
        </div>
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`
            w-full px-4 py-3 rounded-xl border 
            ${errors.name ? "border-red-300" : "border-gray-200"} 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
            transition-all duration-200
          `}
          placeholder="Enter your name"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address (Optional)
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`
            w-full px-4 py-3 rounded-xl border 
            ${errors.email ? "border-red-300" : "border-gray-200"} 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
            transition-all duration-200
          `}
          placeholder="your.email@example.com"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Relation Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Relation to School *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {relations.map((rel) => (
            <button
              key={rel.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, relation: rel.value }))}
              className={`
                flex items-center justify-center gap-2 px-4 py-3 rounded-xl border
                transition-all duration-200
                ${formData.relation === rel.value
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={isSubmitting}
            >
              {rel.icon && <span>{rel.icon}</span>}
              <span className="text-sm font-medium">{rel.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={`
            w-full px-4 py-3 rounded-xl border 
            ${errors.message ? "border-red-300" : "border-gray-200"} 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
            transition-all duration-200
          `}
          placeholder="Share your experience with our school..."
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          Your review will be displayed publicly after approval.
        </p>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full flex items-center justify-center gap-3 
          bg-gradient-to-r from-blue-600 to-purple-600 
          text-white px-6 py-4 rounded-xl font-bold text-lg
          shadow-lg hover:shadow-xl
          transition-all duration-300
          ${isSubmitting ? "opacity-70 cursor-wait" : "hover:shadow-2xl"}
        `}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </>
        ) : (
          <>
            <FaPaperPlane />
            Submit Your Review
          </>
        )}
      </motion.button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to our terms. We respect your privacy and will never share your email.
      </p>
    </motion.form>
  );
};

export default ReviewForm;