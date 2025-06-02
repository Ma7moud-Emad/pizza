import { useDispatch, useSelector } from "react-redux";
import Btn from "../../ui/Btn";
import {
  addPizza,
  decrementPizzaQuantity,
  incrementPizzaQuantity,
  removePizza,
} from "../cart/cartSlice";

export default function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const storeCart = useSelector((state) => state.cart.cart);

  const { id, imageUrl, ingredients, name, soldOut, unitPrice } = pizza;
  const isInCart = storeCart.find((item) => item.pizzaId === id) ? true : false;

  function handelAddToCart(item) {
    const pizzaObj = {
      pizzaId: item.id,
      name: item.name,
      unitPrice: item.unitPrice,
      quantity: 1,
      totalPrice: item.unitPrice,
    };
    dispatch(addPizza(pizzaObj));
  }
  return (
    <li className="flex items-center gap-5 px-2 py-5 md:p-10 bg-stone-200 md:w-half-4px">
      <img
        src={imageUrl}
        alt={name}
        className={`size-28 rounded-xl ${soldOut ? "opacity-50" : ""}`}
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xl font-medium">{name}</p>
          <p>
            {ingredients
              .map((comp) => {
                return (
                  comp.slice(0, 1).toUpperCase() + comp.slice(1).toLowerCase()
                );
              })
              .join(", ")}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          {soldOut ? (
            <p className="text-yellow-700 capitalize font-medium">sold out</p>
          ) : (
            <p className="font-medium text-yellow-700">{unitPrice}$</p>
          )}

          {soldOut ? (
            ""
          ) : !isInCart ? (
            <Btn styling="preBtn" fun={() => handelAddToCart(pizza)}>
              add to cart
            </Btn>
          ) : (
            <div className="flex items-center gap-2">
              <Btn
                styling="preBtn"
                fun={() => dispatch(decrementPizzaQuantity(id))}
              >
                -
              </Btn>

              <Btn
                styling="preBtn"
                fun={() => dispatch(incrementPizzaQuantity(id))}
              >
                +
              </Btn>
              <Btn styling="preBtn" fun={() => dispatch(removePizza(id))}>
                remove
              </Btn>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
