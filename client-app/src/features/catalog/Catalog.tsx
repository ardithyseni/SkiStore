import { Fragment } from "react";
import { Product } from "../../app/models/product";
import { Button } from "@mui/material";
import ProductList from "./ProductList";

// what properties are required to be passed down here
interface Props {
    products: Product[];
    addProduct: () => void;
    // void sepse nuk merr parameter dhe eshte void, duhet edhe child me dit  
}

// export default function Catalog(props: Props) {
export default function Catalog({products, addProduct}: Props) {

  return (

    // ska nevoj me wrap it in a div, 
    // veq fragment edhe react e output qka ka mrena

    <Fragment> 
      
      <ProductList products={products}/>

      {/* nese e kishim onclick addProduct() me kllapa, ish ekzekutu funksioni on pageload */}
      <Button variant="contained" onClick={addProduct}>Add Product</Button>
    </Fragment>
  );

}
