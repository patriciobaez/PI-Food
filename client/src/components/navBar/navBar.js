import React from "react";
import styles from './navBar.module.css'
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
  <div className={styles.background}>
    <NavLink to={"/home"} className={styles.navlink} >
      <button className={styles.button}>Home</button>
    </NavLink>
    <NavLink to="/create" className={styles.navlink} >
      <button className={styles.button}>
        Create Recipe
      </button>
    </NavLink>
  </div>
  );
}


export default NavBar