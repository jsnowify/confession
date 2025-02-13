import JSConfetti from "js-confetti";
import { useEffect, useRef, useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const jsConfetti = useRef(null);
  const confettiInterval = useRef(null);

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
    return () => {
      clearInterval(confettiInterval.current);
    };
  }, []);

  const startConfettiLoop = () => {
    clearInterval(confettiInterval.current);

    confettiInterval.current = setInterval(() => {
      jsConfetti.current.addConfetti({
        emojis: ["🧡", "💙", "🩵", "🤍"],
        emojiSize: 30,
        confettiNumber: 100,
      });
    }, 2000);
  };

  const stopConfettiLoop = () => {
    clearInterval(confettiInterval.current);
  };

  const handleSearch = () => {
    setIsSearched(true);
    const cleanedInput = inputValue.toLowerCase().replace(/[^a-z]/g, "");

    if (cleanedInput === "mikkooctober") {
      setShowCard(true);
      startConfettiLoop();

      const correctAudio = new Audio("/song.mp3");
      correctAudio.loop = true;
      correctAudio.play();
    } else {
      setShowCard(false);
      stopConfettiLoop();
    }
  };

  useEffect(() => {
    if (inputValue.toLowerCase().replace(/[^a-z]/g, "") !== "mikkooctober") {
      stopConfettiLoop();
    }
  }, [inputValue]);

  const heartCount = 20;

  const generateHearts = () => {
    const hearts = [];
    for (let i = 0; i < heartCount; i++) {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomSize = Math.random() * 0.4 + 0.1;
      const randomRotation = Math.random() * 360;

      hearts.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FFF2F2"
          className="absolute"
          style={{
            width: `${randomSize * 30}px`,
            height: `${randomSize * 30}px`,
            top: `${randomY}%`,
            left: `${randomX}%`,
            transform: `rotate(${randomRotation}deg)`,
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    }
    return hearts;
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex justify-center items-center">
      {generateHearts()}
      <div className="flex flex-col gap-3 justify-center items-center px-4 w-full max-w-md">
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-center">
          CONFESSION
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="!bg-[#FFF2F2]/50 border border-[#2D336B] text-[#2D336B] text-center text-sm shadow-md rounded-[15px] focus:outline-none focus:ring-1 focus:ring-[#5964C3] w-full p-3"
            placeholder="Enter your name"
          />
          <button
            onClick={handleSearch}
            className="!bg-[#2D336B] hover:bg-[#4D5B9E] text-white font-semibold text-xs py-2.5 px-4 rounded-[15px] shadow-md cursor-pointer w-full sm:w-auto"
          >
            SEARCH
          </button>
        </div>

        {isSearched && showCard && (
          <div className="card !bg-[rgba(236,238,255,0.5)] p-6 pt-12 text-center text-[#2D336B] rounded-lg shadow-md w-full mt-5 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-8 h-8 text-[#2D336B] absolute top-3 left-1/2 transform -translate-x-1/2 bg-transparent"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none"
                stroke="currentColor"
              />
            </svg>
            <p className="mt-4">
              Hi Mikko, I don’t really know how to start this. I know you like
              someone else, and I’m not expecting you to respond. I just wanted
              to let you know that I’ve liked you since I first met you during
              intrams.
              <br />
              I never thought I could fall for someone new again after all the
              heartbreaks I went through that year. I promised myself I wouldn’t
              fall for another guy, but then I met you at that random event.
              HAHHA.
              <br />I like you, Mikko. All the posts I made were meant for you.
              I hope you’re doing okay. I’ll love you always and forever.
            </p>
          </div>
        )}

        {isSearched && !showCard && (
          <div className="card mt-5 !bg-[rgba(236,238,255,0.5)] p-4 uppercase text-center text-[#2D336B] rounded-lg shadow-md w-full">
            ops... wrong try again!
            <br />
            <br />
            hint: your name + birthmonth
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
