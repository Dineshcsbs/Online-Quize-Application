import { configureStore } from "@reduxjs/toolkit";
import { LoginService } from "./LoginService";

const Store = configureStore({
  reducer: {
    [LoginService.reducerPath]: LoginService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([LoginService.middleware]),
});

export default Store;