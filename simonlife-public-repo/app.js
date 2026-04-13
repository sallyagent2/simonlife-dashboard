const data = {
  week: "Week 1",
  day: "Day 1",
  date: "Baseline day next week",
  role: "Baseline test day",
  sunday: "Establish rung one",
  capsule: "Not started",
  focus: "Measure true starting point",
  nutrition: "Log actual intake",
  trainingStatus: "Not logged",
  foodStatus: "Not logged",
  execution: [
    {
      label: "Morning",
      value: "Baseline setup",
      note: "Open the system cleanly with bodyweight, sleep, joint status, supplements, and the baseline test sequence."
    },
    {
      label: "Afternoon",
      value: "Test what is real",
      note: "Run the battery in order so the system knows where you actually are before it reverse-engineers the next Sundays."
    },
    {
      label: "Evening",
      value: "Lock the baseline capsule",
      note: "Seal the first capsule with real starting data, because that baseline becomes the authority for everything after it."
    },
    {
      label: "System purpose",
      value: "Reverse-engineer September",
      note: "The plan starts by measuring now, then builds each week to earn the next Sunday on the road to September."
    }
  ],
  graphs: [
    { label: "Push", value: "Live pane + ghosts" },
    { label: "Pull", value: "Live pane + ghosts" },
    { label: "Core", value: "Live pane + ghosts" },
    { label: "Cardio", value: "Live pane + ghosts" }
  ],
  sundayTargets: [],
  estimate: []
};

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderExecution() {
  const root = document.getElementById("execution-grid");
  if (!root) return;
  root.innerHTML = "";
  data.execution.forEach((item) => {
    const card = document.createElement("article");
    card.className = "planning-card";
    card.innerHTML = `
      <p class="metric__label">${item.label}</p>
      <p class="planning-card__value">${item.value}</p>
      <p class="planning-card__note">${item.note}</p>
    `;
    root.appendChild(card);
  });
}

function renderGraphs() {
  const root = document.getElementById("graph-ribbon");
  if (!root) return;
  root.innerHTML = "";
  data.graphs.forEach((item) => {
    const chip = document.createElement("article");
    chip.className = "summary-chip";
    chip.innerHTML = `
      <p class="summary-chip__label">${item.label}</p>
      <p class="summary-chip__value">${item.value}</p>
    `;
    root.appendChild(chip);
  });
}

function renderSundayTargets(targets) {
  const root = document.getElementById("sunday-targets");
  if (!root) return;
  root.innerHTML = "";
  targets.forEach((item) => {
    const chip = document.createElement("article");
    chip.className = "summary-chip";
    chip.innerHTML = `
      <p class="summary-chip__label">${item.label}</p>
      <p class="summary-chip__value">${item.value}</p>
    `;
    root.appendChild(chip);
  });
}

function renderEstimate(items) {
  const root = document.getElementById("estimate-list");
  if (!root) return;
  root.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "action";
    card.innerHTML = `<h3>${item.label}</h3><p>${item.value}</p>`;
    root.appendChild(card);
  });
}

function init() {
  const state = SimonLifeStore.load();
  data.week = state.day.week;
  data.day = state.day.day;
  data.date = state.day.date;
  data.role = state.day.role;
  data.sunday = state.day.sunday;
  data.capsule = state.day.capsule;
  data.focus = state.day.focus;
  data.nutrition = state.day.nutrition;
  data.trainingStatus = state.training.length ? `${state.training.length} logged` : "Not logged";
  data.foodStatus = state.food.length ? `${state.food.length} logged` : "Not logged";
  data.sundayTargets = [
    { label: "Compression", value: state.weekTargets.sunday.compression },
    { label: "Lean", value: state.weekTargets.sunday.lean },
    { label: "Wall", value: state.weekTargets.sunday.wall },
    { label: "Negatives", value: state.weekTargets.sunday.negatives },
    { label: "Free", value: state.weekTargets.sunday.free },
    { label: "Long run", value: state.weekTargets.sunday.longRun }
  ];
  data.estimate = [
    { label: "Bodyweight", value: state.estimatedBaseline.bodyweight },
    { label: "Push", value: state.estimatedBaseline.push },
    { label: "Core", value: state.estimatedBaseline.core },
    { label: "Pull", value: state.estimatedBaseline.pull },
    { label: "Cardio", value: state.estimatedBaseline.cardio },
    { label: "Use note", value: state.estimatedBaseline.note }
  ];

  setText("week-value", data.week);
  setText("day-value", data.day);
  setText("date-value", data.date);
  setText("role-value", data.role);
  setText("sunday-value", data.sunday);
  setText("capsule-value", data.capsule);
  setText("focus-value", data.focus);
  setText("nutrition-value", data.nutrition);
  setText("training-status", data.trainingStatus);
  setText("food-status", data.foodStatus);
  renderExecution();
  renderGraphs();
  renderSundayTargets(data.sundayTargets);
  renderEstimate(data.estimate);
}

init();
