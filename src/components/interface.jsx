import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { GraduationCap, Code2, Sparkles ,Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <Section mobileTop className="about-section">
      <div className="gradient-background"></div>
      
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.3 + 0.2
            }}
            animate={{
              y: [null, "-100vh"],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="content-container">
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="glow-circle"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="header"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="sparkles-icon"
          >
            <Sparkles />
          </motion.div>
          
          <h1 className="title">
            Ladji Maiga
            <motion.span
              className="sparkle"
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </h1>

          <div className="divider-container">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="divider"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="info-container"
        >
          <div className="info-item">
            <Code2 className="icon" />
            <span>Développeur Web</span>
          </div>
          <div className="separator"></div>
          <div className="info-item">
            <GraduationCap className="icon" />
            <span>3ème année Bachelor</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="button-container"
        >
          <button onClick={() => setSection(3)} className="contact-button">
            <span className="button-text">
              Contactez moi
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="arrow"
              >
                →
              </motion.span>
            </span>
            <motion.div
              initial={false}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="button-background"
            />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="scroll-indicator"
        >
          <div className="scroll-mouse">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="scroll-dot"
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );


};const skills = [
  {
    title: "Node.js / React.js , React Native",
    level: 80,
  },
  {
    title: "Php / Symfony",
    level: 90,
  },
  {
    title: "Python , Django ",
    level: 70,
  },
  {
    title: "Typescript",
    level: 70,
  },
  {
    title: "Git",
    level: 90,
  },
];
const languages = [
  {
    title: "🇫🇷 Français",
    level: 100,
  },
  {
    title: "🇺🇸 Anglais",
    level: 80,
  },
  {
    title: "🇯🇵 Japonais",
    level: 10,
  },
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div className="w-full pt-7"whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Compétences</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-full md:w-64" key={index}>
              <motion.h3
                className="text-lg md:text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">
          Langages
          </h2>
          <div className="mt-8 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const titleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Section className="space-y-8">
      <motion.div 
        className="flex w-[90vw] h-full gap-8 items-center justify-center p-8"
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 }
        }}
      >
        <motion.button
          className="text-white focus:outline-none"
          onClick={previousProject}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <IoArrowBackCircle
            size={64}
            className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] hover:text-yellow-400 hover:drop-shadow-[0_6px_10px_rgba(255,223,0,0.6)] transition-colors duration-300"
          />
        </motion.button>

        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white tracking-wider"
          variants={titleVariants}
        >
          Projets
        </motion.h2>

        <motion.button
          className="text-white focus:outline-none"
          onClick={nextProject}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <IoArrowForwardCircle
            size={64}
            className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] hover:text-yellow-400 hover:drop-shadow-[0_6px_10px_rgba(255,223,0,0.6)] transition-colors duration-300"
          />
        </motion.button>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentProject === index ? "bg-yellow-400" : "bg-white"
              }`}
              initial={false}
              animate={{
                scale: currentProject === index ? 1.2 : 1,
                opacity: currentProject === index ? 1 : 0.5,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

const ContactSection = () => {
  const [state, setState] = useState({ succeeded: false, submitting: false, errors: [] });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    
    const errors = [];
    if (!formObject.name || formObject.name.trim() === '') {
      errors.push('Le champ "Nom" est requis.');
    }
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formObject.email || !emailRegex.test(formObject.email)) {
      errors.push('Veuillez entrer un email valide.');
    }
  
    if (!formObject.message || formObject.message.trim() === '') {
      errors.push('Le champ "Message" est requis.');
    }
  
    if (errors.length > 0) {
      setState({ ...state, errors, submitting: false });
      return;
    }
  
    try {
      setState({ ...state, submitting: true, errors: [] });
  
      const response = await fetch("https://backoffice-6.onrender.com/formDatas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
  
      if (response.ok) {
        setState({ succeeded: true, submitting: false, errors: [] });
      } else {
        const errorData = await response.json();
        setState({ succeeded: false, submitting: false, errors: [errorData.message || "Erreur d'envoi"] });
      }
    } catch (error) {
      setState({ succeeded: false, submitting: false, errors: ["Erreur réseau"] });
    }
  };

  return (
<Section>
  <div className="relative">
    {/* Éléments décoratifs */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-purple-400 to-indigo-300/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-300/40 rounded-full blur-3xl animate-pulse"></div>
    </div>

    <div className="max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl transform rotate-1 blur opacity-20"></div>
        <div className="relative backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl p-8 md:p-12">
          {state.succeeded ? (
            <div className="py-12 text-center">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-50"></div>
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto relative" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Message envoyé avec succès !
              </h3>
              <p className="text-gray-600 text-lg">
                Merci pour votre message. Je vous répondrai dans les plus brefs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-xl border-0 px-4 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all duration-200"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-xl border-0 px-4 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all duration-200"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="block w-full rounded-xl border-0 px-4 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all duration-200 resize-none"
                  placeholder="Décrivez votre projet ou posez vos questions..."
                />
              </div>

              {state.errors.length > 0 && (
                <div className="rounded-xl bg-red-50 p-4">
                  {state.errors.map((error, index) => (
                    <p key={index} className="flex items-center gap-2 text-sm text-red-600">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2 group"
              >
                {state.submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Envoyer le message</span>
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
</Section>
  );
};