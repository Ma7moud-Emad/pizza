import { Form, redirect, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import store from "./../../store";
import { clearCart } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import Btn from "./../../ui/Btn";
import { useState } from "react";

export default function CreateOrder() {
  const dispatch = useDispatch();

  const { userName, address, status, error } = useSelector(
    (state) => state.user
  );
  const storecart = useSelector((state) => state.cart.cart);
  const [show, setShow] = useState(false);
  const formErrors = useActionData();

  return (
    <div className="p-2 sm:m-auto sm:w-4/5 md:w-8/12 lg:w-1/2">
      <h2 className="text-2xl font-semibold text-stone-700 my-4">
        Ready to order? Let's go!
      </h2>
      <Form method="POST">
        <div className="mb-2">
          <label htmlFor="customer" className="block mb-2 text-lg font-medium">
            First Name
          </label>
          <div>
            <input
              type="text"
              id="customer"
              name="customer"
              className="inputOrder"
              defaultValue={userName}
            />
            {formErrors?.customer && (
              <p className="errorP">{formErrors.customer}</p>
            )}
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="block mb-2 text-lg font-medium">
            Phone Number
          </label>
          <div>
            <input type="tel" id="phone" name="phone" className="inputOrder" />
            {formErrors?.phone && <p className="errorP">{formErrors.phone}</p>}
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="address" className="block mb-2 text-lg font-medium">
            Address
          </label>
          <div>
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                className="inputOrder"
                defaultValue={address}
                disabled={status === "loading"}
              />
              {!address && (
                <Btn
                  styling={`absolute right-0 bg-yellow-500 text-stone-100 px-4 py-[5px] rounded-r-md cursor-pointer text-lg font-medium capitalize focus:bg-yellow-600 hover:bg-yellow-600 transition-all ${
                    status === "loading" ? "" : " cursor-not-allowed"
                  }`}
                  fun={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  {status === "loading" ? "Getting..." : "get address"}
                </Btn>
              )}
            </div>
            {error && !formErrors?.address ? (
              <p className="errorP">{error}</p>
            ) : (
              ""
            )}
            {formErrors?.address && (
              <p className="errorP">{formErrors.address}</p>
            )}
          </div>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="priority"
            name="priority"
            value={true}
            className={`size-5 relative cursor-pointer after:content-['✓'] after:absolute after:size-5 after:bg-yellow-500 after:leading-5 after:cursor-pointer after:text-white after:text-xl after:font-extrabold after:pl-[3px] ${
              show ? "" : "after:hidden"
            }`}
            onChange={() => {
              setShow(!show);
            }}
          />
          <label
            htmlFor="priority"
            className="text-lg font-medium ms-2 cursor-pointer"
          >
            Want to you give your order priority
          </label>
        </div>
        <div className="mt-6">
          <input type="hidden" value={JSON.stringify(storecart)} name="cart" />
          <button className="preBtn">Order now</button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority,
  };

  //vaildtion
  const errors = {};
  if (order.customer.length <= 1) {
    errors.customer = "Name is short";
  } else if (order.customer == "") {
    errors.customer = "Please enter first name";
  }

  if (order.phone == "") {
    errors.phone = "Please enter phone";
  } else {
    if (!/^(\+2)?01[0125]\d{8}$/.test(order.phone)) {
      errors.phone = "Phone not valid";
    }
  }
  if (order.address.length == "") {
    errors.address = "Please enter adreess";
  } else if (order.address.length == 1) {
    errors.address = "Address is short";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
