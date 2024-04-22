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

  // useEffect(() => {
  //   if (resultData !== "") {
  //     setRecentResult((prev) => [...prev, resultData]);
  //   }
  // }, [resultData]);
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
      res = await runChat(message);
      setRecentPrompt(message);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      res = await runChat(input);
    }
    let resArray = res.split("**");
    let newRes = "";
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
    setRecentResult((prev) => [...prev, newRes2]);
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
