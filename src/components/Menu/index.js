import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import {
  faPencil,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";
import { MENU_ITEMS } from "@/Constant";
import { useDispatch, useSelector } from "react-redux";

import { actionItemClick, menuItemClick } from "@/redux/slice/menu.Slice";
const Menu = () => {
  const dispatch = useDispatch();
  const handleMenuClick = (menuItem) => {
    dispatch(menuItemClick(menuItem));
  };

  const { activeMenuItem } = useSelector((state) => state.menu);
  const handleActionItemClick = (itemName) => {
    console.log("itemName" , itemName);
    dispatch(actionItemClick(itemName));
  };
  return (
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}
      >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}
      >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}
      >
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
