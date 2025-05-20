import { useParams, useNavigate } from "react-router";
import Layout from "./Layout";
import { courses } from "../../../utils/Courses";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const course = courses.find((course) => course.id === parseInt(id || ""));
  const notes = course?.notes || [];

  const handleNext = () => {
    const nextIndex = currentNoteIndex + 1;
    if (nextIndex < notes.length) {
      setCurrentNoteIndex(nextIndex);
    }
  };

  const handleFinish = () => {
    console.log("Finish clicked - triggering confetti!");
    setShowConfetti(true);
    
    // Hide confetti and navigate after 3 seconds
    setTimeout(() => {
      setShowConfetti(false);
      navigate("/client/lessons");
    }, 3000);
  };

  return (
    <Layout>
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={500}
          recycle={false}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: 'none'
          }}
        />
      )}
      
      <div className="p-6 space-y-6 relative">
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          {course?.title || "Lesson"}
        </h1>
        
        {notes.length > 0 ? (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={notes[currentNoteIndex].image}
              alt={`Note ${currentNoteIndex + 1}`}
              className="w-64 h-64 object-cover rounded-lg"
            />
            <p className="text-gray-700 text-lg">
              {notes[currentNoteIndex].description}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No notes available.</p>
        )}

        <div className="flex justify-center">
          {currentNoteIndex < notes.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-3 text-lg font-bold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all"
            >
              Finish
            </button>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Current Note: {currentNoteIndex + 1} / {notes.length}</p>
          {showConfetti && <p>Confetti active!</p>}
        </div>
      </div>
    </Layout>
  );
};

export default Lesson;