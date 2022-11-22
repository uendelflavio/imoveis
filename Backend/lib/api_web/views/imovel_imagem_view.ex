defmodule ApiWeb.ImovelImagemView do
  use ApiWeb, :view
  alias ApiWeb.ImovelImagemView

  def render("index.json", %{imovel_imagens: imovel_imagens}) do
    %{imovel_imagens: render_many(imovel_imagens, ImovelImagemView, "imovel_imagem.json")}
  end

  def render("show.json", %{imovel_imagem: imovel_imagem}) do
    %{imovel_imagem: render_one(imovel_imagem, ImovelImagemView, "imovel_imagem.json")}
  end

  def render("imovel_imagem.json", %{imovel_imagem: imovel_imagem}) do
    %{
      id: imovel_imagem.id,
      imovel_id: imovel_imagem.imovel_id,
      imagem: imovel_imagem.imagem,
      descricao: imovel_imagem.descricao
    }
  end

  def render("count.json", %{imagens: imagens}) do
    %{
      imagens: imagens
    }
  end
end
