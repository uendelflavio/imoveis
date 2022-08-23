import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ImovelDetalheService from '../services/imovel-detalhe-service';
import ImovelService from '../services/imovel-service'
const initialState = [];

export const createImovelDetalhe = createAsyncThunk(
    "imovel_detalhe/create",
    async ({ data }) => { return await ImovelDetalheService.create(data); }
);

export const listImovelDetalhe = createAsyncThunk(
    "imovel_detalhe/retrieve",
    async () => { return await ImovelDetalheService.getAll(''); }
);

export const listImovelWithDetalhes = createAsyncThunk(
    "imovel_detalhe/retrieve",
    async ({ id }) => { await ImovelService.getWithDetalhes(id); return { id }; }
);

export const updateImovelDetalhe = createAsyncThunk(
    "imovel_detalhe/update",
    async ({ id, data }) => { return await ImovelDetalheService.update(id, data); }
);

export const deleteImovelDetalhe = createAsyncThunk(
    "imovel_detalhe/delete",
    async ({ id }) => { await ImovelDetalheService.remove(id); return { id }; }
);

const imovelDetalheSlice = createSlice({
    name: "imovel_detalhe",
    initialState,
    extraReducers: {
        [createImovelDetalhe.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [listImovelDetalhe.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [updateImovelDetalhe.fulfilled]: (state, action) => {
            const index = state.findIndex(imovel => imovel.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        [deleteImovelDetalhe.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        },
    },
})

const { reducer } = imovelDetalheSlice;
export default reducer;