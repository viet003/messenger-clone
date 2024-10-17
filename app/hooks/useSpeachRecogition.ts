import { useEffect, useState } from "react";

let recognition: any = null;

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(false);

  useEffect(() => {
    // Ensure window is defined (client-side only)
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "vi-VN";
      setHasRecognitionSupport(true);
    }

    if (!recognition) {
        console.log("Khong ho tro");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log("onresult event: ", event);
      setText(event.results[0][0].transcript);
      recognition.stop();
      setIsListening(false);
    };

    return () => {
      // Cleanup when component unmounts or dependencies change
      if (recognition) {
        recognition.onresult = null;
      }
    };
  }, []);

  const startListening = () => {
    if (recognition) {
      setText("");
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  return { text, isListening, startListening, stopListening, hasRecognitionSupport };
};

export default useSpeechRecognition;
