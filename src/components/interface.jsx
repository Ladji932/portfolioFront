import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { useState } from "react";

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
  return (
    <Section mobileTop className="flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl md:text-6xl font-extrabold leading-snug md:mt-0 mb-8">
        <br />

        <span className="bg-white px-3 italic">Ladji Maiga</span>
      </h1>
      <motion.p
        className="text-lg text-black-600 mt-2"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        Je suis apprenti développeur Web
        <br />
        en 3ème année de bachelor
      </motion.p>
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contactez moi
      </motion.button>
    </Section>
  );
};

const skills = [
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
      <motion.div className="w-full"whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Compètences</h2>
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

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={previousProject}
        >
          ← Précédent
        </button>
        <h2 className="text-3xl md:text-5xl font-bold">Projets</h2>
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={nextProject}
        >
          Suivant →
        </button>
      </div>
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
      <h2 className="text-3xl md:text-5xl font-bold">Contactez moi</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-green-900 text-center">Merci pour votre message, il a bien été envoyé à mon adresse email !</p>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
                Nom
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />

              <label htmlFor="email" className="font-medium text-gray-900 block mb-1 mt-8">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />

              <label htmlFor="message" className="font-medium text-gray-900 block mb-1 mt-8">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
              />

              {state.errors.length > 0 && (
                <div className="mt-4 text-red-500">
                  {state.errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}

              {state.submitting && (
                <div className="mt-4 text-center">
                  <div className="w-8 h-8 border-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin mx-auto"></div>
                  <p>Envoi en cours...</p>
                </div>
              )}

              <button
                disabled={state.submitting}
                className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16"
              >
                Envoyer
              </button>
            </form>
          </>
        )}
      </div>
    </Section>
  );
};
