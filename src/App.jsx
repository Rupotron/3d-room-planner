import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "./components/Room";
import Furniture from "./components/Furniture";

function CameraSetup({ isDragging, controlsRef }) {
  const { camera } = useThree();
  const lastCameraPosition = useRef(null);

  useEffect(() => {
    if (isDragging) {
      if (!lastCameraPosition.current) {
        lastCameraPosition.current = {
          position: [camera.position.x, camera.position.y, camera.position.z],
          target: [0, 0, 0],
        };
      }
      camera.position.set(...lastCameraPosition.current.position);
      camera.lookAt(...lastCameraPosition.current.target);
    } else {
      lastCameraPosition.current = null;
    }

    // Update controls when dragging changes
    if (controlsRef.current) {
      controlsRef.current.enabled = !isDragging;
    }
  }, [isDragging, camera, controlsRef]); // ✅ Added dependencies

  return <OrbitControls ref={controlsRef} enableZoom={true} enablePan={true} maxPolarAngle={Math.PI / 2.1} />;
}

function App() {
  const [roomDimensions, setRoomDimensions] = useState({
    width: 77, height: 96, length: 84
  });

  const [isDragging, setIsDragging] = useState(false);
  const [bed, setBed] = useState({
    width: 39, height: 24, length: 70, position: [0, 12, 0]
  });

  const [almirah, setAlmirah] = useState({
    width: 22, height: 76, length: 33, position: [10, 36, 10]
  });

  const controlsRef = useRef();

  const handleDimensionChange = (setter) => (e) => {
    setter((prev) => ({
      ...prev,
      [e.target.name]: parseFloat(e.target.value) || 0
    }));
  };

  return (
    <div className="app-container">
      <h2 className="title">3D Room Planner</h2>

      <div className="controls-container">
        <div className="control-group">
          <h3>Room Size (inches)</h3>
          <div className="input-group">
            <input type="number" name="width" value={roomDimensions.width} onChange={handleDimensionChange(setRoomDimensions)} placeholder="Width" />
            <input type="number" name="height" value={roomDimensions.height} onChange={handleDimensionChange(setRoomDimensions)} placeholder="Height" />
            <input type="number" name="length" value={roomDimensions.length} onChange={handleDimensionChange(setRoomDimensions)} placeholder="Length" />
          </div>
        </div>

        <div className="control-group">
          <h3>Bed Size (inches)</h3>
          <div className="input-group">
            <input type="number" name="width" value={bed.width} onChange={handleDimensionChange(setBed)} placeholder="Width" />
            <input type="number" name="height" value={bed.height} onChange={handleDimensionChange(setBed)} placeholder="Height" />
            <input type="number" name="length" value={bed.length} onChange={handleDimensionChange(setBed)} placeholder="Length" />
          </div>
        </div>

        <div className="control-group">
          <h3>Almirah Size (inches)</h3>
          <div className="input-group">
            <input type="number" name="width" value={almirah.width} onChange={handleDimensionChange(setAlmirah)} placeholder="Width" />
            <input type="number" name="height" value={almirah.height} onChange={handleDimensionChange(setAlmirah)} placeholder="Height" />
            <input type="number" name="length" value={almirah.length} onChange={handleDimensionChange(setAlmirah)} placeholder="Length" />
          </div>
        </div>
      </div>

      <Canvas className="canvas" style={{ width: "100vw", height: "100vh" }}>
        <CameraSetup isDragging={isDragging} controlsRef={controlsRef} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} />

        <Room dimensions={{
          width: roomDimensions.width * 0.0254,
          height: roomDimensions.height * 0.0254,
          length: roomDimensions.length * 0.0254
        }} />

        <Furniture
          type="bed"
          dimensions={{
            width: bed.width * 0.0254,
            height: bed.height * 0.0254,
            length: bed.length * 0.0254
          }}
          position={bed.position.map(p => p * 0.0254)}
          setPosition={(pos) => setBed({ ...bed, position: pos.map(p => p / 0.0254) })}
          setIsDragging={setIsDragging}
          roomDimensions={{
            width: roomDimensions.width * 0.0254,
            length: roomDimensions.length * 0.0254,
          }}
        />

        <Furniture
          type="almirah"
          dimensions={{
            width: almirah.width * 0.0254,
            height: almirah.height * 0.0254,
            length: almirah.length * 0.0254
          }}
          position={almirah.position.map(p => p * 0.0254)}
          setPosition={(pos) => setAlmirah({ ...almirah, position: pos.map(p => p / 0.0254) })}
          setIsDragging={setIsDragging}
          roomDimensions={{
            width: roomDimensions.width * 0.0254,
            length: roomDimensions.length * 0.0254,
          }}
        />
      </Canvas>
    </div>
  );
}

export default App;