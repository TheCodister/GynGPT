import { useContext } from "react";
import { Context } from "../../context/context";

const suggestion = (props) => {
  const {
    setRecentPrompt,
    setInput,
    onSentGemini,
    bot,
    getMessage,
    onSentDwarves,
  } = useContext(Context);
  const color = props.color;
  const handleClick = (suggestion) => {
    setRecentPrompt(suggestion);
    if (bot === 1) {
      getMessage(suggestion);
    } else if (bot === 2) onSentDwarves(suggestion);
    else onSentGemini(suggestion);
    setInput("");
  };
  const suggestions = [
    "How are you hiring?",
    "Tell me a preview about dwarves foundation handbook?",
    "Where you work?",
    "What is the company benefits and perks",
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
