// inside of the return we use JSX, which is
// JavaScript disguised in HTML
// which we write it in {}

import { useEffect, useState } from "react";

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
  const [products, setProducts] = useState([
    {
      name: "product1",
      price: 100.0,
    },
    {
      name: "product2",
      price: 200.0,
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(response => response.json())
        .then(data => setProducts(data))
  }, []); // the [] is a dependency and makes the useEffect method run once only
  // otherwise, it gets called everytime something renders or rerenders


  function addProduct() {
    setProducts([...products, { name: "product3", price: 300.0 }]);
    // spread across a new array with the two existing, and adding a 3rd product
  }

  return (
    <div>
      <h1>SkiStore</h1>
      <ul>
        {products.map((item, index) => (
          <li key={index}>{item.name + " - " + item.price}</li>
        ))}
      </ul>
      {/* nese e kishim onclick addProduct() me kllapa, ish ekzekutu funksioni on load */}
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
