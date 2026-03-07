import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import { FaReact, FaBootstrap } from "react-icons/fa";
import { SiVite, SiNestjs, SiMysql } from "react-icons/si";

import { PROYECTOS, type Proyecto } from "../../../data/proyectos";

import "../../../css/proyectos.css";

const techIcons: Record<string, React.ElementType> = {
    React: FaReact,
    Vite: SiVite,
    NestJs: SiNestjs,
    SQL: SiMysql,
    Bootstrap: FaBootstrap,
    };

    export default function Proyectos() {
    const proyectosRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!proyectosRef.current) return;

        const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".card-container > .card");

        cards.forEach((card) => {
            const repoBtn = card.querySelector(".card-btn");
            const img = card.querySelector(".img-viaggio");

            if (repoBtn) {
            gsap.set(repoBtn, {
                autoAlpha: 0,
                opacity: 0,
                y: 10,
                display: "none",
                pointerEvents: "none",
            });
            }

            if (img) {
            gsap.set(img, {
                opacity: 0,
                y: 30,
            });
            }

            const onEnter = () => {
            cards.forEach((c) => {
                const currentBtn = c.querySelector(".card-btn");
                const currentImg = c.querySelector(".img-viaggio");

                if (c === card) {
                gsap.set(c, { zIndex: 10 });

                gsap.to(c, {
                    width: 360,
                    duration: 0.3,
                    ease: "power2.out",
                });

                if (currentBtn) {
                    gsap.killTweensOf(currentBtn);

                    gsap.set(currentBtn, {
                        display: "inline-flex"
                    });

                    gsap.to(currentBtn, {
                    autoAlpha: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.25,
                    ease: "power2.out",
                    pointerEvents: "auto"
                    });
                }

                if (currentImg) {
                    gsap.to(currentImg, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    });
                }
                } else {
                gsap.set(c, { zIndex: 1 });

                gsap.to(c, {
                    width: 150,
                    duration: 0.3,
                    ease: "power2.out",
                });

                if (currentBtn) {
                    gsap.killTweensOf(currentBtn);

                    gsap.to(currentBtn, {
                    autoAlpha: 0,
                    opacity: 0,
                    y: 10,
                    duration: 0.2,
                    ease: "power2.out",
                    pointerEvents: "none",
                    onComplete: () => {
                        gsap.set(currentBtn, {display:"none"});
                    }
                    });
                }

                if (currentImg) {
                    gsap.to(currentImg, {
                    opacity: 0,
                    y: 20,
                    duration: 0.2,
                    ease: "power2.out",
                    });
                }
                }
            });
            };

            const onLeave = () => {
            gsap.to(cards, {
                width: 200,
                duration: 0.3,
                ease: "power2.out",
            });

            cards.forEach((c) => {
                gsap.set(c, { zIndex: 1 });

                const currentBtn = c.querySelector(".card-btn");
                const currentImg = c.querySelector(".img-viaggio");

                if (currentBtn) {
                gsap.to(currentBtn, {
                    opacity: 0,
                    y: 10,
                    duration: 0.2,
                    ease: "power2.out",
                    onComplete: () => {
                    gsap.set(currentBtn, {
                        display: "none",
                        pointerEvents: "none",
                    });
                    },
                });
                }

                if (currentImg) {
                gsap.to(currentImg, {
                    opacity: 0,
                    y: 20,
                    duration: 0.2,
                    ease: "power2.out",
                });
                }
            });
            };

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);

            return () => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
            };
        });
        }, proyectosRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={proyectosRef} className="proyectos-layout">
        <div className="proyectos-container">
            <div className="card-container">
            {PROYECTOS.map((proyecto: Proyecto) => (
                <div key={proyecto.id} className="card">
                <div className="card-info">
                    <h3 className="card-title">{proyecto.title}</h3>

                    <p className="card-role">{proyecto.role}</p>

                    <p className="card-description">{proyecto.description}</p>
                </div>

                <div className="card-stack">
                    {proyecto.stack.map((tech) => {
                    const Icon = techIcons[tech];

                    return (
                        <span key={tech} className="card-tech">
                        {Icon && <Icon className="tech-icon" />}
                        {tech}
                        </span>
                    );
                    })}
                </div>

                <div className="card-bottom">
                    {proyecto.repo && (
                    <a
                        href={proyecto.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="card-btn"
                    >
                        Repositorio
                    </a>
                    
                    )}
                </div>

                {proyecto.image && (
                    <div className="img-container">
                    <img
                        className="img-viaggio"
                        src={proyecto.image}
                        alt={proyecto.title}
                    />
                    </div>
                )}
                </div>
            ))}
            </div>

            <div className="title">
            <h2>
                PRO <br /> YEC <br /> TOS
            </h2>
            </div>
        </div>
        </div>
    );
}