defmodule ApiWeb.ImovelImagemView do
  use ApiWeb, :view
  alias ApiWeb.ImovelImagemView

  def render("index.json", %{imovelimagens: imovelimagens}) do
    %{data: render_many(imovelimagens, ImovelImagemView, "imovel_imagem.json")}
  end

  def render("show.json", %{imovel_imagem: imovel_imagem}) do
    %{data: render_one(imovel_imagem, ImovelImagemView, "imovel_imagem.json")}
  end

  def render("imovel_imagem.json", %{imovel_imagem: imovel_imagem}) do
    %{
      id: imovel_imagem.id,
      link: imovel_imagem.link
    }
  end
end
