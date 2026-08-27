import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Cup() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.05);
    group.current.rotation.y += dt * 0.25;
    const p = state.pointer;
    group.current.rotation.x += (p.y * 0.18 - group.current.rotation.x) * (1 - Math.exp(-3 * dt));
  });

  return (
    <group ref={group}>
      {/* saucer */}
      <mesh position={[0, -0.62, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.75, 1.55, 0.12, 64]} />
        <meshStandardMaterial color="#f6efe4" roughness={0.35} metalness={0.05} />
      </mesh>
      {/* cup body */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 0.78, 1.15, 64, 1, true]} />
        <meshStandardMaterial
          color="#fbf6ee"
          roughness={0.28}
          metalness={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* cup base */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.78, 0.62, 0.14, 64]} />
        <meshStandardMaterial color="#f1e9dc" roughness={0.4} />
      </mesh>
      {/* rim */}
      <mesh position={[0, 0.62, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.05, 0.05, 16, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>
      {/* coffee surface */}
      <mesh position={[0, 0.55, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[1.02, 64]} />
        <meshStandardMaterial color="#2a140a" roughness={0.12} metalness={0.5} />
      </mesh>
      {/* crema swirl */}
      <mesh position={[0, 0.565, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[0.55, 0.95, 64]} />
        <meshStandardMaterial color="#8a5a2b" roughness={0.35} transparent opacity={0.55} />
      </mesh>
      {/* handle */}
      <mesh position={[1.15, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.42, 0.11, 20, 60, Math.PI * 1.25]} />
        <meshStandardMaterial color="#fbf6ee" roughness={0.3} />
      </mesh>
    </group>
  );
}

function Beans() {
  const group = useRef<THREE.Group>(null);
  const beans = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2;
        const r = 2.4 + (i % 4) * 0.42;
        return {
          pos: [Math.cos(a) * r, -0.45 + Math.sin(i * 3.1) * 0.9, Math.sin(a) * r] as const,
          rot: [i * 0.7, i * 1.3, i * 0.4] as const,
          s: 0.18 + (i % 3) * 0.035,
          speed: 0.1 + (i % 5) * 0.02,
        };
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.05);
    group.current.rotation.y -= dt * 0.12;
    group.current.children.forEach((child, i) => {
      child.rotation.x += dt * beans[i]!.speed;
      child.rotation.z += dt * beans[i]!.speed * 0.6;
    });
  });

  return (
    <group ref={group}>
      {beans.map((b, i) => (
        <mesh key={i} position={b.pos as unknown as [number, number, number]} rotation={b.rot as unknown as [number, number, number]} scale={[b.s, b.s * 0.62, b.s * 0.78]} castShadow>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#4a2412" roughness={0.55} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

export default function CoffeeScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2.4, 6.4], fov: 42 }}
      gl={{ antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={2.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight position={[-6, 5, 2]} intensity={40} angle={0.6} penumbra={1} color="#e0a35e" />

      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
        <Cup />
      </Float>
      <Beans />

      <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={12} blur={3} far={5} color="#150a04" />

      <Environment>
        <Lightformer intensity={2.2} position={[0, 5, 2]} scale={[10, 10, 1]} color="#fff2df" />
        <Lightformer
          intensity={1.2}
          color="#c98a45"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[20, 2, 1]}
        />
        <Lightformer
          intensity={0.8}
          color="#5a3venus"
          position={[5, 0, 1]}
          rotation-y={-Math.PI / 2}
          scale={[20, 2, 1]}
        />
      </Environment>
    </Canvas>
  );
}
