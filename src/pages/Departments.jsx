import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';
import SectionTitle from '../components/SectionTitle';
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

// Counter component for animated numbers
const Counter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      let startTime;
      const startValue = 0;
      const endValue = end;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startValue + easeOutQuart * (endValue - startValue));
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const Departments = () => {
  const departments = [
    {
      title: 'Science Department',
      description: 'Advanced laboratories and hands-on learning in Physics, Chemistry, Biology, and Mathematics to foster scientific curiosity and innovation.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'],
      features: ['Advanced Labs', 'Research Projects', 'Science Exhibitions'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Commerce Department',
      description: 'Practical business education with modern accounting software, economic analysis, and entrepreneurial skill development.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      subjects: ['Accountancy', 'Economics', 'Business Studies', 'Statistics', 'Entrepreneurship'],
      features: ['Accounting Labs', 'Market Analysis', 'Business Projects'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Arts Department',
      description: 'Fostering creativity, critical thinking, and cultural awareness through diverse humanities and social sciences.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      subjects: ['History', 'Political Science', 'Geography', 'Psychology', 'Sociology'],
      features: ['Creative Workshops', 'Cultural Studies', 'Research Papers'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Languages Department',
      description: 'Comprehensive language education focusing on communication skills, literature, and cultural understanding.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      subjects: ['English', 'Hindi', 'Marathi', 'Sanskrit', 'French'],
      features: ['Language Labs', 'Debate Clubs', 'Literary Events'],
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Physical Education',
      description: 'Promoting fitness, sportsmanship, and wellness through structured physical activities and sports programs.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      subjects: ['Sports', 'Yoga', 'Fitness Training', 'Athletics', 'Health Education'],
      features: ['Modern Gym', 'Sports Grounds', 'Fitness Programs'],
      color: 'from-teal-500 to-blue-500'
    },
    {
      title: 'Co-curricular Activities',
      description: 'Holistic development through arts, music, drama, and various clubs to nurture talents and interests.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      subjects: ['Art & Craft', 'Music', 'Drama', 'Debate', 'Clubs'],
      features: ['Art Studio', 'Music Room', 'Performance Space'],
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  const developmentPrograms = [
    {
      title: 'Performance Improvement Programme',
      description: 'Special coaching for Board Examination students to enhance academic performance',
      icon: '📈',
      features: [
        'Brushing up important topics',
        'Revision of difficult topics',
        'Three mock examinations',
        'Better answer-writing practice'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Soft Skills Development',
      description: 'Professional guidance for communication and remedial coaching',
      icon: '💬',
      features: [
        '16-hour structured course',
        'Different proficiency levels',
        'Professional trainers',
        'Year-round programs'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Career Guidance',
      description: 'Comprehensive career planning and placement support',
      icon: '🎯',
      features: [
        'Well-established Career Guidance Cell',
        'Annual "Master Mind" career fair',
        'Expert guidance sessions',
        'Parent-student counseling'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Counseling Centre',
      description: 'Professional mental health and wellness support',
      icon: '🧠',
      features: [
        'Male and female counselors',
        'Daily availability (10am-4pm)',
        'Stress management',
        'Aptitude and personality tests'
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Students Council',
      description: 'Democratic student representation and leadership development',
      icon: '👥',
      features: [
        'Principal as Chairman',
        'Class representatives',
        'Activity coordinators',
        'Grievance redressal system'
      ],
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const codeOfConduct = [
    {
      title: 'Identity Card',
      description: 'Mandatory identification and security protocol',
      icon: '🪪',
      rules: [
        'Must wear Identity Card in college premises',
        'Cards must be duly filled and signed',
        'Transfer of Identity Cards is a criminal offence',
        'Violators face expulsion'
      ],
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'Campus Cleanliness',
      description: 'Maintaining clean and hygienic environment',
      icon: '🧹',
      rules: [
        'Strictly no littering in classrooms or corridors',
        'Use designated dustbins only',
        'Offenders will be penalized',
        'Keep campus clean and green'
      ],
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Vehicle Safety',
      description: 'Safe vehicle usage within campus',
      icon: '🚗',
      rules: [
        'No sluing on vehicles in college compound',
        'Prohibited on A-Road area',
        'Follow parking regulations',
        'Maintain safe driving speed'
      ],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Campus Discipline',
      description: 'Maintaining order and decorum',
      icon: '⚖️',
      rules: [
        'No loitering or crowding on A-Road',
        'Remain inside campus during free hours',
        'Respect college property',
        'Follow designated areas'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Mobile Phone Usage',
      description: 'Responsible technology usage',
      icon: '📱',
      rules: [
        'Switch off in classrooms, library, corridors',
        'Strictly follow usage guidelines',
        'Confiscation for violations',
        'Financial penalties apply'
      ],
      color: 'from-gray-500 to-blue-gray-500'
    },
    {
      title: 'Anti-Ragging Policy',
      description: 'Zero tolerance against ragging',
      icon: '🚫',
      rules: [
        'Strictly banned in institution',
        'Expulsion for offenders',
        'Possible imprisonment',
        'Heavy fines applicable'
      ],
      color: 'from-red-600 to-pink-600'
    }
  ];

  const stats = [
    { number: 50, label: 'Expert Faculty', suffix: '+' },
    { number: 6, label: 'Departments', suffix: '' },
    { number: 30, label: 'Subjects Offered', suffix: '+' },
    { number: 100, label: 'Qualified Teachers', suffix: '%' }
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

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Academic Departments - Jadhavar English Medium School & Jr. College | Pune</title>
        <meta
          name="description"
          content="Explore our comprehensive academic departments including Science, Commerce, Arts, Languages, Physical Education, and Co-curricular activities with expert faculty."
        />
        <meta 
          name="keywords" 
          content="academic departments, science commerce arts, language education, physical education, co-curricular activities, Jadhavar School Pune, CBSE departments" 
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Jadhavar English Medium School & Jr. College",
            "description": "Comprehensive educational institution with multiple academic departments",
            "department": departments.map(dept => ({
              "@type": "EducationalOrganization",
              "name": dept.title,
              "description": dept.description,
              "discipline": dept.subjects
            }))
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
              Academic <span className="text-blue-200">Departments</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Specialized Education Through Dedicated Departments
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Discover our comprehensive academic structure designed to provide specialized education 
              and holistic development across all disciplines.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statItemVariants}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  <Counter end={stat.number} duration={2} suffix={stat.suffix} />
                </div>
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

      {/* Departments Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Academic Departments"
            subtitle="Comprehensive Education Through Specialized Departments"
            centered
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {departments.map((dept, index) => (
              <motion.div
                key={dept.title}
                variants={itemVariants}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-r ${dept.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {dept.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{dept.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {dept.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dept.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Subjects Offered
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {dept.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`h-1 bg-gradient-to-r ${dept.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Development Programs Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Developmental Programmes"
            subtitle="Comprehensive Support for Student Growth and Success"
            centered
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {developmentPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${program.color} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{program.icon}</div>
                    <h3 className="text-xl font-bold">{program.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                      Program Features:
                    </h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Code of Conduct Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Code of Conduct"
            subtitle="Maintaining Discipline and Excellence in Academic Environment"
            centered
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                College Expectations
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                The College expects every student to abide by the following Code of Conduct 
                to maintain a disciplined, safe, and conducive learning environment for all.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {codeOfConduct.map((rule, index) => (
              <motion.div
                key={rule.title}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${rule.color} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{rule.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold">{rule.title}</h3>
                      <p className="text-white/80 text-sm mt-1">{rule.description}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <ul className="space-y-3">
                    {rule.rules.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                          !
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore Our Departments?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover the perfect academic path for your educational journey with our specialized departments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                  Explore Admissions
                </button>
              </Link>

              <Link to="/departments">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Visit Campus
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Departments;