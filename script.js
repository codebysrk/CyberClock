function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const strHours = String(hours).padStart(2, "0");

  document.querySelector("#ampm").innerText = ampm;
  document.querySelector(
    "#clock"
  ).innerText = `${strHours}:${minutes}:${seconds}`;

  const options = { weekday: "short", month: "short", day: "numeric" };
  document.querySelector("#date").innerText = now.toLocaleDateString(
    "en-US",
    options
  );
}

updateClock();
setInterval(updateClock, 1000);

const settingsToggle = document.getElementById("settingsToggle");
const settingsPanel = document.querySelector(".settings");

settingsToggle.addEventListener("click", () => {
  settingsPanel.classList.toggle("active");
  const icon = settingsToggle.querySelector("i");
  icon.style.transform = settingsPanel.classList.contains("active")
    ? "rotate(90deg)"
    : "rotate(0deg)";
});

const settingsConfig = {
  time: {
    variable: "--time-size",
    step: 0.5,
    min: 2,
    max: 8,
    unit: "em",
  },
  date: {
    variable: "--date-size",
    step: 0.2,
    min: 0.8,
    max: 3,
    unit: "em",
  },
  border: {
    variable: "--border-width",
    step: 1,
    min: 1,
    max: 20,
    unit: "px",
  },
  intensity: {
    variable: "--glow-intensity",
    step: 0.1,
    min: 0.1,
    max: 1,
    unit: "",
  },
  glow: {
    variable: "--glow-size",
    step: 0.2,
    min: 0.2,
    max: 3,
    unit: "rem",
  },
  speed: {
    variable: "--speed",
    step: 0.5,
    min: 0.25,
    max: 5,
    unit: "s",
  },
};

const root = document.documentElement;

function updateValue(type, direction) {
  const config = settingsConfig[type];

  if (!config) return;

  const currentStyle = getComputedStyle(root).getPropertyValue(config.variable);
  let currentValue = parseFloat(currentStyle);

  if (type === "speed") {
    currentValue += direction === "up" ? -config.step : config.step;
  } else {
    currentValue += direction === "up" ? config.step : -config.step;
  }

  currentValue = Math.round(currentValue * 100) / 100;

  if (currentValue < config.min) currentValue = config.min;
  if (currentValue > config.max) currentValue = config.max;

  root.style.setProperty(config.variable, currentValue + config.unit);
}

Object.keys(settingsConfig).forEach((key) => {
  const upBtn = document.querySelector(`#${key}-up`);
  if (upBtn) {
    upBtn.addEventListener("click", () => updateValue(key, "up"));
  }

  const downBtn = document.querySelector(`#${key}-down`);
  if (downBtn) {
    downBtn.addEventListener("click", () => updateValue(key, "down"));
  }
});
