import { configureStore } from "@reduxjs/toolkit";
import { LoginService } from "./LoginService";
import { PracticeService } from "./PracticeService";
import { ProfileService } from "./ProfileService";
import { TestCompleteService } from "./TestCompleteService";
import { TestService } from "./TestService";

const Store = configureStore({
  reducer: {
    [LoginService.reducerPath]: LoginService.reducer,
    [PracticeService.reducerPath]: PracticeService.reducer,
    [ProfileService.reducerPath]:ProfileService.reducer,
    [TestCompleteService.reducerPath]:TestCompleteService.reducer,
    [TestService.reducerPath]:TestService.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      LoginService.middleware,
      PracticeService.middleware,
      ProfileService.middleware,
      TestCompleteService.middleware,
      TestService.middleware,
    ]),
});

export default Store;
