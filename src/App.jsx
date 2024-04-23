import { Navbar, ChatPart, StartMessage } from "./components";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [start, setStart] = useState(false);
  const [taskbar, setTaskbar] = useState(false);
  const [navbackground, setNavBackground] = useState("rgb(5 46 22)");
  const [background, setBackground] = useState("#3c4b33");
  const [textcolor, setTextColor] = useState("#00ff22");
  const handleStart = () => {
    setStart(true);
    setTaskbar(true);
  };
  const handleBackground = (color1, color2, color3) => {
    setBackground(color2);
    setNavBackground(color1);
    setTextColor(color3);
  };
  const getMessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ message: "Hello how are you" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/completions",
        options
      );
      const data = await response;
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
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
      <div className="flex justify-center w-full">
        {start ? (
          <h1
            onClick={() => setTaskbar(!taskbar)}
            className="absolute left-2 cursor-pointer text-3xl text-[#00ff22]"
          >
            ⟺
          </h1>
        ) : null}
        <ButtonGroup
          className="absolute top-2 right-2"
          variant="contained"
          aria-label="Basic button group"
          color="success"
        >
          <Button
            onClick={() => handleBackground("#0f0f0f", "#2b2b2b", "#00ff22")}
          >
            ⚫
          </Button>
          <Button
            onClick={() =>
              handleBackground("rgb(5 46 22)", "#3c4b33", "#00ff22")
            }
          >
            🟢
          </Button>
          <Button
            onClick={() => handleBackground("#0f0f0f", "#eeeeee", "#000000")}
          >
            ⚪️
          </Button>
        </ButtonGroup>
        {start ? (
          <ChatPart color={textcolor} getMessage={getMessage} />
        ) : (
          <StartMessage handleStart={handleStart} />
        )}
      </div>
    </div>
  );
}

export default App;
