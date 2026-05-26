import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    {
      icon: "/assets/icons/youtube.png",
      url: "https://www.youtube.com/@jadhavargroupofinstitutespune",
    },
    {
      icon: "/assets/icons/instagram.png",
      url: "https://www.instagram.com/jadhavar_englishmedium_school/",
    },
    {
      icon: "/assets/icons/fb.png",
      url: "https://www.facebook.com/jahavarenglishmediumschool/",
    },
    {
      icon: "/assets/icons/twitter.png",
      url: "https://x.com/JadhavarSpeaks",
    },
  ];

  return (
    <footer className="bg-[#0E1A2A] text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo & School Info */}
        <div className="space-y-4 text-center md:text-left">
          <div className="bg-white rounded-xl p-4 flex justify-center md:justify-start shadow-md w-fit mx-auto md:mx-0">
            <img
              src="/assets/images/logo/logo1.png"
              alt="School Logo"
              className="w-20 h-20 object-contain"
            />
          </div>

          <h2 className="text-xl font-semibold leading-snug">
            Jadhavar English Medium School
          </h2>

          <p className="text-sm opacity-80 leading-relaxed">
            Established in 1995, we are committed to delivering
            quality education that shapes future leaders.
          </p>
        </div>

        {/* Address Section */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-semibold">Address</h3>

          <p className="text-sm opacity-90 leading-relaxed">
            Adv. Shardulrao Sudhakarrao Jadhavar <br />
            Educational Campus No. 2, Narhe, Pune - 411041
          </p>

          <p className="text-sm opacity-90">
            📞 +91 845-977-5447
          </p>

          <p className="text-sm opacity-90">
            ✉️ jemschool2018@gmail.com
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-semibold">Quick Links</h3>

          <ul className="space-y-2 text-sm opacity-90">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Admissions", path: "/admissions" },
              { name: "Gallery", path: "/gallery" },
              { name: "Contact", path: "/contact-us" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="hover:text-blue-400 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-semibold">Follow Us</h3>

          <div className="flex justify-center md:justify-start gap-5">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={item.icon}
                  alt="Social Icon"
                  className="w-8 h-8 opacity-90 hover:opacity-100 hover:scale-110 transition-transform duration-200"
                />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm opacity-70 border-t border-gray-700 py-6 px-4">
        © {new Date().getFullYear()} Trijja Media And Works. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
