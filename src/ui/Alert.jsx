export default function Alert({ icon, msg }) {
  return (
    <div className=" flex justify-between gap-5 bg-yellow-600 text-white w-fit p-2 rounded-md text-2xl ">
      <div className="flex gap-2">
        <span className="text-green-500 font-semibold">{icon}</span>
        <h3 className=" capitalize">{msg}</h3>
      </div>
      <button
        type="button"
        className="text-red-500 bg-white/50 text-xl font-bold cursor-pointer rounded-sm px-1 "
      >
        X
      </button>
    </div>
  );
}
