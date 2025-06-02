import CreateUser from "./../features/user/CreateUser";
export default function Home() {
  return (
    <div className="flex justify-center items-center h-full bg-[url(https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg)] bg-no-repeat bg-cover relative after:absolute after:top-0 after:left-0 after:bg-black/50 after:h-full after:w-full after:z-0">
      <div>
        <h1 className="text-3xl text-stone-300 text-center font-bold relative z-1">
          The best pizza <br />
          <span className="text-yellow-500">
            Straightout of the oven, straight to you.
          </span>
        </h1>
        <CreateUser />
      </div>
    </div>
  );
}
