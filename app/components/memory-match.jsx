"use client";
import Loading from '../loading';
import { useState, useEffect } from 'react';

export default function MemoryMatch() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wrongMoves, setWrongMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  const GAME_DURATION = 60;

  const shuffleCards = () => {
    const cardValues = [
      '🍊', '🍊', '🍋', '🍋', '🍏', '🍏', '🍎', '🍎',
      '🍍', '🍍', '🍉', '🍉', '🍓', '🍓', '🥝', '🥝'
    ];
    cardValues.sort(() => Math.random() - 0.5);
    const newCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
  };

  const handleCardClick = (id) => {
    if (gameOver || flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    if (!timerStarted) setTimerStarted(true);

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;

      if (cards[firstId].value === cards[secondId].value) {
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setMatchedCards((prev) => [...prev, firstId, secondId]);
        setCards(newCards);
        setFlippedCards([]);

        if (newCards.every((card) => card.isMatched)) {
          endGame(true);
        }
      } else {
        setWrongMoves((prev) => prev + 1);
        setTimeout(() => {
          newCards[firstId].isFlipped = false;
          newCards[secondId].isFlipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const endGame = (didWin) => {
    const matchedPairs = matchedCards.length / 2 + (didWin ? 1 : 0);
    const rawScore = (matchedPairs * 10) + (timeLeft * 1.5) - (wrongMoves * 1);
    const percentage = Math.max(0, Math.min(100,
      Math.round((rawScore / ((8 * 10) + (GAME_DURATION * 1.5))) * 100)
    ));

    setScore(percentage);
    setWin(didWin);
    setGameOver(true);
  };

  const resetGame = () => {
    setLoading(true);
    setMatchedCards([]);
    setFlippedCards([]);
    setWrongMoves(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
    setWin(false);
    setScore(0);
    setTimerStarted(false);
    shuffleCards();
    setTimeout(() => setLoading(false), 300); // small delay so shuffle finishes
  };

  useEffect(() => {
    shuffleCards();
    setTimeout(() => setLoading(false), 300); // initial load delay
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && timerStarted) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !gameOver && timerStarted) {
      endGame(false);
    }
  }, [timeLeft, gameOver, timerStarted]);

  return (
    <div className="game-wrapper">
      {loading ? (
        <div className="game-container">
          <Loading />
        </div>
      ) : (
        <div className="game-container">
          <h3 className="game-title">Memory Match Game</h3>
          <div className="game-content">
            {gameOver ? (
              <div className="game-end-screen">
                <h2>{win ? '🎉 You Won!' : '⏳ Time is up! Game Over'}</h2>
                <p className="game-score">Score: {score}%</p>
                <button onClick={resetGame} className="game-retry">🔄 Play Again</button>
              </div>
            ) : (
              <div className="game-cards-grid">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`game-card ${card.isFlipped ? 'flipped' : ''}`}
                    onClick={() => handleCardClick(index)}
                  >
                    {card.isFlipped || card.isMatched ? card.value : '❓'}
                  </div>
                ))}
              </div>
            )}
          </div>

          {!gameOver && (
            <div className="game-bottom-bar">
              <span className={`game-timer ${timeLeft <= 10 ? 'game-low-time' : ''}`}>
                ⏱ {timeLeft}s
              </span>
              <button onClick={resetGame} className="game-restart-btn">🔄</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}