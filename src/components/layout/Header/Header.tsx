"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

import styles from "./Header.module.css";

const navLinks = [
  { label: "Проекты", href: "#projects" },
  { label: "Услуги", href: "#services" },
  { label: "О компании", href: "#about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={[
        styles.header,
        isScrolled ? styles.scrolled : styles.transparent,
        menuOpen ? styles.menuOpen : "",
      ].join(" ")}
    >
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="ALPIX — главная страница"
          onClick={closeMenu}
        >
          ALPIX
        </Link>

        <nav className={styles.desktopNav} aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className={styles.headerCta}>
          Обсудить проект
          <ArrowUpRight size={15} strokeWidth={1.7} />
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav
          id="mobile-navigation"
          className={[
            styles.mobileNav,
            menuOpen ? styles.mobileNavOpen : "",
          ].join(" ")}
          aria-label="Мобильная навигация"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={closeMenu}
            >
              {link.label}
              <ArrowUpRight size={17} />
            </a>
          ))}

          <a
            href="#contact"
            className={styles.mobileCta}
            onClick={closeMenu}
          >
            Обсудить проект
            <ArrowUpRight size={17} />
          </a>
        </nav>
      </div>
    </header>
  );
}