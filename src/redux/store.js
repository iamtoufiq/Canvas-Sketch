import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./slice/menu.Slice";
import ToolboxReducer from "./slice/toolbox.Slice";
export const store = configureStore({
  reducer: { menu: MenuReducer, toolbox: ToolboxReducer },
});
