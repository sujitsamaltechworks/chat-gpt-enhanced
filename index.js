const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-k1tUi3ny0820KooUPwRb55Gu",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log(response.data.choices[0]);
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({ models: response.data.data });
});

app.listen(port, () => {
  console.log(`This is running on port:${port}`);
});
