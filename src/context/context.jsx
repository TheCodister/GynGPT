import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPromt, setPrevPrompt] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextword) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextword);
    }, index * 75);
  };

  const onSent = async (message) => {
    setResultData("");
    setLoading(true);
    setShowRes(true);
    setRecentPrompt(input);
    const res = await runChat(input);
    let resArray = res.split("**");
    let newRes;
    for (let i = 0; i < resArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newRes += resArray[i];
      } else {
        newRes += "<b>" + resArray[i] + "</b>";
      }
    }
    let newRes2 = newRes.split("*").join("</br>");
    let newResArray = newRes2.split(" ");
    for (let i = 0; i < newResArray.length; i++) {
      const nextWord = newResArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPromt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showRes,
    loading,
    resultData,
    input,
    setInput,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
