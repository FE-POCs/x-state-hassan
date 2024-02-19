/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

export default function ProductCard({ product, addToCart }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid #f0f0f0",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        padding: 1,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            mixBlendMode: "darken",
          }}
        />
      </Box>
      <Typography fontWeight="bold" sx={{ whiteSpace: "pre-wrap" }}>
        {product.title}
      </Typography>
      <Typography gutterBottom>Price: ${product.price} </Typography>
      <Typography variant="p">
        {product.description.length > 50
          ? `${product.description.substring(0, 150)}...`
          : product.description}
      </Typography>
      <center>
        <Button
          sx={{ mt: 5 }}
          variant="contained"
          onClick={() => {
            addToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </center>
    </Box>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
  }),
};
