import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addPizza(state, action) {
      // payload = { pizzaId, name, unitPrice, quantity, totalPrice }
      state.cart.push({
        ...action.payload,
        quantity: 1,
        totalPrice: action.payload.unitPrice,
      });
    },
    removePizza(state, action) {
      //   payload = pizzaId
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload
      );
    },
    incrementPizzaQuantity(state, action) {
      //   payload = pizzaId
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload
      );

      pizza.quantity++;
      pizza.totalPrice = pizza.quantity * pizza.unitPrice;
    },
    decrementPizzaQuantity(state, action) {
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload
      );

      pizza.quantity--;
      pizza.totalPrice = pizza.unitPrice * pizza.quantity;

      if (pizza.quantity === 0)
        cartSlice.caseReducers.removePizza(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
    checkIncart(state, action) {
      const pizza = state.cart?.find(
        (pizza) => pizza.pizzaId === action.payload.pizzaId
      );
      return pizza ? true : false;
    },
  },
});

export const {
  addPizza,
  removePizza,
  incrementPizzaQuantity,
  decrementPizzaQuantity,
  clearCart,
  checkIncart,
} = cartSlice.actions;

export default cartSlice.reducer;
