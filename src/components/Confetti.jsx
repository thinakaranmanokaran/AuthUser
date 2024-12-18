// Confetti.jsx
import { useState } from 'react';
import ReactConfetti from 'react-confetti';

function Confetti() {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleButtonClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Confetti stops after 3 seconds
  };

  return (
    <div className="flex flex-col  items-center justify-center">
      {showConfetti && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <button
        onClick={handleButtonClick}
        className="px-8 py-2 text-sm font-mono rounded-md bg-black text-white"
      >
        Celebrate 🎉
      </button>
    </div>
  );
}

export default Confetti;
