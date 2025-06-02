import { useFetcher } from "react-router-dom";
import Btn from "../../ui/Btn";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Btn styling="preBtn float-end">
        {fetcher.state === "submitting"
          ? "updating..."
          : fetcher.state === "idle"
          ? "priority"
          : "done👍"}
      </Btn>
    </fetcher.Form>
  );
}
export async function action({ params }) {
  const { orderId } = params;
  const data = { priority: true };
  await updateOrder(orderId, data);
}
