"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sequenceRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sequence = sequenceRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const content = contentRef.current;
    const bottom = bottomRef.current;

    if (!sequence || !stage || !frame || !content || !bottom) {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
      () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sequence,
            start: "top top",

            // Протяжённость scroll-driven сцены.
            end: () => `+=${Math.round(window.innerHeight * 0.75)}`,

            // Закрепляем сцену, а анимируем её вложенные элементы.
            pin: stage,
            pinSpacing: false,

            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Фотография уменьшается, вокруг открывается фон.
        timeline.fromTo(
          frame,
          {
            scale: 1,
            borderRadius: "0px",
          },
          {
            scale: 0.88,
            borderRadius: "22px",
            duration: 1,
            ease: "none",
          },
          0,
        );

        // 2. Заголовок и описание уходят независимо от фотографии.
        timeline.to(
          content,
          {
            autoAlpha: 0,
            y: -24,
            duration: 0.2,
            ease: "none",
          },
          0.76,
        );

        // 3. Нижняя строка исчезает чуть раньше.
        timeline.to(
          bottom,
          {
            autoAlpha: 0,
            y: -10,
            duration: 0.16,
            ease: "none",
          },
          0.68,
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      },
    );

    return () => media.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sequenceRef}
      className={styles.heroSequence}
      aria-labelledby="hero-title"
    >
      <div ref={stageRef} className={styles.heroStage}>
        <div className={styles.heroFrame} ref={frameRef} aria-hidden="true">
          <div className={styles.heroMedia} />

          <div className={styles.heroOverlay} />

          <div className={styles.dots} />
        </div>

        <div ref={contentRef} className={styles.content}>
          <div className={styles.copy}>
            <h1 id="hero-title" className={styles.title}>
              ALPIX
            </h1>

            <p className={styles.description}>
              Девелопмент и строительство жилой недвижимости:
              от земли и концепции — до продаж и ввода в эксплуатацию.
            </p>
          </div>
        </div>

        <div ref={bottomRef} className={styles.heroBottom}>
          <span className={styles.location}>
            Алматы · Алматинская область
          </span>

          <a href="#projects" className={styles.scrollCue}>
            Исследовать
            <ArrowDown size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}