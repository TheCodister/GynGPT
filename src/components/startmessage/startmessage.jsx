import { useTypewriter, Cursor } from "react-simple-typewriter";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#00ff22",
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
const startMessage = (props) => {
  const start = props.handleStart;
  const [text] = useTypewriter({
    words: [
      `Welcome to GynGPT chatbot\ncreated by using OpenAI's API.\nHow can I help you today?`,
    ],
    loop: 1,
    typeSpeed: 50,
    deleteSpeed: 100,
  });
  return (
    <div className="w-3/5 flex mt-36 items-center text-left flex-col">
      <pre className="text-left w-full text-[4vw] h-[62vh] leading-relaxed font-medium">
        {text}
        <Cursor cursorStyle="|" />
      </pre>
      <ThemeProvider theme={theme}>
        <Button
          className="w-60 h-12"
          size="large"
          variant="contained"
          color="primary"
          onClick={start}
        >
          Start Prompt
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default startMessage;
