import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";

import "../../css/navbar.css";

export default function Navbar() {

    const navbarRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const go = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fn = (window as any).goToPanel as undefined | ((i: number) => void);
        if (fn) {
            fn(index);
        } else {
            const panels = document.querySelectorAll<HTMLElement>(".horizontal-section .panel");
            panels[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setMenuOpen(false);
    };

    useLayoutEffect(() => {
        if(!navbarRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.set(".navbar-container", {y: -30, opacity: 0})
            tl.set(".navbar-layout", {y: -30, opacity: 0})

            .to(".navbar-layout", {
                y: 0,
                duration: 1,
                opacity: 1,
                ease: "power1.out",
            })
            .to(".navbar-container", {
                y: 0,
                duration: 1,
                opacity: 1,
                ease: "power1.out",
                stagger: 0.5
            })


        }, navbarRef)


        return () => ctx.revert();
    }, [])


    return (
        <div ref={navbarRef} className="navbar-layout">
            <button
                type="button"
                className={`navbar-toggle ${menuOpen ? "is-open" : ""}`}
                aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`navbar-container ${menuOpen ? "is-open" : ""}`}>
            <div className="navbar-links1">
                <a href="#" onClick={(e) => go(e, 0)}>INICIO</a>
                <a href="#" onClick={(e) => go(e, 1)}>SOBRE MI</a>
            </div>

            <div className="navbar-links2">
                <a href="#" onClick={(e) => go(e, 2)}>HABILIDADES</a>
                <a href="#" onClick={(e) => go(e, 3)}>PROYECTOS</a>
            </div>
            </div>
        </div>
    )
}
