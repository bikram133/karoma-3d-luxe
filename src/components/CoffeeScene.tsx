import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Cup() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const p = state.pointer;
    // gentle sway instead of a full spin (a spinning handle reads as a glitch)
    const targetY = Math.sin(t * 0.35) * 0.28 + p.x * 0.35;
    const targetX = -0.05 + p.y * 0.12;
    const k = 1 - Math.exp(-2.5 * dt);
    group.current.rotation.y += (targetY - group.current.rotation.y) * k;
    group.current.rotation.x += (targetX - group.current.rotation.x) * k;
  });

  return (
    <group ref={group}>
      {/* saucer */}
      <mesh position={[0, -0.98, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.9, 1.62, 0.12, 96]} />
        <meshStandardMaterial color="#f6efe4" roughness={0.35} metalness={0.05} />
      </mesh>
      {/* cup body (closed lathe-free solid: outer wall) */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 0.72, 1.3, 96, 1, true]} />
        <meshStandardMaterial
          color="#fbf6ee"
          roughness={0.3}
          metalness={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* cup bottom cap */}
      <mesh position={[0, -0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.66, 0.1, 96]} />
        <meshStandardMaterial color="#f1e9dc" roughness={0.42} />
      </mesh>
      {/* rim */}
      <mesh position={[0, 0.55, 0]} rotation-x={Math.PI / 2} castShadow>
        <torusGeometry args={[1.045, 0.045, 20, 96]} />
        <meshStandardMaterial color="#ffffff" roughness={0.22} />
      </mesh>
      {/* coffee surface */}
      <mesh position={[0, 0.42, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[1.0, 96]} />
        <meshStandardMaterial color="#2a140a" roughness={0.15} metalness={0.35} />
      </mesh>
      {/* crema swirl (polygon offset avoids z-fighting with the coffee) */}
      <mesh position={[0, 0.42, 0]} rotation-x={-Math.PI / 2} renderOrder={1}>
        <ringGeometry args={[0.42, 0.94, 96]} />
        <meshStandardMaterial
          color="#a06a33"
          roughness={0.4}
          transparent
          opacity={0.6}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>
      {/* handle */}
      <mesh position={[0.98, -0.1, 0]} rotation={[0, 0, -Math.PI * 0.62]} castShadow>
        <torusGeometry args={[0.44, 0.1, 24, 96, Math.PI * 1.24]} />
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
          color="#7a4a24"
          position={[5, 0, 1]}
          rotation-y={-Math.PI / 2}
          scale={[20, 2, 1]}
        />
      </Environment>
    </Canvas>
  );
}
