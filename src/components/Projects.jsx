import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Linkedin",
    url: "https://www.linkedin.com/in/ladji-maiga-512b44225/",
    image: "projects/LinkedIn.jpg",
    description: "Recreating the Atmos Awwwards website with React Three Fiber",
  },
  {
    title: "Portfolio",
    url: "https://www.youtube.com/watch?v=YkHqpqJgLKw",
    image: "projects/portfolio.jpg",
    description: "Learn how to bake a 3D model with Blender and use it in r3f",
  },
  {
    title: "Film",
    url: "https://projet-film.vercel.app/",
    image: "projects/film.jpg",
    description: "Learn how to use ReadyPlayerMe to create a 3D avatar",
  },
  {
    title: "Jeux de combat",
    url: "https://game-in-react-psi.vercel.app/",
    image: "projects/combat.jpg",
    description: "Use React Three Fiber to create a 3D game",
  },
  {
    title: "Github",
    url: "https://github.com/Ladji932",
    image: "projects/github.jpg",
    description: "Create a loading screen for your r3f projects",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, 1.4, 0]} // Modifié pour ajuster la position du titre
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, 1, 0]} // Modifié pour ajuster la position de la description
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
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
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
