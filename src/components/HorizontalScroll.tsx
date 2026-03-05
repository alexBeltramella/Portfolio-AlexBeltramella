// src/components/HorizontalScroll.tsx
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import "../css/horizontalScroll.css";
import Home from "./Home/Home";
import AboutMe from "./Home/SobreMi/aboutMe";
import Habilidades from "./Home/Habilidades/Habilidades";
import Proyectos from "./Home/Proyectos/Proyectos";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [containerAnim, setContainerAnim] = useState<gsap.core.Animation | null>(null);

  // Guardamos el ScrollTrigger para poder “ir a panel”
  const stRef = useRef<ScrollTrigger | null>(null);
  const panelsCountRef = useRef<number>(0);

  // Si querés, podés habilitar/deshabilitar el bloqueo desde un estado/ref
  const lockScrollRef = useRef(true);

  const goToPanel = useCallback((panelIndex: number) => {
    const st = stRef.current;
    const panelsCount = panelsCountRef.current;

    if (!st || panelsCount <= 1) return;

    const max = panelsCount - 1;
    const i = Math.max(0, Math.min(panelIndex, max));
    const progress = max === 0 ? 0 : i / max;

    const y = st.start + (st.end - st.start) * progress;

    gsap.to(window, {
      scrollTo: y,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const track = sectionRef.current!.querySelector(".horizontal-track") as HTMLElement;
      const panels = gsap.utils.toArray<HTMLElement>(track.querySelectorAll(".panel"));

      panelsCountRef.current = panels.length;

      const panelW = () => panels[0].getBoundingClientRect().width;
      const getTotalWidth = () => Math.round((panels.length - 1) * panelW());

      ScrollTrigger.clearScrollMemory();
      window.scrollTo(0, 0);

      const tween = gsap.to(track, {
        x: () => -getTotalWidth(),
        ease: "none",
        roundProps: "x",
        scrollTrigger: {
          id: "horizontal",
          trigger: sectionRef.current!,
          start: "top top",
          end: () => `+=${getTotalWidth()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.1, max: 0.4 },
            ease: "power2.out",
            inertia: false,
            delay: 0.05,
          },
        },
      });

      setContainerAnim(tween);

      // Guardamos el ScrollTrigger
      stRef.current = tween.scrollTrigger ?? null;

      // Exponemos goToPanel para que el Navbar lo pueda llamar
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).goToPanel = (panelIndex: number) => {
        const st = stRef.current;
        const panelsCount = panelsCountRef.current;

        if (!st || panelsCount <= 1) return;

        const max = panelsCount - 1;
        const i = Math.max(0, Math.min(panelIndex, max));
        const progress = max === 0 ? 0 : i / max;

        const y = st.start + (st.end - st.start) * progress;

        gsap.to(window, {
          scrollTo: y,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      // --- BLOQUEO DE SCROLL USER (wheel/keys/touch) ---
      const shouldBlock = () => lockScrollRef.current;

      const onWheel = (e: WheelEvent) => {
        if (!shouldBlock()) return;
        e.preventDefault();
      };

      const onTouchMove = (e: TouchEvent) => {
        if (!shouldBlock()) return;
        e.preventDefault();
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (!shouldBlock()) return;

        const keysToBlock = [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
          "Spacebar",
        ];

        if (keysToBlock.includes(e.key)) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("keydown", onKeyDown, { passive: false });

      return () => {
        delete (window as any).goToPanel;

        window.removeEventListener("wheel", onWheel as any);
        window.removeEventListener("touchmove", onTouchMove as any);
        window.removeEventListener("keydown", onKeyDown as any);

      
        stRef.current = null;
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, sectionRef);


    return () => {
      ctx.revert();
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;

    };
    
  }, []);

  return (
    <>

      <section ref={sectionRef} className="horizontal-section">
        <div className="horizontal-track">
          <div className="panel">
            <Home />
          </div>

          <div className="panel">
            <AboutMe containerAnimation={containerAnim} />
          </div>

          <div className="panel">
            <Habilidades />
          </div>

          <div className="panel">
            <Proyectos />
          </div>

        </div>
      </section>
    </>
  );
}