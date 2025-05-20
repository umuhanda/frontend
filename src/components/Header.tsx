import logo from '../assets/Umuhanda_logo.png';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { isAuthenticated } from './ProtectedRoute';

// Constants for easier maintainability
const MENU_ITEMS = [
  { name: 'home', href: '/' },
  { name: 'exams', href: '/client/exam' },
  { name: 'login', href: '/signin' },
  { name: 'pricing', href: '/' },
  { name: 'contact', href: '/contact' },
];

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between py-4 px-6 shadow-md">
      {/* Logo Section */}
      <div className="mb-4 sm:mb-0">
        <img src={logo} alt="Umuhanda Logo - Navigate to Home" className="w-32 sm:w-40" />
      </div>

      {/* Navigation & Language Section */}
      <div className="flex flex-col sm:flex-row items-center sm:space-x-8 max-sm:space-y-4 sm:space-y-0">
        {/* Navigation Menu */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center space-x-8 sm:space-x-8">
            {MENU_ITEMS.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive ? 'text-blue-500 underline' : 'text-gray-700'
                    } hover:text-blue-500 transition duration-300`
                  }
                >
                  {t(item.name)} {/* Translate each menu item dynamically */}
                </NavLink>
              </li>
            ))}
            {isAuthenticated() && (
              <li>
                <NavLink
                  to="client"
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive ? 'text-blue-500 underline' : 'text-gray-700'
                    } hover:text-blue-500 transition duration-300`
                  }
                >
                  {t('back_to_dashboard')}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
