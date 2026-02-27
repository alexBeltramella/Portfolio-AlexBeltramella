import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import ImgZuzuParado from "../../../assets/ZUZU-parado.svg?react";

import "../../../css/aboutMe.css"


export default function AboutMe() {

    const wrapRef = useRef<HTMLDivElement>(null);

        useLayoutEffect(() => {
        if (!wrapRef.current) return;

        const ctx = gsap.context(() => {
        // Estado inicial
        gsap.set("#character", {yPercent: 100, opacity: 0 });

        const irisEl = wrapRef.current!.querySelector("#iris") as SVGElement | null;
        if (!irisEl) return;

        // limpia transforms raros del SVG exportado
        irisEl.removeAttribute("transform");

        // asegura transform estable para GSAP
        gsap.set(irisEl, {
        x: -14,
        y: 23,
        transformBox: "fill-box",
        transformOrigin: "center",
        });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // 1) Entra desde abajo
        tl.to("#character", {
            yPercent: -85,
            opacity: 1,
            duration: 0.8,
            delay: 1,
        }).to("#character", {
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
        }, "-=0.2");

        const eyeLoop = gsap.timeline({
        repeat: -1,
        repeatDelay: gsap.utils.random(3,6),
        defaults: { ease: "power2.inOut" }
        });

        eyeLoop
        .to("#iris", { x: -12.5, y: 19, duration: 0.35 })
        .to("#iris", { x: -14, y: 19, duration: 0.35 }, "+=0.25")
        .to("#path7-7-6", { scaleY: 0.12, duration: 0.08, ease: "power1.in" }, "+=0.1")
        .to("#path7-7-6", { scaleY: 1, duration: 0.10, ease: "power1.out" })
        .to("#iris", { x: -14, y: 23, duration: 0.25 }, "<");


        }, wrapRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="aboutMe-layout">
            <div className="aboutMe-container">
                <div className="aboutMe-info">
                    <h2>SOBRE MÍ</h2>
                    <p>Soy desarrollador full-stack con foco en front-end creativo. Trabajo principalmente con React, Vite y GSAP, creando experiencias web modernas con animaciones fluidas y atención al detalle.

                    Desarrollo sistemas y aplicaciones a medida, combinando lógica sólida, rendimiento y diseño cuidado. Me interesa el equilibrio entre ingeniería y creatividad, construyendo productos funcionales y visualmente atractivos.</p>
                </div>

                <div ref={wrapRef} className="aboutMe-zuzu">
                    <ImgZuzuParado className="zuzu-img"/>
                </div>
            </div>
        </div>
    )
}