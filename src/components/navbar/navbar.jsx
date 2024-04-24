import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Context } from "../../context/context";
import { useContext } from "react";
const theme = (color) =>
  createTheme({
    palette: {
      primary: {
        main: color,
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#E0C2FF",
        light: "#F5EBFF",
        contrastText: "#47008F",
      },
    },
  });
const navbar = () => {
  const {
    onSent,
    prevPrompt,
    setRecentPrompt,
    newChat,
    navbackground,
    navTextColor,
    chatHistory,
  } = useContext(Context);
  // const loadPrompt = async (chat) => {
  //   setRecentPrompt(chat.input);
  //   await onSent(chat.input);
  // };
  return (
    <nav
      className="w-2/12 gap-6 flex flex-col items-center p-8"
      style={{ backgroundColor: `${navbackground}`, color: `${navTextColor}` }}
    >
      <img className="w-34" src="./image/Logo2.png" />
      <ThemeProvider theme={theme(navTextColor)}>
        <Button
          className="w-[13vw]"
          onClick={() => newChat()}
          variant="outlined"
          color="primary"
        >
          + New Chat
        </Button>
      </ThemeProvider>
      <div>
        {/* {prevPrompt.map((prompt, index) => (
          <div
            key={index}
            onClick={() => loadPrompt(prompt)}
            className="w-[10vw] h-[5vh] text-[1vw] flex items-center justify-center p-1 mt-4 cursor-pointer border-solid border-[1px] rounded-lg line-clamp-1"
            style={{ borderColor: `${navTextColor}` }}
          >
            <p>{prompt.slice(0, 13)}...</p>
          </div>
        ))} */}
        {/* {chatHistory.map((chat, index) => (
          <div
            key={index}
            onClick={() => loadPrompt(chat)}
            className="w-[10vw] h-[5vh] text-[1vw] flex items-center justify-center p-1 mt-4 cursor-pointer border-solid border-[1px] rounded-lg line-clamp-1"
            style={{ borderColor: `${navTextColor}` }}
          >
            <p>{chat.input.slice(0, 13)}...</p>
          </div>
        ))} */}
      </div>
    </nav>
  );
};

export default navbar;
