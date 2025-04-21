// src/components/scroll.js
"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const resizeHandlerRef = useRef(null);

  useEffect(() => {
    // skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // init Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,              // a little more “momentum”
      easing: (t) => 1 - Math.pow(2, -12 * t),
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      smoothTouch: true,
      touchMultiplier: 1.75,
      infinite: false,
    });

    // RAF loop
    const onRaf = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(onRaf);
    };
    requestAnimationFrame(onRaf);

    // handle resize
    resizeHandlerRef.current = () => lenisRef.current.resize();
    window.addEventListener("resize", resizeHandlerRef.current, { passive: true });

    // cleanup
    return () => {
      window.removeEventListener("resize", resizeHandlerRef.current);
      lenisRef.current.destroy();
    };
  }, []);

  return <>{children}</>;
}
