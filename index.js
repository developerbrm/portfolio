//Firebase Initialization
var firebaseConfig = {
  apiKey: "AIzaSyBM3XhG1PR-nu5Jk7yGmjf1IIVqu4W4RRY",
  authDomain: "portfolio2095.firebaseapp.com",
  databaseURL: "https://portfolio2095.firebaseio.com",
  projectId: "portfolio2095",
  storageBucket: "portfolio2095.appspot.com",
  messagingSenderId: "435569868585",
  appId: "1:435569868585:web:964de4b6020c1f503b4138",
  measurementId: "G-MLD9BE3SJJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

const themeClicked = (e) => {
  if (e.target.parentNode !== themes) return;
  if (localStorage.getItem(`theme`) === e.target.className) return;

  setTheme(e.target.className);
  renderParticle();
};

const setTheme = (theme) => {
  localStorage.setItem(`theme`, theme || `dark`);
  getStyle(localStorage.getItem(`theme`));
};

const setColors = (...colors) => {
  const variables = [
    "--mainColor",
    "--mainLightColor",
    "--headingPrimaryColor",
    "--headingSecondaryColor",
    "--buttonColor",
    "--containerMainColor",
    "--containerSecondaryColor",
    "--containerTertiaryColor",
    "--homeBGColor1",
    "--homeBGColor2",
    "--BGColor",
  ];

  variables.forEach((variable, index) => {
    document.documentElement.style.setProperty(variable, colors[index]);
  });
};

const getStyle = (themeName) => {
  switch (themeName) {
    case "dark":
      return setColors(
        "#8E8E8E",
        "#ddd",
        "#7363FF",
        "#B3B3FF",
        "#6D6DB3",
        "#00000070",
        "#ffffff0d",
        "#ffffff1c",
        "#221F33",
        "#110F1A",
        "#1C1C1C"
      );
    case "light":
      return setColors(
        "#414141",
        "#000",
        "#1d1d1d",
        "#7c7c7c",
        "#82dcff",
        "#cecece70",
        "#00000012",
        "#fffdfd24",
        "#c7f2ff",
        "#ecfdff",
        "#fff"
      );
    case "orange":
      return setColors(
        "#8e8e8e",
        "#ddd",
        "#f28f00",
        "#ffc46c",
        "#4d4d4d",
        "#00000070",
        "#ffffff0d",
        "#ffffff1c",
        "#414141",
        "#000000",
        "#1c1c1c"
      );
    case "pink":
      return setColors(
        "#000000",
        "#3a0a32",
        "#74003b",
        "#c2166d",
        "#ffd8f8",
        "#ff62d470",
        "#ff6bc245",
        "#ffffff1c",
        "#ffc2ed",
        "#ffedfa",
        "#ffc2ed"
      );
  }
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

const animations = ["slideFade"].forEach((animation) => {
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

//Click to copy to clipboard

const email = document.querySelector(".email-text .email");
email.addEventListener("click", () => {
  email.select();
  email.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.querySelector(
    "#contact .info"
  ).style.animation = `fadeOut 4s cubic-bezier(0, 0.68, 0.31, 1.05) forwards`;
  setTimeout(() => {
    document.querySelector("#contact .info").style.animation = "none";
  }, 3000);
});

//Backend integration with firebase

const form = document.querySelector("#form");
//create refrence to the firebase

const submitForm = (e) => {
  e.preventDefault();
  const time = new Date(Date.now()).toLocaleString().replace(/[/]/g, "-");
  const messagesRef = firebase.database().ref(`${time}`);
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  const newMessageRef = messagesRef.push();
  newMessageRef.set({
    name,
    email,
    message,
  });

  document.querySelector(
    ".submit-message"
  ).style.animation = `fadeOut 3s cubic-bezier(1, 0.04, 0.97, 0.99) forwards`;
  setTimeout(() => {
    document.querySelector(".submit-message").style.animation = "none";
  }, 3500);

  form.reset();
};

form.addEventListener("submit", submitForm);

//Render the particles js script
renderParticle();
