import { AppBar, Switch, Toolbar, Typography } from "@mui/material";


interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">Ski Store</Typography>
        <Switch
          checked={darkMode}
          onChange={handleThemeChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Toolbar>
    </AppBar>
  );
}
