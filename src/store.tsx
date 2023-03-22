import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import usersReducer from "./features/users.slice";
import scrapbookReducer from "./features/scrapbook.slice";

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['users','scrapbook'],
};

const usersPersistConfig = {
  key: 'users',
  storage,
};

const scrapbookPersistConfig = {
  key: 'scrapbook',
  storage,
};

const usersPersistedReducer = persistReducer(usersPersistConfig, usersReducer);
const scrapbookPersistedReducer = persistReducer(scrapbookPersistConfig, scrapbookReducer);

// const rootReducer = combineReducers({
//   users: usersPersistedReducer,
//   scrapbook: scrapbookPersistedReducer
// });


const store = configureStore({
  reducer: {
    users: usersPersistedReducer,
    scrapbook: scrapbookPersistedReducer
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
