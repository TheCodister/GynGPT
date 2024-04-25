import { useTypewriter, Cursor } from "react-simple-typewriter";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { Context } from "../../context/context";
const theme = (color) =>
  createTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: "#E0C2FF",
        light: "#F5EBFF",
        contrastText: "#47008F",
      },
    },
  });
const startMessage = () => {
  const { background, textcolor, handleStart } = useContext(Context);
  const [text] = useTypewriter({
    words: [
      `Welcome to GynGPT chatbot created by training with data from \nDwarves Foundation.\nHow can I help you today?`,
    ],
    loop: 1,
    typeSpeed: 50,
    deleteSpeed: 100,
  });
  return (
    <div className="w-4/5 flex mt-[11vh] items-center text-left flex-col">
      <pre
        className="font-[Montserrat] text-left w-full text-[4vw] h-[62vh] leading-relaxed font-bold mb-14"
        style={{ backgroundColor: `${background}`, color: `${textcolor}` }}
      >
        {text}
        <Cursor cursorStyle="|" />
      </pre>
      <ThemeProvider theme={theme(textcolor)}>
        <Button
          className="w-60 h-12"
          size="large"
          variant="contained"
          color="primary"
          onClick={handleStart}
        >
          Start Prompt
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default startMessage;
