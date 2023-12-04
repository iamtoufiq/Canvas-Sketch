import React from "react";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/Constant";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { changeBrushSize, changeColor } from "@/redux/slice/toolbox.Slice";
// import { socket } from "@/socket";
const Toolbox = () => {
  const dispatch = useDispatch();
  const { activeMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  const showStorkeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;

  const updateBrushSize = (e) => {
    const newSize = e.target.value;
    dispatch(changeBrushSize({ item: activeMenuItem, size: newSize }));
    // socket.emit("changeConfig", { color, size: newSize });
  };

  const udpateColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
    // socket.emit("changeConfig", { color: newColor, size });
  };

  return (
    <div className={styles.toolboxContainer}>
      {showStorkeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.BLACK,
              })}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => udpateColor(COLORS.BLACK)}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.RED,
              })}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => udpateColor(COLORS.RED)}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.GREEN,
              })}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => udpateColor(COLORS.GREEN)}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.BLUE,
              })}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => udpateColor(COLORS.BLUE)}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.ORANGE,
              })}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => udpateColor(COLORS.ORANGE)}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.YELLOW,
              })}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => udpateColor(COLORS.YELLOW)}
            />
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min="1"
              max="10"
              step={1}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbox;
