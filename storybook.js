"use strict";

const book = document.querySelector("#book");
const reader = document.querySelector("#book-reader");
const previousButton = document.querySelector("#book-prev");
const nextButton = document.querySelector("#book-next");
const previousZone = document.querySelector("#book-prev-zone");
const nextZone = document.querySelector("#book-next-zone");
const fullscreenButton = document.querySelector("#book-fullscreen");
const closeButton = document.querySelector("#book-close");
const storybookSelect = document.querySelector("#storybook-select");
const storybookDescription = document.querySelector("#storybook-description");
const requestedBook = new URLSearchParams(window.location.search).get("book");
let activeStorybook = storybooks.find((storybook) => storybook.id === requestedBook) ?? storybooks[0];
let spreadIndex = 0;
let pseudoFullscreen = false;
let controlsTimer = null;
let resizeTimer = null;
let turnTimer = null;

const bookTranslations = {
  de: { spread: "Aufschlag", of: "von", fullscreen: "Vollbild", exitFullscreen: "Vollbild beenden (Esc)", fullscreenError: "Der Vollbildmodus des Browsers ist nicht verfügbar; die Leseansicht wird stattdessen geöffnet.", imageHint: "Doppelklick: Bild im Vollbild", imageView: "Bild im Vollbild", closeImage: "Schließen (Esc)" },
  en: { spread: "Spread", of: "of", fullscreen: "Full screen", exitFullscreen: "Exit full screen (Esc)", fullscreenError: "Browser full screen is unavailable; the reading view is opened instead.", imageHint: "Double-click: full-screen image", imageView: "Full-screen image", closeImage: "Close (Esc)" },
  es: { spread: "Doble página", of: "de", fullscreen: "Pantalla completa", exitFullscreen: "Salir de pantalla completa (Esc)", fullscreenError: "La pantalla completa no está disponible; se abre la vista de lectura.", imageHint: "Doble clic: imagen a pantalla completa", imageView: "Imagen a pantalla completa", closeImage: "Cerrar (Esc)" }
};

function bookText(key) {
  return (bookTranslations[document.documentElement.lang] ?? bookTranslations.de)[key];
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function pad(number) {
  return String(number).padStart(2, "0");
}

function pageNumber(page, side) {
  const number = element("span", "book-page-number", pad(spreadIndex * 2 + (side === "left" ? 1 : 2)));
  page.append(number);
}

function heading(text, emphasized) {
  const title = element("h2");
  title.tabIndex = -1;
  title.append(document.createTextNode(text));
  if (emphasized) title.append(document.createElement("br"), element("em", "", emphasized));
  return title;
}

// Optionales item.layout legt Aufschläge von Hand fest: images/inline sind Indizes in item.images.
// Ohne layout lassen kurze Texte auf der Textseite Platz für die letzten ein bis zwei Bilder.
function imageLayout(item) {
  const pick = (indices) => indices.map((index) => item.images[index]);
  if (item.layout) {
    return item.layout.map((spread) => ({
      ...spread,
      images: pick(spread.images),
      numbers: spread.images.map((index) => index + 1),
      inline: pick(spread.inline ?? []),
      inlineNumbers: (spread.inline ?? []).map((index) => index + 1)
    }));
  }
  const images = item.images;
  const textLength = (item.text ? item.text.join(" ") : item.description).length;
  const capacity = textLength <= 400 ? 2 : textLength <= 650 ? 1 : 0;
  const inlineCount = images.length >= 3 ? Math.min(capacity, images.length - 1) : 0;
  const mainCount = images.length - inlineCount;
  const spreads = [];
  for (let start = 0; start < mainCount; start += 4) {
    const end = Math.min(start + 4, mainCount);
    spreads.push({ images: images.slice(start, end), numbers: Array.from({ length: end - start }, (_, offset) => start + offset + 1), inline: [], inlineNumbers: [] });
  }
  spreads[0].inline = images.slice(mainCount);
  spreads[0].inlineNumbers = spreads[0].inline.map((_, offset) => mainCount + offset + 1);
  return spreads;
}

function imagePages(item) {
  return imageLayout(item);
}

function storybookItems() {
  return activeStorybook.type === "works" ? activeStorybook.works : activeStorybook.projects.map((id) => projects[id]);
}

function totalSpreads() {
  const imageSpreadCount = storybookItems().reduce((count, item) => count + imagePages(item).length, 0);
  return activeStorybook.type === "works" ? imageSpreadCount + 2 : imageSpreadCount;
}

function workStartSpread(workIndex) {
  return 1 + activeStorybook.works.slice(0, workIndex).reduce((count, work) => count + imagePages(work).length, 0);
}

function updateStorybookCopy() {
  const [firstLine, emphasizedLine] = activeStorybook.heading;
  const title = document.querySelector("#storybook-title");
  title.replaceChildren(document.createTextNode(firstLine), document.createElement("br"), element("em", "", emphasizedLine));
  document.querySelector("#storybook-eyebrow").textContent = activeStorybook.eyebrow;
  document.querySelector("#storybook-intro").textContent = activeStorybook.intro;
  document.querySelector("#book-help").textContent = activeStorybook.help;
  storybookDescription.textContent = activeStorybook.description;
  reader.setAttribute("aria-label", activeStorybook.title);
}

function gallery(page, images, altPrefix, numbers, variant = "") {
  const gallery = element("div", `art-gallery art-gallery--${images.length} ${variant}`.trim());
  images.forEach(([filename, text], index) => {
    const figure = element("figure", "art-figure");
    const frame = element("div", "art-frame");
    const image = document.createElement("img");
    image.src = `assets/${filename}`;
    image.alt = `${altPrefix}: ${text}`;
    image.decoding = "async";
    image.title = bookText("imageHint");
    image.loading = "eager";
    frame.append(image);
    const label = images.length > 1 ? `${pad(numbers[index])} — ${text}` : text;
    figure.append(frame, element("figcaption", "art-caption", label));
    gallery.append(figure);
  });
  page.append(gallery);
}

function coverSpread() {
  const works = activeStorybook.works;
  const left = element("div", "book-page book-left book-cover");
  left.append(element("p", "book-running-header", "Daniel Kemper / Portfolio"));
  const logo = document.createElement("img");
  logo.className = "cover-logo";
  logo.src = "assets/storybook/logo.png";
  logo.alt = "";
  const title = element("div", "book-cover-title");
  title.append(document.createTextNode("Freie"), document.createElement("br"), element("em", "", "Arbeiten."));
  left.append(logo, title, element("p", "cover-subtitle", "Zeichnung · Druck · Fotografie · Experiment"));
  pageNumber(left, "left");

  const right = element("div", "book-page book-right book-fit toc-page");
  right.append(element("p", "book-running-header", "Inhalt"), heading(`${works.length} Arbeiten.`));
  const contents = element("ol", "book-toc");
  works.forEach((work, index) => {
    const item = document.createElement("li");
    const button = element("button");
    button.type = "button";
    button.append(element("span", "toc-number", pad(index + 1)), element("span", "toc-title", work.title), element("span", "toc-medium", work.medium));
    button.setAttribute("aria-label", `${work.title}, ${work.medium}`);
    button.addEventListener("click", () => goTo(workStartSpread(index)));
    item.append(button);
    contents.append(item);
  });
  right.append(contents);
  pageNumber(right, "right");
  return { nodes: [left, right], title: "Freie Arbeiten – Inhalt" };
}

function workSpread(index, spreadNo) {
  const work = activeStorybook.works[index];
  const spread = imageLayout(work)[spreadNo];
  const left = element("div", "book-page book-left book-fit work-copy");
  if (spread.background !== undefined) {
    const backdrop = element("img", "page-backdrop");
    backdrop.src = `assets/${work.images[spread.background][0]}`;
    backdrop.alt = "";
    left.classList.add("has-backdrop");
    left.append(backdrop);
  }
  left.append(element("p", "book-running-header", `Freie Arbeiten / ${pad(index + 1)} von ${pad(activeStorybook.works.length)}`));
  const body = element("div", spread.inline.length ? "work-copy-body has-inline" : "work-copy-body");
  const paragraphs = spreadNo === 0 ? work.text : spread.text ?? [];
  if (spreadNo === 0) {
    body.append(element("span", "work-number", pad(index + 1)), heading(work.title), element("p", "work-medium", work.medium), element("p", "work-details", work.details));
  } else {
    body.append(element("span", "work-number", pad(index + 1)), heading(work.title, spread.label ?? `Bildseite ${pad(spreadNo + 1)}.`), element("p", "work-medium", work.medium));
  }
  if (paragraphs.length) {
    const text = element("div", "work-text");
    paragraphs.forEach((paragraph) => text.append(element("p", "", paragraph)));
    body.append(text);
  }
  if (spread.inline.length) gallery(body, spread.inline, work.title, spread.inlineNumbers, "art-gallery--inline");
  left.append(body);
  pageNumber(left, "left");

  const right = element("div", "book-page book-right work-art");
  if (spread.bleed) right.dataset.bleed = "always";
  gallery(right, spread.images, work.title, spread.numbers, spread.lead ? "art-gallery--lead" : "");
  if (spread.focus) right.querySelectorAll(".art-frame img").forEach((image) => { image.style.objectPosition = spread.focus; });
  pageNumber(right, "right");
  return { nodes: [left, right], title: work.title };
}

function closingSpread() {
  const left = element("div", "book-page book-left book-fit closing-copy");
  left.append(element("p", "book-running-header", "Abschluss"));
  const body = element("div", "work-copy-body");
  body.append(heading("Danke fürs", "Durchblättern."), element("p", "work-text-lead", "Weitere Projekte aus Produktdesign, Fotografie und Grafik findest du im Portfolio."));
  const actions = element("div", "closing-actions");
  const restart = element("button", "text-button", "Zurück zum Inhalt");
  restart.type = "button";
  restart.addEventListener("click", () => goTo(0));
  const link = element("a", "text-button", "Zum Portfolio ↗");
  link.href = "index.html#arbeiten";
  actions.append(restart, link);
  body.append(actions);
  left.append(body);
  pageNumber(left, "left");

  const right = element("div", "book-page book-right signature-page");
  const signature = document.createElement("img");
  signature.className = "signature";
  signature.src = "assets/storybook/signature.png";
  signature.alt = "Signatur von Daniel Kemper";
  right.append(signature, element("p", "signature-name", "Daniel Kemper"));
  pageNumber(right, "right");
  return { nodes: [left, right], title: "Abschluss" };
}

function projectSpread(projectIndex, spreadNo) {
  const project = projects[activeStorybook.projects[projectIndex]];
  const spread = imageLayout(project)[spreadNo];
  const chapter = pad(projectIndex + 1);
  const left = element("div", "book-page book-left work-art");
  if (spread.bleed) left.dataset.bleed = "always";
  gallery(left, spread.images, project.title, spread.numbers);
  if (spread.focus) left.querySelectorAll(".art-frame img").forEach((image) => { image.style.objectPosition = spread.focus; });
  pageNumber(left, "left");

  const right = element("div", "book-page book-right book-fit work-copy");
  right.append(element("p", "book-running-header", `Projekt ${chapter} / ${project.category}`));
  const body = element("div", spread.inline.length ? "work-copy-body has-inline" : "work-copy-body");
  body.append(element("span", "work-number", chapter), heading(project.title, spreadNo ? `Bildseite ${pad(spreadNo + 1)}.` : undefined), element("p", "work-medium", project.category));
  if (spreadNo === 0) {
    const text = element("div", "work-text");
    text.append(element("p", "", project.description));
    body.append(text);
  }
  if (spread.inline.length) gallery(body, spread.inline, project.title, spread.inlineNumbers, "art-gallery--inline");
  right.append(body);
  pageNumber(right, "right");
  return { nodes: [left, right], title: project.title };
}

function currentSpread() {
  if (activeStorybook.type === "works" && spreadIndex === 0) return coverSpread();
  if (activeStorybook.type === "works" && spreadIndex === totalSpreads() - 1) return closingSpread();
  let remaining = activeStorybook.type === "works" ? spreadIndex - 1 : spreadIndex;
  const items = storybookItems();
  for (let index = 0; index < items.length; index += 1) {
    const pageCount = imagePages(items[index]).length;
    if (remaining < pageCount) {
      return activeStorybook.type === "works" ? workSpread(index, remaining) : projectSpread(index, remaining);
    }
    remaining -= pageCount;
  }
  return activeStorybook.type === "works" ? closingSpread() : projectSpread(0, 0);
}

function fitPages() {
  // Mehrere Querformate stehen untereinander, damit jedes die volle Seitenbreite nutzt.
  book.querySelectorAll(".art-gallery:not(.art-gallery--1):not(.art-gallery--inline):not(.art-gallery--lead)").forEach((gallery) => {
    const images = [...gallery.querySelectorAll("img")];
    const loaded = images.every((image) => image.naturalHeight > 0);
    gallery.classList.toggle("art-gallery--stack", loaded && images.length <= 3 && images.every((image) => image.naturalWidth / image.naturalHeight >= 0.95));
  });
  // Bilder mit nahezu gleichem Seitenverh\u00e4ltnis erhalten exakt gleich gro\u00dfe Rahmen.
  book.querySelectorAll(".art-gallery:not(.art-gallery--1)").forEach((gallery) => {
    const lead = gallery.classList.contains("art-gallery--lead");
    const frames = [...gallery.querySelectorAll(".art-frame")].slice(lead ? 1 : 0);
    frames.forEach((frame) => { frame.style.width = ""; frame.style.height = ""; frame.style.justifySelf = ""; frame.style.alignSelf = ""; frame.querySelector("img").style.objectFit = ""; });
    const images = frames.map((frame) => frame.querySelector("img"));
    gallery.classList.remove("is-uniform");
    if (images.length < 2 || images.some((image) => !image.naturalHeight)) return;
    const ratios = images.map((image) => image.naturalWidth / image.naturalHeight);
    if (Math.max(...ratios) / Math.min(...ratios) > 1.06) return;
    const ratio = ratios.reduce((sum, value) => sum + value, 0) / ratios.length;
    const width = Math.min(...frames.map((frame) => Math.min(frame.offsetWidth, frame.offsetHeight * ratio)));
    const inline = gallery.classList.contains("art-gallery--inline");
    gallery.classList.add("is-uniform");
    frames.forEach((frame, index) => {
      frame.querySelector("img").style.objectFit = "cover";
      frame.style.width = `${width}px`;
      frame.style.height = `${width / ratio}px`;
      frame.style.alignSelf = "center";
      frame.style.justifySelf = inline && frames.length > 1 ? (index === 0 ? "start" : index === frames.length - 1 ? "end" : "center") : "center";
    });
  });
  // Ein einzelnes Bild mit Seitenformat füllt das ganze Blatt, alle anderen behalten Ränder.
  const wide = window.matchMedia("(min-width: 901px)").matches;
  book.querySelectorAll(".work-art").forEach((page) => {
    const image = page.querySelector(".art-gallery--1 img");
    if (!image) return;
    const fills = wide && image.naturalHeight > 0 && (page.dataset.bleed === "always" || Math.abs(Math.log(image.naturalWidth / image.naturalHeight / (page.clientWidth / page.clientHeight))) < 0.17);
    page.classList.toggle("is-bleed", fills);
  });
  book.querySelectorAll(".book-fit").forEach((page) => {
    let fit = 1;
    page.style.setProperty("--fit", "1");
    while (page.scrollHeight > page.clientHeight + 1 && fit > 0.6) {
      fit -= 0.04;
      page.style.setProperty("--fit", fit.toFixed(2));
    }
  });
}

function render(direction = 0) {
  const focused = document.activeElement;
  const focusInBook = book.contains(focused);
  const spread = currentSpread();
  book.classList.remove("is-next", "is-prev");
  void book.offsetWidth;
  if (direction > 0) book.classList.add("is-next");
  if (direction < 0) book.classList.add("is-prev");
  book.replaceChildren(...spread.nodes);
  const title = book.querySelector("h2");
  if (title) title.id = "book-title";
  fitPages();
  book.querySelectorAll("img").forEach((image) => image.addEventListener("load", fitPages, { once: true }));

  const atStart = spreadIndex === 0;
  const atEnd = spreadIndex === totalSpreads() - 1;
  previousButton.disabled = atStart;
  previousZone.disabled = atStart;
  nextButton.disabled = atEnd;
  nextZone.disabled = atEnd;
  const counter = `${pad(spreadIndex + 1)} / ${pad(totalSpreads())}`;
  document.querySelectorAll("[data-book-counter]").forEach((node) => { node.textContent = counter; });
  document.querySelector("#book-status").textContent = `${bookText("spread")} ${spreadIndex + 1} ${bookText("of")} ${totalSpreads()}: ${spread.title}`;

  if (focusInBook && title) title.focus({ preventScroll: true });
  else if (focused === nextButton && atEnd) previousButton.focus();
  else if (focused === previousButton && atStart) nextButton.focus();
}

function goTo(index) {
  window.clearTimeout(turnTimer);
  const nextIndex = Math.max(0, Math.min(totalSpreads() - 1, index));
  if (nextIndex === spreadIndex) return;
  const direction = nextIndex > spreadIndex ? 1 : -1;
  spreadIndex = nextIndex;
  render(direction);
}

function selectStorybook(id) {
  const selection = storybooks.find((storybook) => storybook.id === id);
  if (!selection || selection === activeStorybook) return;
  activeStorybook = selection;
  spreadIndex = 0;
  storybookSelect.value = activeStorybook.id;
  updateStorybookCopy();
  const url = new URL(window.location.href);
  url.searchParams.set("book", activeStorybook.id);
  window.history.replaceState({}, "", url);
  render();
}

const lightbox = element("div", "lightbox");
const lightboxImage = document.createElement("img");
const lightboxClose = element("button", "lightbox-close");
let lightboxFullscreen = false;
let lightboxOpener = null;
lightbox.hidden = true;
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightboxClose.type = "button";
lightboxClose.append(element("span", "", "×"));
lightboxClose.firstChild.setAttribute("aria-hidden", "true");
lightbox.append(lightboxImage, lightboxClose);
reader.append(lightbox);

function openLightbox(source) {
  lightboxOpener = document.activeElement;
  lightboxImage.src = source.currentSrc || source.src;
  lightboxImage.alt = source.alt;
  lightbox.setAttribute("aria-label", bookText("imageView"));
  lightboxClose.setAttribute("aria-label", bookText("closeImage"));
  lightboxClose.title = bookText("closeImage");
  lightbox.hidden = false;
  document.body.classList.add("modal-open");
  lightboxClose.focus({ preventScroll: true });
  // Im Lesemodus liegt das Bild bereits im Vollbild des Lesers.
  if (!isImmersive() && lightbox.requestFullscreen) {
    lightbox.requestFullscreen().then(() => { lightboxFullscreen = true; }, () => {});
  }
}

function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.classList.toggle("modal-open", pseudoFullscreen);
  lightboxImage.removeAttribute("src");
  if (lightboxFullscreen && document.fullscreenElement === lightbox) document.exitFullscreen();
  lightboxFullscreen = false;
  if (lightboxOpener && document.contains(lightboxOpener)) lightboxOpener.focus({ preventScroll: true });
}

lightbox.addEventListener("click", closeLightbox);
lightbox.addEventListener("dblclick", closeLightbox);
document.addEventListener("fullscreenchange", () => {
  if (lightboxFullscreen && document.fullscreenElement !== lightbox) closeLightbox();
});

function isImmersive() {
  return document.fullscreenElement === reader || pseudoFullscreen;
}

function showControls() {
  if (!isImmersive()) return;
  reader.classList.add("is-controls-visible");
  window.clearTimeout(controlsTimer);
  controlsTimer = window.setTimeout(() => reader.classList.remove("is-controls-visible"), 2000);
}

function updateImmersive() {
  const immersive = isImmersive();
  reader.classList.toggle("is-immersive", immersive);
  reader.classList.toggle("is-pseudo-fullscreen", pseudoFullscreen);
  document.body.classList.toggle("modal-open", pseudoFullscreen);
  fullscreenButton.setAttribute("aria-pressed", String(immersive));
  closeButton.hidden = !immersive;
  window.clearTimeout(controlsTimer);
  reader.classList.remove("is-controls-visible");
  if (immersive) {
    showControls();
    book.focus({ preventScroll: true });
  }
  requestAnimationFrame(fitPages);
}

async function enterImmersive() {
  if (reader.requestFullscreen) {
    try {
      await reader.requestFullscreen();
      return;
    } catch (error) {
      console.warn(bookText("fullscreenError"), error);
    }
  }
  pseudoFullscreen = true;
  updateImmersive();
}

async function exitImmersive() {
  if (document.fullscreenElement === reader) await document.exitFullscreen();
  pseudoFullscreen = false;
  updateImmersive();
}

previousButton.addEventListener("click", () => goTo(spreadIndex - 1));
nextButton.addEventListener("click", () => goTo(spreadIndex + 1));
previousZone.addEventListener("click", () => goTo(spreadIndex - 1));
nextZone.addEventListener("click", () => goTo(spreadIndex + 1));
document.querySelector("#book-contents").addEventListener("click", () => goTo(0));
storybookSelect.addEventListener("change", () => selectStorybook(storybookSelect.value));
fullscreenButton.addEventListener("click", () => (isImmersive() ? exitImmersive() : enterImmersive()));
closeButton.addEventListener("click", exitImmersive);
document.addEventListener("fullscreenchange", updateImmersive);

book.addEventListener("click", (event) => {
  if (event.target.closest("button, a, select, input, summary, details")) return;
  if (window.getSelection().toString()) return;
  const bounds = book.getBoundingClientRect();
  const target = spreadIndex + (event.clientX - bounds.left > bounds.width / 2 ? 1 : -1);
  if (!event.target.closest(".art-frame")) {
    goTo(target);
    return;
  }
  // Auf Bildern abwarten, ob ein Doppelklick folgt.
  if (event.detail > 1) return;
  window.clearTimeout(turnTimer);
  turnTimer = window.setTimeout(() => goTo(target), 260);
});

book.addEventListener("dblclick", (event) => {
  const image = event.target.closest(".art-frame img");
  if (!image) return;
  window.clearTimeout(turnTimer);
  window.getSelection().removeAllRanges();
  openLightbox(image);
});

book.addEventListener("pointermove", (event) => {
  const bounds = book.getBoundingClientRect();
  book.dataset.side = event.clientX - bounds.left > bounds.width / 2 ? "next" : "previous";
});
book.addEventListener("pointerleave", () => { delete book.dataset.side; });

reader.addEventListener("pointermove", showControls);
reader.addEventListener("pointerdown", showControls);

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (!lightbox.hidden) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "Escape" || event.key === "ArrowLeft" || event.key === "ArrowRight") event.preventDefault();
    return;
  }
  if (event.key === "Escape" && pseudoFullscreen) {
    event.preventDefault();
    exitImmersive();
    return;
  }
  const controlsBook = reader.contains(document.activeElement) || isImmersive();
  if (!controlsBook || event.shiftKey || document.activeElement === storybookSelect) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    goTo(spreadIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});

window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(fitPages, 120);
});

storybookSelect.value = activeStorybook.id;
updateStorybookCopy();
render();
document.querySelector(".book-controls").hidden = false;
