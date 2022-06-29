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
end
