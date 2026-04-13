const SimonLifeVoice = (() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function supported() {
    return Boolean(SpeechRecognition);
  }

  function attach(buttonId, targetId, options = {}) {
    const button = document.getElementById(buttonId);
    const target = document.getElementById(targetId);
    if (!button || !target) return;

    if (!supported()) {
      button.disabled = true;
      button.textContent = "Voice unavailable";
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = options.lang || "en-CA";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      button.textContent = "Listening...";
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      if (!transcript) return;
      if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") {
        target.value = options.append && target.value
          ? `${target.value} ${transcript}`.trim()
          : transcript;
      }
      if (typeof options.onResult === "function") {
        options.onResult(transcript, target);
      }
    };

    recognition.onerror = () => {
      button.textContent = "Try voice again";
    };

    recognition.onend = () => {
      button.textContent = options.buttonLabel || "Tap to talk";
    };

    button.addEventListener("click", () => recognition.start());
  }

  return { attach, supported };
})();
