"use strict";

// Inhalte des Storybuchs „Freie Arbeiten“.
// Bilder liegen als reine Bilddateien in assets/storybook/, die Texte stehen hier als reiner Text.
// Die gestalteten Vorlagen assets/1.png bis assets/21.png dienen nur noch als Quelle.
const freeWorks = [
  {
    title: "Mr. Bubbles",
    medium: "Aquarellmalerei",
    details: "Mit fluoreszierenden Aquarellfarben · 42 × 59,4 cm",
    text: [
      "Das Gemälde präsentiert einen blaugeringelten Kraken in einem faszinierenden abstrakten Stil, der die Kreatur in ihrer natürlichen Umgebung, dem Ozean, einfängt.",
      "Der Krake ist dynamisch in Bewegung festgehalten. Seine Arme sind weit ausgebreitet, während der Körper in geschwungener Form dargestellt ist. Der nach vorne geneigte Kopf suggeriert, dass der Krake scheinbar etwas aufmerksam beobachtet.",
      "Die Verwendung von fluoreszierenden Pigmenten verleiht dem Kraken eine besondere Aura. Unter Ultraviolettlicht erstrahlen die blauen Ringel in intensiven Leuchtfarben, wodurch die mystische Präsenz des Kraken im Ozean noch eindrucksvoller wird."
    ],
    images: [
      ["storybook/03-1.jpg", "Tageslicht"],
      ["storybook/03-2.jpg", "Schwarzlicht"]
    ]
  },
  {
    title: "Space Mouse",
    medium: "Buntstiftzeichnung",
    details: "Computermaus · 42 × 59,4 cm",
    text: [
      "Die Zeichnung präsentiert eine Computermaus aus vielfältigen Perspektiven in einer hochformatigen Buntstiftkreation im A2-Format.",
      "Mit einer künstlerischen Darstellung, die die Neutralität betont, sind die Farben und Schattierungen der Maus subtil gehalten. Der Fokus liegt dabei auf der präzisen Wiedergabe von Form und Funktion dieses alltäglichen Objekts.",
      "Die Buntstiftzeichnung verdeutlicht durch ihre Nuancen und akkuraten Linien nicht nur die ästhetischen Details der Maus, sondern unterstreicht auch die sorgfältige Betrachtung der verschiedenen Perspektiven, um die Gesamtheit des Gegenstands zu erfassen."
    ],
    images: [["storybook/04-1.jpg", "Buntstiftzeichnung in vier Ansichten"]]
  },
  {
    title: "Eagle",
    medium: "Tuschezeichnung",
    details: "Weißkopfseeadler · 42 × 29,7 cm",
    text: [
      "Die Zeichnung präsentiert einen majestätischen Weißkopfseeadler in einem ausdrucksstarken und dynamischen Tuschestil.",
      "Der Adler wird durch geschickten Einsatz von Schwarz und Weiß lebendig. Die tiefschwarzen Bereiche sind mit präziser Tusche gefüllt, während die weißen Abschnitte das natürliche Weiß des Papiers offenbaren. Diese Kontraste verleihen dem Adler nicht nur eine beeindruckende Präsenz, sondern erzeugen auch eine faszinierende Dynamik im Bild.",
      "Durch den expressiven Tuschestil werden die markanten Details des Weißkopfseeadlers hervorgehoben, wodurch seine Kraft und Anmut auf eindrucksvolle Weise zum Ausdruck kommen."
    ],
    images: [["storybook/05-1.jpg", "Weißkopfseeadler in Tusche"]]
  },
  {
    title: "Bike Light Front",
    medium: "CAD-Konstruktion & Mock-up",
    details: "Frontlicht für das Fahrrad",
    text: [
      "Konstruktion und Mock-up eines Fahrradlichts für die Front.",
      "Technische Zeichnungen definieren Form und Maße des facettierten Gehäuses. Aufnahmen des Modells zeigen den Prototyp aus verschiedenen Blickwinkeln und in der Einbausituation am Lenker.",
      "Das Mock-up sitzt mit Kabelbindern am Steuerrohr des Fahrrads. So lassen sich Größe, Position und Wirkung der Form direkt am Rad beurteilen."
    ],
    images: [
      ["storybook/06-1.jpg", "Mock-up am Fahrrad"],
      ["storybook/06-3.jpg", "Mock-up – Ansicht von vorn"],
      ["storybook/06-4.jpg", "Mock-up – Ansicht von oben"],
      ["storybook/06-5.jpg", "Mock-up – Ansicht von unten"],
      ["storybook/06-2.jpg", "Bemaßte Zeichnung"],
      ["storybook/06-6.jpg", "Zeichnung – Draufsicht"],
      ["storybook/06-7.jpg", "Zeichnung – Seitenansicht"],
      ["storybook/06-8.jpg", "Zeichnung – Unteransicht"]
    ],
    layout: [
      { images: [0], inline: [1, 2], bleed: true },
      {
        label: "Konstruktion.",
        text: [
          "Die bemaßten Zeichnungen halten Draufsicht, Seitenansicht und Unteransicht des Gehäuses fest – mit den Winkeln und Längen, die für den Bau des Modells nötig waren.",
          "Die Aufnahme von unten zeigt das Mock-up im Detail."
        ],
        inline: [3],
        images: [4, 5, 6, 7],
        lead: true
      }
    ]
  },
  {
    title: "Bike Light Rear",
    medium: "CAD-Konstruktion",
    details: "Rücklicht für das Fahrrad",
    text: [
      "Konstruktion des Rücklichts als Gegenstück zum Frontlicht.",
      "Zusammenbau, Ansichten und eine bemaßte Einzelteilzeichnung des Gehäusebodens dokumentieren den konstruktiven Aufbau der Baugruppe."
    ],
    images: [
      ["storybook/07-1.jpg", "Baugruppe – Isometrie"],
      ["storybook/07-2.jpg", "Baugruppe – Draufsicht"],
      ["storybook/07-3.jpg", "Baugruppe – Unteransicht"],
      ["storybook/07-4.jpg", "Gehäuseboden – bemaßte Zeichnung"]
    ]
  },
  {
    title: "Selbstporträt in Blau",
    medium: "Cyanotypie",
    details: "Selbstauslöser-Fotografie · 42 × 29,7 cm",
    text: [
      "Die Cyanotypie mit dem Titel „Selbstporträt in Blau“ präsentiert sich in einem A3-Format und nutzt die kreative Palette der Cyanotypie, die durch die Anwendung von lichtempfindlichem Papier hervorgehoben wird.",
      "Das Medium der Cyanotypie eröffnet die Möglichkeit, naturgetreue und detailreiche Aufnahmen zu schaffen.",
      "Die Lichtempfindlichkeit des Papiers verleiht dem Werk eine besondere Atmosphäre, die durch die präzise Anwendung der Cyanotypie-Technik eingefangen wird."
    ],
    images: [["storybook/08-1.jpg", "Selbstporträt als Cyanotypie"]]
  },
  {
    title: "Die Verletzlichkeit der Schönheit",
    medium: "Cyanotypie",
    details: "Analoge Fotografie eines Teilakts · 29,7 × 42 cm",
    text: [
      "Die Cyanotypie mit dem Titel „Die Verletzlichkeit der Schönheit“ präsentiert sich in einem A3-Format und fängt einen Ausschnitt des weiblichen Körpers ein. Die Frontansicht zeigt den Körper, wobei lediglich der Schambereich bedeckt ist, während die Haut glatt und leicht gebräunt erscheint.",
      "Die Cyanotypie dient hier als künstlerisches Medium, um die Verletzlichkeit der Schönheit zu reflektieren. Die Botschaft des Werks wird durch die bewusste Positionierung des Körpers betont, der in seiner Offenheit und Verletzlichkeit symbolisiert ist.",
      "Das Cyanotypieverfahren verstärkt diese Aussage, indem es die Haut in einem markanten blauen Farbton abbildet. Diese künstlerische Entscheidung verleiht dem Werk nicht nur eine ästhetische Dimension, sondern vertieft auch die emotionale Resonanz auf die zarte Thematik der Verletzlichkeit der Schönheit."
    ],
    images: [["storybook/09-1.jpg", "Teilakt als Cyanotypie"]]
  },
  {
    title: "Mythical Creature",
    medium: "Risographie",
    details: "3 Layer · 42 × 29,7 cm",
    text: [
      "Die grafische Darstellung präsentiert einen stilisierten Wasserspeier in Form eines Fisches, gestaltet in einem abstrakt-figurativen Stil und im Querformat.",
      "Die Inspiration für dieses Werk entspringt dem Mendebrunnen, einem bedeutenden Bauwerk, das 1883 von Adolf Gnauth in Leipzig geschaffen wurde. Der Brunnen, gelegen auf dem zentralen Augustusplatz, diente als Grundlage für die künstlerische Umsetzung des stilisierten Fisch-Wasserspeiers.",
      "Die abstrakt-figurative Darstellung fängt die Essenz des Fisch-Wasserspeiers ein und verleiht ihm durch die grafische Gestaltung eine zeitgenössische Note."
    ],
    images: [["storybook/10-1.jpg", "Fisch-Wasserspeier als Risographie"]]
  },
  {
    title: "Wintersonne",
    medium: "Risographie",
    details: "3 Layer · 21 × 29,7 cm",
    text: [
      "Die Risographie „Wintersonne“ ist ein abstraktes Werk, das eine Winterlandschaft darstellt.",
      "Der erste Druck ist in hellen, neutralen Farben gehalten und zeigt abstrakte Formen, die an Licht, Schatten oder Reflexionen erinnern. Der zweite Druck ist in kräftigen, warmen Farben gehalten; seine Formen erinnern an Bäume, Berge oder Häuser. Der dritte Druck in gedeckten, kalten Farben zeigt Formen, die an Schneeflocken, Eiskristalle oder Wolken erinnern.",
      "Die Überlagerung der drei Drucke erzeugt ein komplexes und vielschichtiges Bild. Die einzelnen Formen und Farben verschmelzen zu einem einheitlichen Gesamtbild, das an eine Winterlandschaft erinnert."
    ],
    images: [
      ["storybook/11-4.jpg", "Druck-Erzeugnis"],
      ["storybook/11-1.jpg", "Layer Gelb"],
      ["storybook/11-2.jpg", "Layer Blau"],
      ["storybook/11-3.jpg", "Layer Schwarz"]
    ]
  },
  {
    title: "Skate & Snow",
    medium: "Tapezierarbeit",
    details: "Aus Zeitschriftenseiten · 4,60 × 2,40 m",
    text: [
      "Die Tapezierarbeit „Skate & Snow“ ist ein großformatiges Werk, das aus ca. 500 einzelnen Seiten aus Skateboard- und Snowboard-Zeitschriften besteht. Die Seiten sind in einem aleatorischen Muster übereinandergelegt, wodurch ein dynamisches und lebendiges Gesamtbild entsteht.",
      "Die einzelnen Seiten zeigen eine Vielzahl von Motiven aus der Skateboard- und Snowboard-Kultur, darunter Fotos von Skatern und Snowboardern in Aktion, Illustrationen, Grafiken und Texte. Sie zeigt die Vielfalt und Dynamik dieser Kultur und zeugt von der Leidenschaft der Menschen, die sich ihr verschrieben haben."
    ],
    images: [
      ["storybook/12-1.jpg", "Gesamtansicht der Wand"],
      ["storybook/12-2.jpg", "Detail"]
    ],
    layout: [{ images: [0], bleed: true, focus: "35% 50%", background: 1 }]
  },
  {
    title: "Cloudy Day",
    medium: "Fotografie",
    details: "Sepia-Sportfotografie · 59,4 × 42 cm",
    text: [
      "Das Foto fängt den Moment ein, in dem ein Skater an der Quarterpipe im Skatepark der Schokofabrik in Bayreuth einen beeindruckenden Trick vollführt.",
      "Der Skatepark, voll aus Beton gebaut, erstreckt sich als Teil der Szenerie, und verschiedene Rampen und Hindernisse bieten den Skatern eine vielfältige Spielwiese, um ihre Tricks zu präsentieren.",
      "Die Schokofabrik, ein architektonisches Juwel aus den Jahren 1909/1910, dient heute als Kulturzentrum. Dieser kulturelle Hintergrund verleiht dem Foto eine besondere Atmosphäre, in der die moderne Sportaktivität des Skatens auf das historische Ambiente der Schokofabrik trifft."
    ],
    images: [["storybook/13-1.jpg", "Skater an der Quarterpipe"]]
  },
  {
    title: "Wilder Westen",
    medium: "Mixed Media",
    details: "Fotografie, Bleistift, Kohle · 29,7 × 42 cm",
    text: [
      "Das Foto präsentiert den Bauspielplatz „Wilder Westen“ in Leipzig, eingebettet im Stadtteil Plagwitz, der sich als lebhafter Treffpunkt für Kinder und Jugendliche etabliert hat.",
      "Ein besonderes Merkmal des Bauspielplatzes liegt in der teils autonomen Aktivität der Kinder und Jugendlichen, die in ihrer eigenen kreativen Welt agieren. Der Spielplatz wird so zu einem lebendigen Raum, der die Gemeinschaft fördert und Raum für freies Spiel und Selbstentfaltung bietet."
    ],
    images: [["storybook/14-1.jpg", "Bauspielplatz „Wilder Westen“"]]
  },
  {
    title: "Atlantic Cliffs",
    medium: "Landschaftsfotografie",
    details: "Baskische Küste · 300 dpi",
    text: [
      "Das Foto präsentiert einen beeindruckenden Sonnenuntergang an der baskischen Küste. Die Sonne taucht majestätisch in den Ozean, und ihre letzten Strahlen färben den Himmel in leuchtende Farbtöne. Die Wellen, die gegen die Klippen schlagen, verleihen dem Bild eine dynamische und bewegte Atmosphäre.",
      "Der felsige Strand wird von den aufgewühlten Wellen des Meeres umspült, die an den Felsen brechen und einen malerischen Effekt erzeugen. Die Naturszenerie wirkt dabei sowohl kraftvoll als auch ästhetisch ansprechend.",
      "Der Strand selbst ist menschenleer und schafft einen ungestörten Blick auf das weite Meer und den Sonnenuntergang. Das Bild fängt die ruhige Schönheit der baskischen Küste ein, während sie von den Elementen geformt wird."
    ],
    images: [["storybook/15-1.jpg", "Sonnenuntergang an der baskischen Küste"]]
  },
  {
    title: "Sunset over Berlin",
    medium: "Streetart-Fotografie",
    details: "Oberbaumbrücke · 300 dpi",
    text: [
      "Die Fotografie fängt einen beeindruckenden Sonnenuntergang über der Spree in Berlin ein.",
      "Der Standpunkt für diese Aufnahme ist die historische Oberbaumbrücke, die die Stadtteile Friedrichshain und Kreuzberg miteinander verbindet.",
      "Die tief stehende Sonne am Horizont wirft ein warmes, goldenes Licht über die Stadt. Dieses einladende und stimmungsvolle Licht taucht die Szenerie in eine besondere Atmosphäre."
    ],
    images: [
      ["storybook/16-1.jpg", "Schärfe auf den Streben"],
      ["storybook/16-2.jpg", "Schärfe auf der Skyline"]
    ]
  },
  {
    title: "Veste Coburg",
    medium: "Kunstfotografie",
    details: "Burganlage bei Sonnenuntergang · 3927 × 5879 px",
    text: [
      "Die Fotografie präsentiert die Veste Coburg, eine imposante mittelalterliche Burganlage in Coburg, während des Sonnenuntergangs.",
      "Die majestätische Burg thront auf einem steilen Bergrücken über der Stadt und gilt als eines der bedeutenden Wahrzeichen von Coburg. Die Aufnahme fängt die Burg in einem warmen, abendlichen Licht ein. Ihre Konturen werden durch das sanfte Glühen des Sonnenuntergangs betont, während die umliegende Landschaft in eine malerische Dämmerung getaucht wird.",
      "Obwohl die Sonne bereits unter dem Horizont verschwunden ist, erzeugt das letzte Licht des Tages eine besondere Atmosphäre, die durch die noch erleuchteten Wolken verstärkt wird. Das Bild vermittelt die zeitlose Schönheit und historische Pracht der Veste Coburg."
    ],
    images: [["storybook/17-1.jpg", "Silhouette der Veste Coburg im Abendlicht"]],
    layout: [{ images: [0], bleed: true, focus: "50% 60%" }]
  },
  {
    title: "Galaxy",
    medium: "Mixed Media",
    details: "Aquarellmalerei, Fotografie, Lightroom, Photoshop · 6151 × 6151 px",
    text: [
      "Das Bild präsentiert eine abstrakte Galaxie, die in einem lebendigen, fluoreszierenden Stil erstrahlt. Der Himmel ist in einem intensiven Blau gehalten und leuchtet in harmonischem Wettstreit mit den anderen lebhaften Farbtönen.",
      "Formen und Farben verschmelzen zu einem stimmungsvollen und mystischen Gesamteindruck, der die Vorstellungskraft herausfordert. Der magentafarbene Bereich wird erst durch eine geschickte Manipulation der Kameralinse sichtbar – er bleibt dem menschlichen Auge normalerweise verborgen.",
      "Das gesamte Bild entstand als Experiment mit selbst hergestellten Fluoreszenzfarben, die aus verschiedenen Pigmenten und Chemikalien bestehen und auf ultraviolettes Licht reagieren."
    ],
    images: [["storybook/18-1.jpg", "Abstrakte Galaxie in Fluoreszenzfarben"]]
  },
  {
    title: "Filters",
    medium: "Photoshop",
    details: "Gradationskurve · 300 dpi",
    text: [
      "Die Fotografie zeigt ein Selbstporträt, das durch die kreative Anwendung von Photoshop eine verfremdete Realität erfährt. Diverse Filter wurden erzeugt und übereinandergelegt, um eine neue, surreale Dimension zu erschaffen.",
      "Die Szenerie ist durchzogen von bizarr anmutenden, phantastischen Elementen, die dem Bild eine surreale Atmosphäre verleihen.",
      "Diese neu geschaffene Dimension steht als Ausdruck für die Transformation und Entfremdung des Selbst und spiegelt die Vielschichtigkeit der eigenen Persönlichkeit wider."
    ],
    images: [["storybook/19-1.jpg", "Verfremdetes Selbstporträt"]]
  },
  {
    title: "Mix it",
    medium: "Mixed Media",
    details: "Kunstplakat · 2572 × 3600 px",
    text: [
      "Das Plakat präsentiert ein lebhaftes und fantasievolles Bild, das die bevorstehende Fusion der bayerischen Musikgruppen „Endlich Musik“ und „Lachsbecken“ ankündigt.",
      "Der bunte und fröhliche Stil wird durch kräftige, strahlende Farben unterstrichen, die eine positive Stimmung vermitteln. Die fantasievollen Figuren und Symbole laden dazu ein, in eine träumerische Atmosphäre einzutauchen.",
      "Besonders auffällig ist die Darstellung des Lachses als Wal – ein Symbol für die Fusion der beiden Gruppen und die Vielfalt der neu entstehenden Musikgruppe."
    ],
    images: [["storybook/20-1.jpg", "Plakat „Endlich tanzt der Lachs“"]]
  }
];

const selectedProjectOrder = projectOrder.filter((id) => !["cyanotype", "berlin", "coast", "illustration", "cosmic", "stars"].includes(id));

// Seitenaufteilung des Projekt-Storybuchs: images stehen auf der Bildseite, inline beim Text.
Object.assign(projects.chair, { layout: [{ images: [0, 1], inline: [2] }] });
Object.assign(projects.coffee, { layout: [{ images: [1], inline: [0], bleed: true, focus: "50% 100%" }] });

const storybooks = [
  {
    id: "freie-arbeiten",
    title: "Freie Arbeiten",
    eyebrow: "Daniel Kemper / Freie Arbeiten",
    heading: ["Freie", "Arbeiten."],
    intro: "Zeichnung, Druck, Fotografie und Experiment – ein Bildband zum Durchblättern.",
    help: "Rechte Seite anklicken zum Weiterblättern, linke Seite zum Zurückblättern. Pfeiltasten funktionieren ebenfalls.",
    description: "18 freie Arbeiten mit Bild und Text.",
    type: "works",
    works: freeWorks
  },
  {
    id: "ausgewaehlte-projekte",
    title: "Ausgewählte Projekte",
    eyebrow: "Daniel Kemper / Projekt-Storybuch",
    heading: ["Ausgewählte", "Projekte."],
    intro: "Projektansichten, Beschreibungen und Credits in einem klassischen Doppelseitenlayout.",
    help: "Rechte Seite anklicken zum Weiterblättern, linke Seite zum Zurückblättern. Pfeiltasten funktionieren ebenfalls.",
    description: "Eigenständige Projektansichten, Beschreibungen und Credits im Doppelseitenlayout.",
    type: "projects",
    projects: selectedProjectOrder
  }
];
