import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

import "../../../css/proyectos.css";


export default function Proyectos() {

    
    const proyectosRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if(!proyectosRef.current) return;

        const ctx = gsap.context(() => {

        }, proyectosRef);
        return () => ctx.revert();
    }, [])

    return (
        <div ref={proyectosRef} className="proyectos-layout">
            <div className="proyectos-container">

            </div>
        </div>
    )
}