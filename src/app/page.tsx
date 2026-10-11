'use client'

import Header from "@/components/layout/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Audiences from "@/components/sections/Audiences/Audiences";
import Projects from "@/components/sections/Projects/Projects";
import Services from "@/components/sections/Services/Services";
import Advantages from "@/components/sections/Advantages/Advantages";
import Geography from "@/components/sections/Geography/Geography";
import Contact from "@/components/sections/Contact/Contact";
import DevelopmentStory from "@/components/sections/DevelopmentStory/DevelopmentStory";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main">
        <Hero />
        <DevelopmentStory />
        <About />
        <Audiences />
        <Projects />
        <Services />
        <Advantages />
        <Geography />
        <Contact />
      </main>

      <footer
        style={{
          padding: "22px var(--page-gutter)",
          color: "var(--alpix-text-light-muted)",
          background: "var(--alpix-green-dark)",
          fontSize: "12px",
        }}
      >
        © {new Date().getFullYear()} ALPIX · Строительная компания
      </footer>
    </>
  );
}