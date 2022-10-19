import { configureStore, combineReducers } from '@reduxjs/toolkit'
import imovelSlice from 'slices/imovel-slice'
import imovelDetalheSlice from 'slices/imovel-detalhe-slice'

const reducer = combineReducers({
    imovelSlice,
    imovelDetalheSlice,
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