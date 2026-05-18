// src/pages/Faculties.jsx
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFaculties = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/faculties");
      const data = await res.json();

      const updatedData = data.map((faculty) => ({
        ...faculty,
        photo: faculty.photo
          ? `http://localhost:5000${faculty.photo.replace(/\\/g, "/")}`
          : "",
      }));

      setFaculties(updatedData);
    } catch (error) {
      console.error("Error loading faculties:", error);
      setFaculties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Faculties - Jadhavar School</title>
      </Helmet>

      {/* Header Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Our <span className="text-blue-200">Faculties</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Meet our dedicated team of qualified educators shaping tomorrow’s leaders.
          </p>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">

          {/* Loader */}
          {loading && (
            <div className="text-center py-20">
              <div className="h-16 w-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <p className="mt-6 text-gray-600 font-medium text-lg">
                Loading our talented faculties...
              </p>
            </div>
          )}

          {/* No data */}
          {!loading && faculties.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                No Faculty Profiles Available
              </h3>
              <button
                onClick={fetchFaculties}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Faculty Cards */}
          {!loading && faculties.length > 0 && (
            <>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  Meet Our <span className="text-blue-600">Expert Educators</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {faculties.map((faculty, index) => (
                  <div
                    key={faculty._id || index}
                    className="relative group backdrop-blur-lg bg-white/70 border border-gray-200 rounded-2xl shadow-xl overflow-hidden 
                    transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl"
                    style={{
                      animation: `fadeUp 0.6s ease forwards`,
                      animationDelay: `${index * 0.15}s`,
                    }}
                  >
                    {/* Glow Border */}
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-400 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>

                    {/* Photo */}
                    <div className="relative flex justify-center mt-6">
                      <div className="relative group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={faculty.photo || "/default-avatar.png"}
                          alt={faculty.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md group-hover:rotate-1 transition-all duration-500"
                          onError={(e) => (e.target.src = "/default-avatar.png")}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                        {faculty.name}
                      </h3>

                      <div className="text-left space-y-3 mt-4">

                        <p className="text-gray-700 text-sm">
                          <span className="font-semibold text-blue-600">Qualification:</span>{" "}
                          {faculty.qualification || faculty.education || "Not specified"}
                        </p>

                        <p className="text-gray-700 text-sm">
                          <span className="font-semibold text-blue-600">Experience:</span>{" "}
                          {faculty.experience || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
