import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { FaBarsStaggered, FaRegCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { TbBasket } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext";
import { use } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const { token, getCartCount, navigate } = useContext(ShopContext);
  const [menuOpened, setMenuOpened] = useState(false);

  const navi = useNavigate();

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="max-padd-container w-full">
      <div className="flexBetween py-3">
        <Link to="/" className="flex flex-1">
          <div className="bold-32">
            Furni<span className="text-secondary">Online</span>
          </div>
        </Link>
        <div className="flex-1">
          <NavBar
            containerStyles={`${
              menuOpened
                ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white rounded-xl shadow-md w-52 ring-1 ring-slate-900/5 z-50"
                : "hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 ring-1 ring-slate-900/5 rounded-full p-2"
            }`}
          />
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-2 xs:gap-x-8">
          <FaBarsStaggered
            onClick={toggleMenu}
            className="xl:hidden cursor-pointer text-xl"
          />
          <FaSearch
            onClick={() => navi("/recommendations")}
            className="text-lg cursor-pointer"
            whileHover={{ scale: 1.2 }}
          />
          <Link to="/ai-assistant" className="relative cursor-pointer flex">
            <motion.img
              src="https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/chatbot2.png?alt=media&token=601dceb5-9d7b-4f69-97f0-208cdf0e1754"
              alt="chatbot"
              className=" xs:w-8 xs:h-8 max-xs:w-8 max-xs:h-8"
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.2 }}
            />
          </Link>
          <Link to="/cart" className="relative cursor-pointer flex">
            <TbBasket className="text-[27px]" />
            <span className="bg-secondary text-white text-[12px] absolute font-semibold left-1.5 -top-3.5 flexCenter w-4 h-4 rounded-full shadow-md">
              {getCartCount()}
            </span>
          </Link>
          <div className="group relative">
            <div>
              {token ? (
                <div>
                  <FaRegCircleUser className="text-[20px] cursor-pointer" />
                </div>
              ) : (
                <butoon
                  onClick={() => navigate("/login")}
                  className="btn-light cursor-pointer flexCenter gap-x-2"
                >
                  Login <RiUserLine className="text-xl" />
                </butoon>
              )}
            </div>
            {token && (
              <ul className="bg-white p-2 w-32 ring-1 ring-slate-900/5 rounded absolute right-0 top-7 hidden group-hover:flex flex-col regular-14 shadow-md z-50">
                <li className="hover:bg-primary rounded-md cursor-pointer text-tertiary p-2">
                  <Link to="/profile">Profile</Link>
                </li>
                <li
                  onClick={() => navigate("orders")}
                  className="hover:bg-primary rounded-md cursor-pointer text-tertiary p-2"
                >
                  Orders
                </li>
                <li
                  onClick={logout}
                  className="hover:bg-primary rounded-md cursor-pointer text-tertiary p-2"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
