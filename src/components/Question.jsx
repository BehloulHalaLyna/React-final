import { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import he from 'he';

export const Question = ({ question, onNextQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const { score, setScore } = useQuiz();
  
  // Stocker l'ordre des réponses une seule fois par question
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    setShuffledAnswers(
      [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
    );
  }, [question]); // Met à jour uniquement quand la question change

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === question.correct_answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      onNextQuestion();
    }, 1500);
  };

  const getButtonClass = (answer) => {
    if (!isAnswered) return 'bg-blue-500 hover:bg-blue-600';
    if (answer === question.correct_answer) return 'bg-green-500';
    if (answer === selectedAnswer) return 'bg-red-500';
    return 'bg-blue-500 opacity-50';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{he.decode(question.question)}</h2>
      <div className="space-y-3">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            disabled={isAnswered}
            className={`w-full p-3 text-white rounded-lg transition-colors ${getButtonClass(answer)}`}
          >
            {he.decode(answer)}
          </button>
        ))}
      </div>
    </div>
  );
};
