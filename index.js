// header elements
const header = document.querySelector("header");
const navUL = document.querySelector("header nav ul");
const menu = document.querySelector(".menu");
const nav = document.querySelector("header nav");

const menuClick = (e) => {
  header.classList.toggle("toggleClipPath");
};

// nav enents
menu.addEventListener("click", menuClick);
header.addEventListener("click", (e) => {
  if (
    e.target === nav ||
    e.target.parentNode === nav ||
    e.target.parentNode.parentNode === nav ||
    e.target.parentNode.parentNode.parentNode === nav
  )
    header.classList.remove("toggleClipPath");
});

// theme elements
const themes = document.querySelector(".themes");
const selectedTheme = document.querySelector(".theme-select");

const themeClicked = (e) => {
  if (e.target.parentNode !== themes) return;
  setTheme(e.target.className);
  renderParticle();
};

const setTheme = (theme) => {
  localStorage.setItem(`theme`, theme || `dark`);
  selectedTheme.href = `./assets/themes/${localStorage.getItem(`theme`)}.css`;
};

// theme events
themes.addEventListener("click", themeClicked);
window.addEventListener("onload", setTheme(localStorage.getItem(`theme`)));

// Intersection observer

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `slideFade 2s cubic-bezier(0, 0.68, 0.31, 1.05) ${
        entry.target.dataset.delay || 0
      }s forwards `;
    } else {
      entry.target.style.animation = `none`;
    }
  });
});

const animations = ["slideFade", "slideFadeRight"].forEach((animation) => {
  const elements = document.querySelectorAll(`${animation}`);
  elements.forEach((element) => observer.observe(element));
});

const elements = document.querySelectorAll(".slideFade");
elements.forEach((element) => observer.observe(element));

//Particles

const renderParticle = () => {
  const particlesContainer = document.querySelector(`.particles-container`);
  const particles = `<div id="particles-js" class="slideFade"></div>`;
  particlesContainer.innerHTML = particles;

  const particlesJSON = fetch("./assets/ParticleJS/particles.json")
    .then((response) => response.json())
    .then((json) => {
      setParticleColor(json);
      particlesJS("particles-js", json);
    });
};

const setParticleColor = (json) => {
  const colorOfCSS = getComputedStyle(document.body).getPropertyValue(
    "--mainLightColor"
  );
  json.particles.color.value = colorOfCSS.trim();
  json.particles.line_linked.color = colorOfCSS.trim();
};

renderParticle();
