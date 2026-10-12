"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

import styles from "./CursorViewCase.module.css";

type CursorViewCaseProps = {
  targetRef: RefObject<HTMLDivElement | null>;
  href: string;
  title: string;
};

export default function CursorViewCase({
  targetRef,
  href,
  title,
}: CursorViewCaseProps) {
  const cursorRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    const cursor = cursorRef.current;

    if (!target || !cursor) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (prefersReducedMotion || !supportsHover) {
      return;
    }

    gsap.set(cursor, {
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      scale: 0.86,
      opacity: 0,
    });

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.18,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.18,
      ease: "power3.out",
    });

    const moveToPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      const rect = target.getBoundingClientRect();
      moveX(event.clientX - rect.left);
      moveY(event.clientY - rect.top);
    };

    const show = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      moveToPointer(event);
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const hide = () => {
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.86,
        duration: 0.16,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const focus = () => {
      const rect = target.getBoundingClientRect();
      gsap.to(cursor, {
        x: rect.width / 2,
        y: rect.height / 2,
        opacity: 1,
        scale: 1,
        duration: 0.18,
        ease: "power2.out",
        overwrite: true,
      });
    };

    target.addEventListener("pointerenter", show);
    target.addEventListener("pointermove", moveToPointer);
    target.addEventListener("pointerleave", hide);
    cursor.addEventListener("focus", focus);

    return () => {
      target.removeEventListener("pointerenter", show);
      target.removeEventListener("pointermove", moveToPointer);
      target.removeEventListener("pointerleave", hide);
      cursor.removeEventListener("focus", focus);
      gsap.killTweensOf(cursor);
      gsap.set(cursor, { clearProps: "all" });
    };
  }, [targetRef]);

  return (
    <a
      ref={cursorRef}
      href={href}
      className={styles.cursorLink}
      aria-label={"View case: " + title}
    >
      <span>VIEW CASE</span>
      <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
