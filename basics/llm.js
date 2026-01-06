import { GoogleGenAI } from "@google/genai";


import readlineSync from "readline-sync"
 
const ai = new GoogleGenAI({apiKey:"your api key"});
const history = []
async function chatting(userProblem) {
    history.push({
        role:'user',
        parts:[{text:userProblem}]
    });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
//    for learning about context
    // contents: [
    //     // context
    //     {
    //         role:'user',
    //         parts:[{text:"Hi im vansh"}]
    //     },
    //     {
    //         role:'model',
    //         parts:[{text:"Hi Vansh! Nice to meet you.How can I help you today?"}]
    //     },
    //     {
    //         role:'user',
    //         parts:[{text:"What is my name"}]
    //     }
    // ]
    contents: history,
  });

    history.push({
        role:'model',
        parts:[{text:response.text}]
    })
  console.log(response.text);
}


async function main(){
    const userProblem = readlineSync.question("Ask me anything->");
   await chatting(userProblem);
    main();

}

await main();