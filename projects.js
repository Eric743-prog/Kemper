"use strict";

// Edit project content here. Each ID in this order becomes a portfolio card.
const projectOrder = ["chair", "workstation", "coffee", "cutaway", "aquifer", "illustration", "cyanotype", "berlin", "coast", "cosmic", "stars"];

const projects = {
  chair: {
    title: "Skulpturales Sitzen",
    category: "Produktdesign / Formstudie",
    description: "Eine geschwungene Linie wird zum Sitzobjekt. Renderings und konstruktive Ansichten zeigen das Zusammenspiel von Kontur, Oberfläche und Aufbau.",
    images: [["chair.jpg", "Perspektivisches Rendering"], ["chair-side.jpg", "Seitenansicht der geschwungenen Form"], ["chair-cad.jpg", "Konstruktive Ansicht einer Sesselvariante"]],
    card: { filter: "design", label: "Produktdesign", wide: true, surface: "neutral", contain: false, imageLabel: "Formstudie / Rendering" },
    note: "Beschreibender Arbeitstitel. Die Ansichten zeigen unterschiedliche Entwurfsvarianten; Material, Herstellungsverfahren und Projektkontext sind noch zu ergänzen."
  },
  aquifer: {
    title: "Aquifer",
    category: "Grafik / Visuelle Identität",
    description: "Tropfen, Welle und Kreis bilden ein gemeinsames Zeichen. Die Auswahl zeigt die farbige Logoausarbeitung und Studien zur Wortmarke.",
    images: [["aquifer.jpg", "Logo mit Farbverlauf"], ["aquifer-sketch.jpg", "Varianten der Wortmarke"]],
    card: { filter: "graphic", label: "Visuelle Identität", wide: false, surface: "lavender", contain: true },
    note: "Anwendungsbereich, Auftraggeber und Entwurfsprozess sind noch zu ergänzen."
  },
  berlin: {
    title: "Zwischen den Linien",
    category: "Fotografie / Stadt & Licht",
    description: "Diagonale Streben rahmen den Blick auf Wasser, Architektur und Abendlicht. Zwei Aufnahmen spielen mit Schärfe, Vordergrund und der warmen Farbe des Himmels.",
    images: [["berlin.jpg", "Abendlicht über der Spree"], ["berlin-focus.jpg", "Eine andere Schärfeebene"]],
    card: { filter: "photo", label: "Fotografie", wide: false, surface: "", contain: false },
    note: "Beschreibender Arbeitstitel. Aufnahmejahr und Serienkontext sind noch zu ergänzen."
  },
  coffee: {
    title: "Kaffeebereiter",
    category: "Produktdesign / CAD & Rendering",
    description: "Ein alltägliches Objekt aus konstruktiver Perspektive. Produktansicht und Explosionsdarstellung machen den Aufbau des gläsernen Kaffeebereiters sichtbar.",
    images: [["coffee-exploded.jpg", "Explosionsdarstellung der Komponenten"], ["coffee.jpg", "Visualisierung des Kaffeebereiters"]],
    card: { filter: "design", label: "Produktdesign & CAD", wide: false, surface: "lime", contain: true },
    note: "Die Quelldateien nennen Kemper und Weber. Die genaue Aufgabenverteilung und vollständigen Credits müssen vor Veröffentlichung ergänzt werden."
  },
  cutaway: {
    title: "Baugruppe im Schnitt",
    category: "Produktdesign / CAD & Konstruktion",
    description: "Ein Blick ins Innere: Schnittansicht und Detail zeigen die Anordnung von Gehäuse, Filterstruktur und weiteren Komponenten. Die farbliche Differenzierung macht den konstruktiven Aufbau nachvollziehbar.",
    images: [["cutaway.jpg", "Schnittansicht der Baugruppe"], ["cutaway-detail.jpg", "Detailansicht der inneren Struktur"]],
    card: { filter: "design", label: "Produktdesign & CAD", wide: false, surface: "lavender", contain: true },
    note: "Beschreibender Arbeitstitel. Produktfunktion, Projektzuordnung und genaue Aufgabenverteilung sind noch zu bestätigen."
  },
  cyanotype: {
    title: "In Blau",
    category: "Freie Gestaltung / Bildexperiment",
    description: "Porträt, Struktur und tiefe Blautöne. Zwei Bildarbeiten untersuchen die Wirkung von Oberfläche, Kontrast und körperlicher Form.",
    images: [["cyanotype.jpg", "Porträt in Blau"], ["cyanotype-body.jpg", "Körper- und Oberflächenstudie"]],
    card: { filter: "graphic", label: "Bildexperiment", wide: false, surface: "", contain: false },
    note: "Beschreibender Arbeitstitel. Technik und Entstehungskontext sind noch zu bestätigen."
  },
  coast: {
    title: "Letztes Licht",
    category: "Fotografie / Landschaft",
    description: "Warmes Abendlicht trifft auf Fels und Brandung. Die Küstenaufnahmen stellen die ruhige Linie des Horizonts der Bewegung des Wassers gegenüber.",
    images: [["coast.jpg", "Küste im goldenen Abendlicht"], ["coast-second.jpg", "Fels, Wasser und Horizont"]],
    card: { filter: "photo", label: "Fotografie", wide: true, surface: "", contain: false, imageLabel: "Licht / Landschaft / Atmosphäre" },
    note: "Beschreibender Arbeitstitel. Aufnahmeort und Aufnahmejahr sind noch zu ergänzen."
  },
  illustration: {
    title: "Freie Linien",
    category: "Illustration / Zeichnung",
    description: "Von feinen Federstrukturen bis zu expressiven Farbflächen. Diese Auswahl verbindet eine detaillierte Tierzeichnung mit einer farbintensiven freien Illustration.",
    images: [["eagle.jpg", "Adlerkopf – Detail und Linienführung"], ["octopus.jpg", "Oktopus – Farbe und organische Form"]],
    card: { filter: "graphic", label: "Illustration", wide: false, surface: "pink", contain: true },
    note: "Beschreibender Sammlungstitel. Verwendete Medien und mögliche digitale Bearbeitungen sind noch zu ergänzen."
  },
  stars: {
    title: "Latest Stars",
    category: "Grafik / Covergestaltung",
    description: "Farbige Punkte, vernetzte Linien und ein dunkler Bildraum. Ergänzt wird das Cover durch ein weiteres Artwork mit einer skulpturalen Tropfenform.",
    images: [["stars.jpg", "Latest Stars – Cover"], ["drop.jpg", "Morph Drop – Artwork"]],
    card: { filter: "graphic", label: "Covergestaltung", wide: false, surface: "", contain: false },
    note: "Die Artworks werden gemeinsam als grafische Auswahl gezeigt. Zusammengehörigkeit, Veröffentlichungsdaten und Credits sind noch zu bestätigen."
  },
  cosmic: {
    title: "Cosmic Wake",
    category: "Artwork / Covergestaltung",
    description: "Ein Sternenhimmel trifft auf handgezeichnete Formen: Schiff, Wal und geometrische Ebenen verbinden sich zu einem detailreichen Covermotiv.",
    images: [["cosmic-wake.png", "Cosmic Wake – Cover mit Schiff, Walen und Sternenhimmel"]],
    card: { filter: "graphic", label: "Artwork / Covergestaltung", wide: true, surface: "", contain: false, tall: true },
    note: "Die Arbeit wird als bereitgestelltes Covermotiv gezeigt. Entstehungskontext und vollständige Credits sind vor einer Veröffentlichung zu bestätigen."
  },
  workstation: {
    title: "Arbeitsstation",
    category: "Produktdesign / Konzept",
    description: "Eine kompakte Arbeitsstation mit integrierten Ablagen und gepolsterten Flächen. Das Rendering untersucht Nutzung, Materialität und eine ruhige, reduzierte Form.",
    images: [["workstation.png", "Rendering einer kompakten Arbeitsstation mit gepolsterter Oberfläche"]],
    card: { filter: "design", label: "Produktdesign / Konzept", wide: false, surface: "neutral", contain: true },
    note: "Die Arbeit wird als bereitgestelltes Rendering gezeigt. Funktion, Material und Projektkontext sind vor einer Veröffentlichung zu bestätigen."
  }
};

const localizedProjectCopy = {
  en: {
    chair: ["Sculptural seating", "Product design / Form study", "A curved line becomes a seating object. Renderings and construction views show the interplay of contour, surface and structure."],
    aquifer: ["Aquifer", "Graphics / Visual identity", "A drop, wave and circle form one shared symbol. The selection shows the colour logo and wordmark studies."],
    berlin: ["Between the lines", "Photography / City & light", "Diagonal beams frame water, architecture and evening light. Two photographs explore focus, foreground and the warm colour of the sky."],
    coffee: ["Coffee maker", "Product design / CAD & rendering", "An everyday object from a construction perspective. Product view and exploded drawing reveal the structure of the glass coffee maker."],
    cutaway: ["Assembly cutaway", "Product design / CAD & construction", "A view inside: the cutaway and detail show the arrangement of the housing, filter structure and further components."],
    cyanotype: ["In blue", "Independent work / Image experiment", "Portrait, texture and deep shades of blue. Two artworks explore surface, contrast and the human form."],
    coast: ["Last light", "Photography / Landscape", "Warm evening light meets rock and surf. The coastal images contrast the calm horizon with the movement of the water."],
    illustration: ["Free lines", "Illustration / Drawing", "From fine pen structures to expressive blocks of colour. The selection combines a detailed animal drawing with a vivid independent illustration."],
    stars: ["Latest Stars", "Graphics / Cover design", "Coloured points, connected lines and a dark picture space. The cover is complemented by another artwork with a sculptural drop form."],
    cosmic: ["Cosmic Wake", "Artwork / Cover design", "A starry sky meets hand-drawn forms: ship, whale and geometric layers combine in a detailed cover motif."],
    workstation: ["Workstation", "Product design / Concept", "A compact workstation with integrated storage and upholstered surfaces. The rendering explores use, materiality and a calm, reduced form."]
  },
  es: {
    chair: ["Asiento escultural", "Diseño de producto / Estudio de forma", "Una línea curva se convierte en un objeto para sentarse. Los renderizados y las vistas constructivas muestran el juego entre contorno, superficie y estructura."],
    aquifer: ["Aquifer", "Gráfica / Identidad visual", "Una gota, una ola y un círculo forman un símbolo común. La selección muestra el logotipo a color y estudios de la marca verbal."],
    berlin: ["Entre las líneas", "Fotografía / Ciudad y luz", "Vigas diagonales enmarcan agua, arquitectura y luz del atardecer. Dos fotografías exploran el enfoque, el primer plano y el color cálido del cielo."],
    coffee: ["Cafetera", "Diseño de producto / CAD y renderizado", "Un objeto cotidiano desde una perspectiva constructiva. La vista de producto y el despiece revelan la estructura de la cafetera de vidrio."],
    cutaway: ["Conjunto en sección", "Diseño de producto / CAD y construcción", "Una mirada al interior: la sección y el detalle muestran la disposición de la carcasa, la estructura del filtro y otros componentes."],
    cyanotype: ["En azul", "Creación libre / Experimento visual", "Retrato, textura y tonos azules profundos. Dos obras exploran la superficie, el contraste y la forma del cuerpo."],
    coast: ["Última luz", "Fotografía / Paisaje", "La cálida luz del atardecer se encuentra con roca y oleaje. Las imágenes costeras contraponen el horizonte tranquilo con el movimiento del agua."],
    illustration: ["Líneas libres", "Ilustración / Dibujo", "De las finas estructuras de pluma a los expresivos campos de color. La selección combina un detallado dibujo animal con una ilustración libre y vibrante."],
    stars: ["Latest Stars", "Gráfica / Diseño de portada", "Puntos de color, líneas conectadas y un espacio visual oscuro. La portada se complementa con otra obra de forma de gota escultórica."],
    cosmic: ["Cosmic Wake", "Artwork / Diseño de portada", "Un cielo estrellado se encuentra con formas dibujadas a mano: barco, ballena y capas geométricas se combinan en un detallado motivo de portada."],
    workstation: ["Estación de trabajo", "Diseño de producto / Concepto", "Una estación de trabajo compacta con almacenamiento integrado y superficies acolchadas. El renderizado explora uso, materialidad y una forma serena y reducida."]
  }
};

const preferredLanguage = document.documentElement.lang;
if (localizedProjectCopy[preferredLanguage]) {
  Object.entries(localizedProjectCopy[preferredLanguage]).forEach(([id, [title, category, description]]) => {
    Object.assign(projects[id], { title, category, description });
  });
}
