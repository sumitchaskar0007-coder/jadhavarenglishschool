import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import API_BASE_URL from "../config";

export default function Career() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/careers`)
      .then(res => {
        setCareers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Career Opportunities - Jadhavar English Medium School & Jr. College | Pune</title>
        <meta
          name="description"
          content="Join our team of dedicated educators at Jadhavar English Medium School & Jr. College. Explore teaching and staff positions in Pune."
        />
        <meta 
          name="keywords" 
          content="teaching jobs Pune, school careers, education jobs, faculty positions, Jadhavar School careers" 
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "Career Opportunities",
            "description": "Teaching and staff positions at Jadhavar English Medium School & Jr. College",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Jadhavar English Medium School & Jr. College"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              }
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Join Our <span className="text-blue-200">Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Shape Young Minds & Build Futures
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Become part of our legacy of educational excellence. We're looking for passionate 
              educators and staff members to join our growing institution.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
          >
            {[
              { number: "28+", label: "Years Excellence" },
              { number: "50+", label: "Faculty Members" },
              { number: "2000+", label: "Students Impacted" },
              { number: "98%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                  opacity=".25" className="fill-current text-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                  opacity=".5" className="fill-current text-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                  className="fill-current text-white"></path>
          </svg>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Current Openings
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore exciting career opportunities to join our team of dedicated educators 
              and contribute to shaping the future of education.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : careers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Current Openings</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                There are no job openings available at the moment. Please check back later 
                or submit your resume for future opportunities.
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Submit Your Resume
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            >
              {careers.map((job, index) => (
                <motion.div
                  key={job._id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                >
                  {/* Job Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold">{job.title}</h3>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                          Immediate Joining
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-blue-100 text-sm">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Pune, Maharashtra
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Full-time
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="p-6">
                    {/* Description */}
                    <div className="mb-6">
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Job Description
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{job.description}</p>
                    </div>

                    {/* Qualifications */}
                    <div className="mb-6">
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Qualifications
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{job.qualifications}</p>
                    </div>

                    {/* Experience */}
                    <div className="mb-6">
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Experience Required
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{job.experience}</p>
                    </div>

                    {/* Apply Button */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Posted recently
                      </div>
                      {/* <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Apply Now
                      </button> */}
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Join Our Team?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer a supportive environment where educators can thrive and make a real difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "🏫",
                title: "Modern Infrastructure",
                description: "State-of-the-art classrooms and facilities to support effective teaching"
              },
              {
                icon: "📚",
                title: "Professional Growth",
                description: "Regular training programs and opportunities for career advancement"
              },
              {
                icon: "🤝",
                title: "Supportive Community",
                description: "Collaborative environment with experienced educators and staff"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Even if you don't see a perfect match, we're always interested in connecting with talented educators.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                Submit Your Resume
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                Contact HR
              </button>
            </div> */}
          </motion.div>
        </div>
      </section>
    </>
  );
}