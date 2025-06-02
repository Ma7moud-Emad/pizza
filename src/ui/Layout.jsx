import Header from "./Header";
import CartOverview from "./../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function Layout() {
  const navigation = useNavigation();

  return (
    <div className="h-lvh relative flex flex-col">
      <Header />
      {navigation.state == "loading" && <Loader />}
      <main
        className="flex-1 grid grid-cols-1 grid-rows-1 overflow-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
