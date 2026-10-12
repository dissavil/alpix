"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({
  children,
}: SmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isCoarsePointer = window.matchMedia(
      "(pointer: coarse)",
    ).matches;

    // Устройства с сенсорным управлением и пользователи,
    // отключившие анимации, получают обычную прокрутку.
    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.08,
      smoothWheel: true,
      anchors: true,
    });

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", updateScrollTrigger);

    // Один общий цикл: GSAP ticker обновляет Lenis.
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const refreshFrame = requestAnimationFrame(refresh);

    window.addEventListener("load", refresh, { once: true });

    return () => {
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refresh);

      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(updateLenis);

      lenis.destroy();

      // Возвращаем стандартные настройки ticker.
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return <>{children}</>;
}