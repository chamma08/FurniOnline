import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import login from "../assets/login.jpg";

const Login = () => {
  const { token, setToken, navigate } = useContext(ShopContext);
  const [currState, setCurrState] = useState("Sign Up");

  return (
    <div className="absolute top-0 left-0 w-full h-full z-50 bg-white">
      <div className="flex h-full w-full">
        <div className="w-1/2 hidden sm:block">
          <img src={login} alt="logo" className="object-cover w-full h-full" />
        </div>
        <div className="flex w-full sm:w-1/2 items-center justify-center text-[90%]">
          <form className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5">
            <div className="w-full mb-4">
              <h3 className="bold-36">{currState}</h3>
            </div>
            {currState === "Sign Up" && (
              <div className="w-full">
                <label htmlFor="name" className="medium-15">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                  required
                />
              </div>
            )}
            <div className="w-full">
              <label htmlFor="email" className="medium-15">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="medium-15">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                required
              />
            </div>
            <button className="btn-dark w-full mt-5 !py-[8px] !rounded-lg hover:bg-slate-800">
              {currState === "Sign Up" ? "Sign Up" : "Sign In"}
            </button>
            <div className="flex w-full flex-col gap-y-3">
              <div className="medium-15">Forget Password</div>
              {currState === "Sign In" ? (
                <div>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setCurrState("Sign Up")}
                    className="cursor-pointer font-semibold text-yellow-600"
                  >
                    Create An Account
                  </span>
                </div>
              ) : (
                <div>
                  Already have an account{" "}
                  <span
                    onClick={() => setCurrState("Sign In")}
                    className="cursor-pointer font-semibold text-green-600"
                  >
                    Sign In
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
