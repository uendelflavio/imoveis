import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import ImovelService from "services/imovel-service";

export const useImovelStore = create(
  devtools(
    immer(set => ({
      imoveisData: [],
      createImovel: async data => {
        const apiResponse = await ImovelService.create(data);
        set(state => {
          state.imoveisData.push(apiResponse);
        });
      },
      listImovel: async id => {
        const apiResponse = await ImovelService.get(id);
        set(state => {
          state.imoveisData = apiResponse;
        });
      },
      listImoveis: async () => {
        const apiResponse = await ImovelService.getAll();
        set(state => {
          state.imoveisData = apiResponse;
        });
      },
      updateImovel: async data => {
        const apiResponse = await ImovelService.update(data.id, data);
        set(state => {
          let imovelData = state.imoveisData.filter(_ => _.id !== data.id);
          imovelData.push(apiResponse);
          state.imoveisData = imovelData;
        });
      },
      deleteImovel: async id => {
        await ImovelService.remove(id);
        set(state => {
          state.imoveisData = state.imoveisData.filter(_ => _.id !== id);
        });
      },
      resetImovel: async () => {
        const apiResponse = {
          id: 0,
          endereco: "",
          numero: "",
          bairro: "",
          cep: "",
          cidade: "",
          complemento: "",
          uf: "",
          vistoria: false,
          ocupado: false
        };

        set(state => {
          state.imoveisData = apiResponse;
        });
      }
    }))
  )
);
