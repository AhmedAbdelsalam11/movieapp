import { configureStore } from '@reduxjs/toolkit';
import authSlice from './AuthSlice'
import WatchSlice from './AddToWatchSlice'
import { apiSlice } from './MoviesSlice'; 


import {persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'



const persistMovieConfig = {
  key: "watch",
  storage,
};

const persistMovie = persistReducer(persistMovieConfig,WatchSlice )

const Store = configureStore({
  reducer :{
    auth:authSlice,
    watch:persistMovie,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

});
export default Store;


export const persistor = persistStore(Store);