
import React, { useEffect, useRef, useState } from 'react';
import { Niivue } from "@niivue/niivue";

const TestViewer = () => {
  const canvasRef = useRef(null);
  const nvRef = useRef(null);
  const [contrast, setContrast] = useState({ min: 0, max: 700 });

  useEffect(() => {
    const nv = new Niivue();
    nvRef.current = nv;
    nv.attachToCanvas(canvasRef.current);
    nv.loadVolumes([
        {
          url: "https://object-store.rc.nectar.org.au:8888/v1/AUTH_dead991e1fa847e3afcca2d3a7041f5d/qsmxt/laplacian_vsharp_rts.nii",
          name: "LAPLACIAN VSHARP RTS",
          // 👇 explicitly give it a filename ending in `.nii`
          filename: "laplacian_vsharp_rts.nii",
          colorMap: "gray",
          cal_min: 0,
          cal_max: 700,
        },
      ]);
  }, []);

  useEffect(() => {
    if (nvRef.current) {
      const volume = nvRef.current.volumes[0];
      if (volume) {
        volume.cal_min = contrast.min;
        volume.cal_max = contrast.max;
        nvRef.current.updateGLVolume();
      }
    }
  }, [contrast]);

  return (
    <div>
      <canvas ref={canvasRef} height="512" width="512" />
      <div>
        <label>
          Cal Min: {contrast.min}
          <input
            type="range"
            min="0"
            max="1000"
            value={contrast.min}
            onChange={(e) => setContrast((c) => ({ ...c, min: +e.target.value }))}
          />
        </label>
        <label>
          Cal Max: {contrast.max}
          <input
            type="range"
            min="0"
            max="1000"
            value={contrast.max}
            onChange={(e) => setContrast((c) => ({ ...c, max: +e.target.value }))}
          />
        </label>
      </div>
    </div>
  );
};

export default TestViewer;
