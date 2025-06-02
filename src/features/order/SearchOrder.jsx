import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setquery] = useState("");
  const navigate = useNavigate();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  function handelSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setquery("");
  }
  return (
    <form onSubmit={handelSubmit} className="sm:flex-1">
      <input
        type="text"
        placeholder="Search order by id"
        value={query}
        ref={inputRef}
        onChange={(e) => setquery(e.target.value)}
        className="outline-0 px-2 py-0.5 border sm:border-2 border-[#9a781e] rounded-sm  placeholder:font-normal font-normal w-fit sm:w-full"
      />
    </form>
  );
}
