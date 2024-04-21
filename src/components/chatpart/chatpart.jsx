import { Messages } from "..";
const chatPart = (props) => {
  const getMessage = props.getMessage;
  return (
    <div className="w-[50vw] flex flex-col items-center">
      <div className="h-[92%] pt-8 pl-5 pr-5 overflow-auto scroll-smooth">
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
        <Messages />
      </div>
      <form>
        <input
          className="w-[50vw] h-[6vh] rounded-[3vw] p-4 bg-zinc-800 focus:outline-none ring-white focus: ring focus:ring-[#00ff22]"
          placeholder="Ask me anything..."
          type="text"
        />
        <div
          className="absolute bottom-[3vh] text-[1.5vw] ml-[48vw] cursor-pointer"
          onClick={getMessage}
        >
          ➤
        </div>
      </form>
    </div>
  );
};

export default chatPart;
