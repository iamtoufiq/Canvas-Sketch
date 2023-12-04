import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "@/Constant";
import { actionItemClick } from "@/redux/slice/menu.Slice";
import { io } from "socket.io-client";
// import { socket } from "@/socket";
const Board = () => {
  const canvasRef = useRef(null);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const shouldDraw = useRef(false);
  const dispatch = useDispatch();
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d", { willReadFrequently: true }); //This line obtains the 2D rendering context of the canvas.
    // The context is what allows you to draw on the canvas.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      //beginPath: Clears any existing path and starts a new path at the specified (x, y) coordinates.
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      //drawLine: Draws a straight line from the current position to the specified (x, y) coordinates and strokes the path.
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      // console.log(e.clientX, e.clientY);

      // socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);

      // socket.emit("drawLine", { x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = (e) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
      console.log("value is ", drawHistory.current);
    };
    const handleBeginPath = (path) => {
      beginPath(path.x, path.y);
    };

    const handleDrawLine = (path) => {
      drawLine(path.x, path.y);
    };
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    // const socket = io("http://localhost:5000");

    // socket.on("connect", () => {
    //   console.log("Client connected to server");
    // });

    // socket.on("beginPath", handleBeginPath);
    // socket.on("drawLine", handleDrawLine);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      // socket.off("beginPath", handleBeginPath);
      // socket.off("drawLine", handleDrawLine);
      // socket.disconnect(); // Disconnect the socket when component unmounts
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "canvas.jpg";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointer.current -= 1;
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      const context = canvas.getContext("2d");
      context.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    const handleChangeconfig = (config) => {
      changeConfig(config.color, config.size);
    };
    changeConfig(color, size);
    // socket.on("changeConfig", handleChangeconfig);

    return () => {
      // socket.off("changeConfig", handleChangeconfig);
    };
  }, [color, size]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
