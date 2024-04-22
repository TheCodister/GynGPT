import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Context } from "../../context/context";
import { useContext } from "react";
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
const navbar = (props) => {
  const bg = props.background;
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  return (
    <nav
      className="w-2/12 gap-6 flex flex-col items-center p-8"
      style={{ backgroundColor: `${bg}` }}
    >
      <img className="w-34" src="./image/Logo2.png" />
      <ThemeProvider theme={theme}>
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
        {prevPrompt.map((prompt, index) => {
          return (
            <div
              onClick={() => loadPrompt(prompt)}
              className="w-[10vw] h-[5vh] flex items-center p-1 mt-4 cursor-pointer border-solid border-[#00ff22] border-[1px] rounded-lg "
            >
              <p>{prompt.slice(0, 18)}...</p>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default navbar;
