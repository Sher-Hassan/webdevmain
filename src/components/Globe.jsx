import "../styles/Globe.css";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

// Minimal globe-only component
export default function Globe() {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1.6,    
      width: 800 * 2,     
      height: 800 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.25,
      mapSamples: 48000,   
      mapBrightness: 6,  
      baseColor: [0.206, 0.206, 0.009],        
      markerColor: [199, 199, 2],  
      glowColor: [0.172, 0.172, 0.007],   
      mapBaseBrightness: 0,
      opacity: 1, 
      offset: [0, 1080],            
             
      markers: [
        // example markers (longitude latitude)
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 }
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.001;
      }  
    });

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
    />
  );  
} 
