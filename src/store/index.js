import { configureStore } from "@reduxjs/toolkit";
import { CelebrityReducer } from "./celebrity.slice";

export const store = configureStore({
  reducer: {
    celebrity: CelebrityReducer,
  },
});
