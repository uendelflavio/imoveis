defmodule ApiWeb.ImovelView do
  use ApiWeb, :view
  alias ApiWeb.ImovelView
  alias ApiWeb.ImovelImagemView
  alias ApiWeb.ImovelDetalheView
  alias ApiWeb.ImovelDocumentoView

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

  def render("imovel_id.json", %{imovel: imovel}) do
    %{
      id: imovel.id
    }
  end

  def render("imagens.json", %{imovel: imovel}) do
    %{
      imovel: render_one(imovel, ImovelView, "imovel_id.json"),
      imovel_imagens: render_many(imovel.imovel_imagem, ImovelImagemView, "imovel_imagens.json")
    }
  end

  def render("detalhes.json", %{imovel: imovel}) do
    %{
      imovel: render_one(imovel, ImovelView, "imovel_id.json"),
      imovel_detalhe: render_one(imovel, ImovelDetalheView, "imovel_detalhes.json")
    }
  end

  def render("documentos.json", %{imovel: imovel}) do
    %{
      imovel: render_one(imovel, ImovelView, "imovel_id.json"),
      imovel_documento: render_one(imovel, ImovelDocumentoView, "imovel_documentos.json")
    }
  end
end
