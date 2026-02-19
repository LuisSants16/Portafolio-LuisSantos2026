const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("closeMenu");

menuToggle.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

closeMenu.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

window.addEventListener("scroll", () => {

  // Tu efecto de header
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // 👇 Cerrar sidebar si está abierto
  if (sidebar.classList.contains("active")) {
    closeSidebar();
  }

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });

      // 👇 Limpia el hash de la URL
      history.replaceState(null, null, " ");
    }
  });
});


const heroSection = document.querySelector(".hero");

heroSection.addEventListener("mousemove", (e) => {
  const icons = document.querySelectorAll(".floating-icon");

  const rect = heroSection.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  icons.forEach((icon) => {
    const depth = icon.getAttribute("data-depth");
    const moveX = (x - centerX) / depth;
    const moveY = (y - centerY) / depth;

    icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

heroSection.addEventListener("mouseleave", () => {
  const icons = document.querySelectorAll(".floating-icon");
  icons.forEach((icon) => {
    icon.style.transform = "translate(0, 0)";
  });
});

const skillCards = document.querySelectorAll(".skill-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("loaded")) {
        entry.target.classList.add("loaded");

        const percent = parseInt(entry.target.getAttribute("data-percent"));
        const progress = entry.target.querySelector(".skill-progress");
        const number = entry.target.querySelector(".skill-number");

        // Animación barra
        progress.style.width = percent + "%";

        // Animación contador
        let start = 0;
        const speed = 20;
        const increment = percent / 50;

        const counter = setInterval(() => {
          start += increment;
          if (start >= percent) {
            start = percent;
            clearInterval(counter);
          }
          number.textContent = Math.floor(start) + "%";
        }, speed);
      }
    });
  },
  { threshold: 0.5 },
);

skillCards.forEach((card) => observer.observe(card));

const tabs = document.querySelectorAll(".tab");
const groups = document.querySelectorAll(".services-grid");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Quitar active de todos los botones
    tabs.forEach((btn) => btn.classList.remove("active"));

    // Agregar active al clickeado
    tab.classList.add("active");

    // Ocultar todos los grupos
    groups.forEach((group) => group.classList.remove("active"));

    // Mostrar grupo correcto
    const target = tab.getAttribute("data-group");
    document.getElementById(target).classList.add("active");
  });
});

const grid = document.querySelector(".recent-grid");
const btnPrev = document.querySelector(".recent-arrows button:first-child");
const btnNext = document.querySelector(".recent-arrows button:last-child");

let currentIndex = 0;
let cardWidth = 0;
let totalCards = 0;

function getCardWidth() {
  const card = grid.querySelector(".recent-card");
  const styles = getComputedStyle(grid);
  const gap = parseFloat(styles.gap);
  return card.offsetWidth + gap;
}

function setupInfinite() {
  const cards = Array.from(grid.children);
  totalCards = cards.length;

  // duplicamos todo el contenido
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    grid.appendChild(clone);
  });

  cardWidth = getCardWidth();
}

function updateSlider() {
  grid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function nextSlide() {
  currentIndex++;
  updateSlider();

  if (currentIndex >= totalCards) {
    setTimeout(() => {
      grid.style.transition = "none";
      currentIndex = 0;
      updateSlider();
      grid.offsetHeight; // fuerza reflow
      grid.style.transition = "transform 0.4s ease";
    }, 400);
  }
}

function prevSlide() {
  if (currentIndex === 0) {
    grid.style.transition = "none";
    currentIndex = totalCards;
    updateSlider();
    grid.offsetHeight;
    grid.style.transition = "transform 0.4s ease";
  }

  currentIndex--;
  updateSlider();
}

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

window.addEventListener("resize", () => {
  cardWidth = getCardWidth();
  updateSlider();
});

setupInfinite();
updateSlider();

window.addEventListener("DOMContentLoaded", () => {
  const clients = [
    {
      img: "./img/cliente1.jpg",
      text: "Luis desarrolló nuestra página web con un diseño moderno y excelente rendimiento.",
      name: "Robert Johnson",
      role: "Software Developer",
    },
    {
      img: "./img/cliente2.jpg",
      text: "Excelente profesional, entregó todo antes del plazo acordado.",
      name: "Cathi Falcon",
      role: "Software Engineer",
    },
    {
      img: "./img/cliente3.jpg",
      text: "Muy organizado y comprometido con cada detalle del proyecto.",
      name: "Daniel Smith",
      role: "Project Manager",
    },
    {
      img: "./img/cliente4.jpg",
      text: "Gran comunicación y soporte continuo.",
      name: "Laura Gómez",
      role: "Marketing Manager",
    },
    {
      img: "./img/cliente5.jpg",
      text: "Excelente experiencia trabajando juntos.",
      name: "Andrés Torres",
      role: "UX Designer",
    },
  ];

  let clientIndex = 0;
  let orbitRotation = 0;

  const mainAvatar = document.querySelector(".main-avatar img");
  const clientText = document.querySelector(".clients-text");
  const clientName = document.querySelector(".client-info h4");
  const clientRole = document.querySelector(".client-info span");
  const orbit = document.querySelector(".orbit");

  const smallAvatars = document.querySelectorAll(".small-avatar img");
  const smallAvatarWrappers = document.querySelectorAll(".small-avatar");

  const total = clients.length;
  const step = 360 / total;

  // 🔵 Actualizar cliente con animación
  function updateClient() {
    const textBlock = document.querySelector(".clients-text");
    const infoBlock = document.querySelector(".client-info");

    textBlock.classList.add("fade-out");
    infoBlock.classList.add("fade-out");

    setTimeout(() => {
      const current = clients[clientIndex];

      mainAvatar.src = current.img;
      clientText.textContent = current.text;
      clientName.textContent = current.name;
      clientRole.textContent = current.role;

      textBlock.classList.remove("fade-out");
      infoBlock.classList.remove("fade-out");

      textBlock.classList.add("fade-in");
      infoBlock.classList.add("fade-in");

      setTimeout(() => {
        textBlock.classList.remove("fade-in");
        infoBlock.classList.remove("fade-in");
      }, 400);
    }, 300);
  }

  // 🔵 Distribución circular original
  function getOrbitRadius() {
    if (window.innerWidth <= 600) {
      return 110; // 👈 más compacto en celular
    }
    if (window.innerWidth <= 900) {
      return 150; // 👈 tablet
    }
    return 200; // 👈 desktop
  }

  function positionAvatars() {
    const orbitRadius = getOrbitRadius();
    const angleOffset = Math.PI / 2;

    smallAvatarWrappers.forEach((avatar, index) => {
      const angle = (index / total) * (2 * Math.PI) - angleOffset;

      const x = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle) * orbitRadius;

      avatar.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  }

  positionAvatars();
  window.addEventListener("resize", positionAvatars);

  // 🔵 NEXT
  document.getElementById("clientNext").addEventListener("click", () => {
    clientIndex++;
    if (clientIndex >= total) clientIndex = 0;

    updateClient();

    orbitRotation -= step;
    orbit.style.transform = `rotate(${orbitRotation}deg)`;

    smallAvatars.forEach((img) => {
      img.style.transform = `rotate(${-orbitRotation}deg)`;
    });
  });

  // 🔵 PREV
  document.getElementById("clientPrev").addEventListener("click", () => {
    clientIndex--;
    if (clientIndex < 0) clientIndex = total - 1;

    updateClient();

    orbitRotation += step;
    orbit.style.transform = `rotate(${orbitRotation}deg)`;

    smallAvatars.forEach((img) => {
      img.style.transform = `rotate(${-orbitRotation}deg)`;
    });
  });
});
