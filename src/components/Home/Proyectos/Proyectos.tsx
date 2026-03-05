import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { PROYECTOS, type Proyecto } from "../../../data/proyectos";

import "../../../css/proyectos.css";


export default function Proyectos() {

    
    const proyectosRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
        if(!proyectosRef.current) return;
        const cards = gsap.utils.toArray<HTMLElement>(".card");

        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
            cards.forEach((c) => {
                if(c === card) {
                    gsap.to(c, {
                        width: 360,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(c, {
                        width: 150,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            });

            card.addEventListener("mouseleave", () => {
                gsap.to(cards, {
                    width: 200,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        const ctx = gsap.context(() => {

        }, proyectosRef);
        return () => ctx.revert();
    }, [])

    return (
        <div ref={proyectosRef} className="proyectos-layout">
            <div className="proyectos-container">
                <div className="card-container">
                    <div className="card">
                            {PROYECTOS.map((proyecto: Proyecto) => (
                            <div key={proyecto.id}>

                                <h3 className="card-title">{proyecto.title}</h3>

                                <p className="card-role">{proyecto.role}</p>

                                <p className="card-description">{proyecto.description}</p>

                                <div className="card-stack">
                                    {proyecto.stack.map((tech) => (
                                        <span key={tech} className="card-tech">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                            {PROYECTOS.map((proyecto: Proyecto) => (
                            <div key={proyecto.id}>

                                <h3 className="card-title">{proyecto.title}</h3>

                                <p className="card-role">{proyecto.role}</p>

                                <p className="card-description">{proyecto.description}</p>

                                <div className="card-stack">
                                    {proyecto.stack.map((tech) => (
                                        <span key={tech} className="card-tech">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                            {PROYECTOS.map((proyecto: Proyecto) => (
                            <div key={proyecto.id}>

                                <h3 className="card-title">{proyecto.title}</h3>

                                <p className="card-role">{proyecto.role}</p>

                                <p className="card-description">{proyecto.description}</p>

                                <div className="card-stack">
                                    {proyecto.stack.map((tech) => (
                                        <span key={tech} className="card-tech">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="title">
                    <h2>PRO <br /> YEC <br /> TOS</h2>
                </div>
            </div>
        </div>
    )
}