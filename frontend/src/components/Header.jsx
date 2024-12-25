import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { FaBarsStaggered, FaRegCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { TbBasket } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";

const Header = () => {
  const [token, setToken] = useState("");
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };
  return (
    <header className="max-padd-container w-full z-45">
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
          <FaSearch className="text-lg cursor-pointer" />
          <Link to="/cart" className="relative cursor-pointer flex">
            <TbBasket className="text-[27px]" />
            <span className="bg-secondary text-white text-[12px] absolute font-semibold left-1.5 -top-3.5 flexCenter w-4 h-4 rounded-full shadow-md">
              0
            </span>
          </Link>
          <div className="group relative">
            <div>
              {token ? (
                <div>
                  <FaRegCircleUser className="text-[29px] cursor-pointer" />
                </div>
              ) : (
                <butoon className="btn-light flexCenter gap-x-2">
                  Login <RiUserLine className="text-xl" />
                </butoon>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
