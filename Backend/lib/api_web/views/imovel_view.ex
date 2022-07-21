defmodule ApiWeb.ImovelView do
  use ApiWeb, :view
  alias ApiWeb.ImovelView
  alias ApiWeb.ImovelImagemView

  def render("index.json", %{imoveis: imoveis}) do
    %{imoveis: render_many(imoveis, ImovelView, "imovel.json")}
  end

  def render("show.json", %{imovel: imovel}) do
    %{imovel: render_one(imovel, ImovelView, "imovel.json")}
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
      ocupado: imovel.ocupado,
      complemento: imovel.complemento
    }
  end

  def render("imagens.json", %{imovel: imovel}) do
    %{
      imovel: render_one(imovel, ImovelView, "imovel.json"),
      imovel_imagens: render_many(imovel.imovel_imagem, ImovelImagemView, "imovel_imagem.json")
    }
  end
end
