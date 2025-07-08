import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function StarsBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
       <>
  
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#000717] via-[#2c2d75] to-[#262957]" >
            <Particles
                id="tsparticles"
                init={particlesInit}
                className="absolute inset-0"
                options={{
                    fpsLimit: 40,
                    background: {
                        color: {
                            value: "transparent", 
                        },
                    },
                    particles: {
                        number: {
                            value: 5,
                            density: {
                                enable: true,
                                area: 800,
                            },
                        },
                        color: {
                            value: "#ffffff",
                        },
                        shape: {
                            type: "star",
                        },
                        opacity: {
                            value: 1,
                        },
                        size: {
                            value: { min: 1, max: 2 },
                        },
                        move: {
                            enable: true,
                            speed: 3,
                            direction: "bottom-right",
                            straight: true,
                            outModes: {
                                default: "out",
                            },
                            trail: {
                                enable: true,
                                length: 3,
                                fill : {
                                    color : 'transparent'
                                }
                            },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
</>

    );
}
