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
const navbar = (props) => {
  const bg = props.background;
  return (
    <nav
      className="w-2/12 gap-6 flex flex-col items-center p-8"
      style={{ backgroundColor: `${bg}` }}
    >
      <img className="w-34" src="./image/Logo2.png" />
      <ThemeProvider theme={theme}>
        <Button className="w-[13vw]" variant="outlined" color="primary">
          + New Chat
        </Button>
      </ThemeProvider>
      <h1 className="text-[#00ff22]">Chat history</h1>
    </nav>
  );
};

export default navbar;