import { useState } from 'react';
import logo from '../../assets/logo.png';
import  styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  
  const removeActive = () => {
    setIsActive(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
          <Link to='/' className={`${styles.logo}`}>
            <img
              className="w-30 h-14 mr-2"
              src={logo}
              alt="logo"
            />
          </Link>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
              <Link to='/' className={`${styles.navLink}`}>Home</Link>
            </li>

          </ul>
          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
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
