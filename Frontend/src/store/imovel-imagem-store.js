import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import ImovelImagemService from "services/imovel-imagem-service";
import ImovelService from "services/imovel-service";

export const useImovelImageStore = create(
  devtools(
    immer(set => ({
      imovelImagemData: [],
      createImovelImage: async data => {
        const apiResponse = await ImovelImagemService.create(data);
        set(state => {
          state.imovelImagemData.push(apiResponse);
        });
      },
      listImovelImage: async id => {
        const apiResponse = await ImovelImagemService.get(id);
        set(state => {
          state.imovelImagemData = apiResponse;
        });
      },
      listAllImovelImage: async () => {
        const apiResponse = await ImovelImagemService.getAll();
        set(state => {
          state.imovelImagemData = apiResponse;
        });
      },
      listImovelWithImages: async id => {
        const apiResponse = await ImovelService.getWithImages(id);
        set(state => {
          state.imovelImagemData = apiResponse;
        });
      },
      updateImovelImage: async data => {
        const apiResponse = await ImovelImagemService.update(data.id, data);
        set(state => {
          let imovelImagemsData = state.imovelImagemData.filter(
            _ => _.id !== data.id
          );
          imovelImagemsData.push(apiResponse);
          state.imovelImagemData = imovelImagemsData;
        });
      },

      deleteImovelImage: async id => {
        await ImovelImagemService.remove(id);
        set(state => {
          state.imovelImagemData = state.imovelImagemData.filter(
            _ => _.id !== id
          );
        });
      },
      resetImovelImage: async imovel_id => {
        const apiResponse = {
          id: 0,
          imovel_id: imovel_id,
          imagem: "",
          descricao: ""
        };
        set(state => {
          state.imovelImagemData = apiResponse;
        });
      }
    }))
  )
);
