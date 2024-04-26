import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useContext } from "react";
import { Context } from "../../context/context";
const themebutton = () => {
  const { handleBackground } = useContext(Context);
  return (
    <ButtonGroup
      className="absolute top-2 right-2"
      variant="contained"
      aria-label="Basic button group"
      color="success"
    >
      <Button
        onClick={() =>
          handleBackground("#0f0f0f", "#2b2b2b", "#00ff22", "#00ff22")
        }
      >
        ⚫
      </Button>
      <Button
        onClick={() =>
          handleBackground("rgb(5 46 22)", "#3c4b33", "#00ff22", "#00ff22")
        }
      >
        🟢
      </Button>
      <Button
        onClick={() =>
          handleBackground("#0f0f0f", "#ffffff", "#000000", "#ffffff")
        }
      >
        ⚪️
      </Button>
      <Button
        onClick={() =>
          handleBackground("#e33d5e", "#fff", "#e33d5e", "#eeeeee")
        }
      >
        🔴
      </Button>
    </ButtonGroup>
  );
};

export default themebutton;
