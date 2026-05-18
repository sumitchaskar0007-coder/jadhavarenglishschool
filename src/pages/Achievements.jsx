import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const Achievements = () => {
  const achievements = [
    {
      title: 'Board Exam Excellence',
      description: 'Outstanding performance in SSC 10th and 12th board examinations with consistent 98%+ results',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5m-9 5v9m0-9l-9-5m9 5l9-5" />
        </svg>
      ),
      year: '2024',
      stats: '98.2% Pass Rate',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Science Olympiad Champions',
      description: 'Gold medals in National Science Olympiad with 3 students qualifying for international rounds',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      year: '2024',
      stats: '3 Gold Medals',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Sports Championship',
      description: 'Winners in State Level Basketball Championship and District Level Athletics Meet',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      year: '2024',
      stats: '15+ Medals',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Debate & Elocution',
      description: 'First prize in State Level Debate Competition and National Youth Parliament',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      year: '2023',
      stats: 'State Champions',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Art & Cultural Excellence',
      description: 'National level recognition in Painting Competition and Cultural Festivals',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      year: '2023',
      stats: 'National Awards',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Alumni Success Stories',
      description: 'Our alumni excelling in IITs, NITs, Medical Colleges, and Corporate Leadership',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      year: 'Ongoing',
      stats: '500+ Success Stories',
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  const academicResults = [
    { year: '2024', passPercentage: '98.2%', distinction: '75.8%', toppers: '12' },
    { year: '2023', passPercentage: '97.6%', distinction: '72.3%', toppers: '9' },
    { year: '2022', passPercentage: '96.8%', distinction: '70.1%', toppers: '8' },
  ];

  const stats = [
    { number: '100%', label: 'Overall Pass Percentage', icon: '📊' },
    { number: '500+', label: 'Successful Alumni', icon: '🎓' },
    { number: '50+', label: 'National Awards', icon: '🏅' },
    { number: '8+', label: 'Years of Excellence', icon: '⭐' }
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Achievements & Awards - Jadhavar English Medium School & Jr. College | Pune</title>
        <meta
          name="description"
          content="Celebrating 28+ years of academic excellence, awards, and achievements at Jadhavar English Medium School & Jr. College. Board results, sports championships, and alumni success stories."
        />
        <meta 
          name="keywords" 
          content="Jadhavar School achievements, academic results Pune, board exam results, sports championships, alumni success, awards and recognition" 
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Achievement",
            "name": "Academic and Co-curricular Achievements",
            "description": "8+ years of excellence in education with outstanding board results and multiple awards",
            "achievement": achievements.map(achievement => ({
              "@type": "Achievement",
              "name": achievement.title,
              "description": achievement.description,
              "award": achievement.stats,
              "year": achievement.year
            }))
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Our <span className="text-yellow-300">Achievements</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Celebrating 8+ Years of Excellence & Success
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              From outstanding academic results to remarkable co-curricular accomplishments, 
              we take pride in our students' journey of excellence and innovation.
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
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
              </motion.div>
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

      {/* Academic Excellence Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Academic Excellence"
            subtitle="Consistent Outstanding Performance in Board Examinations"
            centered
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
          >
            {academicResults.map((result, index) => (
              <motion.div
                key={result.year}
                variants={itemVariants}
                whileHover="hover"
                className="group"
              >
                <motion.div
                  variants={cardVariants}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {result.year}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {result.passPercentage}
                  </div>
                  <div className="text-gray-600 mb-4 font-medium">Pass Percentage</div>
                  <div className="text-xl font-semibold text-green-600 mb-2">
                    {result.distinction}
                  </div>
                  <div className="text-gray-600 mb-4">Distinction</div>
                  <div className="text-lg font-semibold text-purple-600">
                    {result.toppers} School Toppers
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Consistent Growth Over Years</h3>
            <div className="space-y-6">
              {academicResults.map((result, index) => (
                <div key={result.year} className="flex items-center gap-4">
                  <div className="w-20 font-semibold text-gray-700">{result.year}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Pass Percentage</span>
                      <span>{result.passPercentage}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: result.passPercentage }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Recent Achievements"
            subtitle="Awards, Recognitions and Accomplishments Across Various Fields"
            centered
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                whileHover="hover"
                className="group"
              >
                <motion.div
                  variants={cardVariants}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full"
                >
                  {/* Header with Gradient */}
                  <div className={`bg-gradient-to-r ${achievement.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-white">
                          {achievement.icon}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{achievement.title}</h3>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                          {achievement.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {achievement.description}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-lg font-bold text-gray-900 text-center">
                        {achievement.stats}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`h-1 bg-gradient-to-r ${achievement.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Alumni Success */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Alumni Success Stories"
            subtitle="Our Former Students Making a Difference Worldwide"
            centered
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-12 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Proud Legacy of Successful Alumni</h3>
                  <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                    Our alumni have gone on to achieve remarkable success in diverse fields including 
                    engineering, medicine, business, arts, and public service. They stand as testaments 
                    to our commitment to holistic education and lifelong learning.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { number: '500+', label: 'Successful Alumni' },
                      { number: '85%', label: 'Pursued Higher Education' },
                      { number: '200+', label: 'Corporate Leaders' },
                      { number: '50+', label: 'Entrepreneurs' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                      >
                        <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                        <div className="text-blue-200 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="text-xl font-bold mb-4 text-center">Alumni Highlights</h4>
                  <div className="space-y-3">
                    {[
                      'Dr. Rajesh Kumar - Cardiac Surgeon at AIIMS Delhi',
                      'Priya Sharma - Software Engineer at Google',
                      'Amit Patil - Civil Services Officer',
                      'Neha Deshpande - Research Scientist at ISRO'
                    ].map((highlight, index) => (
                      <motion.div
                        key={highlight}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center gap-3 text-blue-100"
                      >
                        <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of Our Success Story</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our institution and become part of a legacy that celebrates excellence in academics, sports, and beyond.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                Apply for Admission
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300">
                Meet Our Alumni
              </button>
            </div> */}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Achievements;