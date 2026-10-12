import Header from "@/components/layout/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Audiences from "@/components/sections/Audiences/Audiences";
import Projects from "@/components/sections/Projects/Projects";
import Services from "@/components/sections/Services/Services";
import Advantages from "@/components/sections/Advantages/Advantages";
import Geography from "@/components/sections/Geography/Geography";
import Contact from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Header />

      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Audiences />
        <Services />
        <Advantages />
        <Geography />
        <Contact />
      </main>

      <footer className="site-footer">
        © 2026 ALPIX · Строительная компания
      </footer>
    </>
  );
}
