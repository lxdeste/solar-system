import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Euler } from "three";

import astronomicalBodies from "../astronomicalBodyData";

function Orbit(
  props: JSX.IntrinsicElements["mesh"] & { rotationSpeed: number }
) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    mesh.current.rotateY(props.rotationSpeed);
  });

  return (
    <mesh {...props} ref={mesh}>
      {props.children}
    </mesh>
  );
}

function AstronomicalBody({
  selected = false,
  isLightSource = false,
  scale = 1,
  color = "white",
  onClick,
  ...props
}: JSX.IntrinsicElements["mesh"] & {
  selected: boolean;
  isLightSource?: boolean;
  scale?: number;
  color?: THREE.ColorRepresentation;
  onClick?: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => {
    // TODO: cant see this rotation because the material is uniform
    mesh.current.rotateY(0.05);
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={2 * scale}
      onClick={() => {
        setActive(!active);
        onClick?.();
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {selected || hovered ? (
        <mesh
          rotation={new Euler(Math.PI, 0, 0, "XYZ")}
          position={[0, 3 / scale / 2 + 1, 0]}
          scale={1 / scale / 2}
        >
          <meshBasicMaterial color={hovered ? "Hotpink" : "Aquamarine"} />
          <coneGeometry args={[1, 2, 32]} />
        </mesh>
      ) : undefined}
      <sphereGeometry args={[1, 32, 16]} />
      {isLightSource ? (
        <>
          <meshBasicMaterial color={color} />
          <pointLight distance={400} intensity={3} position={[0, 0, 0]} />
        </>
      ) : (
        <meshStandardMaterial color={color} />
      )}

      {props.children}
    </mesh>
  );
}

function SolarSystem({
  selectedBody,
  bodyClicked,
}: {
  selectedBody: string;
  bodyClicked: (id: string) => void;
}) {
  return (
    <Canvas
      camera={{
        position: [0, 15, 70],
      }}
    >
      <ambientLight intensity={0.1} />
      {astronomicalBodies.map((body) => {
        return (
          <Orbit rotationSpeed={body.orbitingSpeed} key={body.id}>
            <AstronomicalBody
              onClick={() => {
                bodyClicked(body.id);
              }}
              selected={body.id === selectedBody}
              isLightSource={body.isLightSource}
              scale={body.scale}
              position={body.position}
              color={body.color}
            ></AstronomicalBody>
          </Orbit>
        );
      })}
    </Canvas>
  );
}

export default SolarSystem;
