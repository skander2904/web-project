import React from "react";
import { HiOutlineMenuAlt2, HiOutlineHome } from "react-icons/hi";
import { CiShoppingCart, CiDeliveryTruck, CiUser } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
const AdminSidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen p-2 bg-gray-100">
      <ul className="p-5 space-y-8">
        <li>
          <button>
            <HiOutlineMenuAlt2 size={"1.5rem"} />
          </button>
        </li>

        <li>
          <NavLink to="/admin/dashboard">
            <button>
              <HiOutlineHome size={"1.5rem"} />
            </button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">
            <button>
              <CiUser size={"1.5rem"} />
            </button>
          </NavLink>
        </li>
        

      </ul>
    </div>
  );
};

export default AdminSidebar;
