defmodule ApiWeb.ImovelController do
  use ApiWeb, :controller

  alias Api.Imoveis
  alias Api.Imoveis.Imovel

  action_fallback(ApiWeb.FallbackController)

  def index(conn, _params) do
    # imoveis = Imoveis.paginate_imoveis(_params)
    imoveis = Imoveis.list_imoveis()
    render(conn, "index.json", imoveis: imoveis)
  end

  def create(conn, %{"imovel" => imovel_params}) do
    with {:ok, %Imovel{} = imovel} <- Imoveis.create_imovel(imovel_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.imovel_path(conn, :show, imovel))
      |> render("show.json", imovel: imovel)
    end
  end

  def show(conn, %{"id" => id}) do
    imovel = Imoveis.get_imovel!(id)
    render(conn, "show.json", imovel: imovel)
  end

  def update(conn, %{"id" => id, "imovel" => imovel_params}) do
    imovel = Imoveis.get_imovel!(id)

    with {:ok, %Imovel{} = imovel} <- Imoveis.update_imovel(imovel, imovel_params) do
      render(conn, "show.json", imovel: imovel)
    end
  end

  def delete(conn, %{"id" => id}) do
    imovel = Imoveis.get_imovel!(id)

    with {:ok, %Imovel{}} <- Imoveis.delete_imovel(imovel) do
      send_resp(conn, :no_content, "")
    end
  end
end
