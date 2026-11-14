"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Shared pointer state (window-wide, so the robot watches the cursor  */
/* anywhere on the page, not only over the canvas).                     */
/* ------------------------------------------------------------------ */
const pointer = { x: 0, y: 0, last: 0 };

const C = {
  shell: "#F4F3EE",
  ink: "#17171C",
  joint: "#D8D6CF",
  glow: "#5B73FF",
};

function useMaterials() {
  return useMemo(
    () => ({
      shell: new THREE.MeshPhysicalMaterial({
        color: C.shell,
        roughness: 0.38,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
      }),
      ink: new THREE.MeshPhysicalMaterial({
        color: C.ink,
        roughness: 0.12,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
      }),
      joint: new THREE.MeshStandardMaterial({ color: C.joint, roughness: 0.5, metalness: 0.2 }),
      glow: new THREE.MeshBasicMaterial({ color: C.glow, toneMapped: false }),
      glowSoft: new THREE.MeshBasicMaterial({ color: "#8FA0FF", toneMapped: false }),
    }),
    []
  );
}

const damp = THREE.MathUtils.damp;

function RobotModel({ reduced, hopAt }: { reduced: boolean; hopAt: React.MutableRefObject<number> }) {
  const m = useMaterials();
  const root = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Group>(null!);
  const head = useRef<THREE.Group>(null!);
  const eyes = useRef<THREE.Group>(null!);
  const eyeL = useRef<THREE.Mesh>(null!);
  const eyeR = useRef<THREE.Mesh>(null!);
  const armL = useRef<THREE.Group>(null!);
  const armR = useRef<THREE.Group>(null!);
  const antenna = useRef<THREE.Mesh>(null!);
  const bars = useRef<THREE.Mesh[]>([]);
  const start = useRef<number | null>(null);
  const nextBlink = useRef(2.5);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;
    const life = t - start.current;

    // Target gaze: cursor, or a slow idle wander when the cursor has been still for a while.
    const idle = performance.now() - pointer.last > 3500;
    const tx = idle ? Math.sin(t * 0.5) * 0.55 : pointer.x;
    const ty = idle ? Math.sin(t * 0.33) * 0.25 : pointer.y;

    head.current.rotation.y = damp(head.current.rotation.y, tx * 0.75, 5, dt);
    head.current.rotation.x = damp(head.current.rotation.x, ty * 0.38, 5, dt);
    head.current.rotation.z = damp(head.current.rotation.z, -tx * 0.08, 4, dt);
    body.current.rotation.y = damp(body.current.rotation.y, tx * 0.28, 3, dt);
    eyes.current.position.x = damp(eyes.current.position.x, tx * 0.06, 8, dt);
    eyes.current.position.y = damp(eyes.current.position.y, -ty * 0.04, 8, dt);

    // Blink
    if (t > nextBlink.current) nextBlink.current = t + 2.5 + Math.random() * 3;
    const blinkPhase = nextBlink.current - t;
    const lid = blinkPhase < 0.14 ? Math.abs(blinkPhase - 0.07) / 0.07 : 1;
    eyeL.current.scale.y = eyeR.current.scale.y = Math.max(0.08, lid);

    // Hop when clicked
    const sinceHop = t - hopAt.current;
    const hop = sinceHop >= 0 && sinceHop < 0.7 ? Math.sin((sinceHop / 0.7) * Math.PI) * 0.35 : 0;

    // Gentle float
    const float = reduced ? 0 : Math.sin(t * 1.4) * 0.06;
    root.current.position.y = float + hop;

    // Arms: wave hello on load, then relaxed sway
    const sway = reduced ? 0 : Math.sin(t * 1.4 + 0.6) * 0.05;
    const waving = !reduced && life > 0.6 && life < 3.2;
    const rTarget = waving ? 2.5 + Math.sin(life * 11) * 0.32 : 0.12 + sway + hop * 0.8;
    armR.current.rotation.z = damp(armR.current.rotation.z, rTarget, waving ? 9 : 5, dt);
    armL.current.rotation.z = damp(armL.current.rotation.z, -0.12 - sway - hop * 0.8, 5, dt);

    // Antenna + chest "voice" bars
    const pulse = 0.75 + Math.sin(t * 3) * 0.25;
    antenna.current.scale.setScalar(pulse * 0.25 + 0.85);
    bars.current.forEach((b, i) => {
      if (!b) return;
      const h = reduced ? 0.6 : 0.35 + Math.abs(Math.sin(t * (3 + i * 1.3) + i)) * 0.65;
      b.scale.y = damp(b.scale.y, h, 10, dt);
    });
  });

  return (
    <group ref={root}>
      <group ref={body} position={[0, -0.05, 0]}>
        {/* Torso */}
        <RoundedBox args={[1.12, 0.98, 0.82]} radius={0.32} smoothness={6} position={[0, -0.62, 0]} material={m.shell} />
        {/* Chest panel with animated bars */}
        <RoundedBox args={[0.56, 0.3, 0.06]} radius={0.08} smoothness={4} position={[0, -0.52, 0.41]} material={m.ink} />
        {[-0.14, -0.047, 0.047, 0.14].map((x, i) => (
          <mesh
            key={x}
            ref={(el) => {
              if (el) bars.current[i] = el;
            }}
            position={[x, -0.52, 0.447]}
            material={i % 2 ? m.glowSoft : m.glow}
          >
            <boxGeometry args={[0.045, 0.18, 0.01]} />
          </mesh>
        ))}

        {/* Shoulders + arms (pivot at the shoulder) */}
        {[
          { ref: armL, x: -0.66 },
          { ref: armR, x: 0.66 },
        ].map(({ ref, x }) => (
          <group key={x} ref={ref} position={[x, -0.3, 0]}>
            <mesh material={m.joint}>
              <sphereGeometry args={[0.13, 32, 32]} />
            </mesh>
            <mesh position={[0, -0.36, 0]} material={m.shell}>
              <capsuleGeometry args={[0.13, 0.42, 12, 24]} />
            </mesh>
            <mesh position={[0, -0.72, 0]} material={m.ink}>
              <sphereGeometry args={[0.15, 32, 32]} />
            </mesh>
          </group>
        ))}

        {/* Neck */}
        <mesh position={[0, -0.04, 0]} material={m.joint}>
          <cylinderGeometry args={[0.17, 0.2, 0.22, 32]} />
        </mesh>

        {/* Head */}
        <group ref={head} position={[0, 0.5, 0]}>
          <RoundedBox args={[1.5, 1.12, 1.12]} radius={0.34} smoothness={8} material={m.shell} />
          {/* Visor */}
          <RoundedBox args={[1.24, 0.76, 0.2]} radius={0.2} smoothness={6} position={[0, 0.0, 0.5]} material={m.ink} />
          {/* Eyes */}
          <group ref={eyes} position={[0, 0.03, 0.605]}>
            <mesh ref={eyeL} position={[-0.27, 0, 0]} material={m.glow}>
              <capsuleGeometry args={[0.075, 0.12, 8, 16]} />
            </mesh>
            <mesh ref={eyeR} position={[0.27, 0, 0]} material={m.glow}>
              <capsuleGeometry args={[0.075, 0.12, 8, 16]} />
            </mesh>
          </group>
          {/* Ears */}
          {[-0.79, 0.79].map((x) => (
            <group key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <mesh material={m.joint}>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
              </mesh>
              <mesh position={[0, x > 0 ? -0.06 : 0.06, 0]} material={m.glow}>
                <torusGeometry args={[0.12, 0.018, 12, 40]} />
              </mesh>
            </group>
          ))}
          {/* Antenna */}
          <mesh position={[0, 0.72, 0]} material={m.joint}>
            <cylinderGeometry args={[0.025, 0.025, 0.32, 16]} />
          </mesh>
          <mesh ref={antenna} position={[0, 0.92, 0]} material={m.glow}>
            <sphereGeometry args={[0.075, 32, 32]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function Robot() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const hopAt = useRef(-10);
  const clock = useRef<THREE.Clock | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const onMove = (e: PointerEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.4;
      pointer.x = THREE.MathUtils.clamp((e.clientX - cx) / (window.innerWidth * 0.5), -1, 1);
      pointer.y = THREE.MathUtils.clamp((e.clientY - cy) / (window.innerHeight * 0.6), -1, 1);
      pointer.last = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Pause rendering while the hero is off-screen.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    if (wrap.current) io.observe(wrap.current);

    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative h-full w-full transition-opacity duration-1000 ease-out"
      style={{ opacity: ready ? 1 : 0 }}
      aria-label="An interactive 3D robot that follows your cursor"
      role="img"
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.35, 6.3], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ clock: c }) => {
          clock.current = c;
          requestAnimationFrame(() => setReady(true));
        }}
        onPointerDown={() => {
          if (clock.current) hopAt.current = clock.current.elapsedTime;
        }}
        style={{ cursor: "pointer", touchAction: "pan-y" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 5, 4]} intensity={1.7} />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} color="#C9D0FF" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.2} position={[0, 4, 3]} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
          <Lightformer form="rect" intensity={0.8} color="#B8C2FF" position={[5, 0, -2]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
        </Environment>
        <group position={[0, 0.25, 0]}>
          <RobotModel reduced={reduced} hopAt={hopAt} />
        </group>
        <ContactShadows position={[0, -1.25, 0]} opacity={0.32} scale={6} blur={2.6} far={3} resolution={512} />
      </Canvas>
    </div>
  );
}
