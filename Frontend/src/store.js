import { configureStore, combineReducers } from "@reduxjs/toolkit";
import imovelSlice from "slices/imovel-slice";
import imovelDetalheSlice from "slices/imovel-detalhe-slice";
import imovelImageSlice from "slices/imovel-image-slice";

const reducer = combineReducers({
  imovelSlice,
  imovelDetalheSlice,
  imovelImageSlice
});

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
export default store;
