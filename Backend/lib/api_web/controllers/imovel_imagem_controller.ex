defmodule ApiWeb.ImovelImagemController do
  use ApiWeb, :controller

  alias Api.Imoveis
  alias Api.Imoveis.ImovelImagem

  action_fallback(ApiWeb.FallbackController)

  def index(conn, _params) do
    imovel_imagens = Imoveis.list_imovelimagens()
    render(conn, "index.json", imovel_imagens: imovel_imagens)
  end

  def create(conn, %{"imovel_imagem" => imovel_imagem_params}) do
    with {:ok, %ImovelImagem{} = imovel_imagem} <-
           Imoveis.create_imovel_imagem(imovel_imagem_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.imovel_imagem_path(conn, :show, imovel_imagem))
      |> render("show.json", imovel_imagem: imovel_imagem)
    end
  end

  def show(conn, %{"id" => id}) do
    imovel_imagem = Imoveis.get_imovel_imagem!(id)
    render(conn, "show.json", imovel_imagem: imovel_imagem)
  end

  def update(conn, %{"id" => id, "imovel_imagem" => imovel_imagem_params}) do
    imovel_imagem = Imoveis.get_imovel_imagem!(id)

    with {:ok, %ImovelImagem{} = imovel_imagem} <-
           Imoveis.update_imovel_imagem(imovel_imagem, imovel_imagem_params) do
      render(conn, "show.json", imovel_imagem: imovel_imagem)
    end
  end

  def delete(conn, %{"id" => id}) do
    imovel_imagem = Imoveis.get_imovel_imagem!(id)

    with {:ok, %ImovelImagem{}} <- Imoveis.delete_imovel_imagem(imovel_imagem) do
      send_resp(conn, :no_content, "")
    end
  end

  def count(conn, %{"id" => id}) do
    imagems = Imoveis.count_imovel_imagem!(id)
    render(conn, "count.json", imagems: imagems)
  end
end
