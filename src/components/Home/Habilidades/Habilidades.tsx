

import { FaBootstrap, FaCss3Alt, FaHtml5, FaReact } from "react-icons/fa";
import { SiGreensock, SiTypescript } from "react-icons/si";
import "../../../css/habilidades.css";


export default function Habilidades() {
    return(
        <div className="hab-layout">
            <div className="hab-container">
                <div className="hab-1">
                    <div className="hab">
                        <FaReact className="hab-icon hab-icon-react" />
                        <span>REACTJS</span>
                        <div className="hab-semiCircle1"></div>
                    </div>
                    <div className="hab">
                        <SiTypescript className="hab-icon hab-icon-typescript" />
                        <div className="hab-semiCircle2"></div>
                        <span>TYPESCRIPT</span>
                    </div>
                </div>

                <div className="hab-2">
                    <div className="hab">
                        <FaHtml5 className="hab-icon hab-icon-html" />
                        <span>HTML</span>
                        <div className="hab-semiCircle1"></div>
                    </div>

                    <div className="hab-title">
                        <h2>HABILIDADES</h2>
                    </div>

                    <div className="hab">
                        <FaBootstrap className="hab-icon hab-icon-bootstrap" />
                        <div className="hab-semiCircle2"></div>
                        <span>BOOSTRAP</span>
                    </div>
                </div>

                <div className="hab-3">
                    <div className="hab">
                        <FaCss3Alt className="hab-icon hab-icon-css" />
                        <span>CSS</span>
                        <div className="hab-semiCircle1"></div>
                    </div>
                    <div className="hab">
                        <SiGreensock className="hab-icon hab-icon-gsap" />
                        <div className="hab-semiCircle2"></div>
                        <span>GSAP</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
