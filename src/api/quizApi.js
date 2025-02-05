import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';
const CATEGORIES_URL = 'https://opentdb.com/api_category.php';
const LEADERBOARD_URL = 'https://opentdb.com/api_token.php?command=request';

// Simulated leaderboard data storage
let leaderboardData = [];

export const fetchQuestions = async ({ amount = 10, category, difficulty }) => {
  let url = `${BASE_URL}?amount=${amount}`;
  if (category) url += `&category=${category}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  
  const response = await axios.get(url);
  if (response.data.response_code !== 0) {
    throw new Error('Failed to fetch questions');
  }
  return response.data.results;
};

export const fetchCategories = async () => {
  const response = await axios.get(CATEGORIES_URL);
  return response.data.trivia_categories;
};

export const getSessionToken = async () => {
  const response = await axios.get(LEADERBOARD_URL);
  return response.data.token;
};

export const saveScore = (playerName, score, category, difficulty) => {
  const newScore = {
    id: Date.now(),
    playerName,
    score,
    category,
    difficulty,
    date: new Date().toISOString(),
  };
  leaderboardData = [...leaderboardData, newScore].sort((a, b) => b.score - a.score);
  return newScore;
};

export const getLeaderboard = () => {
  return leaderboardData;
};