defmodule ApiWeb.ImovelDetalheView do
  use ApiWeb, :view
  alias ApiWeb.ImovelDetalheView

  def render("index.json", %{imovel_detalhes: imovel_detalhes}) do
    %{imovel_detalhes: render_many(imovel_detalhes, ImovelDetalheView, "imovel_detalhe.json")}
  end

  def render("show.json", %{imovel_detalhe: imovel_detalhe}) do
    %{imovel_detalhe: render_one(imovel_detalhe, ImovelDetalheView, "imovel_detalhe.json")}
  end

  def render("imovel_detalhe.json", %{imovel_detalhe: imovel_detalhe}) do
    %{
      id: imovel_detalhe.id,
      imovel_id: imovel_detalhe.imovel_id,
      area_total_m2: imovel_detalhe.area_total_m2,
      area_total_construida_m2: imovel_detalhe.area_total_construida_m2,
      numero_inscricao: imovel_detalhe.numero_inscricao,
      matricula_agua: imovel_detalhe.matricula_agua,
      matricula_energia: imovel_detalhe.matricula_energia,
      classificacao: imovel_detalhe.classificacao,
      salas: imovel_detalhe.salas,
      quartos: imovel_detalhe.quartos,
      banheiros: imovel_detalhe.banheiros,
      suites: imovel_detalhe.suites,
      vagas_garagem: imovel_detalhe.vagas_garagem,
      area_lazer: imovel_detalhe.area_lazer,
      piscina: imovel_detalhe.piscina,
      agua_incluso: imovel_detalhe.agua_incluso,
      gas_incluso: imovel_detalhe.gas_incluso,
      seguranca_incluso: imovel_detalhe.seguranca_incluso
    }
  end

  def render("imovel_detalhes.json", %{imovel_detalhe: imovel_detalhe}) do
    IO.inspect(imovel_detalhe)

    case imovel_detalhe.imovel_detalhe do
      nil ->
        %{
          id: 0,
          imovel_id: 0,
          area_total_m2: 0,
          area_total_construida_m2: 0,
          numero_inscricao: "",
          matricula_agua: "",
          matricula_energia: "",
          classificacao: "",
          salas: 0,
          quartos: 0,
          banheiros: 0,
          suites: 0,
          vagas_garagem: 0,
          area_lazer: false,
          piscina: false,
          agua_incluso: false,
          gas_incluso: false,
          seguranca_incluso: false
        }

      value ->
        %{
          id: value.id,
          imovel_id: value.imovel_id,
          area_total_m2: value.area_total_m2,
          area_total_construida_m2: value.area_total_construida_m2,
          numero_inscricao: value.numero_inscricao,
          matricula_agua: value.matricula_agua,
          matricula_energia: value.matricula_energia,
          classificacao: value.classificacao,
          salas: value.salas,
          quartos: value.quartos,
          banheiros: value.banheiros,
          suites: value.suites,
          vagas_garagem: value.vagas_garagem,
          area_lazer: value.area_lazer,
          piscina: value.piscina,
          agua_incluso: value.agua_incluso,
          gas_incluso: value.gas_incluso,
          seguranca_incluso: value.seguranca_incluso
        }
    end
  end
end
