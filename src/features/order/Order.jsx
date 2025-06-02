import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import Btn from "../../ui/Btn";
import UpdateOrder from "./UpdateOrder";

export default function Order() {
  const order = useLoaderData();

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliverin = calcMinutesLeft(estimatedDelivery);
  return (
    <div className="space-y-5 md:w-2/3 xl:w-1/2 m-auto">
      <div className="flex justify-between px-2 pt-2">
        <h1 className="text-md sm:text-xl font-medium capitalize">
          order #{id} status
        </h1>
        <p className="flex">
          {priority && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-l-lg text-sm capitalize font-medium">
              priority
            </span>
          )}
          <span
            className={`bg-green-500 text-white px-3 py-1 rounded-r-lg text-sm capitalize font-medium ${
              priority ? "rounded-r-lg" : "rounded-lg"
            }`}
          >
            {status} order
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center bg-stone-200 py-4 px-2 text-sm">
        <p className="font-semibold sm:text-lg">
          {deliverin >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} Minutes left 😊`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-gray-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul>
        {cart.map((item) => (
          <OrderItem order={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="bg-stone-200 p-2 text-lg font-medium">
        <p>
          Price pizza: <span>{formatCurrency(orderPrice)}</span>
        </p>
        {priority && (
          <p>
            Price priority: <span> {formatCurrency(priorityPrice)}</span>
          </p>
        )}
        <p>
          To pay on delivery:{" "}
          <span>{formatCurrency(orderPrice + priorityPrice)}</span>
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);

  return order;
}
