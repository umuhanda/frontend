import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import LanguageSwitcher from '../../../../components/LanguageSwitcher';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import axios from '../../../../config/axios';
import { toast } from 'react-toastify';
import { useUser } from '../../../../context/userContext';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, fetchUser, updateActiveSubscription } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };
    fetchData();
  }, [user?.active_subscription?._id]);

  const [activeSubscriptionId, setActiveSubscriptionId] = useState(
    user?.active_subscription?._id || '',
  );

  const handleActiveChange = async (e: any) => {
    const selectedId = e.target.value;
    setActiveSubscriptionId(selectedId);

    try {
      const response = await axios.post('/user-subscription/change-active', {
        subscription_id: selectedId,
      });
      updateActiveSubscription(selectedId);
      if (response.status == 200) {
        toast.success('Active subscription changed!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex justify-between items-center w-full px-6 py-4 border-b border-slate-200 bg-white shadow-sm">
      {/* User Info Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-lg font-bold text-gray-800">{user?.names}</h1>
        <p className="text-sm text-gray-500">{t('welcome')}</p>
      </div>

      {/* Center element */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <LanguageSwitcher />
      </div>

      {/* Icon Section */}
      <div className="flex space-x-6 items-center">
        {/* Notification Icon */}
        <button
          aria-label="Notifications"
          className="relative group focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 rounded-full p-1"
        >
          <IoIosCheckmarkCircleOutline className="text-gray-600 group-hover:text-blue-500 text-2xl transition duration-300 ease-in-out" />
        </button>
        {user?.subscriptions?.length > 0 ? (
          <select
            className="border bg-inherit border-blue-300 rounded-md p-1 text-sm"
            onChange={handleActiveChange}
            value={activeSubscriptionId}
          >
            {user.subscriptions.map((sub: any) => (
              <option key={sub._id} value={sub._id}>
                {sub.subscription?.name || `Subscription ${sub._id}`}
                {sub._id === activeSubscriptionId && ' ✅'}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-sm text-red-500 italic">{t('no_subs')}</span>
        )}
        {/* Settings Icon */}
        <button
          aria-label="Settings"
          onClick={() => navigate('/client/settings')}
          className="focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 rounded-full p-1"
        >
          <IoSettingsOutline className="text-gray-600 hover:text-blue-500 text-2xl transition duration-300 ease-in-out" />
        </button>
      </div>
    </header>
  );
};

export default Header;
