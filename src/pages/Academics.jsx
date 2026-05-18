import { Helmet } from 'react-helmet-async';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const Academics = () => {
  const location = useLocation();
  const isSchoolPage = location.pathname.includes('/school');
  const isJuniorCollegePage = location.pathname.includes('/junior-college');

  if (isSchoolPage || isJuniorCollegePage) {
    return <Outlet />;
  }

  const schoolPrograms = [
    {
      title: 'Nursery & Kindergarten',
      description: 'Early childhood education focusing on play-based learning, cognitive development, and social skills through interactive activities.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: ['Play-Based Learning', 'Cognitive Development', 'Social Skills'],
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: 'Primary (1st - 5th)',
      description: 'Building strong foundations in core subjects while fostering creativity and critical thinking skills.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: ['Core Subjects', 'Creative Arts', 'Basic Computing'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Middle School (6th - 8th)',
      description: 'Expanding knowledge base with advanced concepts, scientific inquiry, and analytical thinking.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      features: ['Advanced Concepts', 'Scientific Method', 'Analytical Skills'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Secondary (9th - 10th)',
      description: 'Comprehensive board preparation with career guidance and specialized subject focus.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: ['Board Preparation', 'Career Guidance', 'Specialized Focus'],
      color: 'from-orange-500 to-red-500'
    },
  ];

  const juniorCollegePrograms = [
    {
      title: 'Science Stream',
      description: 'Comprehensive science education with advanced laboratories, research projects, and competitive exam preparation.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      features: ['Physics, Chemistry, Biology/Maths', 'Advanced Labs', 'Competitive Exams'],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Commerce Stream',
      description: 'Practical business education with modern accounting software, economic analysis, and entrepreneurial development.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ['Accountancy & Economics', 'Business Studies', 'Entrepreneurship'],
      color: 'from-teal-500 to-green-500'
    },
    {
      title: 'Arts Stream',
      description: 'Diverse humanities education fostering creativity, critical thinking, and cultural awareness.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      features: ['Humanities & Languages', 'Creative Arts', 'Cultural Studies'],
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  const curriculumHighlights = [
    {
      title: 'Core Academic Subjects',
      description: 'Comprehensive curriculum covering Mathematics, Sciences, Languages, and Social Studies with modern teaching methodologies.',
      icon: '📚',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Co-curricular Activities',
      description: 'Sports, Arts, Music, Drama, and various clubs for holistic personality development and talent nurturing.',
      icon: '⚽',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Life Skills Education',
      description: 'Critical thinking, communication, leadership, and problem-solving skills integrated into daily learning.',
      icon: '💡',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Technology Integration',
      description: 'Digital learning tools, computer education, and smart classroom facilities for modern education delivery.',
      icon: '💻',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Continuous Assessment',
      description: 'Regular evaluations, progress tracking, and personalized feedback for academic excellence.',
      icon: '📊',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Career Guidance',
      description: 'Professional counseling, career planning, and higher education support for future success.',
      icon: '🎯',
      color: 'from-teal-500 to-blue-500'
    },
  ];

  const stats = [
    { number: '100%', label: 'Board Results' },
    { number: '8+', label: 'Years Excellence' },
    { number: '27+', label: 'Expert Faculty' },
    { number: '6:1', label: 'Student-Teacher Ratio' }
  ];

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
        <title>Academic Programs - Jadhavar English Medium School & Jr. College | Pune</title>
        <meta
          name="description"
          content="Comprehensive academic programs from Nursery to Junior College at Jadhavar English Medium School. SSC curriculum with Science, Commerce, and Arts streams."
        />
        <meta 
          name="keywords" 
          content="academic programs, school curriculum, junior college, science commerce arts, CBSE education Pune, Jadhavar School academics" 
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Jadhavar English Medium School & Jr. College",
            "description": "Comprehensive academic programs from Nursery to Junior College",
            "educationalProgram": [
              {
                "@type": "EducationalProgram",
                "name": "School Programs",
                "description": "Nursery to 10th Standard education"
              },
              {
                "@type": "EducationalProgram",
                "name": "Junior College Programs",
                "description": "11th and 12th Standard with Science, Commerce, and Arts streams"
              }
            ]
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
              Academic <span className="text-blue-200">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Comprehensive Education from Nursery to Junior College
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Discover our well-structured academic programs designed to nurture young minds 
              and prepare them for successful futures through innovative teaching methodologies.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
          >
            {stats.map((stat, index) => (
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

      {/* School Programs Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="School Programs"
            subtitle="Nursery to 10th Standard - Building Strong Academic Foundations"
            centered
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12"
          >
            {schoolPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                variants={itemVariants}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-r ${program.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {program.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{program.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`h-1 bg-gradient-to-r ${program.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link 
              to="/academics/school" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore School Programs
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Junior College Programs */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Junior College Programs"
            subtitle="11th & 12th Standard - Specialized Streams for Higher Education"
            centered
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12"
          >
            {juniorCollegePrograms.map((program, index) => (
              <motion.div
                key={program.title}
                variants={itemVariants}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-r ${program.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {program.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{program.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`h-1 bg-gradient-to-r ${program.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link 
              to="/academics/junior-college" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Junior College
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Highlights */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Curriculum Highlights"
            subtitle="Comprehensive and Well-Rounded Educational Approach"
            centered
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {curriculumHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 border border-gray-100"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-2xl text-white mb-4 shadow-md`}>
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                <div className={`h-1 bg-gradient-to-r ${item.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-4`}></div>
              </motion.div>
            ))}
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Academic Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our institution and experience comprehensive education with personalized attention and modern facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/admissions" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Apply for Admission
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Schedule Campus Visit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Academics;