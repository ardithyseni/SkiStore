
import { useEffect, useState } from "react";
import { Product } from "../models/product";

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
      .then(response => response.json())
        .then(data => setProducts(data))
  }, []); // the [] is a dependency and makes the useEffect method run once only
  // otherwise, it gets called everytime something renders or rerenders


  function addProduct() {
    setProducts(prevState => [...prevState, 
      { 
        id: prevState.length + 101, 
        name: "product" + (prevState.length + 1), 
        price: (prevState.length * 100) + 100,
        brand: 'some brand',
        description: 'some description',
        pictureUrl: 'http://picsum.photos/200',

      }
    ]);
    // spread across a new array with the two existing, and adding a 3rd product
  }

  
  // inside of the return we use JSX, which is
  // JavaScript disguised in HTML
  // which we write it in {}

  return (
    <div>
      <h1>SkiStore</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name + " - " + product.price}</li>
        ))}
      </ul>
      {/* nese e kishim onclick addProduct() me kllapa, ish ekzekutu funksioni on pageload */}
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
