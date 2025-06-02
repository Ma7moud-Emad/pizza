import { useSelector } from "react-redux";

export default function UserName() {
  const userName = useSelector((state) => state.user.userName);
  return <div className="text-sm sm:text-2xl">{userName}</div>;
}
