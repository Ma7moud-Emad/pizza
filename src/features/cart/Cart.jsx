import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import Btn from "./../../ui/Btn";

export default function Cart() {
  const dispatch = useDispatch();
  const storeCart = useSelector((state) => state.cart.cart);
  const storeUserName = useSelector((state) => state.user.userName);

  return (
    <div className="p-2 flex flex-col">
      <Link
        to="/menu"
        className="text-blue-500 font-medium capitalize text-sm py-2 flex items-center "
      >
        back to menu
      </Link>
      <h2 className="text-xl font-medium capitalize mb-2">
        your cart, {storeUserName}
      </h2>
      {storeCart.length > 0 ? (
        <>
          <ul className="flex gap-2 flex-wrap">
            {storeCart.map((item) => (
              <CartItem pizza={item} key={item.pizzaId} />
            ))}
          </ul>
          <div className="flex gap-4 mt-5 pb-5">
            <Link className="preBtn" to="/order/new">
              order pizzas
            </Link>

            <Btn
              styling="bg-white text-stone-500 px-4 py-2 rounded-3xl cursor-pointer text-lg font-medium capitalize border-2 border-stone-500 hover:bg-stone-400 hover:text-stone-100 hover:border-stone-500 transition"
              fun={() => dispatch(clearCart())}
            >
              clear cart
            </Btn>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
