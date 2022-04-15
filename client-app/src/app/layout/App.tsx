import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";


// const products = [
//   {
//     name: "product1",
//     price: 100.0,
//   },
//   {
//     name: "product2",
//     price: 200.0
//   },
// ];

function App() {

  const[darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      } 

    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  // inside of the return we use JSX, which is
  // JavaScript disguised in HTML
  // which we write it in {}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*clear margins and paddings*/}

      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />

      {/* we are passing down props of the parent to child component */}

      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
