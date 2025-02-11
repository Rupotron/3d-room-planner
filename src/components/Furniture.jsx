import React, { useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";  

function Furniture({ type, dimensions, position, setPosition, setIsDragging, roomDimensions }) {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [rotation, setRotation] = useState([0, 0, 0]);

  const bind = useDrag(({ offset: [x, y], first, last }) => {
    if (first) setIsDragging(true);
    if (last) setIsDragging(false);

    const halfWidth = dimensions.width / 2;
    const halfLength = dimensions.length / 2;

    const minX = -roomDimensions.width / 2 + halfWidth;
    const maxX = roomDimensions.width / 2 - halfWidth;
    const minZ = -roomDimensions.length / 2 + halfLength;
    const maxZ = roomDimensions.length / 2 - halfLength;

    const newX = Math.min(Math.max(x / aspect, minX), maxX);
    const newZ = Math.min(Math.max(-y / aspect, minZ), maxZ);

    setPosition([newX, position[1], newZ]);
  });

  const handleRotate = () => {
    setRotation([rotation[0], rotation[1] + Math.PI / 2, rotation[2]]);
  };

  return (
    <group {...bind()} position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[dimensions.width, dimensions.height, dimensions.length]} />
        <meshStandardMaterial color={type === "bed" ? "blue" : "brown"} />
      </mesh>

      {/* ✅ Fix: Use Html to place button properly in 3D */}
      <Html position={[0, 2, 0]} center>
        <button
          onClick={handleRotate}
          style={{
            background: "blue",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Rotate {type}
        </button>
      </Html>
    </group>
  );
}

export default Furniture;
