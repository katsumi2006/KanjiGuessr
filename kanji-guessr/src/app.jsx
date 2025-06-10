import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [progress, setProgress] = useState(0); // Progress percentage (0-100)
  const [guessCount, setGuessCount] = useState(0);
  const maxGuesses = 6;

  const isKanji = (str) => {
    // Regular expression to match only kanji characters
    // Excludes hiragana (3040-309F), katakana (30A0-30FF), and other non-kanji
    const kanjiRegex = /^[\u4e00-\u9faf\u3400-\u4dbf]+$/;
    
    // Check if it contains kanji range characters but not hiragana or katakana
    return kanjiRegex.test(str);
  };

  const handleGuess = () => {
    if (inputValue.trim() === '') {
      console.log('Please enter a character');
      return;
    }
    
    if (!isKanji(inputValue)) {
      console.log('Please enter only kanji characters');
      return;
    }
    
    // Increment guess count
    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);
    
    // TODO: Add actual game logic here
    // For now, just simulate progress increase
    const newProgress = Math.min(100, progress + 20);
    setProgress(newProgress);
    
    console.log(inputValue);
    setInputValue(''); // Clear input after guess
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const resetGame = () => {
    setProgress(0);
    setGuessCount(0);
    setInputValue('');
  };

  return (
    <div className="container">
      {/* Title */}
      <div className="title">
        <h1>漢字 ゲッサー</h1>
      </div>

      {/* Progress Bar Section */}
      <div className="progress-section">
        <div className="progress-info">
          <span className="progress-text">Progress: {progress}% revealed</span>
          <span className="guess-counter">Guesses: {guessCount}/{maxGuesses}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Kanji of the Day Display Box */}
      <div className="kanji-display-box">
        <div className="kanji-placeholder">
          漢
        </div>
      </div>

      {/* Input and Button Section */}
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a kanji"
          className="kanji-input"
          maxLength="1"
        />
        <button
          onClick={handleGuess}
          className="guess-button"
          disabled={guessCount >= maxGuesses}
        >
          Guess!
        </button>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <button
          onClick={toggleInstructions}
          className="control-button info-button"
        >
          How to Play
        </button>
        <button
          onClick={resetGame}
          className="control-button reset-button"
        >
          New Game
        </button>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="modal-overlay" onClick={toggleInstructions}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>How to Play KanjiGuessr</h2>
              <button className="close-button" onClick={toggleInstructions}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="instruction-item">
                <span className="instruction-number">1</span>
                <p>Guess the daily kanji in {maxGuesses} tries or less</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-number">2</span>
                <p>Each guess reveals matching radicals and semantic elements</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-number">3</span>
                <p>More matches = more clues revealed in the progress bar</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-number">4</span>
                <p>Use the revealed elements to deduce the target kanji</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-number">5</span>
                <p>A new kanji is available each day!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;