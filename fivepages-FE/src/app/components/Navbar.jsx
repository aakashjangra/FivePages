import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCaretDown, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div>
      {/* Main Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <a href="#" className={styles.navIcon}>
            <FontAwesomeIcon icon={faHome} />
          </a>
        </div>

        <ul className={styles.navMenu}>
          <li><a href="#">All </a></li>
          <li className={styles.dropdown}>
            <a href="#">SEARCH <FontAwesomeIcon icon={faCaretDown} /></a>
          </li>
          <li className={styles.dropdown}>
            <a href="#">WISHLIFT <FontAwesomeIcon icon={faCaretDown} /></a>
          </li>
          <li className={styles.dropdown}>
            <a href="#">REVIEWS <FontAwesomeIcon icon={faCaretDown} /></a>
          </li>
          <li className={styles.dropdown}>
            <a href="#">OTHERS <FontAwesomeIcon icon={faCaretDown} /></a>
          </li>
        </ul>

        <div className={styles.navRight}>
          <a href="#" className={styles.navIcon}>
            <FontAwesomeIcon icon={faSearch} /> 
          </a>
          <a href="#" className={styles.navLogin}>
            <FontAwesomeIcon icon={faUser} /> Login

          </a>
        </div>
      </nav>
    </div>
  );
}
