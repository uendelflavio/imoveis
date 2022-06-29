defmodule ApiWeb.ImovelDetalheController do
  use ApiWeb, :controller

  alias Api.Imoveis
  alias Api.Imoveis.ImovelDetalhe

  action_fallback(ApiWeb.FallbackController)

  def index(conn, _params) do
    imovel_detalhes = Imoveis.list_imoveldetalhes()
    render(conn, "index.json", imovel_detalhes: imovel_detalhes)
  end

  def create(conn, %{"imovel_detalhe" => imovel_detalhe_params}) do
    with {:ok, %ImovelDetalhe{} = imovel_detalhe} <-
           Imoveis.create_imovel_detalhe(imovel_detalhe_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.imovel_detalhe_path(conn, :show, imovel_detalhe))
      |> render("show.json", imovel_detalhe: imovel_detalhe)
    end
  end

  def show(conn, %{"id" => id}) do
    imovel_detalhe = Imoveis.get_imovel_detalhe!(id)
    render(conn, "show.json", imovel_detalhe: imovel_detalhe)
  end

  def update(conn, %{"id" => id, "imovel_detalhe" => imovel_detalhe_params}) do
    imovel_detalhe = Imoveis.get_imovel_detalhe!(id)

    with {:ok, %ImovelDetalhe{} = imovel_detalhe} <-
           Imoveis.update_imovel_detalhe(imovel_detalhe, imovel_detalhe_params) do
      render(conn, "show.json", imovel_detalhe: imovel_detalhe)
    end
  end

  def delete(conn, %{"id" => id}) do
    imovel_detalhe = Imoveis.get_imovel_detalhe!(id)

    with {:ok, %ImovelDetalhe{}} <- Imoveis.delete_imovel_detalhe(imovel_detalhe) do
      send_resp(conn, :no_content, "")
    end
  end
end
