// src/components/Home/SobreMi/aboutMe.tsx (el AboutMe que importás arriba)
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ImgZuzuParado from "../../../assets/ZUZU-parado.svg?react";
import "../../../css/AboutMe.css";

gsap.registerPlugin(ScrollTrigger);

type AboutMeProps = {
  containerAnimation: gsap.core.Animation | null;
};

export default function AboutMe({ containerAnimation }: AboutMeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;
    if (!containerAnimation) return;

    const ctx = gsap.context(() => {
      // Estado inicial (queda abajo hasta que se active el trigger)
      gsap.set("#character", { yPercent: 100, opacity: 0 });

      const irisEl = wrapRef.current!.querySelector("#iris") as SVGElement | null;
      if (!irisEl) return;

      // Limpia transforms raros del SVG exportado
      irisEl.removeAttribute("transform");

      // Asegura transform estable para GSAP
      gsap.set(irisEl, {
        x: -14,
        y: 23,
        transformBox: "fill-box",
        transformOrigin: "center",
      });

      // Timeline principal (sale desde abajo)
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      tl.to("#character", {
        yPercent: -85,
        opacity: 1,
        duration: 0.8,
        immediateRender: false,
      }).to(
        "#character",
        {
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        "-=0.2"
      );

      // Loop del ojo (arranca cuando entra al panel)
      const eyeLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: gsap.utils.random(3, 6),
        defaults: { ease: "power2.inOut" },
      });

      eyeLoop
        .to("#iris", { x: -12.5, y: 19, duration: 0.35 })
        .to("#iris", { x: -14, y: 19, duration: 0.35 }, "+=0.25")
        .to("#path7-7-6", { scaleY: 0.12, duration: 0.08, ease: "power1.in" }, "+=0.1")
        .to("#path7-7-6", { scaleY: 1, duration: 0.1, ease: "power1.out" })
        .to("#iris", { x: -14, y: 23, duration: 0.25 }, "<");

      // Trigger "horizontal-aware": se calcula en base al tween del track
      ScrollTrigger.create({
        trigger: wrapRef.current,
        containerAnimation,
        start: "center center",
        once: true,
        onEnter: () => {
          tl.play(0);
          eyeLoop.play(0);
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [containerAnimation]);

  return (
    <div className="aboutMe-layout">
      <div className="aboutMe-container">
        <div className="aboutMe-info">
          <h2>SOBRE MÍ</h2>
          <p>
            Soy desarrollador full-stack con foco en front-end creativo. Trabajo principalmente con React,
            Vite y GSAP, creando experiencias web modernas con animaciones fluidas y atención al detalle.
            Desarrollo sistemas y aplicaciones a medida, combinando lógica sólida, rendimiento y diseño
            cuidado. Me interesa el equilibrio entre ingeniería y creatividad, construyendo productos
            funcionales y visualmente atractivos.
          </p>
        </div>

        <div ref={wrapRef} className="aboutMe-zuzu">
          <ImgZuzuParado className="zuzu-img" />
        </div>
      </div>
    </div>
  );
}