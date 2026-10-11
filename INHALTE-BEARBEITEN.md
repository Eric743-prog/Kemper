# Inhalte bearbeiten

Alle Projekte und ihre Bilder werden zentral in [`projects.js`](./projects.js) gepflegt. Eine Änderung dort erscheint automatisch:

- als Karte unter „Ausgewählte Arbeiten“ auf der Startseite,
- in der Projektgalerie nach dem Öffnen der Karte.

## Bestehendes Projekt ändern

Suche in `projects.js` nach der Projekt-ID, zum Beispiel `coffee:`. Die Felder bedeuten:

| Feld | Zweck |
| --- | --- |
| `title` | Projekttitel auf Karte und Detailansicht |
| `category` | Disziplin in der Detailansicht |
| `description` | Beschreibung in der Detailansicht |
| `images` | Galerie-Bilder. Der erste Eintrag ist auch das Vorschaubild. |
| Bildtext in `images` | Alternativtext und Bildunterschrift |
| `note` | Hinweis in der Detailansicht |
| `card.label` | Kleine Zeile unter dem Titel auf der Portfolio-Karte |
| `card.filter` | Filtergruppe: `design`, `photo` oder `graphic` |

Lege neue Bilddateien im Ordner [`assets`](./assets) ab und gib den **vollständigen Dateinamen einschließlich Endung** an, zum Beispiel:

```js
images: [
  ["mein-projekt.jpg", "Beschreibung des Bildes"],
  ["mein-projekt-detail.png", "Beschreibung der Detailansicht"]
]
```

Die Bildbeschreibung muss erklären, was auf dem Bild zu sehen ist; sie wird auch für Screenreader verwendet.

## Neues Portfolio-Projekt hinzufügen

1. Lege alle Bilddateien in [`assets`](./assets) ab.
2. Füge am Anfang von `projectOrder` in `projects.js` eine eindeutige ID ein, z. B. `"lampe"`. Die Reihenfolge dieser Liste ist die Reihenfolge der Portfolio-Karten.
3. Füge im Objekt `projects` einen Eintrag mit derselben ID ein:

```js
  lampe: {
    title: "Leuchtobjekt",
    category: "Produktdesign / Lichtstudie",
    description: "Kurze Beschreibung des Projekts.",
    images: [
      ["leuchtobjekt.jpg", "Leuchtobjekt vor neutralem Hintergrund"],
      ["leuchtobjekt-detail.jpg", "Detail der Oberfläche"]
    ],
    card: {
      filter: "design",
      label: "Produktdesign / Licht",
      wide: false,
      surface: "neutral",
      contain: false
    },
    note: "Projektkontext, Jahr und Credits."
  },
```

Die drei erlaubten Filterwerte sind `design` (Produktdesign), `photo` (Fotografie) und `graphic` (Grafik & Illustration). Für `surface` sind `""`, `"neutral"`, `"lavender"`, `"lime"` und `"pink"` verfügbar. Setze `contain` auf `true`, wenn eine Zeichnung, ein Logo oder Rendering mit Freiraum vollständig sichtbar bleiben soll. Mit `wide: true` wird die Karte auf großen Bildschirmen doppelt breit. Optional zeigt `imageLabel: "..."` einen Text direkt auf dem Vorschaubild.

Nach dem Speichern die Seite neu laden. Das Projekt ist dann ohne Änderungen an [`index.html`](./index.html) im Portfolio verfügbar.

## Storybücher öffnen, bearbeiten oder hinzufügen

Auf [`storybook.html`](./storybook.html) lassen sich zwei Bücher auswählen:

- **Freie Arbeiten** wird in [`storybook-content.js`](./storybook-content.js) im Array `freeWorks` gepflegt. Texte liegen in `text`, die Bilddateien in `images`; die separierten Bildmotive liegen in [`assets/storybook`](./assets/storybook).
- **Ausgewählte Projekte** zeigt eigenständige Einträge aus `projectOrder` im klassischen Bild-/Text-Doppelseitenlayout. Bereits in „Freie Arbeiten“ gezeigte Projekte sind über `selectedProjectOrder` in [`storybook-content.js`](./storybook-content.js) ausgeschlossen.

Die Auswahl ist auch direkt per Adresse möglich: `storybook.html?book=freie-arbeiten` beziehungsweise `storybook.html?book=ausgewaehlte-projekte`.

- Text oder Bild einer freien Arbeit ändern: Den passenden Eintrag in `freeWorks` in [`storybook-content.js`](./storybook-content.js) bearbeiten. Neue Bilddateien in [`assets/storybook`](./assets/storybook) ablegen und im Feld `images` eintragen.
- Neue freie Arbeit hinzufügen: Einen Eintrag in `freeWorks` ergänzen. `title`, `medium`, `details`, `text` und `images` bilden die linke Textseite und die rechte Bildseite des Buchs.

Beispiel für eine neue Seite nach `21.png`:

```js
{
  title: "Titel der neuen Arbeit",
  medium: "Technik oder Disziplin",
  details: "Format oder Projektangabe",
  text: ["Kurze Beschreibung der Arbeit."],
  images: [["storybook/meine-arbeit.jpg", "Beschreibung des Bildes"]]
}
```

Weitere Bücher lassen sich im Array `storybooks` in [`storybook-content.js`](./storybook-content.js) ergänzen. Für ein Arbeitsbuch wird `type: "works"` mit `works: freeWorks` verwendet; für ein Projektbuch `type: "projects"` mit einer Liste von Projekt-IDs.

## Weitere Texte der Website

Die folgenden Texte liegen bewusst direkt im jeweiligen HTML-Dokument:

| Bereich | Datei |
| --- | --- |
| Startbereich, Profil, kreative Felder, Kontakt und rechtliche Hinweise | [`index.html`](./index.html) |
| Steuerung und Darstellung des Storybuchs | [`storybook.html`](./storybook.html), [`storybook.js`](./storybook.js) und [`storybook.css`](./storybook.css) |
| Sprache und Darstellungsoptionen | [`settings.html`](./settings.html) und [`settings.js`](./settings.js) |

Wenn Deutsch, Englisch und Spanisch angeboten werden sollen, müssen die Übersetzungen für Projektitel, Kategorie und Beschreibung zusätzlich im Abschnitt `localizedProjectCopy` in [`projects.js`](./projects.js) ergänzt werden.
