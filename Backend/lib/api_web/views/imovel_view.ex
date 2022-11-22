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
    %{
      imovel: render_one(imovel, ImovelView, "imovel.json")
    }
  end

  # def render("show.json", %{imovel: imovel}) do
  # %{
  # imovel: render_one(imovel, ImovelView, "imovel.json")
  # imovel_detalhe: render_one(imovel.imovel_detalhe, ImovelDetalheView, "show.json"),
  # imovel_imagem: render_many(imovel.imovel_imagem, ImovelImagemView, "show.json"),
  # imovel_documento: render_many(imovel.imovel_documento, ImovelDocumentoView, "show.json")
  # }
  # end

  def render("show.json", %{page: page}) do
    %{
      imovel: page
    }
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

  def render("imagens.json", %{page: page}) do
    %{
      imovel_imagem: page
    }
  end

  def render("imagens.json", %{imovel: imovel}) do
    %{
      imovel_imagem: render_many(imovel.imovel_imagem, ImovelImagemView, "imovel_imagem.json")
    }
  end

  def render("detalhes.json", %{page: page}) do
    %{
      imovel_detalhe: page
    }
  end

  def render("detalhes.json", %{imovel: imovel}) do
    %{
      imovel_detalhe: render_one(imovel.imovel_detalhe, ImovelDetalheView, "imovel_detalhe.json")
    }
  end

  def render("documentos.json", %{page: page}) do
    %{
      imovel_documento: page
    }
  end

  def render("documentos.json", %{imovel: imovel}) do
    %{
      imovel_documento:
        render_many(imovel.imovel_documento, ImovelDocumentoView, "imovel_documento.json")
    }
  end
end
