"use strict";

const preferences = {
  language: "portfolio-language",
  theme: "portfolio-theme"
};

function isPreferenceStorageAvailable() {
  try {
    const testKey = "__portfolio-preferences-test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn("Die Einstellungen können in diesem Browser-Kontext nicht dauerhaft gespeichert werden.", error);
    return false;
  }
}

const isLocalFile = window.location.protocol === "file:";
const canPersistPreferences = !isLocalFile && isPreferenceStorageAvailable();

function readPreference(key) {
  return canPersistPreferences ? window.localStorage.getItem(key) : null;
}

function savePreference(key, value) {
  window.localStorage.setItem(key, value);
}

const translations = {
  de: {
    backToPortfolio: "Zum Portfolio <span>↗</span>",
    skip: "Zu den Einstellungen",
    homeLabel: "Daniel Kemper – Startseite",
    settingsLabel: "Einstellungen",
    eyebrow: "Daniel Kemper / Portfolio",
    title: "Deine<br><em>Einstellungen.</em>",
    intro: "Passe Sprache und Darstellung an. Deine Auswahl wird auf diesem Gerät gespeichert.",
    languageTitle: "Sprache",
    languageLabel: "Website-Sprache",
    languageHelp: "Wähle Deutsch, Spanisch oder Englisch für die Website aus.",
    appearanceTitle: "Darstellung",
    darkMode: "Dunkelmodus",
    darkModeHelp: "Reduziert helle Flächen für eine angenehmere Ansicht bei wenig Licht.",
    appearanceHelp: "Du kannst jederzeit zum hellen Design zurückwechseln.",
    saved: "Einstellungen gespeichert.",
    pageTitle: "Einstellungen — Daniel Kemper",
    storageUnavailable: "Einstellungen können bei diesem lokalen Aufruf nicht dauerhaft gespeichert werden. Das helle Design bleibt aktiv."
  },
  es: {
    backToPortfolio: "Ir al portafolio <span>↗</span>",
    skip: "Ir a configuración",
    homeLabel: "Daniel Kemper – página de inicio",
    settingsLabel: "Configuración",
    eyebrow: "Daniel Kemper / Portafolio",
    title: "Tus<br><em>ajustes.</em>",
    intro: "Ajusta el idioma y la apariencia. Tu elección se guarda en este dispositivo.",
    languageTitle: "Idioma",
    languageLabel: "Idioma del sitio web",
    languageHelp: "Elige alemán, español o inglés para el sitio web.",
    appearanceTitle: "Apariencia",
    darkMode: "Modo oscuro",
    darkModeHelp: "Reduce las superficies brillantes para una vista más agradable con poca luz.",
    appearanceHelp: "Puedes volver al diseño claro cuando quieras.",
    saved: "Configuración guardada.",
    pageTitle: "Configuración — Daniel Kemper",
    storageUnavailable: "La configuración no se puede guardar de forma permanente en esta apertura local. El diseño claro permanece activo."
  },
  en: {
    backToPortfolio: "Back to portfolio <span>↗</span>",
    skip: "Skip to settings",
    homeLabel: "Daniel Kemper – home page",
    settingsLabel: "Settings",
    eyebrow: "Daniel Kemper / Portfolio",
    title: "Your<br><em>settings.</em>",
    intro: "Adjust the language and appearance. Your choice is saved on this device.",
    languageTitle: "Language",
    languageLabel: "Website language",
    languageHelp: "Choose German, Spanish, or English for the website.",
    appearanceTitle: "Appearance",
    darkMode: "Dark mode",
    darkModeHelp: "Reduces bright surfaces for more comfortable viewing in low light.",
    appearanceHelp: "You can return to the light design at any time.",
    saved: "Settings saved.",
    pageTitle: "Settings — Daniel Kemper",
    storageUnavailable: "Settings cannot be saved permanently in this local opening. The light design remains active."
  }
};

const pageTranslations = {
  en: {
    "Zum Inhalt": "Skip to content",
    "Arbeiten": "Work",
    "Profil": "Profile",
    "Projekt anfragen": "Start a project",
    "Andere": "Different",
    "Perspektiven.": "Perspectives.",
    "Daniel Kemper / Kreatives Portfolio": "Daniel Kemper / Creative portfolio",
    "Design. Bild. Experiment.": "Design. Image. Experiment.",
    "Von der ersten Linie bis zur neuen visuellen Welt.": "From the first line to a new visual world.",
    "Produktdesign, Fotografie & freie Gestaltung.": "Product design, photography & independent work.",
    "Das Projekt-Storybuch öffnen": "Open the project storybook",
    "Form & Funktion": "Form & function",
    "Licht & Farbe": "Light & colour",
    "Idee & Experiment": "Idea & experiment",
    "01 / Ausgewählte Arbeiten": "01 / Selected work",
    "Disziplinen im Dialog": "Disciplines in dialogue",
    "Nicht nur eine": "Not just one",
    "Richtung.": "direction.",
    "Objekte, Bilder und visuelle Identitäten.": "Objects, images and visual identities.",
    "Eine Auswahl aus unterschiedlichen kreativen Welten.": "A selection from different creative worlds.",
    "Alle": "All",
    "Produktdesign": "Product design",
    "Fotografie": "Photography",
    "Grafik & Illustration": "Graphics & illustration",
    "02 / Der Blick dahinter": "02 / Behind the view",
    "Zwischen": "Between",
    "Präzision": "precision",
    "und Intuition.": "and intuition.",
    "03 / Kreative Felder": "03 / Creative fields",
    "Von der Idee zum Ausdruck": "From idea to expression",
    "Was wir gestalten können.": "What we can create.",
    "Produkt & Form": "Product & form",
    "Bild & Atmosphäre": "Image & atmosphere",
    "Grafik & Identität": "Graphics & identity",
    "04 / Nächste Perspektive": "04 / Next perspective",
    "Neue Ideen beginnen im Austausch": "New ideas begin through conversation",
    "Eine Idee?": "An idea?",
    "Lass uns reden.": "Let's talk.",
    "Kontakt folgt": "Contact coming soon",
    "Hinweise zur Website": "Website notes",
    "Nach oben ↑": "Back to top ↑",
    "Zum Storybuch": "Skip to storybook",
    "Zum Portfolio": "Portfolio",
    "Alle Arbeiten": "All work",
    "Arbeiten werden": "Work becomes",
    "Geschichten.": "stories.",
    "Eine Sammlung in neun Kapiteln.": "A collection in nine chapters.",
    "Aufschlagen, entdecken, weiterblättern.": "Open, discover, keep turning.",
    "Zurück": "Back",
    "Weiter": "Next",
    "Inhalt": "Contents",
    "Vollbild": "Full screen",
    "Vollbild beenden": "Exit full screen",
    "Ein Kapitel pro Aufschlag. Blättern mit den Pfeilen oder den Links-/Rechts-Pfeiltasten.": "One chapter per spread. Use the buttons or the left and right arrow keys to turn pages.",
    "Zum Kontaktbereich": "Go to contact section",
    "Zum Buch ↑": "Back to book ↑"
    ,"Daniel Kemper / Ein Projekt-Storybuch": "Daniel Kemper / A project storybook"
    ,"Daniel Kemper / Ausgewählte Arbeiten": "Daniel Kemper / Selected work"
    ,"Einleitung / Inhalt": "Introduction / Contents"
    ,"Neun Projekte. Viele Perspektiven.": "Nine projects. Many perspectives."
    ,"Von konstruktiven Details über fotografische Blickwinkel bis zu freien Bildwelten. Blättere durch die Kapitel oder springe direkt zu einem Projekt.": "From construction details and photographic viewpoints to independent visual worlds. Turn through the chapters or jump straight to a project."
    ,"Form. Bild. Idee.": "Form. Image. Idea."
    ,"Design & visuelle Welten": "Design & visual worlds"
    ,"Skulpturales Sitzen": "Sculptural seating"
    ,"Baugruppe im Schnitt": "Assembly cutaway"
    ,"Zwischen den Linien": "Between the lines"
    ,"Kaffeebereiter": "Coffee maker"
    ,"In Blau": "In blue"
    ,"Letztes Licht": "Last light"
    ,"Freie Linien": "Free lines"
  },
  es: {
    "Zum Inhalt": "Ir al contenido",
    "Arbeiten": "Trabajos",
    "Profil": "Perfil",
    "Projekt anfragen": "Iniciar un proyecto",
    "Andere": "Otras",
    "Perspektiven.": "perspectivas.",
    "Daniel Kemper / Kreatives Portfolio": "Daniel Kemper / Portafolio creativo",
    "Design. Bild. Experiment.": "Diseño. Imagen. Experimento.",
    "Von der ersten Linie bis zur neuen visuellen Welt.": "De la primera línea a un nuevo mundo visual.",
    "Produktdesign, Fotografie & freie Gestaltung.": "Diseño de producto, fotografía y creación independiente.",
    "Das Projekt-Storybuch öffnen": "Abrir el libro de proyectos",
    "Form & Funktion": "Forma y función",
    "Licht & Farbe": "Luz y color",
    "Idee & Experiment": "Idea y experimento",
    "01 / Ausgewählte Arbeiten": "01 / Trabajos seleccionados",
    "Disziplinen im Dialog": "Disciplinas en diálogo",
    "Nicht nur eine": "No solo una",
    "Richtung.": "dirección.",
    "Objekte, Bilder und visuelle Identitäten.": "Objetos, imágenes e identidades visuales.",
    "Eine Auswahl aus unterschiedlichen kreativen Welten.": "Una selección de distintos mundos creativos.",
    "Alle": "Todos",
    "Produktdesign": "Diseño de producto",
    "Fotografie": "Fotografía",
    "Grafik & Illustration": "Gráfica e ilustración",
    "02 / Der Blick dahinter": "02 / La mirada detrás",
    "Zwischen": "Entre",
    "Präzision": "precisión",
    "und Intuition.": "e intuición.",
    "03 / Kreative Felder": "03 / Áreas creativas",
    "Von der Idee zum Ausdruck": "De la idea a la expresión",
    "Was wir gestalten können.": "Lo que podemos crear.",
    "Produkt & Form": "Producto y forma",
    "Bild & Atmosphäre": "Imagen y atmósfera",
    "Grafik & Identität": "Gráfica e identidad",
    "04 / Nächste Perspektive": "04 / Próxima perspectiva",
    "Neue Ideen beginnen im Austausch": "Las nuevas ideas comienzan en el diálogo",
    "Eine Idee?": "¿Una idea?",
    "Lass uns reden.": "Hablemos.",
    "Kontakt folgt": "Contacto próximamente",
    "Hinweise zur Website": "Notas del sitio web",
    "Nach oben ↑": "Volver arriba ↑",
    "Zum Storybuch": "Ir al libro de proyectos",
    "Zum Portfolio": "Portafolio",
    "Alle Arbeiten": "Todos los trabajos",
    "Arbeiten werden": "Los trabajos se vuelven",
    "Geschichten.": "historias.",
    "Eine Sammlung in neun Kapiteln.": "Una colección en nueve capítulos.",
    "Aufschlagen, entdecken, weiterblättern.": "Abrir, descubrir, seguir pasando.",
    "Zurück": "Atrás",
    "Weiter": "Siguiente",
    "Inhalt": "Contenido",
    "Vollbild": "Pantalla completa",
    "Vollbild beenden": "Salir de pantalla completa",
    "Ein Kapitel pro Aufschlag. Blättern mit den Pfeilen oder den Links-/Rechts-Pfeiltasten.": "Un capítulo por doble página. Usa los botones o las flechas izquierda y derecha para pasar página.",
    "Zum Kontaktbereich": "Ir a contacto",
    "Zum Buch ↑": "Volver al libro ↑"
    ,"Daniel Kemper / Ein Projekt-Storybuch": "Daniel Kemper / Un libro de proyectos"
    ,"Daniel Kemper / Ausgewählte Arbeiten": "Daniel Kemper / Trabajos seleccionados"
    ,"Einleitung / Inhalt": "Introducción / Contenido"
    ,"Neun Projekte. Viele Perspektiven.": "Nueve proyectos. Muchas perspectivas."
    ,"Von konstruktiven Details über fotografische Blickwinkel bis zu freien Bildwelten. Blättere durch die Kapitel oder springe direkt zu einem Projekt.": "De detalles constructivos y miradas fotográficas a mundos visuales libres. Recorre los capítulos o salta directamente a un proyecto."
    ,"Form. Bild. Idee.": "Forma. Imagen. Idea."
    ,"Design & visuelle Welten": "Diseño y mundos visuales"
    ,"Skulpturales Sitzen": "Asiento escultural"
    ,"Baugruppe im Schnitt": "Conjunto en sección"
    ,"Zwischen den Linien": "Entre las líneas"
    ,"Kaffeebereiter": "Cafetera"
    ,"In Blau": "En azul"
    ,"Letztes Licht": "Última luz"
    ,"Freie Linien": "Líneas libres"
  }
};

function localizeContent(container = document) {
  const language = storedLanguage();
  const dictionary = pageTranslations[language];
  if (!dictionary) return;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    const source = node.nodeValue.trim();
    const translated = dictionary[source];
    if (translated) node.nodeValue = node.nodeValue.replace(source, translated);
  });
}

window.localizePortfolioContent = localizeContent;

function storedLanguage() {
  const language = readPreference(preferences.language);
  return translations[language] ? language : "de";
}

const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

function storedTheme() {
  if (!canPersistPreferences) return "light";
  const theme = readPreference(preferences.theme);
  if (theme === "dark" || theme === "light") return theme;
  return systemThemeQuery.matches ? "dark" : "light";
}

function hasSavedTheme() {
  const theme = readPreference(preferences.theme);
  return theme === "dark" || theme === "light";
}

function applyPreferences(language = storedLanguage(), theme = storedTheme()) {
  document.documentElement.lang = language;
  document.documentElement.dataset.theme = theme;
  if (!canPersistPreferences) document.documentElement.dataset.storageUnavailable = "true";
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === "dark" ? "#20221e" : "#e7eaf0";
  document.querySelectorAll("[data-settings-link]").forEach((link) => {
    link.setAttribute("aria-label", translations[language].settingsLabel);
    link.title = translations[language].settingsLabel;
  });
}

function renderSettings(language) {
  const copy = translations[language];
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.innerHTML = copy[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", copy[element.dataset.i18nAriaLabel]);
  });
  document.title = copy.pageTitle;
}

applyPreferences();

document.addEventListener("DOMContentLoaded", () => {
  applyPreferences();
  if (!document.body.classList.contains("settings-page")) {
    localizeContent();
    if (document.body.classList.contains("storybook-body")) {
      document.title = storedLanguage() === "en" ? "Project Storybook — Daniel Kemper" : storedLanguage() === "es" ? "Libro de proyectos — Daniel Kemper" : document.title;
    } else if (storedLanguage() === "en") {
      document.title = "Daniel Kemper — Design & Visual Worlds";
    } else if (storedLanguage() === "es") {
      document.title = "Daniel Kemper — Diseño y mundos visuales";
    }
    let preferenceSignature = `${storedLanguage()}:${storedTheme()}`;
    window.setInterval(() => {
      const nextSignature = `${storedLanguage()}:${storedTheme()}`;
      if (nextSignature !== preferenceSignature) window.location.reload();
    }, 750);
    return;
  }

  const languageSelect = document.querySelector("#language-select");
  const darkModeToggle = document.querySelector("#dark-mode");
  const status = document.querySelector("#settings-status");
  languageSelect.value = storedLanguage();
  darkModeToggle.checked = storedTheme() === "dark";
  renderSettings(languageSelect.value);
  if (!canPersistPreferences) {
    document.body.dataset.storageUnavailable = "true";
    languageSelect.disabled = true;
    darkModeToggle.disabled = true;
    status.textContent = translations[languageSelect.value].storageUnavailable;
    return;
  }

  languageSelect.addEventListener("change", () => {
    savePreference(preferences.language, languageSelect.value);
    applyPreferences(languageSelect.value);
    renderSettings(languageSelect.value);
    status.textContent = translations[languageSelect.value].saved;
  });

  darkModeToggle.addEventListener("change", () => {
    const theme = darkModeToggle.checked ? "dark" : "light";
    savePreference(preferences.theme, theme);
    applyPreferences(languageSelect.value, theme);
    status.textContent = translations[languageSelect.value].saved;
  });
});

systemThemeQuery.addEventListener("change", (event) => {
  if (canPersistPreferences && !hasSavedTheme()) applyPreferences(storedLanguage(), event.matches ? "dark" : "light");
});

window.addEventListener("storage", (event) => {
  if (!preferences || (event.key !== preferences.language && event.key !== preferences.theme)) return;
  if (!document.body.classList.contains("settings-page")) window.location.reload();
});

window.addEventListener("pageshow", () => {
  if (document.body.classList.contains("settings-page")) return;
  if (document.documentElement.lang !== storedLanguage() || document.documentElement.dataset.theme !== storedTheme()) {
    window.location.reload();
  }
});
