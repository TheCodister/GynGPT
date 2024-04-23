import { useContext } from "react";
import { Messages, Suggestion } from "..";
import { Context } from "../../context/context";
const chatPart = (props) => {
  const color = props.color;
  const getMessage = props.getMessage;
  const {
    onSent,
    recentPrompt,
    showRes,
    loading,
    resultData,
    setInput,
    input,
    prevPrompt,
    recentResult,
    navTextColor,
    stopGen,
    setStopGen,
    delayPara,
  } = useContext(Context);
  return (
    <div className="w-[50vw] flex flex-col items-center">
      <div className="h-[92%] pt-8 pl-5 pr-5 overflow-auto scroll-smooth">
        {!showRes ? (
          <Suggestion color={color} />
        ) : (
          prevPrompt.map((prompt, index) => {
            if (index < prevPrompt.length - 1) {
              return (
                <Messages
                  key={index}
                  text={prompt}
                  result={recentResult[index]}
                  loading={false}
                  color={color}
                />
              );
            }
            return null; // Skip rendering for the last index
          })
        )}
        {showRes ? (
          <Messages
            text={recentPrompt}
            result={resultData}
            loading={loading}
            color={color}
          />
        ) : null}
      </div>
      <form>
        <input
          className="w-[50vw] h-[6vh] text-[#fff] rounded-[3vw] p-4 bg-zinc-800 focus:outline-none ring-2 ring-white focus:ring-[#00ff22]"
          placeholder="Ask me anything..."
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
            e.preventDefault();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent form submission
              onSent();
              setInput("");
            }
          }}
          value={input}
        />
        <div
          className="absolute bottom-[3vh] text-[1.5vw] ml-[48vw] cursor-pointer"
          style={{ color: `${navTextColor}` }}
        >
          {stopGen ? (
            <p onClick={() => clearTimeout(delayPara)}>⊗</p>
          ) : (
            <p
              onClick={() => {
                getMessage();
                onSent();
                setInput("");
              }}
            >
              ➤
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default chatPart;
