import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(
    localStorage.getItem("userId") ? localStorage.getItem("userId") : null
  );
  const [username, setUsername] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(
      "https://vihaan007-xxnf.onrender.com/users/getUser",
      {
        headers: {
          Authorization: `${localStorage.getItem("userId")}`,
        },
      }
    );
    console.log(res.data.user);
    setUsername(res.data.user.userName);
  };

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser(null); // Clear user state
    window.location.href = "/login";
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
          {/* Logo */}
          <Link to="/" className={`${styles.logo}`}>
            <img className="w-30 h-14 mr-2" src={logo} alt="logo" />
          </Link>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
            <li onClick={removeActive}>
              <Link to="/" className={`${styles.navLink}`}>
                Home
              </Link>
            </li>
            {!user && (
              <>
                <li onClick={removeActive}>
                  <Link to="/login" className={`${styles.navLink}`}>
                    Login
                  </Link>
                </li>
                <li onClick={removeActive}>
                  <Link to="/signup" className={`${styles.navLink}`}>
                    Signup
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li onClick={removeActive}>
                  <span className={`${styles.navLink}`}>
                    Welcome, {username}
                  </span>
                </li>
                <li onClick={removeActive}>
                  <button
                    onClick={handleLogOut}
                    className={`${styles.navLink}`}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
