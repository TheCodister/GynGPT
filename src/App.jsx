import { Navbar, ChatPart, StartMessage } from "./components";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [start, setStart] = useState(false);
  const [taskbar, setTaskbar] = useState(true);
  const handleStart = () => {
    setStart(true);
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
    <div className="flex flex-row w-screen h-screen">
      {taskbar ? <Navbar /> : null}
      <div className="flex justify-center w-full">
        <h1
          onClick={() => setTaskbar(!taskbar)}
          className="absolute left-2 cursor-pointer text-3xl"
        >
          ⟺
        </h1>
        {start ? (
          <ChatPart getMessage={getMessage} />
        ) : (
          <StartMessage handleStart={handleStart} />
        )}
      </div>
    </div>
  );
}

export default App;
