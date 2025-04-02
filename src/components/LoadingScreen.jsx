import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 10);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="w-32 h-32 mb-8 mr-3 bg-red-600 rounded-sm flex items-center justify-center">
        <span className="text-5xl font-bold">F</span>
      </div>
      <h1 className="text-5xl font-bold text-red-500 mb-8 font-orbitron">
        FPS
      </h1>
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-600 to-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-4 text-xl text-gray-400 font-rajdhani">
        {progress}% LOADED
      </p>
    </div>
  );
}
