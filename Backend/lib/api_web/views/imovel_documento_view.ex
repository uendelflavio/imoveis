defmodule ApiWeb.ImovelDocumentoView do
  use ApiWeb, :view
  alias ApiWeb.ImovelDocumentoView

  def render("index.json", %{imoveldocumentos: imoveldocumentos}) do
    %{
      imoveldocumentos:
        render_many(imoveldocumentos, ImovelDocumentoView, "imovel_documento.json")
    }
  end

  def render("show.json", %{imovel_documento: imovel_documento}) do
    %{
      imovel_documento: render_one(imovel_documento, ImovelDocumentoView, "imovel_documento.json")
    }
  end

  def render("imovel_documento.json", %{imovel_documento: imovel_documento}) do
    %{
      id: imovel_documento.id,
      imovel_id: imovel_documento.imovel_id,
      documento: imovel_documento.documento,
      descricao: imovel_documento.descricao
    }
  end

  def render("imovel_documentos.json", %{imovel_documento: imovel_documento}) do
    case imovel_documento.imovel_documento do
      nil ->
        %{
          id: 0,
          imovel_id: imovel_documento.imovel_id,
          documento: '',
          descricao: ''
        }

      value ->
        %{
          id: value.id,
          imovel_id: imovel_documento.imovel_id,
          documento: imovel_documento.documento,
          descricao: imovel_documento.descricao
        }
    end
  end

  def render("count.json", %{documentos: documentos}) do
    %{
      documentos: documentos
    }
  end
end
