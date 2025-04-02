"use client";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import Header from "../components/Header";
import Hero from "../components/Hero";
import GameFeatures from "../components/GameFeatures";
import WeaponsShowcase from "../components/WeaponsShowcase";
import Environments from "../components/Environments";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import GamePreview from "@/components/GamePreview";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      initAnimations();
    }
  }, [loading]);

  const initAnimations = () => {
    gsap.from(".fade-in", {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.from(section.querySelectorAll(".animate-on-scroll"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
      });
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-black text-white overflow-hidden">
      <Head>
        <title>FPS by Alstudd Games | Reality-Bending FPS Experience</title>
        <meta
          name="description"
          content="Hunt enemies through reality-bending environments with weapons that evolve based on your playstyle in this groundbreaking FPS."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />

      <main>
        <Hero />
        <GameFeatures />
        <WeaponsShowcase />
        <GamePreview />
        <Environments />
      </main>

      <Footer />
    </div>
  );
}
