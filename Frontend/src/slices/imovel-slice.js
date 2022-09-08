import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ImovelService from '../services/imovel-service'

const initialState = [];

export const createImovel = createAsyncThunk(
    "imovel/create",
    async ({ data }) => { return await ImovelService.create(data); }
);

export const listImovel = createAsyncThunk(
    "imovel/getall",
    async () => { return await ImovelService.getAll(); }
);

export const updateImovel = createAsyncThunk(
    "imovel/update",
    async ({ id, data }) => { return await ImovelService.update(id, data); }
);

export const deleteImovel = createAsyncThunk(
    "imovel/delete",
    async ({ id }) => { await ImovelService.remove(id); return { id }; }
);

const imovelSlice = createSlice({
    name: "imovel",
    initialState,
    extraReducers: {
        [createImovel.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [listImovel.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [updateImovel.fulfilled]: (state, action) => {
            const index = state.findIndex(imovel => imovel.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        [deleteImovel.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        },
    },
})

const { reducer } = imovelSlice;
export default reducer;