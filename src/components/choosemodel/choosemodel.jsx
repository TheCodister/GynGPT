import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext } from "react";
import { Context } from "../../context/context";
const choosemodel = () => {
  const { bot, setBot, textcolor } = useContext(Context);
  return (
    <Box
      className="absolute left-[17vw]"
      sx={{
        minWidth: 120,
        color: `${textcolor}`,
      }}
    >
      <FormControl variant="filled" fullWidth sx={{ color: `${textcolor}` }}>
        <InputLabel
          sx={{ color: `${textcolor}` }}
          id="demo-simple-select-label"
        >
          Choose Model
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={bot}
          label="Choose your bot"
          onChange={(e) => setBot(e.target.value)}
          sx={{ color: `${textcolor}` }}
        >
          <MenuItem value={2}>Dwarves Bot 1.0</MenuItem>
          <MenuItem value={0}>Gemini 1.5 Pro</MenuItem>
          <MenuItem value={1}>GPT-3.5 Turbo</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default choosemodel;
