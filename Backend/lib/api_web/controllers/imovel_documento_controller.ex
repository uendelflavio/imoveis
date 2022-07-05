defmodule ApiWeb.ImovelDocumentoController do
  use ApiWeb, :controller

  alias Api.Imoveis
  alias Api.Imoveis.ImovelDocumento

  action_fallback ApiWeb.FallbackController

  def index(conn, _params) do
    imoveldocumentos = Imoveis.list_imoveldocumentos()
    render(conn, "index.json", imoveldocumentos: imoveldocumentos)
  end

  def create(conn, %{"imovel_documento" => imovel_documento_params}) do
    with {:ok, %ImovelDocumento{} = imovel_documento} <-
           Imoveis.create_imovel_documento(imovel_documento_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.imovel_documento_path(conn, :show, imovel_documento))
      |> render("show.json", imovel_documento: imovel_documento)
    end
  end

  def show(conn, %{"id" => id}) do
    imovel_documento = Imoveis.get_imovel_documento!(id)
    render(conn, "show.json", imovel_documento: imovel_documento)
  end

  def update(conn, %{"id" => id, "imovel_documento" => imovel_documento_params}) do
    imovel_documento = Imoveis.get_imovel_documento!(id)

    with {:ok, %ImovelDocumento{} = imovel_documento} <-
           Imoveis.update_imovel_documento(imovel_documento, imovel_documento_params) do
      render(conn, "show.json", imovel_documento: imovel_documento)
    end
  end

  def delete(conn, %{"id" => id}) do
    imovel_documento = Imoveis.get_imovel_documento!(id)

    with {:ok, %ImovelDocumento{}} <- Imoveis.delete_imovel_documento(imovel_documento) do
      send_resp(conn, :no_content, "")
    end
  end
end
