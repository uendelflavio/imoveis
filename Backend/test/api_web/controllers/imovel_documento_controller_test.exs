defmodule ApiWeb.ImovelDocumentoControllerTest do
  use ApiWeb.ConnCase

  import Api.ImoveisFixtures

  alias Api.Imoveis.ImovelDocumento

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
    test "lists all imoveldocumentos", %{conn: conn} do
      conn = get(conn, Routes.imovel_documento_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create imovel_documento" do
    test "renders imovel_documento when data is valid", %{conn: conn} do
      conn =
        post(conn, Routes.imovel_documento_path(conn, :create), imovel_documento: @create_attrs)

      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.imovel_documento_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "link" => "some link"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn =
        post(conn, Routes.imovel_documento_path(conn, :create), imovel_documento: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update imovel_documento" do
    setup [:create_imovel_documento]

    test "renders imovel_documento when data is valid", %{
      conn: conn,
      imovel_documento: %ImovelDocumento{id: id} = imovel_documento
    } do
      conn =
        put(conn, Routes.imovel_documento_path(conn, :update, imovel_documento),
          imovel_documento: @update_attrs
        )

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.imovel_documento_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "link" => "some updated link"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, imovel_documento: imovel_documento} do
      conn =
        put(conn, Routes.imovel_documento_path(conn, :update, imovel_documento),
          imovel_documento: @invalid_attrs
        )

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete imovel_documento" do
    setup [:create_imovel_documento]

    test "deletes chosen imovel_documento", %{conn: conn, imovel_documento: imovel_documento} do
      conn = delete(conn, Routes.imovel_documento_path(conn, :delete, imovel_documento))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.imovel_documento_path(conn, :show, imovel_documento))
      end
    end
  end

  defp create_imovel_documento(_) do
    imovel_documento = imovel_documento_fixture()
    %{imovel_documento: imovel_documento}
  end
end
