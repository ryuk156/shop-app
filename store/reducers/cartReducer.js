import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartAction";
import { ADD_ORDER } from "../actions/orderAction";
import cartItems from "../../models/cartItem";
import { DELETE_PRODUCT } from "../actions/productAction";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updatedCartItems;
      if (state.items[addedProduct.id]) {
        updatedCartItems = new cartItems(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedCartItems = new cartItems(1, prodPrice, prodTitle, prodPrice);
        console.log(state.items);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedCartItems },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const currentQty = state.items[action.product].quantity;
      let updatedCartItemR;
      if (currentQty > 1) {
        const updatedCartItem = new cartItems(
          state.items[action.product].quantity - 1,
          state.items[action.product].productPrice,
          state.items[action.product].productTitle,
          state.items[action.product].sum -
            state.items[action.product].productPrice
        );
        updatedCartItemR = {
          ...state.items,
          [action.product]: updatedCartItem,
        };
      } else {
        updatedCartItemR = { ...state.items };
        delete updatedCartItemR[action.product];
      }
      return {
        ...state,
        items: updatedCartItemR,
        totalAmount:
          state.totalAmount - state.items[action.product].productPrice,
      };

      case DELETE_PRODUCT:
        if(!state.items[action.pid]){
           return state
        }
        const updateItem = {...state.items}
        const itemTotal = state.items[action.pid].sum
        delete updateItem[action.pid]
        return {
          ...state,
          items: updateItem,
          totalAmount: state.totalAmount-itemTotal

        };
      case ADD_ORDER:
        return initialState
  }

  return state;
};
