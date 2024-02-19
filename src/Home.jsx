import { Box, Button } from "@mui/material";
import Header from "./components/Header";
import Products from "./components/Products";

import { fetchProductsMachine } from "./machine/fetchProductsMachine";
import { useMachine } from "@xstate/react";

export default function App() {
  const [state, send] = useMachine(fetchProductsMachine);

  const addToCart = (product) => {
    send({
      type: "ADD_TO_CART",
      product,
    });
  };

  return (
    <>
      <Header
        cart={state.context.cart.length}
        cartProducts={state?.context?.cart}
      />
      <Box
        sx={{
          mt: 5,
        }}
      >
        <Products
          show={state?.value === "idle"}
          loading={state?.value === "loading"}
          products={state?.context?.products}
          addToCart={addToCart}
        />
      </Box>
      {state.matches("idle") && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Button
            onClick={() => {
              send({
                type: "FETCH",
              });
            }}
            variant="contained"
          >
            Fetch products
          </Button>
        </Box>
      )}
    </>
  );
}
