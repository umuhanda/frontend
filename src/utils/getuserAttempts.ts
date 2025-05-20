import axios from '../config/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getuserAttempts = async () => {
  try {
    const response = await axios.get('/attempts', {
      withCredentials: true,
    });

    const responseData = response.data;
    return responseData;
  } catch (error: any) {
    console.log(error);

    toast.error(error.response?.data?.error || 'Fetching User Exam attempts failed');
  }
};
