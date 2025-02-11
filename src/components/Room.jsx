import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function Room({ dimensions }) {
  const { width, height, length } = dimensions;
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, height * 1.5, length * 1.5);
    camera.lookAt(0, height / 2, 0);
    camera.up.set(0, 0, -1); // Maintain top-down orientation
  }, []); // ✅ Runs only once on mount

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, 0.1, length]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, height / 2, -length / 2]}>
        <boxGeometry args={[width, height, 0.2]} /> {/* Increased thickness */}
        <meshStandardMaterial color="white" />
      </mesh>
      
      <mesh position={[0, height / 2, length / 2]}>
        <boxGeometry args={[width, height, 0.2]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh position={[-width / 2, height / 2, 0]}>
        <boxGeometry args={[0.2, height, length]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh position={[width / 2, height / 2, 0]}>
        <boxGeometry args={[0.2, height, length]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

export default Room;
