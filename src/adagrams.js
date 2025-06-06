const LETTER_POOL = {
    A: 9, B: 2, C: 2, D: 4, E: 12,
    F: 2, G: 3, H: 2, I: 9, J: 1,
    K: 1, L: 4, M: 2, N: 6, O: 8,
    P: 2, Q: 1, R: 6, S: 4, T: 6,
    U: 4, V: 2, W: 2, X: 1, Y: 2,
    Z: 1,
  };

const SCORE_CHART = {
    A: 1, B: 3, C: 3, D: 2, E: 1,
    F: 4, G: 2, H: 4, I: 1, J: 8,
    K: 5, L: 1, M: 3, N: 1, O: 1,
    P: 3, Q: 10, R: 1, S: 1, T: 1,
    U: 1, V: 4, W: 4, X: 8, Y: 4,
    Z: 10,
  };

// ----- Wave 1 -----
export const drawLetters = () => {
  const letterPool = [];

  for (const[letter, count] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i < count; i++) {
      letterPool.push(letter);
    }
  }

  const hand = [];

  while (hand.length < 10) {
    const randomIndex = Math.floor(Math.random() * letterPool.length);
    const letter = letterPool[randomIndex];
    hand.push(letter);
    letterPool.splice(randomIndex, 1);
  }

  return hand;
};

// ----- Wave 2 -----
export const usesAvailableLetters = (input, lettersInHand) => {
  const letterCounts = {};

  for (const letter of lettersInHand) {
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  for (const letter of input.toUpperCase()) {
    if (!letterCounts[letter]) {
      return false;
    }
    letterCounts[letter] -= 1;
  }

  return true;
};

// ----- Wave 3 -----
export const scoreWord = (word) => {
  let score = 0;

  for (const letter of word.toUpperCase()) {
    score += SCORE_CHART[letter] || 0;
  }
  if (word.length >= 7 && word.length <= 10) {
    score += 8;
  }

  return score;
};

// ----- Wave 4 -----
export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let bestWord = '';

  for (const word of words) {
    const currentScore = scoreWord(word);

    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestWord = word;

    } else if (currentScore === highestScore) {
      const isBestWord10 = bestWord.length === 10;
      const isCurrentWord10 = word.length === 10;

      if (!isBestWord10 && (isCurrentWord10 || word.length < bestWord.length)) {
        bestWord = word;
      }
    }
  }

  return { word: bestWord, score: highestScore };
};
