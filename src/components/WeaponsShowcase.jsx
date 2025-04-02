import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function WeaponsShowcase() {
  const [activeWeapon, setActiveWeapon] = useState(0);
  const containerRef = useRef(null);

  const weapons = [
    {
      name: "Morphic Destroyer",
      type: "Assault Rifle",
      description:
        "This adaptive rifle learns from your accuracy patterns and adjusts its firing mechanisms accordingly. Precision shots evolve it toward a marksman rifle, while rapid fire evolves it toward a higher-capacity automatic weapon.",
      stats: {
        damage: 75,
        range: 60,
        stability: 85,
        evolution: 100,
      },
      image: "/morphic-destroyer-fps.jpeg",
    },
    {
      name: "Void Reaver",
      type: "Shotgun",
      description:
        "A close-quarters powerhouse that creates micro reality distortions with each blast. The weapon's structure shifts based on your engagement distance, altering spread patterns and damage falloff.",
      stats: {
        damage: 90,
        range: 30,
        stability: 50,
        evolution: 95,
      },
      image: "/void-reaver-fps.jpeg",
    },
    {
      name: "Neural Disruptor",
      type: "Sniper Rifle",
      description:
        "This long-range precision weapon forms a neural link with the user. Extended use increases synchronization, enhancing bullet velocity and reducing sway based on your breathing rhythm.",
      stats: {
        damage: 95,
        range: 100,
        stability: 70,
        evolution: 85,
      },
      image: "/neural-disruptor-fps.jpeg",
    },
  ];

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(".weapon-stat-fill", {
        scaleX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      });
    }
  }, [activeWeapon]);

  return (
    <section
      id="weapons"
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-orbitron animate-on-scroll">
          UPCOMING <span className="text-red-500">ARSENAL</span>
        </h2>

        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          ref={containerRef}
        >
          <div className="lg:col-span-2 flex flex-col justify-center animate-on-scroll">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-3xl font-bold mb-2 font-rajdhani">
                {weapons[activeWeapon].name}
              </h3>
              <div className="text-red-500 font-medium mb-4">
                {weapons[activeWeapon].type}
              </div>
              <p className="text-gray-300 mb-6">
                {weapons[activeWeapon].description}
              </p>

              <div className="space-y-4">
                {Object.entries(weapons[activeWeapon].stats).map(
                  ([stat, value]) => (
                    <div key={stat} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 uppercase">{stat}</span>
                        <span className="text-white">{value}/100</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-red-400 weapon-stat-fill origin-left"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              {weapons.map((weapon, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeWeapon
                      ? "bg-red-500 scale-125"
                      : "bg-gray-600"
                  }`}
                  onClick={() => setActiveWeapon(index)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex items-center justify-center animate-on-scroll">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-purple-600/20 rounded-full filter blur-3xl"></div>
              <img
                src={weapons[activeWeapon].image}
                alt={weapons[activeWeapon].name}
                className="w-[600px] h-[600px] relative z-10 transform transition-all duration-700"
              />
              <div className="absolute -inset-4 border border-red-500/30 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
