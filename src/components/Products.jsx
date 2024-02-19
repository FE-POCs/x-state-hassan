/* eslint-disable react/prop-types */

import { Box, CircularProgress, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export default function Products({ loading, products, addToCart }) {
  return (
    <Box>
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          {" "}
          <CircularProgress />{" "}
        </Box>
      )}
    </Box>
  );
}
