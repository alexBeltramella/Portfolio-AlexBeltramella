import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
    const sliderTrackRef = useRef<HTMLDivElement>(null);
    const sliderRafRef = useRef<number | null>(null);

    const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 640px)").matches);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 640px)");
        const update = () => setIsMobile(media.matches);

        update();
        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!isMobile || !sliderTrackRef.current) return;

        sliderTrackRef.current.scrollTo({ left: 0, behavior: "auto" });
        setActiveSlide(0);
    }, [isMobile]);

    useEffect(() => {
        return () => {
            if (sliderRafRef.current !== null) {
                cancelAnimationFrame(sliderRafRef.current);
            }
        };
    }, []);

    const syncActiveSlide = useCallback(() => {
        if (!sliderTrackRef.current) return;

        const track = sliderTrackRef.current;
        const cards = Array.from(track.querySelectorAll<HTMLElement>(".card"));

        if (!cards.length) return;

        const viewportCenter = track.scrollLeft + track.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(cardCenter - viewportCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveSlide(closestIndex);
    }, []);

    const goToSlide = useCallback((index: number) => {
        if (!sliderTrackRef.current) return;

        const max = PROYECTOS.length - 1;
        const nextIndex = Math.max(0, Math.min(index, max));
        const cards = sliderTrackRef.current.querySelectorAll<HTMLElement>(".card");

        cards[nextIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });

        setActiveSlide(nextIndex);
    }, []);

    const onSliderScroll = () => {
        if (!isMobile) return;

        if (sliderRafRef.current !== null) {
            cancelAnimationFrame(sliderRafRef.current);
        }

        sliderRafRef.current = requestAnimationFrame(() => {
            syncActiveSlide();
        });
    };

    useLayoutEffect(() => {
        if (!proyectosRef.current) return;

        const ctx = gsap.context(() => {
            const isTouchLayout =
                isMobile ||
                window.matchMedia("(hover: none)").matches ||
                window.matchMedia("(pointer: coarse)").matches;

            const cards = gsap.utils.toArray<HTMLElement>(
                proyectosRef.current?.querySelectorAll(".card") ?? []
            );

            if (isTouchLayout) {
                cards.forEach((card) => {
                    const repoBtn = card.querySelector(".card-btn");
                    const img = card.querySelector(".img-viaggio");

                    gsap.set(card, { clearProps: "width" });

                    if (repoBtn) {
                        gsap.set(repoBtn, {
                            display: "inline-flex",
                            autoAlpha: 1,
                            opacity: 1,
                            y: 0,
                            pointerEvents: "auto",
                        });
                    }

                    if (img) {
                        gsap.set(img, {
                            opacity: 1,
                            y: 0,
                        });
                    }
                });

                return;
            }

            const cleanups: Array<() => void> = [];

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
                    cards.forEach((currentCard) => {
                        const currentBtn = currentCard.querySelector(".card-btn");
                        const currentImg = currentCard.querySelector(".img-viaggio");

                        if (currentCard === card) {
                            gsap.set(currentCard, { zIndex: 10 });

                            gsap.to(currentCard, {
                                width: 360,
                                duration: 0.3,
                                ease: "power2.out",
                            });

                            if (currentBtn) {
                                gsap.killTweensOf(currentBtn);

                                gsap.set(currentBtn, {
                                    display: "inline-flex",
                                });

                                gsap.to(currentBtn, {
                                    autoAlpha: 1,
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.25,
                                    ease: "power2.out",
                                    pointerEvents: "auto",
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
                            gsap.set(currentCard, { zIndex: 1 });

                            gsap.to(currentCard, {
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
                                        gsap.set(currentBtn, { display: "none" });
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
                        }
                    });
                };

                const onLeave = () => {
                    gsap.to(cards, {
                        width: 200,
                        duration: 0.3,
                        ease: "power2.out",
                    });

                    cards.forEach((currentCard) => {
                        gsap.set(currentCard, { zIndex: 1 });

                        const currentBtn = currentCard.querySelector(".card-btn");
                        const currentImg = currentCard.querySelector(".img-viaggio");

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

                cleanups.push(() => {
                    card.removeEventListener("mouseenter", onEnter);
                    card.removeEventListener("mouseleave", onLeave);
                });
            });

            return () => {
                cleanups.forEach((cleanup) => cleanup());
            };
        }, proyectosRef);

        return () => ctx.revert();
    }, [isMobile]);

    return (
        <div ref={proyectosRef} className="proyectos-layout">
        <div className="proyectos-container">
            <div className="card-slider">
            <button
                type="button"
                className="card-slider-btn card-slider-btn-prev"
                onClick={() => goToSlide(activeSlide - 1)}
                disabled={!isMobile || activeSlide === 0}
                aria-label="Proyecto anterior"
            >
                {"<"}
            </button>

            <div
                ref={sliderTrackRef}
                className="card-container card-slider-track"
                onScroll={onSliderScroll}
            >
            {PROYECTOS.map((proyecto: Proyecto, index) => (
                <div key={`${proyecto.id}-${index}`} className={`card ${isMobile && activeSlide === index ? "is-active" : ""}`}>
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

            <button
                type="button"
                className="card-slider-btn card-slider-btn-next"
                onClick={() => goToSlide(activeSlide + 1)}
                disabled={!isMobile || activeSlide === PROYECTOS.length - 1}
                aria-label="Proyecto siguiente"
            >
                {">"}
            </button>
            </div>

            {isMobile && (
            <div className="card-slider-dots">
                {PROYECTOS.map((proyecto, index) => (
                <button
                    key={`dot-${proyecto.id}-${index}`}
                    type="button"
                    className={`card-slider-dot ${activeSlide === index ? "is-active" : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Ir al proyecto ${index + 1}`}
                />
                ))}
            </div>
            )}

            <div className="title">
            <h2 className="title-desktop">
                PRO <br /> YEC <br /> TOS
            </h2>
            <h2 className="title-mobile">PROYECTOS</h2>
            </div>
        </div>
        </div>
    );
}
