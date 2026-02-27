import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

import "../../css/navbar.css";

export default function Navbar() {

    const navbarRef = useRef<HTMLDivElement>(null);

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
            <div  className="navbar-container">
                <div className="navbar-links1">
                    <a href="#">INICIO</a>
                    <a href="#">SOBRE MI</a>
                </div>
                <div className="navbar-links2">
                    <a href="#">SKILLS</a>
                    <a href="#">PROYECTOS</a>
                </div>
            </div>
        </div>
    )
}