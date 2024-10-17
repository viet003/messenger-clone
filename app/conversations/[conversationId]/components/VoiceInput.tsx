import { useEffect } from "react";
import useSpeechRecognition from "../../../hooks/useSpeachRecogition";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";


const VoiceInput = (props: any) => {
    const {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport,
    } = useSpeechRecognition();

    useEffect(() => {
        console.log(text);     
    }, [text])

    return (
        <div>
            {hasRecognitionSupport ? (
                <button 
                onClick={isListening ? stopListening : startListening} 
                className="text-sky-500 text-[30px] cursor-pointer"
              >
                {isListening ? <CiMicrophoneOff /> : <CiMicrophoneOn />}
              </button>
            ) : (
                <h1>
                    Ngu
                </h1>
            )}
        </div>
    );
}

export default VoiceInput

