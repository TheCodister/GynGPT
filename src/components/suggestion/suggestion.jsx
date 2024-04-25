import { useContext } from "react";
import { Context } from "../../context/context";

const suggestion = (props) => {
  const { setRecentPrompt, setInput, onSent, bot, getMessage } =
    useContext(Context);
  const color = props.color;
  const handleClick = (suggestion) => {
    setRecentPrompt(suggestion);
    if (bot === 1) {
      getMessage(suggestion);
    } else onSent(suggestion);
    setInput("");
  };
  const suggestions = [
    "How are you hiring in Dwarves Foundation?",
    "Tell me a preview about dwarves foundation handbook?",
    "What is React?",
    "What is Relational Database",
  ];
  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-[5vw] font-extrabold">
        Hi User
        <br />
        How can I help you today?
      </h1>
      <div className="flex flex-row gap-5 mt-[3vh] text-[1em] text-center">
        {suggestions.map((suggestion, index) => {
          return (
            <div
              className="w-[12em] h-[10em] flex items-center justify-center p-1 cursor-pointer border-solid border-[#00ff22] border-[2px] rounded-lg hover:bg-stone-500"
              style={{ borderColor: `${color}` }}
              key={index}
              onClick={handleClick.bind(this, suggestion)}
            >
              <p>{suggestion}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default suggestion;
