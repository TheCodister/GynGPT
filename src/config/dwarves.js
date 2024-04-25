import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import dataset from "../Dataset/dataset";

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyDgRQus14xtlZ2l3kUf0IJxMYWO1oyKg2w";

async function runData() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
    // console.log(dataset);
    // const chat = model.startChat({
    //   history: [
    //     {
    //       role: "user",
    //       parts: dataset,
    //     },
    //   ],
    //   generationConfig,
    //   safetySettings,
    // });
    // const result = await chat.sendMessage(propmt);
    // const response = result.response;
    // console.log(response.text());
    // return response.text();
    const result = model.startChat({
      history: [
        {
          role: "user",
          parts: dataset,
        },
      ],
      generationConfig,
      safetySettings,
    });
    return result;
  } catch (error) {
    console.error(error);
    return "Sorry, I am not able to respond to that.";
  }
}

const model1 = await runData();

async function runSearch(propmt) {
  const result = await model1.sendMessage(propmt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}
export default runSearch;
