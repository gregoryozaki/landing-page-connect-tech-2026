document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;

  const themes = ["light", "dark", "aurora"];

  const icons = {
    light: "bi-sun",
    dark: "bi-moon-stars",
    aurora: "bi-stars",
  };

  const labels = {
    light: "Tema clean",
    dark: "Tema escuro",
    aurora: "Tema aurora",
  };

  const THEME_STORAGE_KEY = "connectech-theme-v6";

  let activeTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (!themes.includes(activeTheme)) activeTheme = "light";

  function logoPath(img, theme) {
    const attr = `logo${theme.charAt(0).toUpperCase()}${theme.slice(1)}`;
    return img.dataset[attr] || img.dataset.logoFallback || img.src;
  }

  function setTheme(theme) {
    activeTheme = theme;
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const icon = button.querySelector("i");
      if (icon) icon.className = `bi ${icons[theme]}`;

      button.setAttribute(
        "aria-label",
        `Alternar tema. Atual: ${labels[theme]}`,
      );
      button.setAttribute("title", labels[theme]);
    });

    document.querySelectorAll("[data-theme-logo]").forEach((img) => {
      const fallback =
        img.dataset.logoFallback || "assets/img/logos/logo-light.png";

      img.onerror = () => {
        img.onerror = null;
        img.src = fallback;
      };

      img.src = logoPath(img, theme);
    });
  }

  setTheme(activeTheme);

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme =
        themes[(themes.indexOf(activeTheme) + 1) % themes.length];
      setTheme(nextTheme);
    });
  });

  const header = document.querySelector("[data-header]");
  const backTop = document.querySelector("[data-back-top]");

  function handleScroll() {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
    backTop?.classList.toggle("show", window.scrollY > 520);
  }

  document.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  menuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  backTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: body.classList.contains("reduce-motion") ? "auto" : "smooth",
    });
  });

  const revealItems = document.querySelectorAll(".reveal, .reveal-group");

  function showAllReveal() {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  if (
    body.classList.contains("reduce-motion") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    showAllReveal();
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    showAllReveal();
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button?.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((other) => {
        other.classList.remove("open");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!wasOpen && answer) {
        item.classList.add("open");
        answer.style.maxHeight = `${answer.scrollHeight + 28}px`;
      }
    });
  });

  const trackData = {
    principal: {
      label: "Trilha Principal",
      title: "Trilha Principal",
      text: "Recebe artigos com contribuição científica mais consolidada nas áreas de Computação, Tecnologia, Engenharia de Software, Sistemas de Informação, Inteligência Artificial e áreas correlatas.",
      items: [
        "Indicada para pesquisas com problema, método, desenvolvimento e resultados bem definidos.",
        "O artigo deve seguir o template da SBC e ser submetido em PDF.",
        "Não há limite de autores ou coautores por trabalho.",
        "Não há limite de submissões por autor ou coautor.",
        "A submissão deve estar adequada ao escopo do evento e da trilha escolhida.",
      ],
    },

    emergentes: {
      label: "Trilha de Trabalhos Emergentes",
      title: "Trilha de Trabalhos Emergentes",
      text: "Recebe ideias inovadoras, pesquisas em andamento, protótipos, provas de conceito, estudos exploratórios e resultados preliminares.",
      items: [
        "Indicada para trabalhos ainda em desenvolvimento.",
        "Aceita propostas com resultados iniciais, protótipos ou validações parciais.",
        "O texto deve apresentar objetivo, contexto, método, estágio atual e contribuição esperada.",
        "O trabalho também deve seguir o template da SBC.",
        "A proposta precisa deixar clara sua relação com Computação, Tecnologia ou Inovação.",
      ],
    },

    publicados: {
      label: "Trilha de Artigos Publicados",
      title: "Trilha de Artigos Publicados",
      text: "Destinada à apresentação de trabalhos já aceitos ou publicados em eventos, periódicos, workshops ou conferências nacionais e internacionais.",
      items: [
        "Indicada para divulgar pesquisas já publicadas para a comunidade local.",
        "A apresentação deve destacar problema, contribuição, método, resultados e relevância.",
        "A trilha não substitui as regras editoriais do local original de publicação.",
        "Inclua a referência da publicação original no material de apresentação.",
        "O objetivo é ampliar a circulação científica e aproximar pesquisas recentes da comunidade do ICET/UFAM.",
      ],
    },
  };

  const modal = document.querySelector("[data-track-modal]");
  const modalClose = document.querySelector("[data-modal-close]");
  const modalLabel = document.querySelector("[data-modal-label]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");
  const modalList = document.querySelector("[data-modal-list]");

  function openTrackModal(key) {
    const data = trackData[key];
    if (!modal || !data) return;

    modalLabel.textContent = data.label;
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;
    modalList.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");

    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }

  document.querySelectorAll("[data-track]").forEach((card) => {
    card.addEventListener("click", () => openTrackModal(card.dataset.track));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTrackModal(card.dataset.track);
      }
    });
  });

  modalClose?.addEventListener("click", () => modal?.close());

  modal?.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();

    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) modal.close();
  });

  const orgCarousel = document.querySelector("[data-org-carousel]");
  const orgSlides = [...document.querySelectorAll("[data-org-slide]")];
  const orgDots = [...document.querySelectorAll("[data-org-dot]")];
  const orgPrev = document.querySelector("[data-org-prev]");
  const orgNext = document.querySelector("[data-org-next]");

  let orgIndex = 0;
  let orgTimer = null;

  function showOrgSlide(nextIndex, direction = "next") {
    if (!orgSlides.length) return;

    const previousIndex = orgIndex;
    orgIndex = (nextIndex + orgSlides.length) % orgSlides.length;

    orgSlides.forEach((slide, index) => {
      slide.classList.remove("active", "leaving-left", "leaving-right");

      if (index === orgIndex) {
        slide.classList.add("active");
      } else if (index === previousIndex) {
        slide.classList.add(
          direction === "next" ? "leaving-left" : "leaving-right",
        );
      }
    });

    orgDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === orgIndex);
      dot.setAttribute("aria-current", index === orgIndex ? "true" : "false");
    });
  }

  function nextOrgSlide() {
    showOrgSlide(orgIndex + 1, "next");
  }

  function prevOrgSlide() {
    showOrgSlide(orgIndex - 1, "prev");
  }

  function startOrgCarousel() {
    clearInterval(orgTimer);

    if (orgSlides.length > 1 && !body.classList.contains("reduce-motion")) {
      orgTimer = setInterval(nextOrgSlide, 4300);
    }
  }

  if (orgSlides.length) {
    showOrgSlide(0);
    startOrgCarousel();

    orgNext?.addEventListener("click", () => {
      nextOrgSlide();
      startOrgCarousel();
    });

    orgPrev?.addEventListener("click", () => {
      prevOrgSlide();
      startOrgCarousel();
    });

    orgDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showOrgSlide(index, index > orgIndex ? "next" : "prev");
        startOrgCarousel();
      });
    });

    orgCarousel?.addEventListener("mouseenter", () => clearInterval(orgTimer));
    orgCarousel?.addEventListener("mouseleave", startOrgCarousel);
  }

  const mediaCards = [...document.querySelectorAll("[data-card-carousel]")];

  mediaCards.forEach((card) => {
    const slides = [...card.querySelectorAll("[data-card-slide]")];
    const prevButton = card.querySelector("[data-card-prev]");
    const nextButton = card.querySelector("[data-card-next]");

    if (!slides.length) return;

    let currentSlide = 0;
    let cardTimer = null;

    function showCardSlide(index) {
      currentSlide = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === currentSlide);
      });
    }

    function nextCardSlide() {
      showCardSlide(currentSlide + 1);
    }

    function prevCardSlide() {
      showCardSlide(currentSlide - 1);
    }

    function startCardCarousel() {
      clearInterval(cardTimer);

      if (!body.classList.contains("reduce-motion")) {
        cardTimer = setInterval(nextCardSlide, 3600);
      }
    }

    function stopCardCarousel() {
      clearInterval(cardTimer);
    }

    showCardSlide(0);
    startCardCarousel();

    nextButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      nextCardSlide();
      startCardCarousel();
    });

    prevButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      prevCardSlide();
      startCardCarousel();
    });

    card.addEventListener("mouseenter", stopCardCarousel);
    card.addEventListener("mouseleave", startCardCarousel);

    card.addEventListener("focusin", stopCardCarousel);
    card.addEventListener("focusout", startCardCarousel);
  });

  const a11yButton = document.querySelector("[data-a11y-button]");
  const a11yPanel = document.querySelector("[data-a11y-panel]");

  a11yButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    a11yPanel?.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (
      !a11yPanel?.contains(event.target) &&
      !a11yButton?.contains(event.target)
    ) {
      a11yPanel?.classList.remove("open");
    }
  });

  let fontLevel = Number(localStorage.getItem("connectech-font-level") || 0);

  function applyFontLevel() {
    root.classList.remove("font-lg", "font-xl");

    if (fontLevel === 1) root.classList.add("font-lg");
    if (fontLevel === 2) root.classList.add("font-xl");

    localStorage.setItem("connectech-font-level", String(fontLevel));
  }

  applyFontLevel();

  document.querySelector("[data-font-inc]")?.addEventListener("click", () => {
    fontLevel = Math.min(2, fontLevel + 1);
    applyFontLevel();
  });

  document.querySelector("[data-font-dec]")?.addEventListener("click", () => {
    fontLevel = Math.max(0, fontLevel - 1);
    applyFontLevel();
  });

  const contrastButton = document.querySelector("[data-contrast]");

  if (localStorage.getItem("connectech-high-contrast") === "1") {
    body.classList.add("high-contrast");
    contrastButton?.classList.add("active");
  }

  contrastButton?.addEventListener("click", () => {
    const active = body.classList.toggle("high-contrast");
    contrastButton.classList.toggle("active", active);
    localStorage.setItem("connectech-high-contrast", active ? "1" : "0");
  });

  const readToggleButton = document.querySelector("[data-read-toggle]");
  let speechQueue = [];
  let speechIndex = 0;
  let isReading = false;
  let selectedVoice = null;
  let keepSpeechAliveTimer = null;

  function setReadButtonState(reading) {
    isReading = reading;

    if (readToggleButton) {
      readToggleButton.textContent = reading ? "Parar" : "Ouvir";
      readToggleButton.setAttribute(
        "aria-label",
        reading ? "Parar leitura da página" : "Ouvir leitura da página",
      );
    }
  }

  function waitForVoices() {
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();

      if (voices.length) {
        resolve(voices);
        return;
      }

      let resolved = false;

      window.speechSynthesis.onvoiceschanged = () => {
        if (resolved) return;

        resolved = true;
        resolve(window.speechSynthesis.getVoices());
      };

      setTimeout(() => {
        if (resolved) return;

        resolved = true;
        resolve(window.speechSynthesis.getVoices());
      }, 1500);
    });
  }

  async function getBestVoice() {
    const voices = await waitForVoices();

    selectedVoice =
      voices.find((voice) => voice.lang === "pt-BR") ||
      voices.find((voice) => voice.lang?.toLowerCase().startsWith("pt")) ||
      voices.find((voice) => voice.lang?.toLowerCase().includes("br")) ||
      voices[0] ||
      null;

    return selectedVoice;
  }

  function splitText(text, maxLength = 650) {
    const cleanText = text.replace(/\s+/g, " ").trim();

    if (!cleanText) {
      return [];
    }

    const sentences = cleanText.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) || [
      cleanText,
    ];

    const chunks = [];
    let current = "";

    sentences.forEach((sentence) => {
      const next = `${current} ${sentence}`.trim();

      if (next.length > maxLength && current.length > 0) {
        chunks.push(current);
        current = sentence.trim();
      } else {
        current = next;
      }
    });

    if (current) {
      chunks.push(current);
    }

    return chunks;
  }

  function getReadableText() {
    const main = document.querySelector("main");

    if (!main) {
      return document.body.innerText || "";
    }

    const clone = main.cloneNode(true);

    clone
      .querySelectorAll(
        "script, style, noscript, dialog, button, nav, .accessibility-panel, .back-top, .accessibility-button",
      )
      .forEach((el) => el.remove());

    const pageText = clone.innerText || clone.textContent || "";

    const imageDescriptions = [...main.querySelectorAll("img")]
      .map((img) => img.alt?.trim())
      .filter(Boolean)
      .map((alt) => `Imagem: ${alt}.`)
      .join(" ");

    return `${pageText}. ${imageDescriptions}`.replace(/\s+/g, " ").trim();
  }

  function stopReading() {
    speechQueue = [];
    speechIndex = 0;

    clearInterval(keepSpeechAliveTimer);
    keepSpeechAliveTimer = null;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setReadButtonState(false);
  }

  function keepSpeechAlive() {
    clearInterval(keepSpeechAliveTimer);

    keepSpeechAliveTimer = setInterval(() => {
      if (!isReading || !window.speechSynthesis.speaking) {
        return;
      }

      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, 9000);
  }

  function speakNextChunk() {
    if (!isReading || speechIndex >= speechQueue.length) {
      stopReading();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(speechQueue[speechIndex]);

    utterance.lang = selectedVoice?.lang || "pt-BR";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      speechIndex += 1;

      setTimeout(() => {
        speakNextChunk();
      }, 120);
    };

    utterance.onerror = (event) => {
      console.warn("Erro na leitura:", event.error);

      speechIndex += 1;

      setTimeout(() => {
        speakNextChunk();
      }, 120);
    };

    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  }

  async function startReading() {
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não oferece suporte à leitura em voz alta.");
      return;
    }

    stopReading();

    const text = getReadableText();

    speechQueue = splitText(text);
    speechIndex = 0;

    if (!speechQueue.length) {
      alert("Não encontrei texto para leitura nesta página.");
      return;
    }

    await getBestVoice();

    setReadButtonState(true);
    keepSpeechAlive();

    setTimeout(() => {
      speakNextChunk();
    }, 180);
  }

  readToggleButton?.addEventListener("click", () => {
    if (isReading || window.speechSynthesis?.speaking) {
      stopReading();
    } else {
      startReading();
    }
  });

  window.addEventListener("beforeunload", stopReading);
});
