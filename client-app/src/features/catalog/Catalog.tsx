import { Fragment, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

// what properties are required to be passed down here

// interface Props {
//     products: Product[];
//     addProduct: () => void;
//     // void sepse nuk merr parameter dhe eshte void, duhet edhe child me dit
// }



// export default function Catalog({products, addProduct}: Props) {
export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.list().then(products => setProducts(products))
  }, [])

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []); // the [] is a dependency and makes the useEffect method run once only
  // otherwise, it gets called everytime something renders or rerenders

  

  return (
    // ska nevoj me wrap it in a div,
    // veq fragment edhe react e output qka ka mrena

    <Fragment>
      <ProductList products={products} />
    </Fragment>
  );
}
