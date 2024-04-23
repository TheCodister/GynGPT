import { createContext, useState, useEffect } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [recentResult, setRecentResult] = useState([]);

  const delayPara = (index, nextword) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextword);
    }, index * 50);
  };

  const newChat = async () => {
    setLoading(false);
    setShowRes(false);
  };
  const onSent = async (message) => {
    setResultData("");
    setLoading(true);
    setShowRes(true);
    let res;
    if (message !== undefined) {
      setPrevPrompt((prev) => [...prev, message]);
      setRecentPrompt(message);
      res = await runChat(message);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      res = await runChat(input);
    }
    // let resArray = res.split("**");
    // let newRes = "";
    // for (let i = 0; i < resArray.length; i++) {
    //   if (i === 0 || i % 2 !== 1) {
    //     newRes += resArray[i];
    //   } else {
    //     newRes += "<b>" + resArray[i] + "</b>";
    //   }
    // }
    // let newRes2 = newRes.split("*").join("</br>");
    let formattedResponse = formatResponse(res);
    let newResArray = formattedResponse.split(" ");
    for (let i = 0; i < newResArray.length; i++) {
      const nextWord = newResArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setRecentResult((prev) => [...prev, formattedResponse]);
  };
  const formatResponse = (response) => {
    // Replace ** with bold tags and * with line breaks
    let newRes = response
      .split("**")
      .map((part, index) =>
        index % 2 === 1 ? `<br/><b>${part}</b><br/>` : part
      )
      .join("")
      .replace(/\*{1}/g, "</br>");

    // Automatically detect and format code blocks wrapped in triple backticks
    newRes = newRes.replace(/```(.*?)```/gs, (match, code) => {
      const escapedCode = escapeHTML(code);
      return `<pre><code>${escapedCode}</code></pre>`;
    });
    newRes = newRes.replace(
      /\[([^\]]+)\]\((http[^\)]+)\)/g,
      '<a href="$2" target="_blank">$1 ($2)</a>'
    );
    // Format the list items into sections and lists
    return newRes;
  };

  // Function to escape HTML special characters to prevent XSS and ensure correct display
  const escapeHTML = (str) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showRes,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    recentResult,
    setRecentResult,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
