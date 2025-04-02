export default function Environments() {
  const environments = [
    {
      name: "Quantum Laboratory",
      description:
        "A research facility where reality constantly shifts between multiple states. Walls and passages appear and disappear based on observation principles.",
      image: "/morphic-destroyer-fps.jpeg",
    },
    {
      name: "Neo-Tokyo Dreamscape",
      description:
        "A cyberpunk cityscape that reacts to your emotional state. The environment becomes more chaotic as your combat intensity increases.",
      image: "/void-reaver-fps.jpeg",
    },
    {
      name: "Fractal Wilderness",
      description:
        "A natural environment that repeats its patterns at different scales. Navigate through recursive landscapes that challenge spatial perception.",
      image: "/neural-disruptor-fps.jpeg",
    },
  ];

  return (
    <section id="environments" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-orbitron animate-on-scroll">
          UPCOMING <span className="text-red-500">ENVIRONMENTS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {environments.map((env, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl animate-on-scroll"
            >
              <img
                src={env.image}
                alt={env.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold mb-2 font-rajdhani">
                  {env.name}
                </h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {env.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto animate-on-scroll">
            Each environment is meticulously crafted to challenge your
            perception and adapt to your gameplay style. The more you play, the
            more the game learns about you, creating a truly personalized FPS
            experience.
          </p>

          <div className="inline-block relative animate-on-scroll">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
            <a href="https://alstudd.itch.io/fps" target="_blank">
              <button className="cursor-pointer relative bg-black rounded-lg px-8 py-4 text-xl font-bold">
                PLAY NOW
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
