import { useContext } from "react";
import { Messages } from "..";
import { Context } from "../../context/context";
const chatPart = (props) => {
  const color = props.color;
  const {
    onSent,
    recentPrompt,
    showRes,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="w-[50vw] flex flex-col items-center">
      <div className="h-[92%] pt-8 pl-5 pr-5 overflow-auto scroll-smooth">
        {!showRes ? null : (
          <Messages
            color={color}
            loading={loading}
            text={recentPrompt}
            result={resultData}
          />
        )}
      </div>
      <form>
        <input
          className="w-[50vw] h-[6vh] rounded-[3vw] p-4 bg-zinc-800 focus:outline-none ring-white focus: ring focus:ring-[#00ff22]"
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
            }
          }}
          value={input}
        />
        <div
          className="absolute bottom-[3vh] text-[1.5vw] ml-[48vw] cursor-pointer"
          onClick={() => onSent()}
        >
          ➤
        </div>
      </form>
    </div>
  );
};

export default chatPart;
