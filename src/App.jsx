import {
  Navbar,
  ChatPart,
  StartMessage,
  ThemeButton,
  ChooseModel,
} from "./components";
import axios from "axios";
import { useContext } from "react";
import { Context } from "./context/context";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function App() {
  const {
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
    setNavTextColor,
    message,
    setMessage,
    input,
    bot,
    setBot,
    setLoading,
    setShowRes,
    delayPara,
    setResultData,
    setPrevPrompt,
    setRecentPrompt,
    setRecentResult,
    formatResponse,
    getMessage,
    handleBackground,
    handleStart,
  } = useContext(Context);
  // const getMessage = async () => {
  //   const options = {
  //     method: "POST",
  //     body: JSON.stringify({ message: input }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/completions",
  //       options
  //     );
  //     const data = await response.json();
  //     let res = data.choices[0].message.content;
  //     console.log(res);
  //     setResultData("");
  //     setLoading(true);
  //     setShowRes(true);
  //     setPrevPrompt((prev) => [...prev, input]);
  //     setRecentPrompt(input);
  //     let formattedResponse = formatResponse(res);
  //     let newResArray = formattedResponse.split(" ");
  //     for (let i = 0; i < newResArray.length; i++) {
  //       const nextWord = newResArray[i];
  //       delayPara(i, nextWord + " ");
  //     }
  //     setRecentResult((prev) => [...prev, res]);
  //     setLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const { data, isLoading, isError } = useQuery({
  //   queryFn: async () => {
  //     const { data } = await axios.get("http://localhost:5000/api/v1/messages");
  //     return data;
  //   },
  // });
  return (
    <div
      className="flex flex-row w-screen h-screen"
      style={{ backgroundColor: `${background}`, color: `${textcolor}` }}
    >
      {taskbar ? <Navbar background={navbackground} /> : null}
      <div
        className="content-center self-center h-[7vh] p-1 cursor-pointer text-3xl"
        style={{ backgroundColor: `${background}` }}
        onClick={() => setTaskbar(!taskbar)}
      >
        {start ? taskbar ? <h1>〈</h1> : <h1>〉</h1> : null}
      </div>
      <div className="flex justify-center w-full">
        <ThemeButton />
        {start ? <ChooseModel /> : null}
        {start ? <ChatPart /> : <StartMessage />}
      </div>
    </div>
  );
}

export default App;
