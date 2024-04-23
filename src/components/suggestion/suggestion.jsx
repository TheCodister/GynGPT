import { useContext } from "react";
import { Context } from "../../context/context";

const suggestion = (props) => {
  const { setRecentPrompt, setInput, onSent } = useContext(Context);
  const color = props.color;
  const handleClick = (suggestion) => {
    setRecentPrompt(suggestion);
    onSent(suggestion);
  };
  const suggestions = [
    "What is ReactJS",
    "Can you list some of the option for me to cook?",
    "Where to travel in Sounthest Asia?",
    "What is Relational Database",
  ];
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[5vw] font-extrabold">
        Hi User
        <br />
        How can I help you today?
      </h1>
      <div className="flex flex-row gap-5 mt-[3vh] text-[1em] text-center">
        {suggestions.map((suggestion, index) => {
          return (
            <div
              className="w-[12em] h-[12em] flex items-center justify-center p-1 cursor-pointer border-solid border-[#00ff22] border-[2px] rounded-lg hover:bg-lime-900"
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
