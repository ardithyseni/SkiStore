import { Fragment, useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";
import { Container, CssBaseline } from "@mui/material";
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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []); // the [] is a dependency and makes the useEffect method run once only
  // otherwise, it gets called everytime something renders or rerenders

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: "some brand",
        description: "some description",
        pictureUrl: "http://picsum.photos/200",
      },
    ]);
    // spread across a new array with the two existing, and adding a 3rd product
  }

  // inside of the return we use JSX, which is
  // JavaScript disguised in HTML
  // which we write it in {}

  return (
    <Fragment>
      <CssBaseline />
      {/*clear margins and paddings*/}

      <Header />

      {/* we are passing down props of the parent to child component */}

      <Container>
        <Catalog products={products} addProduct={addProduct} />
      </Container>
    </Fragment>
  );
}

export default App;
