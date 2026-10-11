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
    "06 / Kontakt": "06 / Contact",
    "04 / Werdegang": "04 / Career",
    "Vom Handwerk zum Design": "From craft to design",
    "Stationen": "Milestones",
    "und Wege.": "and paths.",
    "Vom Raumausstatter-Handwerk über Handel und Technik bis zum Designstudium an der Hochschule Coburg.": "From interior-fitting craft through retail and technology to design studies at Coburg University.",
    "Werdegang": "Career",
    "Fähigkeiten": "Skills",
    "heute": "present",
    "Trainer": "Trainer",
    "Verkäufer": "Sales assistant",
    "Studentische Hilfskraft": "Student assistant",
    "Service Point / Sportleader": "Service point / sports leader",
    "Einrichtungsberater": "Interior consultant",
    "Raumausstatter": "Interior fitter",
    "Produktionshelfer": "Production assistant",
    "Lichttechniker": "Lighting technician",
    "ABS-, PP- & PE-Schweißer": "ABS, PP & PE welder",
    "Selbstständig als Raumausstatter": "Self-employed interior fitter",
    "Arbeitssuchend": "Job seeking",
    "Leitung und Durchführung von Team Events": "Leading and running team events",
    "Verkauf und Beratung im Einzelhandel": "Retail sales and customer advice",
    "Einführungskurse im 3D Lab und Ansprechpartner im Maker Space": "Introductory courses in the 3D lab and point of contact in the maker space",
    "Leitung des Service Points; Warenplanung; Werkstattleitung": "Managing the service point; merchandise planning; workshop management",
    "Kundenberatung und Wohnraumplanung": "Customer consulting and living-space planning",
    "Teilzeitbeschäftigung; Renovierungsarbeiten im ICE der DB": "Part-time; refurbishment work on DB ICE trains",
    "Teilzeitbeschäftigung; Altbau-Sanierungen": "Part-time; renovation of old buildings",
    "Herstellung von Thermoplasten und thermoplastischen Elastomeren": "Production of thermoplastics and thermoplastic elastomers",
    "Aufbau, Steuerung und Bedienung von Bühnentechnik": "Setting up, controlling and operating stage technology",
    "Herstellung von Kleinkläranlagen": "Manufacturing small wastewater treatment plants",
    "Renovierungen im Innenausbau von Wohnräumen": "Interior renovation of living spaces",
    "Mitgestaltung des Audi Driving Experience Centers in Neuburg": "Contributing to the Audi Driving Experience Center in Neuburg",
    "Kreative Wandgestaltungen": "Creative wall design",
    "Auftragsbedingtes Wintertief": "Seasonal winter slump in orders",
    "Selbstständiges Realisieren von Baustellen und Unterweisen der Lehrlinge": "Running construction sites independently and training apprentices",
    "Frühere Stationen anzeigen": "Show earlier positions",
    "Frühere Stationen ausblenden": "Hide earlier positions",
    "05 / Fähigkeiten": "05 / Skills",
    "Kopf, Hand und Werkzeug": "Head, hand and tools",
    "Was ich": "What I",
    "mitbringe.": "bring.",
    "Berufliche Fähigkeiten": "Professional skills",
    "Management & Strategie": "Management & strategy",
    "Prozessmanagement": "Process management",
    "Teamleitung und Konfliktbewältigung": "Team leadership and conflict resolution",
    "Waren- und Umsatzplanung": "Merchandise and sales planning",
    "Kundenbeziehungen & Vertrieb": "Customer relations & sales",
    "Kundenakquise": "Customer acquisition",
    "Produktpräsentation": "Product presentation",
    "Technisch & handwerklich": "Technical & craft",
    "Lichttechnik und Bühnenbau": "Lighting technology and stage construction",
    "ABS-, PP- & PE-Schweißen": "ABS, PP & PE welding",
    "Wandgestaltung": "Wall design",
    "Boden legen und Ausbesserungsarbeiten": "Floor laying and repair work",
    "Programmkenntnisse": "Software skills",
    "Bildbearbeitung & Design": "Image editing & design",
    "Office & Produktivität": "Office & productivity",
    "Audioproduktion & DJing": "Audio production & DJing",
    "Künstliche Intelligenz": "Artificial intelligence",
    "(in Arbeit)": "(in progress)",
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
    "06 / Kontakt": "06 / Contacto",
    "04 / Werdegang": "04 / Trayectoria",
    "Vom Handwerk zum Design": "Del oficio al diseño",
    "Stationen": "Etapas",
    "und Wege.": "y caminos.",
    "Vom Raumausstatter-Handwerk über Handel und Technik bis zum Designstudium an der Hochschule Coburg.": "Del oficio de decorador de interiores, pasando por el comercio y la técnica, hasta los estudios de diseño en la Universidad de Coburgo.",
    "Werdegang": "Trayectoria",
    "Fähigkeiten": "Habilidades",
    "heute": "actualidad",
    "Trainer": "Entrenador",
    "Verkäufer": "Vendedor",
    "Studentische Hilfskraft": "Ayudante estudiantil",
    "Service Point / Sportleader": "Punto de servicio / responsable de deportes",
    "Einrichtungsberater": "Asesor de interiorismo",
    "Raumausstatter": "Decorador de interiores",
    "Produktionshelfer": "Auxiliar de producción",
    "Lichttechniker": "Técnico de iluminación",
    "ABS-, PP- & PE-Schweißer": "Soldador de ABS, PP y PE",
    "Selbstständig als Raumausstatter": "Autónomo como decorador de interiores",
    "Arbeitssuchend": "En búsqueda de empleo",
    "Leitung und Durchführung von Team Events": "Dirección y realización de eventos de equipo",
    "Verkauf und Beratung im Einzelhandel": "Venta y asesoramiento en el comercio minorista",
    "Einführungskurse im 3D Lab und Ansprechpartner im Maker Space": "Cursos introductorios en el laboratorio 3D y persona de contacto en el espacio maker",
    "Leitung des Service Points; Warenplanung; Werkstattleitung": "Dirección del punto de servicio; planificación de mercancías; dirección del taller",
    "Kundenberatung und Wohnraumplanung": "Asesoramiento a clientes y planificación de espacios habitables",
    "Teilzeitbeschäftigung; Renovierungsarbeiten im ICE der DB": "Media jornada; trabajos de renovación en trenes ICE de DB",
    "Teilzeitbeschäftigung; Altbau-Sanierungen": "Media jornada; rehabilitación de edificios antiguos",
    "Herstellung von Thermoplasten und thermoplastischen Elastomeren": "Fabricación de termoplásticos y elastómeros termoplásticos",
    "Aufbau, Steuerung und Bedienung von Bühnentechnik": "Montaje, control y manejo de técnica escénica",
    "Herstellung von Kleinkläranlagen": "Fabricación de pequeñas depuradoras",
    "Renovierungen im Innenausbau von Wohnräumen": "Reformas de interiores en viviendas",
    "Mitgestaltung des Audi Driving Experience Centers in Neuburg": "Participación en el Audi Driving Experience Center de Neuburg",
    "Kreative Wandgestaltungen": "Diseño creativo de paredes",
    "Auftragsbedingtes Wintertief": "Bajón invernal por falta de pedidos",
    "Selbstständiges Realisieren von Baustellen und Unterweisen der Lehrlinge": "Ejecución autónoma de obras y formación de aprendices",
    "Frühere Stationen anzeigen": "Mostrar etapas anteriores",
    "Frühere Stationen ausblenden": "Ocultar etapas anteriores",
    "05 / Fähigkeiten": "05 / Habilidades",
    "Kopf, Hand und Werkzeug": "Cabeza, mano y herramientas",
    "Was ich": "Lo que",
    "mitbringe.": "aporto.",
    "Berufliche Fähigkeiten": "Habilidades profesionales",
    "Management & Strategie": "Gestión y estrategia",
    "Prozessmanagement": "Gestión de procesos",
    "Teamleitung und Konfliktbewältigung": "Dirección de equipos y resolución de conflictos",
    "Waren- und Umsatzplanung": "Planificación de mercancías y ventas",
    "Kundenbeziehungen & Vertrieb": "Relaciones con clientes y ventas",
    "Kundenakquise": "Captación de clientes",
    "Produktpräsentation": "Presentación de productos",
    "Technisch & handwerklich": "Técnico y artesanal",
    "Lichttechnik und Bühnenbau": "Técnica de iluminación y construcción de escenarios",
    "ABS-, PP- & PE-Schweißen": "Soldadura de ABS, PP y PE",
    "Wandgestaltung": "Diseño de paredes",
    "Boden legen und Ausbesserungsarbeiten": "Colocación de suelos y trabajos de reparación",
    "Programmkenntnisse": "Conocimientos de software",
    "Bildbearbeitung & Design": "Edición de imagen y diseño",
    "Office & Produktivität": "Ofimática y productividad",
    "Audioproduktion & DJing": "Producción de audio y DJ",
    "Künstliche Intelligenz": "Inteligencia artificial",
    "(in Arbeit)": "(en curso)",
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
