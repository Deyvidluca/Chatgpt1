import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Servidor GPT online ✅");
});

app.get("/gpt", async (req, res) => {
  const msg = req.query.msg;

  if (!msg) {
    return res.send("Nenhuma pergunta recebida.");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: msg }]
    });

    res.send(response.choices[0].message.content);
  } catch (error) {
    res.send("Erro ao acessar o ChatGPT.");
  }
});

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
