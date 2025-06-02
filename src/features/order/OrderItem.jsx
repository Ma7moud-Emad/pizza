import { formatCurrency } from "../../utils/helpers";

export default function OrderItem({ order }) {
  const { name, quantity, totalPrice } = order;

  return (
    <li className="border-b-1 border-stone-300">
      <div className="flex justify-between p-2">
        <p>
          <span className="font-semibold mr-2">{quantity}x</span>
          {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}
