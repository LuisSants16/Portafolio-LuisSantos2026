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

const heroSection = document.querySelector(".hero");

heroSection.addEventListener("mousemove", (e) => {
  const icons = document.querySelectorAll(".floating-icon");

  const rect = heroSection.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  icons.forEach(icon => {
    const depth = icon.getAttribute("data-depth");
    const moveX = (x - centerX) / depth;
    const moveY = (y - centerY) / depth;

    icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

heroSection.addEventListener("mouseleave", () => {
  const icons = document.querySelectorAll(".floating-icon");
  icons.forEach(icon => {
    icon.style.transform = "translate(0, 0)";
  });
});

const skillCards = document.querySelectorAll(".skill-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
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
}, { threshold: 0.5 });

skillCards.forEach(card => observer.observe(card));
