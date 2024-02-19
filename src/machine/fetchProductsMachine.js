import { assign, fromPromise, setup } from "xstate";

const getProducts = (limit) =>
  fetch(`https://fakestoreapi.com/products?limit=${limit}`).then((res) =>
    res.json()
  );

export const fetchProductsMachine = setup({
  actors: {
    fetchProducts: fromPromise(async ({ input }) => {
      const products = await getProducts(input.limit);
      return products;
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7CBXAxgF1gDoBLCAGzAGIAxAUQBUBhACQG0AGAXURXVmLzF0AOx4gAHogCMAFgBshKeykBWOQA4VAThUAmKboA0IAJ6JdFwioDs6gyvZz9UqQGYAvu+NpMuAoTJ0AEMIYmEoSggRMBJhADd0AGsYmDwAQTIyAAUMbHxYDm4kEGQ+ASFRYskEOTkZQlddO1dXGVlXAyNTaRV6lVctR2U5KTlray1Pb1y-IkCQsIiwVAxUQmQyILwAM3RUAFtCVIzsmfzCsVL+QRExatkFJVUNbT0DYzMEO0IZLT+dXQjXQyEGTLwlM7+WC4HBwWCUNIAEURAH16AB5FGMNIAJXoF2KV3KtyqiE06kIyjUv1+rXUOg+ZN0hF0DnY7BUnPY1kBcg84J8eX82yCxDIWFQVHEsDwWxiQW2eGWAApXOz2ABKSiC2aEEViiVgAm8a4VO7SeSKKkvAHvboIKTWFSU2z2WSOv7qfng4SYOCXSHwQllG6VUDVAC0ckZCAjzv+CcTf35018+RI5DAlxDZtJCBshDkVJU9KLdT0WhjFlcLrsunY6l0Wha6nU1imELT-nmoXC2dNJPDiFaNZ0HSbHPYWkb1hkMdUNe5zS0IKcchUUg7OvT0JwsNgQZNxLDEjJ6nqrbGNj51lc6kc869hEbdbcXIcfK3gb1ovFkv7x7mggMhdJ8ShaIo1b0rYEwOJynieEAA */
  id: "products",
  context: {
    products: [],
    limit: 6,
    error: null,
    cart: [],
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        FETCH: {
          target: "loading",
        },
      },
    },
    loading: {
      invoke: {
        id: "getAllProducts",
        src: "fetchProducts",
        input: ({ context }) => ({ limit: context.limit }),
        onDone: {
          target: "success",
          actions: assign({
            products: ({ event }) => event.output,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },
    success: {
      on: {
        ADD_TO_CART: {
          actions: assign({
            cart: ({ context, event }) => [...context.cart, event.product],
          }),
        },
      },
    },
    failure: {
      after: {
        3000: {
          target: "loading",
        },
      },
    },
  },
});
