import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

export default function Header() {
  return (
    <header className="bg-yellow-500 p-2 flex justify-between items-center sm:gap-5 font-bold uppercase">
      <Link to="/" className="text-sm sm:text-2xl">
        Pizza King
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}
