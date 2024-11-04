import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore ({
  reducer: {
    userLoged: userSlice
    }
});

export default store;