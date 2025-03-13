import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import login from "../assets/login.jpg";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const { navigate, backendUrl } = useContext(ShopContext);
  const { token, setToken } = useContext(ProductContext);
  const [currState, setCurrState] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    try {
      if (currState === "Sign Up") {
        fetch(`${backendUrl}/api/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success("Registration Successful");
              setCurrState("Sign In");
            } else {
              toast.error(data.message);
            }
          });
      } else {
        fetch(`${backendUrl}/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success("Login Successful");
              setToken(data.token);
              localStorage.setItem("token", data.token);
              navigate("/");
            } else {
              toast.error(data.message);
            }
          });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to login");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-50 bg-white">
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full shadow-md transition-all duration-300"
      >
        <FaArrowLeft className="text-lg" />
        <span className="text-sm font-medium">
          Back to <span className="font-bold">Furni</span>
          <span className="text-secondary font-bold">Online</span>
        </span>
      </button>
      <div className="flex h-full w-full">
        <div className="w-1/2 hidden sm:block">
          <img src={login} alt="logo" className="object-cover w-full h-full" />
        </div>
        <div className="flex w-full sm:w-1/2 items-center justify-center text-[90%]">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5"
          >
            <div className="w-full mb-4">
              <h3 className="bold-36">{currState}</h3>
            </div>
            {currState === "Sign Up" && (
              <div className="w-full">
                <label htmlFor="name" className="medium-15">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-dark w-full mt-5 !py-[8px] !rounded-lg hover:bg-slate-800"
            >
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
