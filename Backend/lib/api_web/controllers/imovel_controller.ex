defmodule ApiWeb.ImovelController do
  use ApiWeb, :controller

  alias Api.Imoveis
  alias Api.Imoveis.Imovel

  action_fallback(ApiWeb.FallbackController)

  def index(conn, _params) do
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
    imovel = Imoveis.get_imovel(id)

    if is_nil(imovel) do
      render(conn, "show.json", page: [])
    else
      render(conn, "show.json", imovel: imovel)
    end
  end

  def update(conn, %{"id" => id, "imovel" => imovel_params}) do
    imovel = Imoveis.get_imovel(id)

    with {:ok, %Imovel{} = imovel} <- Imoveis.update_imovel(imovel, imovel_params) do
      render(conn, "show.json", imovel: imovel)
    end
  end

  def delete(conn, %{"id" => id}) do
    imovel = Imoveis.get_imovel(id)

    with {:ok, %Imovel{}} <- Imoveis.delete_imovel(imovel) do
      send_resp(conn, :no_content, "")
    end
  end

  def imagens(conn, %{"id" => id}) do
    imovel = Imoveis.get_imovel_with_imagem(id)

    if is_nil(imovel) do
      render(conn, "imagens.json", page: [])
    else
      render(conn, "imagens.json", imovel: imovel)
    end
  end

  def detalhes(conn, %{"id" => id}) do
    imovel = Imoveis.get_imovel_with_detalhe(id)

    if is_nil(imovel.imovel_detalhe) do
      render(conn, "detalhes.json", page: [])
    else
      render(conn, "detalhes.json", imovel: imovel)
    end
  end

  def documentos(conn, %{"id" => id}) do
    imovel = Imoveis.get_imovel_with_documento(id)

    if is_nil(imovel) do
      render(conn, "documentos.json", page: [])
    else
      render(conn, "documentos.json", imovel: imovel)
    end
  end
end
