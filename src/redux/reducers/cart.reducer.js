import { getLocal, removeLocal, setLocal } from "../../helper";
import { FAIL, REQUEST, SUCCESS, CART_ACTION } from "../constants";

const initialState = {
  cart: getLocal("cart") || [],
  ordered: [],
  loading: false,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST(CART_ACTION.GET_ORDER):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(CART_ACTION.GET_ORDER):
      return {
        ...state,
        ordered: payload,
        loading: false,
      };
    case REQUEST(CART_ACTION.CHANGE_AMOUNT_PRODUCT):
      const { id, type } = payload;
      const index = state.cart.findIndex((item) => item.id === id);
      if (index !== -1) {
        if (type === "add") state.cart[index].amount++;
        if (type === "sub") {
          if (state.cart[index].amount > 1) state.cart[index].amount--;
        }
      }
      setLocal({ key: "cart", value: state.cart });
      return {
        ...state,
        cart: state.cart,
      };

    case REQUEST(CART_ACTION.ADD_TO_CART):
      const { productID, amount, size, color } = payload;

      const result = state.cart.findIndex(
        (item) =>
          item.productID === productID &&
          item.size === size &&
          item.color === color
      );

      if (result !== -1) {
        state.cart[result].amount += amount;
        setLocal({ key: "cart", value: [...state.cart] });
        return {
          ...state,
          cart: [...state.cart],
        };
      } else {
        setLocal({ key: "cart", value: [...state.cart, payload] });
        return {
          ...state,
          cart: [...state.cart, payload],
        };
      }
    case REQUEST(CART_ACTION.CLEAR_CART):
      removeLocal("cart");
      return {
        ...state,
        cart: [],
      };
    // Get detail
    case REQUEST(CART_ACTION.REMOVE_FROM_CART):
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === payload.id
      );
      state.cart.splice(existingProductIndex, 1);
      setLocal({ key: "cart", value: state.cart });
      return {
        ...state,
        cart: state.cart,
      };
    default:
      return state;
  }
}

export { initialState };
export default reducer;
