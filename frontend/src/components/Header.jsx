import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { FaBarsStaggered, FaRegCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { TbBasket } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";
import { RiAiGenerate } from "react-icons/ri";
import { ShopContext } from "../context/ShopContext";
import { ProductContext } from "../context/ProductContext";
import { motion } from "framer-motion";

const Header = () => {
  const { getCartCount, navigate } = useContext(ShopContext);
  const { token, setToken, CartCount } = useContext(ProductContext);
  const [menuOpened, setMenuOpened] = useState(false);
  const [showAITooltip, setShowAITooltip] = useState(false);

  const navi = useNavigate();

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between py-2 sm:py-3">
        {/* Logo - Responsive sizing */}
        <Link to="/" className="flex items-center">
          <div className="text-xl font-bold sm:text-2xl md:text-3xl">
            Furni<span className="text-secondary">Online</span>
          </div>
        </Link>

        {/* Navigation - Hidden on mobile, visible on xl */}
        <div className="hidden xl:block">
          <NavBar
            containerStyles="flex items-center justify-center gap-x-2 lg:gap-x-4 medium-15 ring-1 ring-slate-900/5 rounded-full py-1 px-2"
          />
        </div>

        {/* Action Icons - Fully responsive */}
        <div className="flex items-center gap-x-1 xs:gap-x-2 sm:gap-x-4 md:gap-x-6">
          {/* Mobile Menu Toggle */}
          <FaBarsStaggered
            onClick={toggleMenu}
            className="xl:hidden cursor-pointer text-lg sm:text-xl"
          />
          
          {/* AI-Powered Search - Responsive */}
          <div 
            className="relative"
            onMouseEnter={() => setShowAITooltip(true)} 
            onMouseLeave={() => setShowAITooltip(false)}
          >
            <motion.div 
              className="flex items-center cursor-pointer rounded-full"
              onClick={() => navi("/recommendations")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Base search icon for all devices */}
              <div className="flex items-center gap-x-1 bg-primary/10 p-1 sm:p-2 rounded-full">
                {/* AI icon - hidden on smallest screens */}
                <motion.div
                  className="hidden xs:block"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <RiAiGenerate className="text-base sm:text-lg text-secondary" />
                </motion.div>
                <FaSearch className="text-base sm:text-lg" />
              </div>
            </motion.div>
            
            {/* Tooltip - Responsive positioning */}
            {showAITooltip && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -left-12 xs:-left-16 top-10 bg-white p-2 rounded-md shadow-md text-xs w-32 text-center z-50 ring-1 ring-slate-900/5"
              >
                AI-Powered Search
              </motion.div>
            )}
          </div>
          
          {/* AI Assistant */}
          <Link to="/ai-assistant" className="relative cursor-pointer flex">
            <motion.img
              src="https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/chatbot2.png?alt=media&token=601dceb5-9d7b-4f69-97f0-208cdf0e1754"
              alt="chatbot"
              className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8"
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

          {/* Cart */}
          <Link to="/cart" className="relative cursor-pointer flex">
            <TbBasket className="text-xl xs:text-2xl sm:text-[27px]" />
            <span className="bg-secondary text-white text-[10px] xs:text-[11px] sm:text-[12px] absolute font-semibold left-1 -top-2 xs:left-1.5 xs:-top-2.5 sm:-top-3.5 flexCenter w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 rounded-full shadow-md">
              {CartCount()}
            </span>
          </Link>

          {/* User Menu */}
          <div className="group relative">
            <div>
              {token ? (
                <div>
                  <FaRegCircleUser className="text-lg sm:text-xl md:text-[20px] cursor-pointer" />
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gray-100 hover:bg-gray-200 text-xs xs:text-sm rounded-md py-1 px-2 sm:py-1.5 sm:px-3 cursor-pointer flex items-center justify-center gap-x-1 sm:gap-x-2 transition-colors"
                >
                  Login <RiUserLine className="text-lg sm:text-xl" />
                </button>
              )}
            </div>
            {token && (
              <ul className="bg-white p-2 w-28 sm:w-32 ring-1 ring-slate-900/5 rounded absolute right-0 top-6 sm:top-7 hidden group-hover:flex flex-col text-xs sm:text-sm shadow-md z-50">
                <li className="hover:bg-primary rounded-md cursor-pointer text-tertiary p-1.5 sm:p-2">
                  <Link to="/profile">Profile</Link>
                </li>
                <li
                  onClick={() => navigate("orders")}
                  className="hover:bg-primary rounded-md cursor-pointer text-tertiary p-1.5 sm:p-2"
                >
                  Orders
                </li>
                <li
                  onClick={logout}
                  className="hover:bg-primary rounded-md cursor-pointer text-tertiary p-1.5 sm:p-2"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Only shown when toggled */}
      {menuOpened && (
        <div className="xl:hidden">
          <NavBar
            containerStyles="flex items-start flex-col w-full max-w-xs mx-auto gap-y-1 p-3 bg-white rounded-xl shadow-md ring-1 ring-slate-900/5 z-50 mt-2"
          />
        </div>
      )}
    </header>
  );
};

export default Header;