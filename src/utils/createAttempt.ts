import axios from '../config/axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const token = sessionStorage.getItem("token");

export const createUserExamAttempt = async (score:any) => {
    try {
      const response = await axios.post('/attempts/new',
        {
            score:score
        },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true,
      }
    );

    const responseData = response.data;
    return responseData;
     
    } catch (error:any) {
      console.log(error)

      toast.error(error.response?.data?.error || "Saving User Exam attempts failed");
    } 
  };