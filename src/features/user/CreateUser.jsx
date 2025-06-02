import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import Btn from "./../../ui/Btn";

export default function CreateUser() {
  const storeUserName = useSelector((state) => state.user.userName);

  const [userName, setUserName] = useState(storeUserName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handelSubmit(e) {
    e.preventDefault();
    if (!userName) return;
    dispatch(updateName(userName));
    navigate("/menu");
  }
  return (
    <div className="relative z-1 py-10 ">
      <h3 className="text-xl text-stone-300 text-center font-bold mb-3">
        <span className={userName.length === 0 ? "block mb-1" : ""}>
          ✋Welcome!{" "}
        </span>
        {userName
          ? userName.toUpperCase()
          : "Please start by teliing us your name: "}
      </h3>
      {!storeUserName ? (
        <form className="mx-auto">
          <input
            type="text"
            placeholder="Name"
            name="fullName"
            className="outline-0 p-2 bg-stone-100 placeholder:font-normal font-normal rounded-md block mx-auto w-2/3"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          {userName.length > 0 && (
            <Btn styling="preBtn block mx-auto mt-5" fun={handelSubmit}>
              start ordering
            </Btn>
          )}
        </form>
      ) : (
        <Btn styling="preBtn block mx-auto mt-5" fun={() => navigate("/menu")}>
          satrt ordering
        </Btn>
      )}
    </div>
  );
}
