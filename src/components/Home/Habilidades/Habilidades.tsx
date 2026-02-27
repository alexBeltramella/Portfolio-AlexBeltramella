

import "../../../css/habilidades.css";


export default function Habilidades() {
    return(
        <div className="hab-layout">
            <div className="hab-container">
                <div className="hab-1">
                    <div className="hab">
                        <span>REACTJS</span>
                        <div className="hab-semiCircle1"></div>
                    </div>
                    <div className="hab">
                        <div className="hab-semiCircle2"></div>
                        <span>TYPESCRIPT</span>
                    </div>
                </div>

                <div className="hab-2">
                    <div className="hab">
                        <span>HTML</span>
                        <div className="hab-semiCircle1"></div>
                    </div>

                    <div className="hab-title">
                        <h2>HABILIDADES</h2>
                    </div>

                    <div className="hab">
                        <div className="hab-semiCircle2"></div>
                        <span>BOOSTRAP</span>
                    </div>
                </div>

                <div className="hab-3">
                    <div className="hab">
                        <span>CSS</span>
                        <div className="hab-semiCircle1"></div>
                    </div>
                    <div className="hab">
                        <div className="hab-semiCircle2"></div>
                        <span>GSAP</span>
                    </div>
                </div>
            </div>
        </div>
    )
}