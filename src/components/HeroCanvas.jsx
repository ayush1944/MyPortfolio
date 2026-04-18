import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

// ── Sun — warm orange-white with pulsing corona ───────────────────
const Sun = () => {
  const coreRef   = useRef();
  const coronaRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (coreRef.current)   coreRef.current.rotation.y = t * 0.1;
    if (coronaRef.current) {
      // Slow pulsing corona
      const s = 1 + Math.sin(t * 0.7) * 0.05;
      coronaRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Outer corona glow */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[0.58, 20, 20]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.12} />
      </mesh>
      {/* Mid halo */}
      <mesh>
        <sphereGeometry args={[0.46, 20, 20]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.15} />
      </mesh>
      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshStandardMaterial
          color="#fffaf0"
          emissive="#ff5500"
          emissiveIntensity={3.8}
          roughness={0.05}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

// ── Orbit ring ────────────────────────────────────────────────────
const OrbitRing = ({ radius, tilt = 0 }) => (
  <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
    <torusGeometry args={[radius, 0.003, 6, 90]} />
    <meshBasicMaterial color="#ffffff" opacity={0.055} transparent />
  </mesh>
);

// ── Planet ────────────────────────────────────────────────────────
const Planet = ({ orbitR, orbitSpeed, size, color, tilt = 0, hasRing = false }) => {
  const groupRef  = useRef();
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * orbitSpeed;
    if (groupRef.current)  groupRef.current.rotation.y  = t;
    if (planetRef.current) planetRef.current.rotation.y = clock.elapsedTime * 0.25;
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <OrbitRing radius={orbitR} tilt={-tilt} />
      <group ref={groupRef}>
        <mesh ref={planetRef} position={[orbitR, 0, 0]}>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.07}
            roughness={0.72}
            metalness={0.04}
          />
          {hasRing && (
            <mesh rotation={[Math.PI * 0.44, 0.2, 0]}>
              <torusGeometry args={[size * 1.95, size * 0.26, 3, 64]} />
              <meshBasicMaterial color={color} opacity={0.22} transparent side={THREE.DoubleSide} />
            </mesh>
          )}
        </mesh>
      </group>
    </group>
  );
};

// ── Asteroid belt — visible but not "boxy" ────────────────────────
const AsteroidBelt = ({ isDark }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(350 * 3);
    for (let i = 0; i < 350; i++) {
      const a = (i / 350) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
      const r = 2.18 + (Math.random() - 0.5) * 0.32;
      arr[i * 3]     = r * Math.cos(a);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      arr[i * 3 + 2] = r * Math.sin(a);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        color={isDark ? '#d0ccc4' : '#605040'}
        size={0.009}
        sizeAttenuation
        transparent
        opacity={isDark ? 0.65 : 0.35}
        depthWrite={false}
      />
    </Points>
  );
};

// ── Distant stars — two layers, same neutral color ────────────────
const Stars = ({ isDark }) => {
  const { smallPos, largePos } = useMemo(() => {
    const fill = (count, rMin, rMax) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = rMin + Math.random() * (rMax - rMin);
        arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = r * Math.cos(phi);
      }
      return arr;
    };
    return { smallPos: fill(500, 8, 15), largePos: fill(90, 6.5, 11) };
  }, []);

  const smallRef = useRef();
  const largeRef = useRef();

  useFrame(({ clock }) => {
    if (smallRef.current) smallRef.current.rotation.y =  clock.elapsedTime * 0.003;
    if (largeRef.current) largeRef.current.rotation.y = -clock.elapsedTime * 0.002;
  });

  const col = isDark ? '#f0ede8' : '#2a2010';

  return (
    <>
      <Points ref={smallRef} positions={smallPos} stride={3}>
        <PointMaterial color={col} size={0.014} sizeAttenuation transparent
          opacity={isDark ? 0.6 : 0.18} depthWrite={false} />
      </Points>
      <Points ref={largeRef} positions={largePos} stride={3}>
        <PointMaterial color={col} size={0.026} sizeAttenuation transparent
          opacity={isDark ? 0.38 : 0.1} depthWrite={false} />
      </Points>
    </>
  );
};

// ── Mouse tilt ────────────────────────────────────────────────────
const MouseTilt = ({ children }) => {
  const groupRef = useRef();
  const tx = useRef(0), ty = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      tx.current = ((e.clientY / window.innerHeight) - 0.5) * 0.4;
      ty.current = ((e.clientX / window.innerWidth)  - 0.5) * 0.55;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += (tx.current - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (ty.current - groupRef.current.rotation.y) * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
};

// ── Scene ─────────────────────────────────────────────────────────
const Scene = ({ isDark }) => (
  <>
    <ambientLight intensity={isDark ? 0.18 : 0.32} />
    {/* Sun light — warm orange */}
    <pointLight position={[0, 0, 0]} intensity={isDark ? 4.5 : 3.0}
      color="#ff8833" distance={16} decay={1.5} />
    {/* Fill light — cool */}
    <pointLight position={[4, 3, 2]} intensity={0.4}
      color={isDark ? '#c0d8ff' : '#ffe8c0'} distance={12} />

    <MouseTilt>
      <Stars isDark={isDark} />
      <Sun />

      {/* Slower orbital speeds — ~40% of previous */}
      {/* Mercury-like — warm grey */}
      <Planet orbitR={0.82}  orbitSpeed={0.20} size={0.09}  color={isDark ? '#c8b89a' : '#a09070'} />
      {/* Earth-like — desaturated slate */}
      <Planet orbitR={1.15}  orbitSpeed={0.13} size={0.13}  color={isDark ? '#8aa8c8' : '#607890'} />
      {/* Mars-like — muted terracotta */}
      <Planet orbitR={1.70}  orbitSpeed={0.08} size={0.10}  color={isDark ? '#c89070' : '#a07050'} tilt={0.12} />
      {/* Gas giant — warm stone, ring */}
      <Planet orbitR={2.65}  orbitSpeed={0.035} size={0.19} color={isDark ? '#c8b890' : '#a09070'} tilt={0.08} hasRing />
      {/* Ice giant — cool grey-blue */}
      <Planet orbitR={3.55}  orbitSpeed={0.022} size={0.14} color={isDark ? '#90a8b8' : '#708090'} tilt={0.18} />

      <AsteroidBelt isDark={isDark} />
    </MouseTilt>
  </>
);

// ── Canvas wrapper ────────────────────────────────────────────────
const HeroCanvas = () => {
  const { isDark } = useTheme();

  return (
    <Canvas
      camera={{ position: [0, 1.8, 6.5], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene isDark={isDark} />
      </Suspense>
    </Canvas>
  );
};

export default HeroCanvas;
