import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import Zuzu from "../../../assets/ZUZU-sentado.svg?react";

import imgHeroAlex from "../../../assets/img-hero-alex.png"
import "../../../css/hero.css";




export default function Hero() {
    

    const heroRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if(!heroRef.current) return;

        const ctx = gsap.context(() => {

            const tl= gsap.timeline()
            
            tl.set(".hero-info", {x:600, opacity:0})
            .set(".hero-img img",{opacity: 0, filter:"blur(20px)"})
            .set(".circle", {x: -100,opacity: 0, filter: "blur(10px)"})
            .set(".zuzu", {opacity: 0,filter: "blur(50px)"})

            .to(".hero-img img", {
                opacity: 1,
                filter: "blur(0px)",
                delay: 0.8,
                duration: 0.5,
            })
            .to(".zuzu", {
                filter: "blur(0px)",
                opacity: 1,
                delay: 0.8,
                duration: 0.5,
            })
            .to(".hero-info", {
                x: 100,
                delay: 0.2,
                duration: 0.5,
                opacity: 1,
                ease: "power1.out",
            })
            .to(".circle", {
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1
            })
            .to("#eye", {
                y: -16,
                repeat: -1,
                duration: 4,
                delay: 2,
                repeatDelay: 1,
                yoyo: true
            })

        // MOVIMIENTO SUTIL DE CIRCULSO CON MOUSE
        const circles = gsap.utils.toArray<HTMLElement>(".circle");

        // SELECTOR SCOPER

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;

            const x = (e.clientX / innerWidth - 0.5) * 30
            const y = (e.clientY / innerHeight - 0.5) * 30

            circles.forEach((circle, index) => {
                gsap.to(circle, {
                    x: x * (index + 1) * 0.3,
                    y: y * (index + 1) * 0.3,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        //LMIPIEZA DENTRO DEL CONTEXT
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };

        
        }, heroRef);

        return  () => ctx.revert();
    }, []);

    return(
        <div ref={heroRef} className="hero-layout">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
            <div className="circle circle-4"></div>

            <div className="hero-container">
                <div ref={heroRef} className="hero-img">
                    <img src={imgHeroAlex} alt="" />
                    <Zuzu className="zuzu"/>
                </div>

                <div className="hero-info">
                    <h1>ALEX <br /> BELTRAMELLA</h1>
                    <h2>DESARROLLADOR  WEB  FRONTEND</h2>
                </div>
            </div>
        </div>
    )
}