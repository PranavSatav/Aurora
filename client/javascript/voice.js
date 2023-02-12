
        const inputBox = document.getElementById("myInput");
        const toggleBtn = document.getElementById("toggleBtn");
        
        let recognition;
        let isRecognitionActive = false;
        
        toggleBtn.addEventListener("click", function() {
          if (!isRecognitionActive) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
        
            recognition.onresult = function(event) {
              let interimTranscript = '';
        
              for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
                let transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                  inputBox.value += transcript;
                } else {
                  interimTranscript += transcript;
                }
              }
            };
        
            recognition.start();
        
            isRecognitionActive = true;
          } else {
            recognition.stop();
        
            isRecognitionActive = false;
          }
        });
        
      