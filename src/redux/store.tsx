import { configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import staffReducer from "./features/staffs/staffSlice";
import userReducer from "./features/users/userSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        staff: staffReducer,
        auth:authReducer
    }
  });
 export default store;
 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch