import styles from "./Navbar.module.scss";

//ICONS FROM REACT-ICONS PACKAGE
import {
  MdOutlineDashboard,
  MdOutlineAnalytics,
  MdOutlinedFlag,
  MdPeopleOutline,
  MdOutlineMessage,
  MdOutlineLogout,
  MdOutlineFlag,
} from "react-icons/md";
import { IoMdLogIn } from "react-icons/io";
import { FaReact, FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { VscDashboard } from "react-icons/vsc";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [nav1, setnav] = useState(false);

  const NavUrl = ({ url, icon, description }) => {
    const checkWindowSize = () => {
      if (window.innerWidth < 1024) setnav(!nav1);
    };
    return (
      <li className={styles.li_navlink}>
        <NavLink
          to={`${url}`}
          onClick={() => checkWindowSize()}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {icon}
          <span className={styles.description}>{description}</span>
        </NavLink>
      </li>
    );
  };

  return (
   <div className="okkkkk">
        <div
      className={`${styles.navbar_container} ${
        nav1 ? styles.navbar_mobile_active : undefined
      }`}
    >
      {/* TEST     */}
      <div className={styles.test}>
        <button
          onClick={() => {
            setnav(!nav1);
          }}
        >
          PRESS ME
        </button>
      </div>

      <nav className={nav1 ? undefined : styles.nav_small}>
        {/* LOGO */}
        <div className={styles.logo}>
          <VscDashboard className={styles.logo_icon} />
          <FaTimes
            className={styles.mobile_cancel_icon}
            onClick={() => setnav(!nav1)}
          />
        </div>

        {/* SUBMENU */}
        <div className={styles.menu_container}>
          {/* FIRST CATEGORY */}
          <span className={styles.categories}>
            {nav1 ? "Pages" : <BsThreeDots />}
          </span>

          <NavUrl
            url="/"
            icon={<MdOutlineDashboard />}
            description="Dashboard"
          />

          <NavUrl
            url="/analytics"
            icon={<MdOutlineAnalytics />}
            description="Analytics"
          />

          <NavUrl
            url="/campaings"
            icon={<MdOutlineFlag />}
            description="Campaings"
          />

          <NavUrl
            url="/messages"
            icon={<MdOutlineMessage />}
            description="Messages"
          />

          {/* SECOND CATEGORY */}
          <span
            className={`${styles.categories} 
          ${styles.second_category}`}
          >
            {nav1 ? "More" : <BsThreeDots />}
          </span>

          <NavUrl url="/other1" icon={<IoMdLogIn />} description="Auth" />

          <NavUrl url="/other1" icon={<FaReact />} description="ReactJs" />
        </div>

        {/* LOGOUT BUTTON */}
        <div
          className={styles.btn_logout}
          onClick={() => {
            setnav(!nav1);
          }}
        >
          <MdOutlineLogout />
        </div>
        {/* ADD BACKGROUND FOR MOBILE */}
      </nav >
    </div>
   </div>
  );
};

export default Sidebar;