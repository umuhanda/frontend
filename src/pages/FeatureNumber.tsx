import { PiStudentLight } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa6";
import { MdOutlinePlayLesson } from "react-icons/md";
import { useTranslation } from "react-i18next";


const featuresData = [
  {
    id: 1,
    status: 3000,
    icon: <PiStudentLight className="w-10 h-10 text-blue-500" />,
    desc: "students",
  },
  {
    id: 2,
    status: 600,
    icon: <FaQuestion className="w-10 h-10 text-blue-500" />,
    desc: "lessons",
  },
  {
    id: 3,
    status: 400,
    icon: <MdOutlinePlayLesson className="w-10 h-10 text-blue-500" />,
    desc: "questions",
  },
];


const FeatureNumber = () => {
  const {t} = useTranslation()
  return (
    <div className="flex items-center space-x-8 justify-center py-8 bg-blue-100">
      {featuresData.map((feature) => {
        return (
          <div className="flex flex-row items-center space-x-2" key={feature.id}>
            {feature.icon}
            <div className="flex-col">
              <span className="text-xl font-bold">{feature.status}+</span>
              <p>{t(feature.desc)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureNumber;
