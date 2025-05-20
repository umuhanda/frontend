import logo from '../assets/Umuhanda_logo.png';
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/reel/C8hqmnTtCee/?igsh=MTRvMWR2azFmZm94',
      label: 'Instagram',
    },
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    {
      icon: FaYoutube,
      href: 'https://youtube.com/@honestdrivingschool?si=kFe-OCFVLXz4lAXT',
      label: 'YouTube',
    },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaTiktok, href: 'https://vm.tiktok.com/ZMkv4CPTe/', label: 'TikTok' },
  ];

  return (
    <footer className="mt-auto bg-[#F8FAFF] border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Umuhanda Logo" className="h-8 w-32 object-contain" />
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-600 order-3 md:order-2">
            © {new Date().getFullYear()} Umuhanda. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 order-2 md:order-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
