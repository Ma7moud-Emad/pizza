import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CartOverview() {
  const storeCart = useSelector((state) => state.cart.cart);

  const totalCartPrice = storeCart?.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);

  return (
    storeCart?.length > 0 && (
      <div className="bg-stone-800 text-xl font-medium flex items-center justify-between p-2 transd">
        <p className="text-stone-300 capitalize flex gap-5">
          <span>{storeCart?.length} pizzas</span>
          <span>{totalCartPrice} $</span>
        </p>
        <Link
          to="/cart"
          className="text-xl text-yellow-500 font-bold capitalize"
        >
          Open cart
        </Link>
      </div>
    )
  );
}
