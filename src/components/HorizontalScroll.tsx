// src/components/HorizontalScroll.tsx (o donde lo tengas)
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../css/horizontalScroll.css";
import Home from "./Home/Home";
import AboutMe from "./Home/SobreMi/aboutMe";
import Habilidades from "./Home/Habilidades/Habilidades";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Guardamos la animación que mueve el track (sirve como containerAnimation)
  const [containerAnim, setContainerAnim] = useState<gsap.core.Animation | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const track = sectionRef.current!.querySelector(".horizontal-track") as HTMLElement;
      const panels = gsap.utils.toArray<HTMLElement>(track.querySelectorAll(".panel"));

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

      // Pasamos este tween como "containerAnimation" a los triggers internos
      setContainerAnim(tween);

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
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
          <Habilidades />
        </div>

        <div className="panel">
          <Habilidades />
        </div>
      </div>
    </section>
  );
}