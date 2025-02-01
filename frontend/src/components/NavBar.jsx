import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ containerStyles }) => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Collection", path: "/collection" },
    /* { title: "Testimonials", path: "/testimonials" }, */
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/mailto:info@furnionline.com" },
  ];

  return (
    <nav className={`${containerStyles}`}>
      {navLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `${
              isActive ? "active-link" : "link-inactive"
            } px-3 py-2 rounded-full`
          }
        >
          <div className="flexCenter gap-x-1 ">{link.title}</div>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
