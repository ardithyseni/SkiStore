import { Fragment, useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

// what properties are required to be passed down here

// interface Props {
//     products: Product[];
//     addProduct: () => void;
//     // void sepse nuk merr parameter dhe eshte void, duhet edhe child me dit
// }



// export default function Catalog({products, addProduct}: Props) {
export default function Catalog() {
  
  // const [products, setProducts] = useState<Product[]>([]);
  const products = useAppSelector(productSelectors.selectAll); // select all products
  const {productsLoaded, status, filtersLoaded} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();


  useEffect(() => {
    // agent.Catalog.list().then(products => setProducts(products))
    //   .catch(error => console.log(error))
    //   .finally(() => setLoading(false))

    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded])


  if (status.includes('pending')) return <LoadingComponent message="Loading products..."/>



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
