import React from "react";
import { HiOutlineMenuAlt2, HiOutlineHome } from "react-icons/hi";
import { CiShoppingCart, CiDeliveryTruck, CiMap } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-gray-100 sticky shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Menu button for mobile view */}
        <button className="lg:hidden">
          <HiOutlineMenuAlt2 size={"1.5rem"} />
        </button>

        {/* Navbar Links */}
        <ul className="flex space-x-8">
          <li>
            <NavLink to="/home" activeClassName="text-blue-500">
              <button>
                <HiOutlineHome size={"1.5rem"} />
              </button>
            </NavLink>
          </li>

          <li>
            <NavLink to="/cart" activeClassName="text-blue-500">
              <button>
                <CiShoppingCart size={"1.5rem"} />
              </button>
            </NavLink>
          </li>



        </ul>
      </div>
    </div>
  );
};

export default Navbar;
