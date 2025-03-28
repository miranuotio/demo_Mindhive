//Mindhive AI-assistant Mira Nuotio

import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

function App() {
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [sentiment, setSentiment] = useState("");

  const handleAnalyze = async () => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please provide two separate lines:\n1) A one-sentence summary of the message.\n2) The emotional tone (Positive, Neutral, or Negative).\nMessage:\n${message}`,
          },
        ],
      });

      console.log("OpenAI raw response:", response);

      const fullResponse = response.choices[0].message.content;
      const [summaryText, sentimentText] = fullResponse.split("\n");

      setSummary(summaryText);
      setSentiment(sentimentText.trim()); // <- siistitty
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      setSummary("Sorry, something went wrong.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "#EDE7F6",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        {/* Title and logo */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "1.5rem"
        }}>
          <h1 style={{
            fontSize: "2rem",
            color: "#6441A5",
            margin: 1,
            marginLeft: 65
          }}>
            AI Assistant for
          </h1>
          <img
            src="/logo_mindhive.jpg"
            alt="Mindhive logo"
            style={{ height: "40px", marginRight: "10rem" }}
          />
        </div>

        {/* Text input */}
        <textarea
          rows="4"
          style={{
            width: "100%",
            maxWidth: "500px",
            display: "block",
            margin: "0 auto",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            textAlign: "center"
          }}
          placeholder="Write your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <br />

        {/* Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleAnalyze}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#6441A5",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            What’s this about?
          </button>
        </div>

        {/* Results */}
        {summary && (
          <div style={{
            marginTop: "2rem",
            background: "#F3E5F5",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <h3>Summary:</h3>
            <p>{summary.replace(/^1\)\s*/, "")}</p>
          </div>
        )}

        {sentiment && (
          <div style={{
            marginTop: "1rem",
            background:
              sentiment.toLowerCase().includes("positive") ? "#E8F5E9" :
              sentiment.toLowerCase().includes("negative") ? "#FCE4EC" :
              "#E3F2FD",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <h3>Detected Emotion:</h3>
            <p>{sentiment.replace(/^2\)\s*/, "")}</p>
          </div>
        )}
      </div>

      <footer style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem", color: "#888" }}>
        Created with ❤️ by Mira Nuotio
      </footer>
    </div>
  );
}

export default App;
