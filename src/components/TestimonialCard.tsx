import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  initials: string;
  rating: number;
  text: string;
}

const TestimonialCard = ({ name, initials, rating, text }: TestimonialCardProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <motion.div
      className="w-full sm:w-80 space-y-4 shadow-md rounded-md bg-white "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4 p-6">
        <div className="flex">
          {[...Array(fullStars)].map((_, index) => (
            <motion.div key={index} whileHover={{ scale: 1.2 }}>
              <FaStar className="text-blue-700" />
            </motion.div>
          ))}
          {hasHalfStar && <CiStar className="text-gray-400" />}
        </div>
        <p>{rating}/5</p>
      </div>
      <p className="p-6 text-sm text-gray-700">{text}</p>
      <div className="pt-4 bg-blue-500 rounded-ss-3xl rounded-tr-3xl flex space-x-4 p-4 items-center ">
        <div className="rounded-full bg-white text-blue-500 p-2 flex items-center justify-center w-8 h-8">
          {initials}
        </div>
        <div className="text-white">{name}</div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
