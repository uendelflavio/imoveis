defmodule ApiWeb.ImovelImagemView do
  use ApiWeb, :view
  alias ApiWeb.ImovelImagemView

  def render("index.json", %{imovel_imagens: imovel_imagens}) do
    %{imovel_imagens: render_many(imovel_imagens, ImovelImagemView, "imovel_imagem.json")}
  end

  def render("show.json", %{imovel_imagem: imovel_imagem}) do
    %{imovelimagens: render_one(imovel_imagem, ImovelImagemView, "imovel_imagem.json")}
  end

  def render("imovel_imagem.json", %{imovel_imagem: imovel_imagem}) do
    %{
      id: imovel_imagem.id,
      imovel_id: imovel_imagem.imovel_id,
      imagem: imovel_imagem.imagem,
      descricao: imovel_imagem.descricao
    }
  end

  def render("imovel_imagens.json", %{imovel_imagem: imovel_imagem}) do
    case imovel_imagem.imovel_imagem do
      nil ->
        %{
          id: 0,
          imovel_id: imovel_imagem.id,
          imagem: '',
          descricao: ''
        }

      value ->
        %{
          id: imovel_imagem.id,
          imovel_id: imovel_imagem.imovel_id,
          imagem: imovel_imagem.imagem,
          descricao: imovel_imagem.descricao
        }
    end
  end

  def render("count.json", %{imagems: imagems}) do
    %{
      imagens: imagems
    }
  end
end
