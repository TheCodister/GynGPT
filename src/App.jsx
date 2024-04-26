import {
  Navbar,
  ChatPart,
  StartMessage,
  ThemeButton,
  ChooseModel,
} from "./components";
import { useContext } from "react";
import { Context } from "./context/context";
import { runData } from "./config/dwarves";
function App() {
  const { start, taskbar, setTaskbar, navbackground, background, textcolor } =
    useContext(Context);
  const startTrain = async () => {
    const model1 = await runData();
  };
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
        {start ? <ChatPart /> : <StartMessage onClick={startTrain()} />}
      </div>
    </div>
  );
}

export default App;
