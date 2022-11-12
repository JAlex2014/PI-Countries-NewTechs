import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "../indexSlice.js"

const store = configureStore({
   reducer: {
      countries: countriesSlice,
   },
 })

export default store;
