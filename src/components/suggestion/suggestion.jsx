import { useContext } from "react";
import { Context } from "../../context/context";

const suggestion = () => {
  const { setInput, input } = useContext(Context);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[5vw] font-extrabold">
        Hi User
        <br />
        How can I help you today?
      </h1>
      <div className="flex flex-row gap-5 mt-[5vh] text-[1em] text-center">
        <div className="w-[12em] h-[12em] flex items-center justify-center p-1 cursor-pointer border-solid border-[#00ff22] border-[2px] rounded-lg">
          <p>What is ReactJS</p>
        </div>
        <div className="w-[12em] h-[12em] flex items-center justify-center p-1 cursor-pointer border-solid border-[#00ff22] border-[2px] rounded-lg">
          <p>Can you list some of the option for me to cook?</p>
        </div>
        <div className="w-[12em] h-[12em] flex items-center justify-center p-1 cursor-pointer border-solid border-[#00ff22] border-[2px] rounded-lg">
          <p>Where to travel in Sounthest Asia?</p>
        </div>
        <div className="w-[12em] h-[12em] flex items-center justify-center p-1 cursor-pointer border-solid border-[#00ff22] border-[2px] rounded-lg">
          <p>What is Relational Database</p>
        </div>
      </div>
    </div>
  );
};

export default suggestion;
