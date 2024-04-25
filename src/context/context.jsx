import { createContext, useState, useEffect } from "react";
import runChat from "../config/gemini";
import runSearch from "../config/dwarves";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [recentResult, setRecentResult] = useState([]);
  const [start, setStart] = useState(false);
  const [taskbar, setTaskbar] = useState(false);
  const [navbackground, setNavBackground] = useState("#e33d5e");
  const [background, setBackground] = useState("#fff");
  const [textcolor, setTextColor] = useState("#e33d5e");
  const [navTextColor, setNavTextColor] = useState("#eeeeee");
  const [bot, setBot] = useState(2); //0 is Gemini, 1 is GPT-3.5
  const [message, setMessage] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [stopGenerate, setStopGenerate] = useState(false);

  const handleStart = () => {
    setStart(true);
    setTaskbar(true);
  };

  const handleBackground = (color1, color2, color3, color4) => {
    setBackground(color2);
    setNavBackground(color1);
    setTextColor(color3);
    setNavTextColor(color4);
  };

  const delayPara = (index, nextword, length) => {
    if (!stopGenerate) {
      setStopGenerate(true);
      setTimeout(() => {
        setResultData((prev) => prev + nextword);
        if (index === length - 1) {
          // Last word, setTimeout is done, set stopGenerate to false
          setStopGenerate(false);
        }
      }, index * 25);
    } else {
      setResultData((prev) => prev + nextword);
      console.log("stopGenerate is true");
      clearTimeout();
    }
  };

  const newChat = async () => {
    setLoading(false);
    setShowRes(false);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { input: recentPrompt, output: resultData },
    ]);
    setPrevPrompt([]);
  };

  const getMessage = async (message) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: message === undefined ? input : message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setResultData("");
      setLoading(true);
      setShowRes(true);
      if (message !== undefined) {
        setPrevPrompt((prev) => [...prev, message]);
        setRecentPrompt(message);
      } else {
        if (input === undefined || input === null || input === "")
          setInput("Please tell me to resend the message");
        else {
          setPrevPrompt((prev) => [...prev, input]);
          setRecentPrompt(input);
        }
      }

      const response = await fetch(
        "https://gptclone-backend.onrender.com/completions",
        options
      );
      const data = await response.json();
      let res = data.choices[0].message.content;
      let formattedResponse = formatResponse(res);
      let newResArray = formattedResponse.split(" ");
      for (let i = 0; i < newResArray.length; i++) {
        const nextWord = newResArray[i];
        delayPara(i, nextWord + " ", newResArray.length);
      }
      setLoading(false);
      setRecentResult((prev) => [...prev, formattedResponse]);
    } catch (e) {
      console.log(e);
    }
  };

  const onSentDwarves = async (message) => {
    setResultData("");
    setLoading(true);
    setShowRes(true);
    let res;
    if (message !== undefined) {
      res = message;
      setPrevPrompt((prev) => [...prev, message]);
      setRecentPrompt(message);
      res = await runSearch(message);
    } else {
      if (input === undefined || input === null || input === "")
        res = "Please tell me to resend the message";
      else res = input;
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      res = await runSearch(input);
    }
    let formattedResponse = formatResponse(res);
    let newResArray = formattedResponse.split(" ");
    for (let i = 0; i < newResArray.length; i++) {
      const nextWord = newResArray[i];
      delayPara(i, nextWord + " ", newResArray.length);
    }
    setLoading(false);
    setRecentResult((prev) => [...prev, formattedResponse]);
  };

  const onSentGemini = async (message) => {
    setResultData("");
    setLoading(true);
    setShowRes(true);
    let res;
    if (message !== undefined) {
      res = message;
      setPrevPrompt((prev) => [...prev, message]);
      setRecentPrompt(message);
      res = await runChat(message);
    } else {
      if (input === undefined || input === null || input === "")
        res = "Please tell me to resend the message";
      else res = input;
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      res = await runChat(input);
    }
    let formattedResponse = formatResponse(res);
    let newResArray = formattedResponse.split(" ");
    for (let i = 0; i < newResArray.length; i++) {
      const nextWord = newResArray[i];
      delayPara(i, nextWord + " ", newResArray.length);
    }
    setLoading(false);
    setRecentResult((prev) => [...prev, formattedResponse]);
  };

  const formatResponse = (response) => {
    // Replace ** with bold tags and * with line breaks
    let newRes = response
      .split("**")
      .map((part, index) => (index % 2 === 1 ? `<b>- ${part}</b>` : part))
      .join("")
      .replace(/\*{1}/g, "</br>");

    // Automatically detect and format code blocks wrapped in triple backticks
    newRes = newRes.replace(/```(.*?)```/gs, (match, code) => {
      const escapedCode = escapeHTML(code);
      return `<pre><code>${escapedCode}</code></pre>`;
    });
    // Automatically detect and format hyperlinks
    newRes = newRes.replace(
      /\[([^\]]+)\]\((https[^\)]+)\)/g,
      '<a href="$2" target="_blank">$1 ($2)</a>'
    );
    //Automatically make a table if the response is in table format
    if (/^\|.*\|$/m.test(newRes)) {
      let rows = newRes
        .split("\n")
        .map((line) => {
          if (/^\|.*\|$/m.test(line)) {
            return line
              .trim()
              .replace(/^\||\|$/g, "") // Remove the leading and trailing pipes
              .split("|")
              .map((cell) => cell.trim());
          }
          return null;
        })
        .filter((row) => row !== null);

      if (rows.length > 2) {
        // Assumes there's at least a header, the dashes for alignment, and one data row
        let tableHTML = `<table>`;
        tableHTML += `<tr>${rows[0]
          .map((header) => `<th>${escapeHTML(header)}</th>`)
          .join("")}</tr>`; // Headers
        rows.slice(2).forEach((row) => {
          // Skip the dashes row (index 1)
          tableHTML += `<tr>${row
            .map((cell) => `<td>${escapeHTML(cell)}</td>`)
            .join("")}</tr>`;
        });
        tableHTML += `</table>`;
        newRes = tableHTML;
      }
    }
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
    onSentGemini,
    onSentDwarves,
    setRecentPrompt,
    recentPrompt,
    showRes,
    setShowRes,
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
    newChat,
    recentResult,
    setRecentResult,
    start,
    setStart,
    taskbar,
    setTaskbar,
    navbackground,
    setNavBackground,
    background,
    setBackground,
    textcolor,
    setTextColor,
    navTextColor,
    setNavTextColor,
    stopGenerate,
    setStopGenerate,
    delayPara,
    message,
    setMessage,
    bot,
    setBot,
    formatResponse,
    escapeHTML,
    getMessage,
    handleBackground,
    handleStart,
    chatHistory,
    setChatHistory,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
