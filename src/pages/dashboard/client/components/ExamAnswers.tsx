import { useEffect, useMemo, useState } from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router";

const ExamAnswers = () => {
  const [answers, setAnswers] = useState<Array<{ question: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }>>([]);
  const navigate = useNavigate();
 // Memoize test mode check
  const isTestMode = useMemo(() => {
    return location.pathname.split('/').includes('test');
  }, [location.pathname]);

  useEffect(() => {
    const localStorageKey = isTestMode ? "examTestAnswers" : "examAnswers";
    const storedAnswers = localStorage.getItem(localStorageKey);
  
    if (storedAnswers) {
      try {
        setAnswers(JSON.parse(storedAnswers));
      } catch (error) {
        console.error("Error parsing stored answers from localStorage:", error);
      }
    }
  }, [isTestMode]); 
  
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Ibisubizo By'Ikizamini</h1>

        {answers.length === 0 ? (
          <p>Nta bisubizo bibonetse.</p>
        ) : (
          <ul className="space-y-4">
            {answers.map((ans, index) => (
              <li key={index} className="border p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">{ans.question}</h2>
                <p className={ans.isCorrect ? "text-green-600" : "text-red-600"}>
                  <strong>Wahisemo:</strong> {ans.selectedAnswer}
                </p>
                <p className="font-semibold">Igisubizo cy’ukuri: {ans.correctAnswer}</p>
              </li>
            ))}
          </ul>
        )}

        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => navigate("/client/exam")}>
          Subira Ahabanza
        </button>
      </div>
    </Layout>
  );
};

export default ExamAnswers;
