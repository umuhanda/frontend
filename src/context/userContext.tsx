import React, { createContext, useContext, useState, useEffect } from 'react';
import { getuserInfo } from '../utils/getUserInfo';
import { getuserAttempts } from '../utils/getuserAttempts';
import axios from '../config/axios';
import io from 'socket.io-client';
import PaymentSuccessModal from '../components/PaymentSuccess';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
});

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [hasAccessToDownloadGazette, setHasAccessToDownloadGazette] = useState(false);
  const [attempts, setAttempts] = useState({
    totalAttempts: 0,
    maxScore: 0,
    attemptsLeft: '0',
    leftAttempts: 0,
    unLimited: false,
  });

  const [loading, setLoading] = useState(true);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);

  const fetchUser = async () => {
    const data = await getuserInfo();
    setUser(data);
    setLoading(false);
  };

  const fetchAttempts = async () => {
    try {
      const attemptsData = await getuserAttempts();
      const userData = await getuserInfo();
      if (
        attemptsData &&
        userData?.active_subscription &&
        new Date(userData.active_subscription?.end_date).getTime() > Date.now()
      ) {
        let attemptsFromSub = userData.active_subscription?.attempts_left || 0;
        if (userData.hasFreeTrial) {
          attemptsFromSub += 1;
        }
        setHasAccessToDownloadGazette(userData.allowedToDownloadGazette);

        const finalAttemptsLeft =
          userData.active_subscription?.attempts_left == null ? 'Unlimited' : attemptsFromSub;

        setAttempts({
          totalAttempts: attemptsData.totalAttempts,
          maxScore: attemptsData.maxScore,
          attemptsLeft: finalAttemptsLeft,
          leftAttempts: attemptsFromSub,
          unLimited: userData.active_subscription?.attempts_left == null,
        });
      }
    } catch (err) {
      console.error('❌ Error fetching attempts:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const channel = `user:updated:${user._id}`;

    const handleUpdate = async (payload: { type: string; data?: any }) => {
      console.log('🔄 User updated via socket');
      const freshUser = await getuserInfo();
      setUser(freshUser);
      if (payload?.type === 'gazette') {
        toast.success('📄 Payment successful! You can now download the gazette.');
        fetchAttempts();
      } else if (payload?.type === 'subscription') {
        navigate('/client');
        fetchUser();
        fetchAttempts();
        setIsPaymentSuccessOpen(true);
      }
    };

    socket.on(channel, handleUpdate);

    return () => {
      socket.off(channel, handleUpdate);
    };
  }, [user?._id]);

  const updateActiveSubscription = async (subId: string) => {
    try {
      await axios.post(
        '/user-subscription/change-active',
        { subscription_id: subId },
        {
          withCredentials: true,
        },
      );

      // 🔁 Re-fetch fresh user data from backend
      const freshUser = await getuserInfo();
      setUser(freshUser);
    } catch (error) {
      console.error('❌ Error updating active subscription:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        updateActiveSubscription,
        loading,
        attempts,
        hasAccessToDownloadGazette,
        fetchAttempts,
      }}
    >
      {children}
      <PaymentSuccessModal
        isOpen={isPaymentSuccessOpen}
        onClose={() => setIsPaymentSuccessOpen(false)}
      />
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
