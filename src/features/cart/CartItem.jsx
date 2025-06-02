import { useDispatch } from "react-redux";
import Btn from "./../../ui/Btn";
import {
  removePizza,
  incrementPizzaQuantity,
  decrementPizzaQuantity,
} from "./cartSlice";

export default function CartItem({ pizza }) {
  const dispatch = useDispatch();
  const { pizzaId, name, quantity, totalPrice } = pizza;

  return (
    <li
      className="flex flex-col sm:flex-row sm:justify-between w-full gap-8 bg-stone-200 px-3 py-5 sm:py-7 rounded-sm"
      key={pizzaId}
    >
      <p className="text-lg font-medium">
        {quantity}x <span className="ml-4">{name}</span>
      </p>
      <div className="flex items-center gap-5 self-end">
        <p className="text-lg font-medium">{totalPrice}$</p>
        <div className="flex gap-2 items-center">
          <Btn
            styling="preBtn"
            fun={() => dispatch(decrementPizzaQuantity(pizzaId))}
          >
            -
          </Btn>
          <p className="text-lg font-medium">{quantity}</p>

          <Btn
            styling="preBtn"
            fun={() => dispatch(incrementPizzaQuantity(pizzaId))}
          >
            +
          </Btn>
        </div>

        <Btn styling="preBtn" fun={() => dispatch(removePizza(pizzaId))}>
          remove
        </Btn>
      </div>
    </li>
  );
}
