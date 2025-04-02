import { useEffect, useRef } from "react";

export default function GameFeatures() {
  const featuresRef = useRef([]);

  const features = [
    {
      icon: "💥",
      title: "Adaptive Weapons",
      description:
        "Your arsenal evolves based on your playstyle, adapting to your tactical preferences and combat decisions.",
    },
    {
      icon: "🌀",
      title: "Reality Bending",
      description:
        "Navigate through environments that shift and transform, challenging your perception and strategy.",
    },
    {
      icon: "🧠",
      title: "Enemy AI",
      description:
        "Face intelligent foes that learn from your tactics and develop counter-strategies in real time.",
    },
    {
      icon: "🔄",
      title: "Dynamic Progression",
      description:
        "Experience a non-linear gameplay where your choices directly affect the world around you.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-orbitron animate-on-scroll">
          GAME <span className="text-red-500">FEATURES</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featuresRef.current[index] = el)}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 transition-all duration-300 hover:border-red-500 hover:transform hover:scale-105 animate-on-scroll"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 font-rajdhani">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gray-900/30 border border-gray-800 rounded-xl p-8 animate-on-scroll">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-3xl font-bold mb-4 font-orbitron">
                SOLO EXPERIENCE LIKE NEVER BEFORE
              </h3>
              <p className="text-gray-300 mb-6">
                Immerse yourself in a groundbreaking solo FPS experience where
                the line between player and game blurs. Your decisions shape not
                just the outcome, but the entire gameplay experience.
              </p>
              <ul className="space-y-2">
                {[
                  "Procedural Level Generation",
                  "Unique Weapon Evolution System",
                  "Psychological Horror Elements",
                  "Multiple Ending Paths",
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-red-500 mr-2">▶</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-lg overflow-hidden w-full max-w-md relative">
                <img
                  src="/api/placeholder/600/400"
                  alt="Gameplay Features"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full flex items-center transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Watch Gameplay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
