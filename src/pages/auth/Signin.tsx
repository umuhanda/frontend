import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/Umuhanda_logo.png';
import authSignin from '../../assets/auth1.png';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';
import { isAuthenticated } from '../../components/ProtectedRoute';

const Signin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize translation

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post('/auth/login', {
        emailOrPhone: formData.emailOrPhone.trim(),
        password: formData.password.trim(),
      });
      if (response.status == 200 && response.data.token) {
        toast.success(response.data.message);
        sessionStorage.setItem('token', response.data.token);
        //Set up axios default header for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        navigate('/client');
      } else {
        toast.success(response.data.message);
        navigate('/client');
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/client');
      return;
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-gray-50 p-8 lg:p-4 flex flex-col">
        {/* Logo */}
        <img src={logo} alt={t('alt.logo')} className="w-40 mb-8" />

        {/* Sign-In Form */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">{t('signin.title')}</h1>
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-white p-6 rounded-lg space-y-6"
          >
            <div>
              <label
                htmlFor="emailOrPhone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('signin.phone_label')}
              </label>
              <input
                type="text"
                id="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                placeholder={t('signin.phone_placeholder')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('signin.password_label')}
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('signin.password_placeholder')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  t('signin.login')
                )}
              </button>
              <button
                type="button"
                className="text-blue-500 hover:underline text-sm"
                onClick={() => navigate('/reset')}
              >
                {t('signin.forgot_password')}
              </button>
            </div>
            <button
              type="button"
              className="w-full bg-gray-100 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              onClick={() => navigate('/signup')}
            >
              {t('signin.create_account')}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 hidden lg:block">
        <img src={authSignin} alt={t('signin.auth_image')} className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Signin;
