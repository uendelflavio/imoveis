import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ImovelImagemService from "services/imovel-imagem-service";
import ImovelService from "services/imovel-service";

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

const initialState = {
  imovelImagemData: [],
  loading: false
};

const imovelImageSlice = createSlice({
  name: "imovelimage",
  initialState,
  extraReducers: {
    [createImovelImage.pending]: (state, action) => {
      state.loading = true;
    },
    [createImovelImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.imovelImagemData = [action.payload];
    },
    [listAllImovelImage.pending]: (state, action) => {
      state.loading = true;
    },
    [listAllImovelImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.imovelImagemData = action.payload;
    },
    [listImovelImage.pending]: (state, action) => {
      state.loading = true;
    },
    [listImovelImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.imovelImagemData = action.payload;
    },
    [listImovelWithImages.pending]: (state, action) => {
      state.loading = true;
    },
    [listImovelWithImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.imovelImagemData = action.payload;
    },
    [updateImovelImage.pending]: (state, action) => {
      state.loading = true;
    },
    [updateImovelImage.fulfilled]: (state, action) => {
      state.loading = false;
      const { arg: { id } } = action.meta;
      if (id) {
        state.imovelImagemData = state.imovelImagemData.filter(
          item => item._id !== id
        );
      }
    },
    [deleteImovelImage.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteImovelImage.fulfilled]: (state, action) => {
      state.loading = false;
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [resetImovelImage.pending]: (state, action) => {
      state.loading = true;
    },
    [resetImovelImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.imovelImagemData = action.payload;
    }
  }
});
export const getAllImovelImagem = state =>
  state.imovelImageSlice.imovelImagemData;
export const getLoading = state => state.imovelImageSlice.loading;
export default imovelImageSlice.reducer;
