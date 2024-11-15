import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.jsx';
import log from 'loglevel';


log.setLevel('silent');

// Ignorer les erreurs spécifiques dans la console
window.onerror = function (message, source, lineno, colno, error) {
  if (error && error.message && error.message.includes("Cannot read properties of undefined")) {
    // Ne rien faire ou afficher un message personnalisé dans la console
    return true;  // Empêche l'affichage de l'erreur dans la console
  }
  // Pour les autres erreurs, les laisser s'afficher normalement
  return false;
};

// Désactiver l'affichage des erreurs, avertissements et logs dans la console (en développement)
if (process.env.NODE_ENV === 'development') {
  console.error = () => {};  // Désactive les erreurs dans la console
  console.warn = () => {};   // Désactive les avertissements dans la console
  console.log = () => {};    // Désactive les logs dans la console
}
  
  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
