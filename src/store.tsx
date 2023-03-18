import { Platform } from "react-native";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usersReducer from "./features/users.slice";

// const persistConfig = {
//   key: 'root',
//   storage: Platform.OS === "ios" ? AsyncStorage : storage
// }


const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, usersReducer)

const store = configureStore({
  reducer: {
    users: persistedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
