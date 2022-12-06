import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ImovelImagemService from "services/imovel-imagem-service";
import ImovelService from "services/imovel-service";

const initialState = [];

export const createImovelImage = createAsyncThunk(
  "imovelimage/create",
  async ({ data }) => {
    return await ImovelImagemService.create(data);
  }
);

export const listAllImovelImage = createAsyncThunk(
  "imovelimage/getall",
  async () => {
    return await ImovelImagemService.getAll();
  }
);

export const listImovelImage = createAsyncThunk(
  "imovelimage/get",
  async ({ id }) => {
    return await ImovelImagemService.get(id);
  }
);

export const listImovelWithImages = createAsyncThunk(
  "imovelimage/getwithimages",
  async ({ id }) => {
    return await ImovelService.getWithImages(id);
  }
);

export const updateImovelImage = createAsyncThunk(
  "imovelimage/update",
  async ({ id, data }) => {
    return await ImovelImagemService.update(id, data);
  }
);

export const deleteImovelImage = createAsyncThunk(
  "imovelimage/remove",
  async ({ id }) => {
    await ImovelImagemService.remove(id);
    return { id };
  }
);

export const resetImovelImage = createAsyncThunk(
  "imovelimage/reset",
  ({ id }) => {
    return { id: 0, imovel_id: id, imagem: "", descricao: "" };
  }
);

const imovelImageSlice = createSlice({
  name: "imovelimage",
  initialState,
  extraReducers: {
    [createImovelImage.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [listAllImovelImage.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [listImovelImage.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [listImovelWithImages.fulfilled]: (state, action) => {
      return [action.payload];
    },
    [updateImovelImage.fulfilled]: (state, action) => {
      const index = state.findIndex(
        imovel_image => imovel_image.id === action.payload.id
      );
      state[index] = {
        ...state[index],
        ...action.payload
      };
    },
    [deleteImovelImage.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [resetImovelImage.fulfilled]: (state, action) => {
      return [action.payload];
    }
  }
});

const { reducer } = imovelImageSlice;
export default reducer;
