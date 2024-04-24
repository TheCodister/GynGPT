import { useContext, useRef, useEffect } from "react";
import { Messages, Suggestion } from "..";
import { Context } from "../../context/context";
const chatPart = () => {
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
    stopGenerate,
    setStopGenerate,
    bot,
    getMessage,
    textcolor,
  } = useContext(Context);

  const messageContainerRef = useRef(null);

  // Scroll to the bottom of the message container whenever resultData changes
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [resultData]);
  return (
    <div className="w-[50vw] flex flex-col items-center">
      <div className="h-[92%] pt-8 pl-5 pr-5 overflow-auto scroll-smooth">
        {!showRes ? (
          <Suggestion color={textcolor} />
        ) : (
          prevPrompt.map((prompt, index) => {
            if (index < prevPrompt.length - 1) {
              return (
                <Messages
                  key={index}
                  text={prompt}
                  result={recentResult[index]}
                  loading={false}
                  color={textcolor}
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
            color={textcolor}
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
              if (bot === 1) getMessage();
              else onSent();
              setInput("");
            }
          }}
          value={input}
        />
        <div
          className="absolute bottom-[3vh] text-[1.5vw] ml-[48vw] cursor-pointer"
          style={{ color: `${navTextColor}` }}
        >
          {stopGenerate ? (
            <p onClick={() => setStopGenerate(false)}>⊗</p>
          ) : (
            <p
              onClick={() => {
                if (bot === 1) getMessage();
                else onSent();
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
