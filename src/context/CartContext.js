import { createContext, useContext, useEffect, useReducer } from "react";
import products from "../data/product";
import cartRedeucer from "../reducer/cartReducer";
const CartContext = createContext();
const initState = {
  products: products,
  total: 0,
  amount: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartRedeucer, initState);
  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function removeItem(id) {
    // console.log("ลบสินค้ารหัส = " + id)
    dispatch({ type: "REMOVE", payload: id });
  }
  function addItem(id) {
    // console.log("เพิ่มสินค้า = " + id)
    dispatch({ type: "ADD", payload: id });
  }
  function reduceItem(id) {
    // console.log("ลดสินค้า = " + id)
    dispatch({ type: "REDUCE", payload: id });
  }
  useEffect(() => {
    // console.log("total")
    dispatch({ type: "CAL_TOTAL" });
  }, [state.products]);
  return (
    <CartContext.Provider
      value={{ ...state, formatMoney, removeItem, addItem, reduceItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};
