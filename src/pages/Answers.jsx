import { useLocation, useNavigate } from "react-router-dom";
import he from "he";

const Answers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, userAnswers } = location.state || {};

  if (!questions || !userAnswers) {
    return <div className="text-center text-xl">Aucune donnée disponible.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">📜 Réponses du Quiz</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index] || "Aucune réponse";
          return (
            <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-100 shadow-sm">
              <h2 className="font-bold text-lg mb-2">{he.decode(question.question)}</h2>
              <p className="mt-2 text-lg">
                <span className="font-semibold">Votre réponse : </span>
                <span className={`font-semibold ${
                  userAnswer === question.correct_answer ? "text-green-600" : "text-red-500"
                }`}>
                  {he.decode(userAnswer)}
                </span>
              </p>
              <p className="mt-1 text-lg">
                <span className="font-semibold">Bonne réponse : </span>
                <span className="text-green-600 font-semibold">{he.decode(question.correct_answer)}</span>
              </p>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700"
        >
          🔄 Rejouer
        </button>
      </div>
    </div>
  );
};

export default Answers;
