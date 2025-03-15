import React, { useState } from "react";
import axios from "axios";
import './App.css';

const API_KEY = "YOUR_GOOGLE_TRANSLATE_API_KEY"; 

const TranslationApp = () => {
    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [sourceLang, setSourceLang] = useState("en");
    const [targetLang, setTargetLang] = useState("es");

    const handleTranslate = async () => {
        if (!sourceText) {
            alert("Please enter text to translate");
            return;
        }

        try {
            const response = await axios.post(
                `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
                {
                    q: sourceText,
                    source: sourceLang,
                    target: targetLang,
                    format: "text",
                }
            );
            
            setTranslatedText(response.data.data.translations[0].translatedText);
        } catch (error) {
            console.error("Translation error:", error);
            alert("Failed to translate text.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
            <h1>Text Translation Tool</h1>
            <textarea 
                rows="4" 
                cols="50" 
                placeholder="Enter text to translate..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
            ></textarea>
            <br />
            <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
            </select>
            <span> ➡️ </span>
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                <option value="es">Spanish</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
            </select>
            <br /><br />
            <button onClick={handleTranslate}>Translate</button>
            <h2>Translation:</h2>
            <p>{translatedText}</p>
        </div>
    );
};

export default TranslationApp;
