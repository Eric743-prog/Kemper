"use strict";

// Add a verified public address here to enable project enquiries.
const contactEmail = "daniel.kemper@stud.hs-coburg.de";

const legalDialog = document.querySelector("#legal-dialog");
const projectDetails = document.querySelector("#project-details");
const projectGrid = document.querySelector(".project-grid");
const filters = document.querySelectorAll("[data-filter]");
let activeProjectButton = null;
let hideProjectSourceTimer = null;
let projectSourceAnimation = null;
let showProjectSourceTimer = null;

function createProjectCard(id, index) {
  const project = projects[id];
  const cardSettings = project.card;
  const card = document.createElement("article");
  card.className = `project${cardSettings.wide ? " project-wide" : ""}${cardSettings.tall ? " project-cosmic" : ""}`;
  card.dataset.category = cardSettings.filter;

  const button = document.createElement("button");
  button.className = "project-open";
  button.type = "button";
  button.dataset.project = id;
  button.setAttribute("aria-label", `Projekt ${project.title} ansehen`);

  const imageFrame = document.createElement("div");
  imageFrame.className = `project-image${cardSettings.surface ? ` ${cardSettings.surface}` : ""}${cardSettings.contain ? " contain" : ""}`;
  const image = document.createElement("img");
  image.src = `assets/${project.images[0][0]}`;
  image.alt = project.images[0][1];
  image.loading = "lazy";
  const arrow = document.createElement("span");
  arrow.className = "project-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  imageFrame.append(image, arrow);
  if (cardSettings.imageLabel) {
    const label = document.createElement("span");
    label.className = "image-label";
    label.textContent = cardSettings.imageLabel;
    imageFrame.append(label);
  }

  const caption = document.createElement("div");
  caption.className = "project-caption";
  const title = document.createElement("h3");
  title.textContent = project.title;
  const label = document.createElement("span");
  label.textContent = `${cardSettings.label} / ${String(index + 1).padStart(2, "0")}`;
  caption.append(title, label);
  button.append(imageFrame, caption);
  card.append(button);
  return card;
}

const cards = projectOrder.map(createProjectCard);
cards.forEach((card) => projectGrid.insertBefore(card, projectDetails));
document.querySelector('[data-filter="all"] span').textContent = String(cards.length);
document.querySelector("#filter-status").textContent = `${cards.length} Arbeiten angezeigt.`;

function resizeProjectDetails() {
  if (!projectDetails.hidden && projectDetails.classList.contains("is-open")) {
    const height = projectDetails.querySelector(".project-details-inner").scrollHeight;
    projectDetails.style.minHeight = `${height}px`;
    const sourceCard = activeProjectButton.closest(".project");
    const gridBottom = Math.max(...[...cards].map((card) => card.offsetTop + card.offsetHeight));
    projectGrid.style.paddingBottom = `${Math.max(0, sourceCard.offsetTop + height - gridBottom)}px`;
  }
}

function captureProjectPositions() {
  return new Map([...cards, projectDetails].filter((element) => !element.hidden).map((element) => [element, element.getBoundingClientRect()]));
}

function animateProjectDisplacement(previousPositions) {
  requestAnimationFrame(() => {
    previousPositions.forEach((previousBounds, element) => {
      if (element.hidden) return;
      const bounds = element.getBoundingClientRect();
      const x = previousBounds.left - bounds.left;
      const y = previousBounds.top - bounds.top;
      if (x || y) {
        element.animate([{ transform: `translate(${x}px, ${y}px)` }, { transform: "translate(0, 0)" }], {
          duration: 550,
          easing: "cubic-bezier(.22, 1, .36, 1)"
        });
      }
    });
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    let visibleCount = 0;
    cards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
      if (!card.hidden) visibleCount += 1;
    });
    projectGrid.classList.toggle("has-two-projects", visibleCount === 2);
    if (activeProjectButton && activeProjectButton.closest(".project").hidden) closeProjectDetails();
    document.querySelector("#filter-status").textContent = `${visibleCount} Arbeiten angezeigt.`;
  });
});

function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add("modal-open");
  dialog.scrollTop = 0;
}

function sourceProjectButton(button) {
  if (button.closest(".project")) return button;
  const sourceCard = cards.find((card) => card.querySelector(`[data-project="${button.dataset.project}"]`));
  return sourceCard?.querySelector("[data-project]") ?? null;
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.setAttribute("aria-controls", "project-details");
  button.setAttribute("aria-expanded", "false");
  button.addEventListener("click", () => {
    const sourceButton = sourceProjectButton(button);
    if (!sourceButton) {
      console.error(`Für das Projekt "${button.dataset.project}" wurde keine Portfolio-Karte gefunden.`);
      return;
    }
    if (sourceButton !== button) {
      const sourceCard = sourceButton.closest(".project");
      if (sourceCard.hidden) document.querySelector('[data-filter="all"]').click();
      sourceCard.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "center" });
      sourceButton.click();
      return;
    }
    const previousPositions = captureProjectPositions();
    const project = projects[button.dataset.project];
    if (activeProjectButton === button && !projectDetails.hidden) {
      closeProjectDetails();
      return;
    }
    projectDetails.dataset.project = button.dataset.project;
    document.querySelector("#project-details-title").textContent = project.title;
    document.querySelector("#project-details-category").textContent = project.category;
    document.querySelector("#project-details-description").textContent = project.description;
    document.querySelector("#project-details-note").textContent = project.note;
    const gallery = document.querySelector("#project-details-gallery");
    gallery.replaceChildren();
    gallery.dataset.imageCount = String(project.images.length);
    project.images.forEach(([filename, caption], index) => {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.addEventListener("load", resizeProjectDetails);
      image.src = `assets/${filename}`;
      image.alt = caption;
      image.loading = "eager";
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = `${String(index + 1).padStart(2, "0")} / ${caption}`;
      figure.append(image, figcaption);
      gallery.append(figure);
    });
    if (window.localizePortfolioContent) window.localizePortfolioContent(projectDetails);
    if (activeProjectButton) {
      activeProjectButton.setAttribute("aria-expanded", "false");
      activeProjectButton.closest(".project").classList.remove("is-expanded", "is-detail-source");
    }
    activeProjectButton = button;
    activeProjectButton.setAttribute("aria-expanded", "true");
    const sourceCard = activeProjectButton.closest(".project");
    sourceCard.classList.add("is-expanded");
    projectDetails.style.top = `${sourceCard.getBoundingClientRect().top - projectGrid.getBoundingClientRect().top}px`;
    projectSourceAnimation?.cancel();
    projectSourceAnimation = sourceCard.animate([{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.97)" }], {
      duration: 220,
      easing: "ease-out",
      fill: "forwards"
    });
    window.clearTimeout(hideProjectSourceTimer);
    hideProjectSourceTimer = window.setTimeout(() => {
      if (activeProjectButton !== button) return;
      const previousPositions = captureProjectPositions();
      sourceCard.classList.add("is-detail-source");
      animateProjectDisplacement(previousPositions);
    }, 220);
    button.closest(".project").after(projectDetails);
    projectDetails.hidden = false;
    projectDetails.style.minHeight = "0px";
    void projectDetails.offsetHeight;
    projectDetails.classList.add("is-open");
    resizeProjectDetails();
    animateProjectDisplacement(previousPositions);
    document.querySelector("#project-details-title").focus({ preventScroll: true });
  });
});

function closeProjectDetails() {
  if (projectDetails.hidden) return;
  const previousPositions = captureProjectPositions();
  const sourceCard = activeProjectButton?.closest(".project");
  function hideDetails() {
    if (projectDetails.hidden) return;
    projectDetails.hidden = true;
    projectDetails.style.removeProperty("min-height");
    projectDetails.style.removeProperty("top");
    projectGrid.style.removeProperty("padding-bottom");
    delete projectDetails.dataset.project;
    if (activeProjectButton) activeProjectButton.setAttribute("aria-expanded", "false");
    const button = activeProjectButton;
    activeProjectButton = null;
    if (button) button.focus({ preventScroll: true });
  }
  projectDetails.classList.remove("is-open");
  window.clearTimeout(hideProjectSourceTimer);
  projectDetails.style.minHeight = "0px";
  animateProjectDisplacement(previousPositions);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sourceCard?.classList.remove("is-expanded", "is-detail-source");
    hideDetails();
    return;
  }
  window.clearTimeout(showProjectSourceTimer);
  showProjectSourceTimer = window.setTimeout(() => {
    projectSourceAnimation?.cancel();
    sourceCard?.classList.remove("is-expanded", "is-detail-source");
    sourceCard?.animate([{ opacity: 0, transform: "scale(.97)" }, { opacity: 1, transform: "scale(1)" }], {
      duration: 260,
      easing: "cubic-bezier(.22, 1, .36, 1)"
    });
  }, 360);
  window.setTimeout(hideDetails, 600);
}

document.querySelector(".project-details-close").addEventListener("click", closeProjectDetails);

[legalDialog].forEach((dialog) => {
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      dialog.close();
    }
  });
});

document.querySelector("#legal-open").addEventListener("click", () => openDialog(legalDialog));

if (contactEmail) {
  const address = contactEmail.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
    console.error("Die konfigurierte Kontaktadresse ist ungültig. Projektanfragen bleiben deaktiviert.");
    document.querySelector(".contact-note").textContent = "Die Kontaktadresse ist nicht korrekt eingerichtet. Projektanfragen sind derzeit nicht möglich.";
  } else {
    const link = document.createElement("a");
    link.className = "contact-email";
    link.href = `mailto:${address}?subject=${encodeURIComponent("Projektanfrage – Portfolio")}`;
    link.textContent = `${address} ↗`;
    document.querySelector("#contact-action").replaceChildren(link);
  }
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const carousel = document.querySelector(".hero-carousel");
const viewport = carousel.querySelector(".carousel-viewport");
const slides = [...carousel.querySelectorAll(".carousel-slide")];
const slideButtons = [...carousel.querySelectorAll("[data-slide]")];
let activeSlide = 0;

function changeSlide(index, direction = 1) {
  const nextSlide = (index + slides.length) % slides.length;
  if (nextSlide === activeSlide) return;
  const moveFocus = slides[activeSlide].contains(document.activeElement);
  carousel.style.setProperty("--carousel-direction", String(direction));
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === nextSlide;
    slide.hidden = !active;
    slide.classList.toggle("is-active", active);
  });
  slideButtons.forEach((button, slideIndex) => button.setAttribute("aria-pressed", String(slideIndex === nextSlide)));
  activeSlide = nextSlide;
  document.querySelector("#carousel-count").textContent = `${String(activeSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  document.querySelector("#carousel-title").textContent = slides[activeSlide].dataset.title;
  document.querySelector("#carousel-status").textContent = `${activeSlide + 1} von ${slides.length} – ${slides[activeSlide].dataset.title}`;
  if (moveFocus) slides[activeSlide].querySelector("button").focus({ preventScroll: true });
}

carousel.querySelector(".carousel-controls").hidden = false;
document.querySelector("#carousel-prev").addEventListener("click", () => changeSlide(activeSlide - 1, -1));
document.querySelector("#carousel-next").addEventListener("click", () => changeSlide(activeSlide + 1, 1));
slideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.slide);
    changeSlide(index, index > activeSlide ? 1 : -1);
  });
});
carousel.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    changeSlide(activeSlide + direction, direction);
  }
});

let gesture = null;
let suppressClick = false;
viewport.addEventListener("pointerdown", (event) => {
  suppressClick = false;
  if (event.isPrimary && event.pointerType !== "mouse") {
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }
});
viewport.addEventListener("pointerup", (event) => {
  if (!gesture || gesture.id !== event.pointerId) return;
  const dx = event.clientX - gesture.x;
  const dy = event.clientY - gesture.y;
  gesture = null;
  if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
    suppressClick = true;
    const direction = dx < 0 ? 1 : -1;
    changeSlide(activeSlide + direction, direction);
  }
});
viewport.addEventListener("pointercancel", () => { gesture = null; });
viewport.addEventListener("click", (event) => {
  if (suppressClick && event.detail !== 0) {
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }
}, true);

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const revealElements = document.querySelectorAll(".hero-topline, .hero h1, .hero-bottom, .hero-carousel, .section-label, .section-heading, .project, .profile-image, .profile-copy, .services h2, .service-list > div, .timeline-item, .skills h2, .skills-subtitle, .skill-card, .tool-group, .contact h2, .contact-bottom");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) reveal(entry.target);
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });

  function reveal(element) {
    element.classList.remove("reveal-pending");
    observer.unobserve(element);
  }

  revealElements.forEach((element) => {
    element.classList.add("reveal", "reveal-pending");
    if (element.matches(".project, .service-list > div, .skill-card")) {
      const siblings = [...element.parentElement.children];
      element.style.setProperty("--reveal-delay", `${(siblings.indexOf(element) % 3) * 80}ms`);
    }
    observer.observe(element);
  });

  document.addEventListener("focusin", (event) => {
    const element = event.target.closest(".reveal-pending");
    if (element) reveal(element);
  });

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      revealElements.forEach(reveal);
      observer.disconnect();
    }
  });
}
