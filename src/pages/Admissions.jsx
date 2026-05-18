import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import HeroBanner from "../components/HeroBanner";
import SectionTitle from "../components/SectionTitle";
import axios from "axios";

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    class: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState(""); // success or error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMsg("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admissions",
        formData
      );

      setAlertMsg("🎉 Enquiry submitted successfully! We will contact you soon.");
      setAlertType("success");

      setFormData({
        studentName: "",
        parentName: "",
        email: "",
        phone: "",
        class: "",
        message: "",
      });
    } catch (error) {
      setAlertMsg("❌ Failed to submit enquiry. Please try again.");
      setAlertType("error");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const admissionProcess = [
    {
      step: "01",
      title: "Inquiry & Visit",
      description: "Contact us or schedule a campus tour to experience our environment",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "02",
      title: "Application",
      description: "Complete the admission form with required details and documents",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "03",
      title: "Documentation",
      description: "Submit all required documents for verification and approval",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "04",
      title: "Confirmation",
      description: "Receive admission confirmation and complete fee payment",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-orange-500 to-red-500"
    },
  ];

  const feeStructure = [
    { std: "Nursery", fees: 19000, inst1: 6650, inst2: 6580, inst3: 2880, inst4: 2850 },
    { std: "Jr.Kg", fees: 20000, inst1: 7000, inst2: 7000, inst3: 3000, inst4: 3000 },
    { std: "Sr.Kg", fees: 21000, inst1: 7380, inst2: 7380, inst3: 3180, inst4: 3180 },
    { std: "1st", fees: 24000, inst1: 8400, inst2: 8400, inst3: 3600, inst4: 3600 },
    { std: "2nd", fees: 24000, inst1: 8400, inst2: 8400, inst3: 3600, inst4: 3600 },
    { std: "3rd", fees: 24000, inst1: 8400, inst2: 8400, inst3: 3600, inst4: 3600 },
    { std: "4th", fees: 24000, inst1: 8100, inst2: 8100, inst3: 3800, inst4: 3900 },
    { std: "5th", fees: 26000, inst1: 9100, inst2: 9100, inst3: 3900, inst4: 3900 },
    { std: "6th", fees: 26000, inst1: 9100, inst2: 9100, inst3: 3900, inst4: 3900 },
    { std: "7th", fees: 26000, inst1: 9100, inst2: 9100, inst3: 3900, inst4: 3900 },
    { std: "8th", fees: 28000, inst1: 9800, inst2: 9800, inst3: 4200, inst4: 4200 },
    { std: "9th", fees: 28000, inst1: 9800, inst2: 9800, inst3: 4200, inst4: 4200 },
  ];

  const lateFeeSchedule = [
    { instance: "1st Instance", date: "15/06/30$", charges: "1000/-" },
    { instance: "2nd Instance", date: "15/08/30$", charges: "1000/-" },
    { instance: "3rd Instance", date: "15/10/30$", charges: "1500/-" },
    { instance: "4th Instance", date: "15/12/30$", charges: "1500/-" },
  ];

  const cancellationPolicy = [
    { period: "From 1st day to 10th days from the date of securing admission", deduction: "20%" },
    { period: "From 11th day to 20th day from the date of securing admission", deduction: "40%" },
    { period: "After 30 days", deduction: "100%" },
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
        <title>Admissions - Jadhavar English Medium School & Jr. College | Pune</title>
        <meta
          name="description"
          content="Admission process, eligibility criteria, required documents, and online admission form for Jadhavar English Medium School & Jr. College in Pune. Join our legacy of excellence."
        />
        <meta
          name="keywords"
          content="school admissions Pune, Jadhavar School admission, SSC school admission, online admission form, admission process, eligibility criteria"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Jadhavar English Medium School & Jr. College",
            "description": "Admission process and requirements",
            "url": window.location.href,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
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
              Begin Your <span className="text-blue-200">Educational Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Admissions Open for Academic Year 2024-25
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Join our legacy of 28+ years in providing quality education with holistic development 
              and excellent academic results.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
          >
            {[
              { number: "100%", label: "Board Results" },
              { number: "8+", label: "Years Excellence" },
              { number: "27+", label: "Expert Faculty" },
              { number: "500+", label: "Students Transformed" }
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

      {/* Admission Process */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Admission Process"
            subtitle="Simple & Transparent Steps to Join Our Institution"
            centered
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {admissionProcess.map((item, index) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className="group text-center"
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {item.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Hover Effect Border */}
                  <div className={`h-1 bg-gradient-to-r ${item.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 absolute bottom-0 left-0 right-0 rounded-b-2xl`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fee Structure - Detailed */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Fee Structure 2023-24" 
            subtitle="Transparent Fee Details and Payment Plans"
            centered
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Fee Chart */}
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Fees Chart - 2023-24</h3>
                <p className="text-blue-100">All fees are in Indian Rupees (₹)</p>
              </div>
              
              <div className="overflow-x-auto p-2">
                <table className="w-full text-sm md:text-base">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="p-4 text-left font-bold text-blue-900 border-b">Sr.No</th>
                      <th className="p-4 text-left font-bold text-blue-900 border-b">Standard</th>
                      <th className="p-4 text-left font-bold text-blue-900 border-b">Total Fees</th>
                      <th className="p-4 text-left font-bold text-blue-900 border-b">1st Installment</th>
                      <th className="p-4 text-left font-bold text-blue-900 border-b">2nd Installment</th>
                      <th className="p-4 text-left font-bold text-blue-900 border-b">3rd Installment</th>
                      <th className="p-4 text-left font-bold text-blue-900 border-b">4th Installment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructure.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4 border-b font-medium">{index + 1}</td>
                        <td className="p-4 border-b font-bold text-blue-900">{item.std}</td>
                        <td className="p-4 border-b font-bold">₹{item.fees.toLocaleString()}</td>
                        <td className="p-4 border-b">₹{item.inst1.toLocaleString()}</td>
                        <td className="p-4 border-b">₹{item.inst2.toLocaleString()}</td>
                        <td className="p-4 border-b">₹{item.inst3.toLocaleString()}</td>
                        <td className="p-4 border-b">₹{item.inst4.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes & Regulations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Notes & Regulations</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">1.</span>
                      <span>From fees to ₹50/- will be compulsory.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">2.</span>
                      <span>Cash Payment will not be accepted.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">3.</span>
                      <span>Books, Uniforms & Stationery charges separately.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">4.</span>
                      <span>Free succursal for Primary Section (NEW STUDENTS ONLY) which should be paid in Installments.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">5.</span>
                      <span>Bag & Uniform Free for Nursery and 1st std (ONLY NEW STUDENTS).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">6.</span>
                      <span>Dairy, Library, Computer, Music, Sports activities charges included.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">7.</span>
                      <span>Late fee concession available only if paid before installment due date.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">8.</span>
                      <span>At the time of admission, it is mandatory to fill guarantee form (OFFICE) without which admission will not be considered.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold">9.</span>
                      <span>Fee must be paid on time to avoid late fees charged.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Late Fee & Cancellation Policy */}
              <div className="space-y-8">
                {/* Late Fee Schedule */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Late Fee Charges</h3>
                    <p className="text-red-100">As per Maharashtra Act No. XXXVII of 2015</p>
                  </div>
                  
                  <div className="p-6">
                    <table className="w-full">
                      <thead className="bg-red-50">
                        <tr>
                          <th className="p-3 text-left font-bold text-red-900 border-b">Instance</th>
                          <th className="p-3 text-left font-bold text-red-900 border-b">Due Date</th>
                          <th className="p-3 text-left font-bold text-red-900 border-b">Late Charges</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lateFeeSchedule.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-red-50'}>
                            <td className="p-3 border-b font-medium">{item.instance}</td>
                            <td className="p-3 border-b">{item.date}</td>
                            <td className="p-3 border-b font-bold text-red-600">₹{item.charges}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Cancellation Policy */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Admissions Cancellation</h3>
                  </div>
                  
                  <div className="p-6">
                    <table className="w-full">
                      <thead className="bg-purple-50">
                        <tr>
                          <th className="p-3 text-left font-bold text-purple-900 border-b">Time of Cancellation</th>
                          <th className="p-3 text-left font-bold text-purple-900 border-b">Amount Deducted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cancellationPolicy.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                            <td className="p-3 border-b">{item.period}</td>
                            <td className="p-3 border-b font-bold text-purple-600">{item.deduction}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Eligibility & Requirements */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Eligibility & Requirements" 
            subtitle="Complete Admission Guidelines and Document Checklist"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Documents Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Required Documents</h3>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    "Filled admission form with signatures + recent photograph",
                    "Attested mark sheet copy of qualifying examination",
                    "Birth certificate of the student",
                    "Original School Leaving Certificate (SLC)",
                    "Valid address proof (Aadhar Card/Utility Bill)",
                    "One stamp-size photograph of student",
                    "Reservation category certificates (if applicable)",
                    "For other boards: Migration Certificate + Undertaking"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Eligibility Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Eligibility Criteria</h3>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4">
                  {[
                    "Admission as per Maharashtra State Board rules and regulations",
                    "Must have passed previous qualifying examination (SSC)",
                    "In-house quota follows centralized admission procedure",
                    "Valid reservation category certificates required for quota seats",
                    "Original documents + attested copies must be submitted",
                    "Form submission does not guarantee admission confirmation",
                    "Admission confirmed only after complete fee payment"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admission Form */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Online Admission Enquiry"
            subtitle="Start Your Journey - We'll Guide You Through the Process"
            centered
          />

          {alertMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-2xl mx-auto mb-8 p-6 rounded-2xl text-center border ${
                alertType === "success"
                  ? "bg-green-50 text-green-800 border-green-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                {alertType === "success" ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-semibold">{alertMsg}</span>
              </div>
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Admission Enquiry Form</h3>
              <p className="text-blue-100">Fill out the form below and our admission team will contact you within 24 hours</p>
            </div>

            {/* Form Fields */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Student Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter student's full name"
                  />
                </div>

                {/* Parent Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter parent/guardian name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Class */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Class Applying For *
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Class/Grade</option>
                    <option value="nursery">Nursery</option>
                    <option value="kg">Kindergarten</option>
                    <option value="1">1st Standard</option>
                    <option value="2">2nd Standard</option>
                    <option value="3">3rd Standard</option>
                    <option value="4">4th Standard</option>
                    <option value="5">5th Standard</option>
                    <option value="6">6th Standard</option>
                    <option value="7">7th Standard</option>
                    <option value="8">8th Standard</option>
                    <option value="9">9th Standard</option>
                    <option value="10">10th Standard</option>
                    <option value="11-science">11th - Science Stream</option>
                    <option value="11-commerce">11th - Commerce Stream</option>
                    <option value="11-arts">11th - Arts Stream</option>
                    <option value="12-science">12th - Science Stream</option>
                    <option value="12-commerce">12th - Commerce Stream</option>
                    <option value="12-arts">12th - Arts Stream</option>
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Any specific questions or requirements..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Admission Enquiry"
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </section>
    </>
  );
};

export default Admissions;