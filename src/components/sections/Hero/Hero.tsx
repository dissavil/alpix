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
  const metaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sequence = sequenceRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const content = contentRef.current;
    const meta = metaRef.current;

    if (!sequence || !stage || !frame || !content || !meta) {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              id: "alpix-hero-sequence",
              trigger: sequence,
              start: "top top",
              end: () => "+=" + Math.round(window.innerHeight * 1.2),
              pin: stage,
              // The sequence height equals the pin duration, so extra pin
              // spacing would insert an unnecessary blank viewport.
              pinSpacing: false,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline.fromTo(
            frame,
            { scale: 1, borderRadius: "0px" },
            {
              scale: 0.88,
              borderRadius: "22px",
              duration: 1,
              ease: "none",
            },
            0,
          );

          timeline.to(
            content,
            {
              autoAlpha: 0,
              y: -34,
              duration: 0.42,
              ease: "none",
            },
            0.12,
          );

          timeline.to(
            meta,
            {
              autoAlpha: 0,
              y: -14,
              duration: 0.28,
              ease: "none",
            },
            0.06,
          );
        }, sequence);

        return () => context.revert();
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
        <div ref={frameRef} className={styles.heroFrame} aria-hidden="true">
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

        <div ref={metaRef} className={styles.heroBottom}>
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
