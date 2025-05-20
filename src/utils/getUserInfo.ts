import axios from '../config/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getuserInfo = async () => {
  try {
    const response = await axios.get('/auth/info', {
      withCredentials: true,
    });

    const responseData = response.data.user;
    return responseData;
  } catch (error: any) {
    console.log(error);

    toast.error(error.response?.data?.error || 'Fetching User Profile failed');
  }
};
