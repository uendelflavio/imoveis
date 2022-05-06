defmodule ApiWeb.ImovelView do
  use ApiWeb, :view
  alias ApiWeb.ImovelView

  def render("index.json", %{imoveis: imoveis}) do
    %{
      data: render_many(imoveis, ImovelView, "imovel.json"),
      pagination: ApiWeb.PaginationHelpers.pagination(imoveis)
    }
  end

  def render("show.json", %{imovel: imovel}) do
    %{data: render_one(imovel, ImovelView, "imovel.json")}
  end

  def render("imovel.json", %{imovel: imovel}) do
    %{
      id: imovel.id,
      endereco: imovel.endereco,
      numero: imovel.numero,
      bairro: imovel.bairro,
      cep: imovel.cep,
      cidade: imovel.cidade,
      uf: imovel.uf,
      vistoria: imovel.vistoria,
      ocupado: imovel.ocupado
    }
  end
end
