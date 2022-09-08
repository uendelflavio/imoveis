import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ImovelDetalheService from '../services/imovel-detalhe-service';
import ImovelService from '../services/imovel-service'
const initialState = [];

export const createImovelDetalhe = createAsyncThunk(
    "imoveldetalhe/create",
    async ({ data }) => { return await ImovelDetalheService.create(data); }
);

export const listAllImovelDetalhe = createAsyncThunk(
    "imoveldetalhe/getall",
    async () => { return await ImovelDetalheService.getAll(); }
);

export const listImovelDetalhe = createAsyncThunk(
    "imoveldetalhe/get",
    async ({ id }) => { await ImovelDetalheService.get(id); return { id }; }
);

export const listImovelWithDetalhes = createAsyncThunk(
    "imoveldetalhe/getwithdetalhes",
    async ({ id }) => { return await ImovelService.getWithDetalhes(id); }
);

export const updateImovelDetalhe = createAsyncThunk(
    "imoveldetalhe/update",
    async ({ id, data }) => { return await ImovelDetalheService.update(id, data); }
);

export const deleteImovelDetalhe = createAsyncThunk(
    "imoveldetalhe/remove",
    async ({ id }) => { await ImovelDetalheService.remove(id); return { id }; }
);

export const resetImovelDetalhe = createAsyncThunk(
    "imoveldetalhe/reset",
    async () => {
        return {
            id: undefined,
            imovel_id: '',
            area_total_m2: '',
            area_total_construida_m2: '',
            numero_inscricao: '',
            matricula_agua: '',
            matricula_energia: '',
            classificacao: '',
            salas: '',
            quartos: '',
            banheiros: '',
            suites: '',
            vagas_garagem: '',
            area_lazer: false,
            piscina: false,
            agua_incluso: false,
            gas_incluso: false,
            seguranca_incluso: false,
        };
    }
);

const imovelDetalheSlice = createSlice({
    name: "imoveldetalhe",
    initialState,
    extraReducers: {
        [createImovelDetalhe.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [listAllImovelDetalhe.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [listImovelDetalhe.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [listImovelWithDetalhes.fulfilled]: (state, action) => {
            // if (action.payload === null) return resetImovelDetalhe()
            return [action.payload];
        },
        [updateImovelDetalhe.fulfilled]: (state, action) => {
            const index = state.findIndex(imovel_detalhe => imovel_detalhe.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        [deleteImovelDetalhe.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        },
        [resetImovelDetalhe.fulfilled]: (state, action) => {
            return [action.payload];
        },
    },
})

const { reducer } = imovelDetalheSlice;
export default reducer;