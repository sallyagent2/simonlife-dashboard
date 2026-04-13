const SimonLifeStore = (() => {
  const KEY = "simonlife-mobile-state-v1";

  const defaults = {
    day: {
      week: "Week 1",
      day: "Day 1",
      date: "Baseline day next week",
      role: "Baseline test day",
      sunday: "Establish rung one",
      capsule: "Not started",
      focus: "Measure true starting point",
      nutrition: "Log actual intake"
    },
    weekTargets: {
      sunday: {
        compression: "8s",
        lean: "25s",
        wall: "35s",
        negatives: "0",
        free: "0",
        longRun: "45m"
      },
      monday: {
        morning: [
          "Bike or elliptical 25 min Zone 2 nasal",
          "Compression 5 x 6s upright",
          "Lean 5 x 15s",
          "Wall hold 5 x 10s at about 10 in chest distance"
        ],
        midday: [
          "Pike push-ups 5 x 6 with 1-2 reps in reserve",
          "Lat pulldown 4 x 8 heavy-quality with no elbow irritation"
        ],
        evening: [
          "Easy run 30 min with nasal breathing as much as possible",
          "Optional 75 lb DB floor press 5 x 5 if not fatigued"
        ]
      }
    },
    baseline: {
      compression: "",
      lean: "",
      pikePushUps: "",
      ohp: "",
      wallHold: "",
      negatives: "",
      freestanding: "",
      runTolerance: ""
    },
    estimatedBaseline: {
      source: "Recent capsules W6-W8",
      bodyweight: "191 lb",
      push: "Planchette push-ups: 16 strict, plus dense repeat volume",
      core: "Planchette plank: 2:14 strict; weighted sit-ups: 67-108 reps @ 27 lb",
      pull: "Lat pulldown / row work preserved at high density",
      cardio: "First structured treadmill exposure active; 3 km baseline staged",
      note: "This is a guesstimate start point, not the official baseline test."
    },
    food: [],
    training: [],
    notes: [],
    bodyweight: "",
    sleepHours: "",
    sleepQuality: "",
    joints: "",
    supplements: "",
    capsuleClosed: false
  };

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(defaults);
      const parsed = JSON.parse(raw);
      return {
        ...clone(defaults),
        ...parsed,
        day: { ...clone(defaults).day, ...(parsed.day || {}) },
        weekTargets: {
          ...clone(defaults).weekTargets,
          ...(parsed.weekTargets || {}),
          sunday: {
            ...clone(defaults).weekTargets.sunday,
            ...((parsed.weekTargets || {}).sunday || {})
          },
          monday: {
            ...clone(defaults).weekTargets.monday,
            ...((parsed.weekTargets || {}).monday || {})
          }
        },
        baseline: { ...clone(defaults).baseline, ...(parsed.baseline || {}) }
      };
    } catch {
      return clone(defaults);
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function update(mutator) {
    const state = load();
    mutator(state);
    save(state);
    return state;
  }

  return { load, save, update, defaults: clone(defaults) };
})();
