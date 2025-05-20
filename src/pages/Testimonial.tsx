import { useTranslation } from 'react-i18next';
import TestimonialCard from '../components/TestimonialCard';
import { TestimonialData } from '../utils/TestimonialData';

const Testimonial = () => {
  const {t} = useTranslation()
  return (
    <div className="px-4 py-8 bg-gray-50">
      <p className="text-center font-bold text-3xl underline text-gray-800 py-4">
        {t("testimonial_header")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 items-center justify-items-center">
        {TestimonialData.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            name={testimonial.name}
            initials={testimonial.initials}
            rating={testimonial.rating}
            text={testimonial.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
