import Layout from './Layout';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../../../config/axios';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';
import { getuserInfo } from '../../../utils/getUserInfo';
import Loader from './components/Loader';
import { profileSchema } from '../../../utils/Validations/ProfileSchema';

const Settings = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('token');
  const [userInfo, setUserInfo] = useState({
    names: '',
    email: '',
    phone_number: '',
    city: '',
    country: '',
    address: '',
    birth_date: '',
  });
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    phone_number: '',
    city: '',
    country: '',
    address: '',
    birth_date: '',
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchuserInfo = async () => {
      try {
        const userData = await getuserInfo();
        if (userData) {
          const cleanedData = {
            names: userData.names || '',
            email: userData.email || '',
            phone_number: userData.phone_number || '',
            city: userData.city || '',
            country: userData.country || '',
            address: userData.address || '',
            birth_date: formatDate(userData.birth_date) || '',
          };
          setUserInfo(cleanedData);
          setFormData(cleanedData);
        }
      } catch (error) {
        console.log('Error Fetching User info: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchuserInfo();
  }, []);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const isFormChanged = JSON.stringify(formData) !== JSON.stringify(userInfo);

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();

    const { error } = profileSchema.validate(formData, { abortEarly: false });
    if (error) {
      console.log(error);
      error.details.forEach((err) => toast.error(err.message));
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        '/auth/update-profile',
        {
          names: formData.names,
          email: formData.email,
          phone_number: formData.phone_number,
          city: formData.city,
          country: formData.country,
          address: formData.address,
          birth_date: formData.birth_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (response.status == 200) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error.response?.data?.error || 'Updating User Profile failed');
    } finally {
      setIsLoading(false);
    }
  };

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const handlePasswordChange = (e: any) => {
    setPasswordData({
      ...passwordData,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('New password and confirm password do not match!');
      return;
    }

    try {
      const response = await axios.put(
        '/auth/change-password',
        {
          currentPassword: passwordData.current_password,
          newPassword: passwordData.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Password change failed');
    }
  };

  const isChangePasswordValid =
    passwordData.current_password.trim() !== '' &&
    passwordData.new_password.trim() !== '' &&
    passwordData.confirm_password.trim() !== '';

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-8 sm:px-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{t('profile_title')}</h1>
            <p className="mt-2 text-indigo-100 text-sm sm:text-base max-w-2xl">
              {t('profile_desc')}
            </p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="names" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('name_label')}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="names"
                      value={formData.names}
                      onChange={handleChange}
                      // placeholder="Rukundo Eric"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('email_label')}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('country_label')}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Rwanda"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('city_label')}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Umugi"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="birth_date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('birthdate_label')}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="date"
                      id="birth_date"
                      value={formData.birth_date}
                      max={today}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('phone_number_label')}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('address_label')}
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Kigali, Rwanda"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
              <motion.button
                onClick={handleUpdateProfile}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!isFormChanged}
                className={`inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-colors duration-200 ${
                  !isFormChanged ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  t('update_profile_button')
                )}
                <svg
                  className="ml-2 -mr-1 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.button>
            </div>
            <h2 className="mt-10 text-lg font-bold text-gray-800">{t('change_password')}</h2>
            <form onSubmit={handleChangePassword}>
              <input
                required
                type="password"
                value={passwordData.current_password}
                id="current_password"
                placeholder={t('current_password')}
                onChange={handlePasswordChange}
                className="w-full border px-4 py-2 rounded mt-3"
              />
              <input
                required
                type="password"
                value={passwordData.new_password}
                id="new_password"
                placeholder={t('new_password')}
                onChange={handlePasswordChange}
                className="w-full border px-4 py-2 rounded mt-3"
              />
              <input
                required
                type="password"
                value={passwordData.confirm_password}
                id="confirm_password"
                placeholder={t('confirm_new_password')}
                onChange={handlePasswordChange}
                className="w-full border px-4 py-2 rounded mt-3"
              />
              <button
                type="submit"
                className={`mt-4 bg-indigo-600 text-white py-2 px-6 rounded shadow hover:bg-indigo-700 ${
                  !isChangePasswordValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
              >
                {t('update_password')}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Settings;
