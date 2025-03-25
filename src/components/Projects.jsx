import { Image, Text, Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

export const projects = [
  {
    title: "Linkedin",
    url: "https://www.linkedin.com/in/ladji-maiga-512b44225/",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=1200",
    description: "Voici le lien de mon profil LinkedIn.",
  },
  {
    title: "Jeu de combat",
    url: "https://game-figth.vercel.app/",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1200",
    description: "Créez et affrontez des personnages uniques.",
  },
  {
    title: "Event Ease",
    url: "https://projet-b3-front.vercel.app/",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200",
    description: "Organisez et trouvez des événements facilement.",
  },
  {
    title: "Cinémathèque",
    url: "https://cinematheque-movies-ladji.vercel.app/",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200",
    description: "Voici le lien vers mon projet Cinémathèque réalisé en React.",
  },
  {
    title: "Github",
    url: "https://github.com/Ladji932",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1200",
    description: "Pour voir plus de projets",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;
  const background = useRef();
  const imageRef = useRef();
  const bgOpacity = useMotionValue(0.4);
  const hoverScale = useMotionValue(1);
  const distortionSpeed = useMotionValue(0.5);
  const distortionIntensity = useMotionValue(0.3);
  const hoverColor = useMotionValue(highlighted ? "#9333ea" : "#1e1b4b");

  const texture = useLoader(TextureLoader, project.image); // Charger l'image comme texture

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.9 : 0.4);
    animate(hoverScale, highlighted ? 1.2 : 1, {
      type: "spring",
      stiffness: 400,
      damping: 30
    });
    animate(distortionSpeed, highlighted ? 2 : 0.5);
    animate(distortionIntensity, highlighted ? 0.5 : 0.3);
    animate(hoverColor, highlighted ? "#9333ea" : "#1e1b4b");
  }, [highlighted]);

  useFrame((state) => {
    background.current.material.opacity = bgOpacity.get();
    background.current.scale.setScalar(hoverScale.get());
    const t = state.clock.getElapsedTime();
    background.current.position.y = Math.sin(t * 0.5) * 0.05;
    
    if (imageRef.current) {
      imageRef.current.material.distort = Math.sin(t * distortionSpeed.get()) * distortionIntensity.get();
    }
  });

  return (
    <group {...props}>
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.6}
        floatingRange={[-0.2, 0.2]}
      >
        <mesh
          position-z={-0.001}
          onClick={() => window.open(project.url, "_blank")}
          ref={background}
        >
          <planeGeometry args={[2.2, 2]} />
          <MeshDistortMaterial
            color={hoverColor}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            speed={0.5}
            distort={0.3}
          />
        </mesh>
        <mesh ref={imageRef} position-y={0.3}>
          <planeGeometry args={[2, 1.2]} />
          <MeshDistortMaterial
            transparent
            speed={0.5}
            distort={0.3}
            map={texture} // Applique la texture ici
          />
        </mesh>
        <group position-y={-0.4}>
          <Text
            maxWidth={2}
            anchorX={"left"}
            anchorY={"top"}
            fontSize={0.2}
            position={[-1, 0, 0]}
            letterSpacing={0.05}
            fontWeight="bold"
            color={highlighted ? "#f0abfc" : "#e2e8f0"}
            outlineWidth={0.02}
            outlineBlur={0.05}
            material-toneMapped={false}
          >
            {project.title.toUpperCase()}
          </Text>
          <Text
            maxWidth={2}
            anchorX="left"
            anchorY="top"
            fontSize={0.1}
            position={[-1, -0.25, 0]}
            color={highlighted ? "#e2e8f0" : "#94a3b8"}
            letterSpacing={0.02}
            fontWeight="bold"
            material-toneMapped={false}
          >
            {project.description}
          </Text>
        </group>
      </Float>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#9333ea" />
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};

export default Projects;
