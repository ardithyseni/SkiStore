import { useState } from "react";
import HomePage from "../../features/home/HomePage";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { Route } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";

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

  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#edfcff' : '#121212'
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CssBaseline />
      {/*clear margins and paddings*/}

      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />

      {/* we are passing down props of the parent to child component */}

      <Container>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetails} />
        <Route path='/about' component={AboutPage} />
        <Route path='/contact' component={ContactPage} />
        <Route path='/server-error' component={ServerError} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
