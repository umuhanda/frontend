import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/Umuhanda_logo.png';
import authSignup from '../../assets/auth2.png';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../config/axios';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';
import { signupSchema } from '../../utils/Validations/SignUpSchema';

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const initialFormState = {
    names: '',
    email: '',
    phone_number: '',
    country: '',
    city: '',
    password: '',
    confirmPassword: '',
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const { error } = signupSchema.validate(formData, { abortEarly: false });
    if (error) {
      error.details.forEach((err) => toast.error(err.message));
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/auth/register', {
        names: formData.names,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
      });
      if (response.status == 201) {
        setFormData(initialFormState);
        toast.success(response.data.message);
      } else {
        toast.success(response.data.message);
        navigate('/client');
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-gray-50 p-8 lg:p-4 flex flex-col">
        {/* Logo */}
        <img src={logo} alt="Umuhanda Logo" className="w-40 mb-8" />

        {/* Sign-Up Form */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">{t('signup')}</h1>
          <form
            onSubmit={handleSignup}
            className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6"
          >
            <div>
              <label htmlFor="names" className="block text-sm font-medium text-gray-700 mb-2">
                {t('fullName')}
              </label>
              <input
                type="text"
                id="names"
                value={formData.names}
                onChange={handleChange}
                placeholder={t('enterFullName')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('enterEmail')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('phoneNumber')}
              </label>
              <input
                type="text"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder={t('enterPhoneNumber')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')}
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('enterPassword')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('confirmPassword')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t('enterPassword')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  t('signUp')
                )}
              </button>
            </div>
            <button
              type="button"
              className="w-full bg-gray-100 py-3 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              onClick={() => navigate('/signin')}
            >
              {t('backToSignIn')}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 hidden lg:block">
        <img src={authSignup} alt="Auth Illustration" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Signup;
