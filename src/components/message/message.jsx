import BeatLoader from "react-spinners/BeatLoader";
import { useContext, useState } from "react";
import { Context } from "../../context/context";
const messages = (props) => {
  const propmt = props.text;
  const res = props.result;
  const load = props.loading;
  const color = props.color;
  const { background, textcolor } = useContext(Context);
  // const handleName = () => {
  //   if (bot === 0) {
  //     return " (Gemini-1.0)";
  //   } else {
  //     return " (GPT-3.5)";
  //   }
  // };
  return (
    <div className="w-[50vw]">
      <div className="flex flex-col items-start mb-10">
        <div className="flex flex-row items-center gap-2">
          <img
            src="/image/Userlogo.png"
            className="w-9 h-9 bg-green-950 rounded-full border-white border-[1px]"
          />
          <h1 className="font-semibold">User</h1>
        </div>
        <div className="ml-11">
          <p>{propmt}</p>
        </div>
      </div>
      <div className="flex flex-col items-start mb-10">
        <div className="flex flex-row items-center gap-2">
          <img
            src="/image/Logo1.png"
            className="w-9 h-9 bg-green-950 rounded-full p-1 border-white border-[1px]"
          />
          <h1 className="font-semibold">GynGPT</h1>
        </div>
        {load ? (
          <BeatLoader className="ml-11" color={color} />
        ) : (
          <div className="ml-11">
            <pre
              style={{
                backgroundColor: `${background}`,
                fontFamily: `'Montserrat', sans-serif`,
                color: `${textcolor}`,
                padding: "0px",
              }}
              dangerouslySetInnerHTML={{ __html: res }}
            ></pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default messages;
