import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

// what properties are required to be passed down here

// interface Props {
//     products: Product[];
//     addProduct: () => void;
//     // void sepse nuk merr parameter dhe eshte void, duhet edhe child me dit
// }

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
]


// export default function Catalog({products, addProduct}: Props) {
export default function Catalog() {

  // const [products, setProducts] = useState<Product[]>([]);
  const products = useAppSelector(productSelectors.selectAll); // select all products
  const { productsLoaded, status, filtersLoaded, brands, types } = useAppSelector(state => state.catalog);
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


  if (status.includes('pending')) return <LoadingComponent message="Loading products..." />



  // useEffect(() => {
  //   fetch("http://localhost:5000/api/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []); // the [] is a dependency and makes the useEffect method run once only
  // otherwise, it gets called everytime something renders or rerenders



  return (
    // ska nevoj me wrap it in a div,
    // veq fragment edhe react e output qka ka mrena

    <Grid container spacing={4}>
      <Grid item xs={3}>

        <Paper sx={{ mb: 2 }}>
          {/* <TextField
            label='Search Products'
            variant='outlined'
            fullWidth
          /> */}
          <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}> 
          <FormControl component="fieldset">
            <RadioGroup>
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel value={value} control={<Radio />} label={label} key={value} />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {brands.map(brand => (
              <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
            ))}
          </FormGroup>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {types.map(type => (
              <FormControlLabel control={<Checkbox />} label={type} key={type} />
            ))}
          </FormGroup>
        </Paper>

      </Grid>

      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>

      <Grid item xs={3} />
      
      <Grid item xs={9}>
        <Box mb={2} display='flex' justifyContent='space-between' alignItems='center' >
          <Typography>
            Displaying 1-6 of 20 items
          </Typography>
          <Pagination
            color="secondary"
            size="large"
            count={10}
            page={2}
          />
        </Box>
      </Grid>
    
    </Grid>
  );
}
