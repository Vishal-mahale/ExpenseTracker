import React from "react";
const BouncingDotsLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
      <style>{`
        @keyframes bounce-dots {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .bounce-dot { animation: bounce-dots 1.2s ease-in-out infinite; }
        .bounce-dot:nth-child(2) { animation-delay: 0.2s; }
        .bounce-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      <div className="flex gap-3">
        <div className="bounce-dot w-3 h-3 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full"></div>
        <div className="bounce-dot w-3 h-3 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full"></div>
        <div className="bounce-dot w-3 h-3 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default BouncingDotsLoader;