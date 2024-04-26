import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Context } from "../../context/context";
import { useContext } from "react";
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
const navbar = () => {
  const { newChat, navbackground, navTextColor } = useContext(Context);
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
    </nav>
  );
};

export default navbar;
