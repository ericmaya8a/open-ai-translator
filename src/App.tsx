import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, prompt }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            cols={50}
            rows={10}
            value={prompt}
            onChange={({ target: { value } }) => setPrompt(value)}
            placeholder="place your prompt here"
          ></textarea>
        </div>
        <div>
          <textarea
            cols={50}
            rows={10}
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            placeholder="place your the text to translate here"
          ></textarea>
        </div>
        <br />
        <button type="submit" disabled={loading}>
          Translate
        </button>
      </form>

      {loading && <p>loading...</p>}

      <div className="response">
        {response.length > 0 && !loading && (
          <ul>
            {response.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
