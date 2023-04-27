/* eslint-disable no-undef */
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: process.env.CGPT_ID,
  apiKey: process.env.CGPT_KEY,
});
const openai = new OpenAIApi(configuration);
// const prompt = `You are an expert translator, turning whatever text you are given to english. All technical details should be maintained exactly but otherwise your most important task is to clearly convey the intent behind the message.  You are allowed to restructure the text so that the intent is more clear. You response should include the translation, a confidence rating in that translation on a scale of 1 (the translation is very likely wrong) to 10 (every part of this translation is accurate), and an explanation for why you chose that confidence rating, including specific examples from the source text with your translation in parentheses where there may be ambiguities and explanations as to why you chose what you did. You should only include the translated text once. Your response should take the following form:

// -----
// Detected Language: [detected language]

// Translation: [translated text]

// Confidence: n/10

// Explanation: [explanation for your confidence level]

// ------

// Translate the following text:`;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message, prompt, model } = req.body;

  if (model === "turbo") {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: `${prompt} ${message}` }],
    });

    if (response.data.choices[0].message?.content) {
      return res.json({
        message: response.data.choices[0].message.content
          .split("\n")
          .filter((item) => item.length),
      });
    }
  } else {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt} ${message}`,
      max_tokens: 1000,
      temperature: 0,
    });
    if (response.data.choices[0].text) {
      return res.json({
        message: response.data.choices[0].text
          .split("\n")
          .filter((item) => item.length),
      });
    }
  }

  res.json({
    message: ["Something went wrong!"],
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
