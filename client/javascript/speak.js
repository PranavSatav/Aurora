
const message = document.getElementById("message1");
const speakBtn = document.getElementById("speakBtn");

speakBtn.addEventListener("click", function() {
  const text = message.innerText;

  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
});

