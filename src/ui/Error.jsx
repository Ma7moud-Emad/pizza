import { useNavigate, useRouteError } from "react-router-dom";

export default function Error() {
  const navigator = useNavigate();
  const error = useRouteError();
  return (
    <div>
      <h1>Something went worng 😥</h1>
      <p>{error.data || error.message}</p>
      <button
        onClick={() => {
          navigator("/");
        }}
      >
        Go back
      </button>
    </div>
  );
}
