import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import imovelSlice from './slices/imovel-slice'

const reducer = combineReducers({
    imovelSlice,
})

const store = configureStore({
    reducer: reducer,
    devTools: true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export default store