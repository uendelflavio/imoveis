defmodule ApiWeb.ImovelView do
  use ApiWeb, :view
  alias ApiWeb.ImovelView
  import Phoenix.Pagination.JSON

  def render("index.json", %{conn: conn, imoveis: imoveis, phoenix_pagination: phoenix_pagination}) do
    %{
      data: render_many(imoveis, ApiWeb.ImovelView, "imovel.json"),
      pagination: paginate(conn, phoenix_pagination)
    }
  end

  """
  def render("index.json", %{imoveis: imoveis}) do
    %{data: render_many(imoveis, ImovelView, "imovel.json")}
  end
  """

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
