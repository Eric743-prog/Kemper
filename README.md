# Daniel Kemper – Portfolio

Responsiver, deutschsprachiger Website-Entwurf mit experimenteller Gestaltung, neun kuratierten Arbeiten, Disziplinfiltern und Projektgalerien. Keine Frameworks, externen Dienste oder Installationen erforderlich.

## Ansehen

[index.html](./index.html) direkt im Browser öffnen. Alternativ diesen Ordner mit einem lokalen Webserver bereitstellen, beispielsweise mit `py -m http.server 8000 --bind 127.0.0.1`, wenn Python installiert ist.

## Inhalte bearbeiten

Die vollständige Anleitung zum Austauschen von Texten und Bildern sowie zum Hinzufügen von Projekten und Storybuch-Kapiteln steht in [INHALTE-BEARBEITEN.md](./INHALTE-BEARBEITEN.md).

- Einstieg, Profil und kreative Felder: [index.html](./index.html).
- Gemeinsame Projekttexte, Bilder, Credits, Portfolio-Karten und Kapitelreihenfolge: [projects.js](./projects.js). Portfolio-Galerien und Storybuch verwenden dieselben Projektdaten.
- Öffentliche Kontaktadresse und Portfolio-Interaktionen: [portfolio.js](./portfolio.js). `contactEmail` ist zunächst leer; es gibt bewusst kein funktionsloses Anfrageformular. Nach Eintragung einer gültigen Adresse erscheint ein E-Mail-Link.
- Farben, Layout und responsive Ansichten: [styles.css](./styles.css).
- Weboptimierte Bildkopien: [assets](./assets). Die bereitgestellten Originale unter [input](./input) bleiben unverändert.

Jeder Hauptabschnitt hat einen eigenen Hintergrund: Blaugrau für den Einstieg (`--intro`), Off-White für die Arbeiten (`--paper`), Violett für das Profil (`--purple`), Sand für die kreativen Felder (`--sand`) und Lime für den Kontakt (`--lime`). Die Navigation übernimmt den Hintergrund des Einstiegs.

## Animationen

Elemente erscheinen beim Scrollen mit sanfter Bewegung und leicht gestaffelten Übergängen. Die Collage, Projektbilder, Navigation und Verweise haben dezente Hover-Effekte; Projektgalerien öffnen mit einer kurzen Einblendung. Die Disziplin-Trennzeile bleibt bewusst schlicht und ohne Daueranimation.

Die Scroll-Effekte verwenden den nativen `IntersectionObserver` und verändern keine Bildrotationen. Ohne JavaScript oder ohne diese Browserfunktion werden Inhalte nicht durch Scroll-Effekte verborgen. Die Systemeinstellung „Bewegung reduzieren“ deaktiviert Animationen und weiches Scrollen; fokussierte Elemente werden auch bei Tastaturbedienung sofort eingeblendet.

## Karussell und Produktdesign

Die Titelseite zeigt drei manuell wechselnde Collagen: Produktdesign & Konstruktion, Fotografie & Perspektive sowie Grafik & freie Gestaltung. Pfeile, Auswahlpunkte, Links-/Rechts-Pfeiltasten und horizontale Wischgesten wechseln die Auswahl; es gibt keinen automatischen Wechsel. Vertikales Scrollen und Pinch-Zoom bleiben möglich. Verdeckte Folien sind nicht per Tastatur erreichbar. Ein Klick auf ein Projektbild öffnet dessen Galerie; das Selbstporträt ist nur ein Bild.

Ohne JavaScript bleibt die erste Produktdesign-Collage sichtbar, und die Karussell-Steuerung bleibt ausgeblendet. Bilder und Beschriftungen der Folien werden in [index.html](./index.html) gepflegt; die Wechsel- und Wischlogik liegt in [portfolio.js](./portfolio.js).

Die ergänzte „Baugruppe im Schnitt“ hat eine eigene CAD-Galerie und ist im Produktdesign-Filter enthalten. Beim Kaffeebereiter wird die Explosionsdarstellung sowohl auf der Titelseite als auch in der Werkauswahl und zuerst in der Projektgalerie gezeigt.

## Projekt-Storybuch

Der Titelbereich verlinkt auf [storybook.html](./storybook.html). Dort stehen zwei Bücher zur Auswahl: „Freie Arbeiten“ zeigt 18 Arbeiten als getrennt gesetzte Text- und Bildseiten; die dafür verwendeten Bildmotive liegen in [assets/storybook](./assets/storybook). „Ausgewählte Projekte“ zeigt nur die eigenständigen Portfolio-Projekte im Bild-/Text-Doppelseitenlayout und lässt bereits im ersten Buch enthaltene Projekte aus.

Pfeile und Links-/Rechts-Pfeiltasten blättern ohne automatischen Wechsel. An Anfang und Ende ist der jeweilige Pfeil deaktiviert. Der Button „Zum Anfang“ führt zurück zur Titelseite. Im Vollbildmodus nutzt das Buch den gesamten Bildschirm ohne Scrollen; eine Mausbewegung zeigt die Navigation. Die rechte Seitenzone blättert vor, die linke zurück.

[storybook.css](./storybook.css) gestaltet Papierseiten, Buchfalz und Blätteranimation; [storybook.js](./storybook.js) steuert Kapitel, Ansichten und zugängliche Statusmeldungen. „Bewegung reduzieren“ deaktiviert die Blätteranimation. Ohne JavaScript bleibt die Einleitung sichtbar und ein Hinweis verlinkt auf die vollständige Werkauswahl.

## Vor einer Veröffentlichung

Die Website ist **noch kein veröffentlichungsfertiger Geschäftsauftritt**:

1. Kontaktadresse sowie rechtlich erforderliche Impressums- und Datenschutzangaben ergänzen. Der Hinweisdialog ersetzt kein Impressum.
2. Projekttexte, beschreibende Arbeitstitel, angebotene Leistungen und Profiltext durch Daniel bestätigen lassen. Aus den Bildern wurden keine Qualifikationen, Kunden, Ergebnisse oder Jahreszahlen erfunden.
3. Mitwirkende und Aufgabenverteilung ergänzen, insbesondere beim Kaffeebereiter (Quelldateien nennen Kemper und Weber).
4. Nutzungsrechte und gegebenenfalls KI-Bearbeitungen prüfen und korrekt kennzeichnen. Für die Auswahl wurden keine als `Gemini_Generated` bezeichneten Bilder eingesetzt; das allein garantiert keine KI-freie Entstehung der anderen Arbeiten.
5. Domain und Hosting auswählen, Server-Datenverarbeitung berücksichtigen und finale Metadaten ergänzen.

Die aktuelle Version lädt keine externen Fonts, setzt keine Cookies und enthält weder Tracking noch Drittanbieter-Einbettungen. Der Kontaktlink öffnet nach Konfiguration das E-Mail-Programm; die Website verschickt selbst keine Nachrichten.
