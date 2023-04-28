import React, { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { ColorRing } from "react-loader-spinner";
import "./App.css";
import { Select } from "./components/Select";

type Model = "turbo" | "davinci";

const options = [
  {
    label: "text-davinci-003",
    value: "davinci",
  },
  {
    label: "gpt-3.5-turbo",
    value: "turbo",
  },
];

export default function App() {
  const [model, setModel] = useState<Model>("turbo");
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
      body: JSON.stringify({ message, prompt, model }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <Label.Root className="LabelRoot" htmlFor="model">
            Model:{" "}
          </Label.Root>
          <Select
            value={model}
            options={options}
            onChange={(val) => setModel(val as Model)}
          />
        </div>
        <div className="row">
          <Label.Root className="LabelRoot" htmlFor="propmpt">
            Prompt:
          </Label.Root>
          <textarea
            id="prompt"
            cols={50}
            rows={10}
            value={prompt}
            onChange={({ target: { value } }) => setPrompt(value)}
            placeholder="place your prompt here"
          ></textarea>
        </div>
        <div className="row">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            cols={50}
            rows={10}
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            placeholder="place your the text to translate here"
          ></textarea>
        </div>
        <button className="Button" type="submit" disabled={loading}>
          {loading ? (
            <ColorRing
              visible
              height={30}
              width={30}
              ariaLabel="blocks-loading"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            "Translate"
          )}
        </button>
      </form>

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
