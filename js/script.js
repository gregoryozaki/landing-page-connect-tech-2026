document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;

  /* =========================
     Tema
     ========================= */

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
    activeTheme = themes.includes(theme) ? theme : "light";

    root.setAttribute("data-theme", activeTheme);
    localStorage.setItem(THEME_STORAGE_KEY, activeTheme);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const icon = button.querySelector("i");

      if (icon) {
        icon.className = `bi ${icons[activeTheme]}`;
      }

      button.setAttribute(
        "aria-label",
        `Alternar tema. Atual: ${labels[activeTheme]}`,
      );

      button.setAttribute("title", labels[activeTheme]);
    });

    document.querySelectorAll("[data-theme-logo]").forEach((img) => {
      const fallback =
        img.dataset.logoFallback || "assets/img/logos/logo-light.png";

      img.onerror = () => {
        img.onerror = null;
        img.src = fallback;
      };

      img.src = logoPath(img, activeTheme);
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

  /* =========================
     Header, menu mobile e voltar ao topo
     ========================= */

  const header = document.querySelector("[data-header]");
  const backTop = document.querySelector("[data-back-top]");
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  function handleScroll() {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
    backTop?.classList.toggle("show", window.scrollY > 520);
  }

  document.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

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

  /* =========================
     Animações de entrada
     ========================= */

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
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 },
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    showAllReveal();
  }

  /* =========================
     FAQ
     ========================= */

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

  /* =========================
     Modal das trilhas
     ========================= */

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

    modalList.innerHTML = "";

    data.items.forEach((itemText) => {
      const item = document.createElement("li");
      item.textContent = itemText;
      modalList.appendChild(item);
    });

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
  }

  document.querySelectorAll("[data-track]").forEach((card) => {
    card.addEventListener("click", () => {
      openTrackModal(card.dataset.track);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      openTrackModal(card.dataset.track);
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

  /* =========================
     Carrossel dos cards da programação
     ========================= */

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

    function stopCardCarousel() {
      clearInterval(cardTimer);
    }

    function startCardCarousel() {
      stopCardCarousel();

      if (!body.classList.contains("reduce-motion")) {
        cardTimer = setInterval(nextCardSlide, 3600);
      }
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

  /* =========================
     Painel de acessibilidade
     ========================= */

  const a11yButton = document.querySelector("[data-a11y-button]");
  const a11yPanel = document.querySelector("[data-a11y-panel]");

  function closeAccessibilityPanel() {
    a11yPanel?.classList.remove("open");
    body.classList.remove("a11y-open");
    a11yButton?.setAttribute("aria-expanded", "false");
  }

  function toggleAccessibilityPanel() {
    const isOpen = a11yPanel?.classList.toggle("open");

    body.classList.toggle("a11y-open", Boolean(isOpen));
    a11yButton?.setAttribute("aria-expanded", String(Boolean(isOpen)));
  }

  a11yButton?.setAttribute("aria-expanded", "false");

  a11yButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleAccessibilityPanel();
  });

  a11yPanel?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (
      !a11yPanel?.contains(event.target) &&
      !a11yButton?.contains(event.target)
    ) {
      closeAccessibilityPanel();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAccessibilityPanel();
    }
  });

  /* =========================
     Aumento de fonte
     ========================= */

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

  /* =========================
     Alto contraste
     ========================= */

  const contrastButton = document.querySelector("[data-contrast]");

  function setHighContrast(active) {
    body.classList.toggle("high-contrast", active);

    contrastButton?.classList.toggle("active", active);
    contrastButton?.setAttribute("aria-pressed", String(active));
    contrastButton?.setAttribute(
      "aria-label",
      active ? "Desativar alto contraste" : "Ativar alto contraste",
    );

    localStorage.setItem("connectech-high-contrast", active ? "1" : "0");
  }

  setHighContrast(localStorage.getItem("connectech-high-contrast") === "1");

  contrastButton?.addEventListener("click", () => {
    setHighContrast(!body.classList.contains("high-contrast"));
  });

  /* =========================
     Leitura em voz alta
     ========================= */

  const readToggleButton = document.querySelector("[data-read-toggle]");

  let speechQueue = [];
  let speechIndex = 0;
  let isReading = false;
  let selectedVoice = null;

  const isMobileSpeech =
    window.matchMedia("(max-width: 720px)").matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  function setReadButtonState(reading) {
    isReading = reading;

    if (!readToggleButton) return;

    readToggleButton.textContent = reading ? "Parar" : "Ouvir";

    readToggleButton.setAttribute(
      "aria-label",
      reading ? "Parar leitura da página" : "Ouvir leitura da página",
    );
  }

  function setReadButtonLoading() {
    if (!readToggleButton) return;

    readToggleButton.textContent = "Carregando...";
    readToggleButton.setAttribute("aria-label", "Carregando leitura da página");
  }

  function pickBestVoice(voices) {
    return (
      voices.find((voice) => voice.lang === "pt-BR") ||
      voices.find((voice) => voice.lang?.toLowerCase().startsWith("pt")) ||
      voices.find((voice) => voice.lang?.toLowerCase().includes("br")) ||
      voices[0] ||
      null
    );
  }

  function waitForVoices(timeout = 2500) {
    return new Promise((resolve) => {
      if (!("speechSynthesis" in window)) {
        resolve([]);
        return;
      }

      const currentVoices = window.speechSynthesis.getVoices();

      if (currentVoices.length) {
        resolve(currentVoices);
        return;
      }

      let finished = false;

      function finish() {
        if (finished) return;

        finished = true;
        resolve(window.speechSynthesis.getVoices());
      }

      window.speechSynthesis.onvoiceschanged = finish;
      setTimeout(finish, timeout);
    });
  }

  function splitText(text, maxLength = isMobileSpeech ? 220 : 380) {
    const cleanText = text.replace(/\s+/g, " ").trim();

    if (!cleanText) return [];

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

    if (current) chunks.push(current);

    return chunks;
  }

  function getReadableText() {
    const main = document.querySelector("main");

    if (!main) return document.body.innerText || "";

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

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setReadButtonState(false);
  }

  function speakNextChunk() {
    if (!isReading || speechIndex >= speechQueue.length) {
      stopReading();
      return;
    }

    if (!("speechSynthesis" in window)) {
      stopReading();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(speechQueue[speechIndex]);

    utterance.lang = selectedVoice?.lang || "pt-BR";
    utterance.rate = isMobileSpeech ? 0.84 : 0.88;
    utterance.pitch = 1;
    utterance.volume = 1;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      speechIndex += 1;

      setTimeout(
        () => {
          speakNextChunk();
        },
        isMobileSpeech ? 260 : 160,
      );
    };

    utterance.onerror = (event) => {
      console.warn("Erro na leitura:", event.error);

      if (!isReading) return;

      speechIndex += 1;

      setTimeout(
        () => {
          speakNextChunk();
        },
        isMobileSpeech ? 300 : 180,
      );
    };

    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  }

  async function startReading() {
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não oferece suporte à leitura em voz alta.");
      return;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    setReadButtonLoading();

    const voices = await waitForVoices();
    selectedVoice = pickBestVoice(voices);

    const text = getReadableText();

    speechQueue = splitText(text);
    speechIndex = 0;

    if (!speechQueue.length) {
      alert("Não encontrei texto para leitura nesta página.");
      setReadButtonState(false);
      return;
    }

    setReadButtonState(true);

    setTimeout(() => {
      speakNextChunk();
    }, 120);
  }

  readToggleButton?.addEventListener("click", () => {
    if (isReading) {
      stopReading();
      return;
    }

    startReading();
  });

  window.addEventListener("beforeunload", stopReading);
});
