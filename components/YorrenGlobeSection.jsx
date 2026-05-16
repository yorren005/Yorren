"use client";
import { Globe3D } from "@/components/ui/3d-globe";

export default function YorrenGlobeSection() {
  return (
    <section className="globe-section" id="globe-section" style={{ overflow: 'visible' }}>
      <div className="container globe-grid" style={{ overflow: 'visible' }}>
        <div className="globe-text">
          <span className="globe-tag">21ST CENTURY DYNAMICS</span>
          <h2>Adapting to Rapid Change</h2>
          <p>
            As technological progress accelerates and society reshapes itself,
            adaptation is our most critical skill. We build frameworks to thrive
            amidst continuous evolution and unprecedented global change.
          </p>
        </div>
        <div className="globe-canvas-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
          <Globe3D
            markers={[]}
            className="h-[600px] w-full"
            config={{
              showAtmosphere: false,
              atmosphereColor: "#ffffff",
              atmosphereIntensity: 0.4,
              atmosphereBlur: 3,
              autoRotateSpeed: 0.2,
              bumpScale: 3,
              showWireframe: false,
              showSatellites: true,
              ambientIntensity: 0.5,
              pointLightIntensity: 1.8,
            }}
          />
        </div>
      </div>
    </section>
  );
}
