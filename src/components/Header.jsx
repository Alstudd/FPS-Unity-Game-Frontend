import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3 bg-red-600 rounded-sm flex items-center justify-center">
            <span className="text-xl font-bold">F</span>
          </div>
          <span className="text-xl font-bold font-orbitron">FPS</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            className="text-gray-300 hover:text-red-500 transition-colors font-rajdhani"
          >
            HOME
          </a>
          <a
            href="#features"
            className="text-gray-300 hover:text-red-500 transition-colors font-rajdhani"
          >
            FEATURES
          </a>
          <a
            href="#weapons"
            className="text-gray-300 hover:text-red-500 transition-colors font-rajdhani"
          >
            WEAPONS
          </a>
          <a
            href="#environments"
            className="text-gray-300 hover:text-red-500 transition-colors font-rajdhani"
          >
            ENVIRONMENTS
          </a>
        </nav>

        <div className="flex items-center">
          <a
            href="https://alstudd.itch.io/fps"
            target="_blank"
            className="cursor-pointer bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 rounded font-medium hover:from-red-700 hover:to-red-900 transition-all font-rajdhani"
          >
            PLAY NOW
          </a>

          <button
            className="ml-4 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-2">
              <span
                className={`block w-8 h-0.5 bg-white transform transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-white transform transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 md:hidden`}
      >
        <button
          className="absolute top-6 right-6"
          onClick={() => setMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <nav className="flex flex-col items-center space-y-8">
          <a
            href="#home"
            className="text-2xl font-bold text-white hover:text-red-500 transition-colors font-rajdhani"
            onClick={() => setMenuOpen(false)}
          >
            HOME
          </a>
          <a
            href="#features"
            className="text-2xl font-bold text-white hover:text-red-500 transition-colors font-rajdhani"
            onClick={() => setMenuOpen(false)}
          >
            FEATURES
          </a>
          <a
            href="#weapons"
            className="text-2xl font-bold text-white hover:text-red-500 transition-colors font-rajdhani"
            onClick={() => setMenuOpen(false)}
          >
            WEAPONS
          </a>
          <a
            href="#environments"
            className="text-2xl font-bold text-white hover:text-red-500 transition-colors font-rajdhani"
            onClick={() => setMenuOpen(false)}
          >
            ENVIRONMENTS
          </a>
          <button className="mt-6 bg-gradient-to-r from-red-600 to-red-800 text-white px-10 py-3 rounded-lg font-bold text-xl font-rajdhani">
            PLAY NOW
          </button>
        </nav>
      </div>
    </header>
  );
}
