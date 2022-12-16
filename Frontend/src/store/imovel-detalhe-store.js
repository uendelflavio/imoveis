import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import ImovelDetalheService from "services/imovel-detalhe-service";
import ImovelService from "services/imovel-service";

export const useImovelDetalheStore = create(
  devtools(
    immer(set => ({
      imovelDetalheData: [],
      createImovelDetalhe: async ({ data }) => {
        const apiResponse = await ImovelDetalheService.create(data);
        set(state => {
          state.imovelDetalheData.push(apiResponse);
        });
      },
      listImovelDetalhe: async ({ id }) => {
        const apiResponse = await ImovelDetalheService.get(id);
        set(state => {
          state.imovelDetalheData = apiResponse;
        });
      },
      listAllImovelDetalhe: async () => {
        const apiResponse = await ImovelDetalheService.getAll();
        set(state => {
          state.imovelDetalheData = apiResponse;
        });
      },
      listImovelWithDetalhes: async imovel_id => {
        const apiResponse = await ImovelService.getWithDetalhes(imovel_id);
        set(state => {
          state.imovelDetalheData = apiResponse;
        });
      },
      updateImovelDetalhe: async ({ data }) => {
        const apiResponse = await ImovelDetalheService.update(data.id, data);
        set(state => {
          let imoveisDetalhesData = state.imoveisData.filter(
            _ => _.id !== data.id
          );
          imoveisDetalhesData.push(apiResponse);
          state.imovelDetalheData = imoveisDetalhesData;
        });
      },
      deleteImovelDetalhe: async ({ id }) => {
        await ImovelService.remove(id);
        // eslint-disable-next-line
        set(state => {
          state.imovelDetalheData = state.imovelDetalheData.filter(
            _ => _.id !== id
          );
        });
      },
      resetImovelDetalhe: async ({ imovel_id }) => {
        const apiResponse = {
          id: undefined,
          imovel_id: imovel_id,
          area_total_m2: "",
          area_total_construida_m2: "",
          numero_inscricao: "",
          matricula_agua: "",
          matricula_energia: "",
          classificacao: "",
          salas: "",
          quartos: "",
          banheiros: "",
          suites: "",
          vagas_garagem: "",
          area_lazer: false,
          piscina: false,
          agua_incluso: false,
          gas_incluso: false,
          seguranca_incluso: false
        };

        set(state => {
          state.imovelDetalheData = apiResponse;
        });
      }
    }))
  )
);
