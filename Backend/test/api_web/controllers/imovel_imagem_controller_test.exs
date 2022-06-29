defmodule ApiWeb.ImovelImagemControllerTest do
  use ApiWeb.ConnCase

  import Api.ImoveisFixtures

  alias Api.Imoveis.ImovelImagem

  @create_attrs %{
    link: "some link"
  }
  @update_attrs %{
    link: "some updated link"
  }
  @invalid_attrs %{link: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all imovelimagens", %{conn: conn} do
      conn = get(conn, Routes.imovel_imagem_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create imovel_imagem" do
    test "renders imovel_imagem when data is valid", %{conn: conn} do
      conn = post(conn, Routes.imovel_imagem_path(conn, :create), imovel_imagem: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.imovel_imagem_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "link" => "some link"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.imovel_imagem_path(conn, :create), imovel_imagem: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update imovel_imagem" do
    setup [:create_imovel_imagem]

    test "renders imovel_imagem when data is valid", %{conn: conn, imovel_imagem: %ImovelImagem{id: id} = imovel_imagem} do
      conn = put(conn, Routes.imovel_imagem_path(conn, :update, imovel_imagem), imovel_imagem: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.imovel_imagem_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "link" => "some updated link"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, imovel_imagem: imovel_imagem} do
      conn = put(conn, Routes.imovel_imagem_path(conn, :update, imovel_imagem), imovel_imagem: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete imovel_imagem" do
    setup [:create_imovel_imagem]

    test "deletes chosen imovel_imagem", %{conn: conn, imovel_imagem: imovel_imagem} do
      conn = delete(conn, Routes.imovel_imagem_path(conn, :delete, imovel_imagem))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.imovel_imagem_path(conn, :show, imovel_imagem))
      end
    end
  end

  defp create_imovel_imagem(_) do
    imovel_imagem = imovel_imagem_fixture()
    %{imovel_imagem: imovel_imagem}
  end
end
