import { useLocation, useNavigate } from "react-router-dom";
import he from "he";

const Answers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, userAnswers } = location.state || {};

  if (!questions || !userAnswers) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
        <div className="max-w-md bg-opacity-10 backdrop-blur-lg border border-gray-600 p-6 rounded-2xl shadow-2xl text-white text-center">
          <h2 className="text-2xl font-bold text-cyan-400">⚠️ Aucune donnée disponible</h2>
          <p className="mt-4 text-lg">Il semble qu'aucune question ou réponse ne soit disponible pour ce quiz.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-cyan-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
          >
            🔄 Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-cyan-300">📜 Réponses du Quiz</h1>
      <div className="max-w-4xl w-full bg-opacity-10 backdrop-blur-lg border border-gray-600 p-8 rounded-2xl shadow-2xl text-white">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index] || "Aucune réponse";
          return (
            <div key={index} className="mb-6 p-4 border border-cyan-400 rounded-lg bg-gray-800 shadow-lg">
              <h2 className="font-bold text-lg mb-2 text-cyan-300">{he.decode(question.question)}</h2>
              <p className="mt-2 text-lg">
                <span className="font-semibold">Votre réponse : </span>
                <span className={`font-semibold ${
                  userAnswer === question.correct_answer ? "text-green-400" : "text-red-500"
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
          className="px-6 py-3 bg-cyan-500 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
        >
          🔄 Rejouer
        </button>
      </div>
    </div>
  );
};

export default Answers;
