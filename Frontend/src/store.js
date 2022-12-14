import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { createLogger } from "redux-logger";
import imovelSlice from "slices/imovel-slice";
import imovelDetalheSlice from "slices/imovel-detalhe-slice";
import imovelImageSlice from "slices/imovel-image-slice";

// const logger = createLogger({
//   predicate: undefined,
//   collapsed: undefined,
//   duration: false,
//   timestamp: true,
//   level: "log",
//   colors: {
//     title: () => "inherit",
//     prevState: () => "#9E9E9E",
//     action: () => "#03A9F4",
//     nextState: () => "#4CAF50",
//     error: () => "#F20404"
//   },
//   stateTransformer: state => state,
//   actionTransformer: action => action,
//   errorTransformer: error => error,
//   logger: console,
//   logErrors: true,
//   diff: false,
//   diffPredicate: undefined,
//   transformer: undefined
// });

const reducer = combineReducers({
  imovelSlice,
  imovelDetalheSlice,
  imovelImageSlice
});

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
  // .concat(logger)
});
export default store;
