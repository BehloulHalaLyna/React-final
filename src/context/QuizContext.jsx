import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setGameOver(false);
  };

  return (
    <QuizContext.Provider
      value={{
        score,
        setScore,
        currentQuestion,
        setCurrentQuestion,
        gameOver,
        setGameOver,
        resetQuiz,
        playerName,
        setPlayerName,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};