import { Sphere, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = () => {
  const { viewport } = useThree();
  const material = useRef();
  const particlesRef = useRef();
  const color = useRef({
    color: "#1a1a2e",
  });
  const data = useScroll();
  const tl = useRef();

  // Smooth color interpolation
  const currentColor = useRef(new THREE.Color(color.current.color));
  const targetColor = useRef(new THREE.Color(color.current.color));

  // Create particles
  const particlesCount = 50;
  const particles = useRef(
    Array.from({ length: particlesCount }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      size: Math.random() * 0.5 + 0.1,
    }))
  );

  useFrame((state, delta) => {
    const scrollProgress = data.scroll.current;
    tl.current.progress(scrollProgress);
    
    // Update target color based on the current color from the timeline
    targetColor.current.set(color.current.color);
    
    // Smooth interpolation between current and target color
    currentColor.current.lerp(targetColor.current, 0.05);
    material.current.color = currentColor.current;

    // Animate particles
    particles.current.forEach((particle) => {
      particle.position.add(particle.velocity);

      // Boundary check and reverse direction
      ['x', 'y', 'z'].forEach(axis => {
        if (Math.abs(particle.position[axis]) > 15) {
          particle.velocity[axis] *= -1;
        }
      });
    });

    // Update particles positions
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      particles.current.forEach((particle, i) => {
        positions.setXYZ(i, particle.position.x, particle.position.y, particle.position.z);
      });
      positions.needsUpdate = true;
    }
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    
    // About section: Deep space blue
    tl.current.to(color.current, {
      color: "#0f172a",
      duration: 1.5,
      ease: "power2.inOut"
    });

    // Skills section: Rich purple
    tl.current.to(color.current, {
      color: "#1e1b4b",
      duration: 1.5,
      ease: "power2.inOut"
    });

    // Projects section: Deep indigo
    tl.current.to(color.current, {
      color: "#312e81",
      duration: 1.5,
      ease: "power2.inOut"
    });

    // Contact section: Midnight blue
    tl.current.to(color.current, {
      color: "#1e3a8a",
      duration: 1.5,
      ease: "power2.inOut"
    });
  }, []);

  // Create particle positions
  const particlePositions = new Float32Array(particlesCount * 3);
  particles.current.forEach((particle, i) => {
    particlePositions[i * 3] = particle.position.x;
    particlePositions[i * 3 + 1] = particle.position.y;
    particlePositions[i * 3 + 2] = particle.position.z;
  });

  return (
    <group>
      {/* Main background sphere */}
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>

      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          color="#ffffff"
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient glow spheres */}
      <group>
        <Sphere scale={[2, 2, 2]} position={[-12, -6, -8]}>
          <meshBasicMaterial color="#4f46e5" opacity={0.15} transparent={true} />
        </Sphere>
        <Sphere scale={[3, 3, 3]} position={[15, 8, -10]}>
          <meshBasicMaterial color="#7c3aed" opacity={0.15} transparent={true} />
        </Sphere>
        <Sphere scale={[1.5, 1.5, 1.5]} position={[0, -10, -5]}>
          <meshBasicMaterial color="#2563eb" opacity={0.15} transparent={true} />
        </Sphere>
      </group>
    </group>
  );
};
