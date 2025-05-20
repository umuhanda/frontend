import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import logo from '../../../../assets/Umuhanda_logo.png';
import { RiDashboardFill, RiArrowLeftLine } from 'react-icons/ri';
import { AiOutlineLogout, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { MdPlayLesson } from 'react-icons/md';
import { PiExamThin, PiTestTube } from 'react-icons/pi';
import { IoBookSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router';
import useLogout from '../../../../utils/logout';
import { tokenDecoder } from '../../../../utils/tokenDecoder';

const MENU_ITEMS = [
  {
    id: 1,
    nameKey: 'home',
    href: '/client',
    icon: <RiDashboardFill />,
    section: 'main',
  },
  {
    id: 2,
    nameKey: 'lessons',
    href: '/client/lessons',
    icon: <MdPlayLesson />,
    section: 'main',
  },
  {
    id: 3,
    nameKey: 'exams',
    href: '/client/exam',
    icon: <PiExamThin />,
    section: 'main',
  },
  {
    id: 7,
    nameKey: 'test',
    href: '/client/exam/test',
    icon: <PiTestTube />,
    section: 'main',
  },
  {
    id: 6,
    nameKey: 'igazeti',
    href: '/client/igazeti',
    icon: <IoBookSharp />,
    section: 'main',
  },
  {
    id: 4,
    nameKey: 'settings',
    href: '/client/settings',
    icon: <CiSettings />,
    section: 'account',
  },
  {
    id: 5,
    nameKey: 'logout',
    href: '/signin',
    icon: <AiOutlineLogout />,
    section: 'account',
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const handleLogout = useLogout();

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Group menu items by section
  const mainMenuItems = MENU_ITEMS.filter((item) => item.section === 'main');
  const accountMenuItems = MENU_ITEMS.filter((item) => item.section === 'account');

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        handleLogout();
        return;
      }

      const decodedToken: any = tokenDecoder();
      const currentTime = Date.now() / 1000; // Get current time in seconds

      if (decodedToken.exp < currentTime) {
        handleLogout(); // Logout if token has expired
      }
    };

    checkTokenExpiration();

    // Set interval to check every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      {/* Toggle Button (Only for Mobile View) */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          onClick={handleToggle}
          aria-label={isOpen ? t('closeSidebar') : t('openSidebar')}
          aria-expanded={isOpen}
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col min-h-screen z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Sidebar navigation"
      >
        {/* Logo Section */}
        <div className="p-6 flex justify-center items-center border-b border-gray-100">
          <Link to="/">
            <img src={logo} alt="Umuhanda Logo" className="w-36" />
          </Link>
        </div>

        {/* Menu Container */}
        <div className="flex flex-col flex-grow justify-between overflow-y-auto">
          {/* Main Menu Items */}
          <nav className="mt-6 px-4" aria-label="Main navigation">
            <Link
              to="/"
              className="flex items-center space-x-4 rounded-lg p-3 transition-all duration-200 mb-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <span className="text-2xl text-blue-500">
                <RiArrowLeftLine />
              </span>
              <span className="font-medium">{t('back_home')}</span>
            </Link>
            <ul className="space-y-2 pt-4">
              {mainMenuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-4 rounded-lg p-3 transition-all duration-200 ${
                      location.pathname === item.href
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                  >
                    <span
                      className={`text-2xl ${
                        location.pathname === item.href ? 'text-white' : 'text-blue-500'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium">{t(item.nameKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Account Menu Items */}
          <nav className="mt-6 mb-6 px-4" aria-label="Account navigation">
            <div className="border-t border-gray-200 pt-4 mb-4">
              <p className="text-xs text-gray-500 px-3 mb-2 uppercase">{t('account')}</p>
            </div>
            <ul className="space-y-2">
              {accountMenuItems.map((item) => (
                <li key={item.id}>
                  {item.nameKey === 'logout' ? (
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleLogout();
                      }}
                      className="flex w-full items-center space-x-4 rounded-lg p-3 transition-all duration-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <span className="text-xl text-blue-500">{item.icon}</span>
                      <span className="font-medium">{t(item.nameKey)}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-4 rounded-lg p-3 transition-all duration-200 ${
                        location.pathname === item.href
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                    >
                      <span
                        className={`text-xl ${
                          location.pathname === item.href ? 'text-white' : 'text-blue-500'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium">{t(item.nameKey)}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            © {new Date().getFullYear()} <span className="font-semibold">Umuhanda</span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
