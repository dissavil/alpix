"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import styles from "./Header.module.css";

const navLinks = [
  { label: "Проекты", href: "#projects" },
  { label: "Услуги", href: "#services" },
  { label: "О компании", href: "#about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");

    if (!hero) {
      setIsVisible(window.scrollY > 80);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`${styles.header} ${
        isVisible ? styles.visible : ""
      }`}
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="ALPIX — главная страница"
          onClick={closeMenu}
        >
          <span className={styles.brandName}>
            ALPIX
          </span>
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label="Основная навигация"
        >
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

        <button
          type="button"
          className={styles.menuButton}
          aria-label={
            menuOpen ? "Закрыть меню" : "Открыть меню"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        <nav
          id="mobile-navigation"
          className={`${styles.mobileNav} ${
            menuOpen ? styles.mobileNavOpen : ""
          }`}
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
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}