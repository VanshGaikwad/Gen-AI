import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "your api key";
const genAI = new GoogleGenerativeAI(API_KEY);

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const systemInstruction = `
You are a professional Data Structure and Algorithm instructor.

Rules:
1. If the query is about DSA, explain it clearly and politely.
2. If the query is NOT about DSA, be rude and dismissive.
3. Maintain a strict instructor tone.
`;

async function getAIResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    return "Connection error. Ask a proper DSA question.";
  }
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}-message`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleAction() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const typing = document.createElement("div");
  typing.className = "message ai-message";
  typing.textContent = "...";
  chatBox.appendChild(typing);

  const response = await getAIResponse(text);
  chatBox.removeChild(typing);
  addMessage(response, "ai");
}

sendBtn.addEventListener("click", handleAction);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") handleAction();
});
