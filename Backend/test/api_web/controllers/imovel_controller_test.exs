defmodule ApiWeb.ImovelControllerTest do
  use ApiWeb.ConnCase

  import Api.ImoveisFixtures

  alias Api.Imoveis.Imovel

  @create_attrs %{
    bairro: "some bairro",
    cep: 42,
    cidade: "some cidade",
    endereco: "some endereco",
    numero: 42,
    ocupado: true,
    uf: "some uf",
    vistoria: true
  }
  @update_attrs %{
    bairro: "some updated bairro",
    cep: 43,
    cidade: "some updated cidade",
    endereco: "some updated endereco",
    numero: 43,
    ocupado: false,
    uf: "some updated uf",
    vistoria: false
  }
  @invalid_attrs %{
    bairro: nil,
    cep: nil,
    cidade: nil,
    endereco: nil,
    numero: nil,
    ocupado: nil,
    uf: nil,
    vistoria: nil
  }

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all imoveis", %{conn: conn} do
      conn = get(conn, Routes.imovel_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create imovel" do
    test "renders imovel when data is valid", %{conn: conn} do
      conn = post(conn, Routes.imovel_path(conn, :create), imovel: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.imovel_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "bairro" => "some bairro",
               "cep" => 42,
               "cidade" => "some cidade",
               "endereco" => "some endereco",
               "numero" => 42,
               "ocupado" => true,
               "uf" => "some uf",
               "vistoria" => true
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.imovel_path(conn, :create), imovel: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update imovel" do
    setup [:create_imovel]

    test "renders imovel when data is valid", %{conn: conn, imovel: %Imovel{id: id} = imovel} do
      conn = put(conn, Routes.imovel_path(conn, :update, imovel), imovel: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.imovel_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "bairro" => "some updated bairro",
               "cep" => 43,
               "cidade" => "some updated cidade",
               "endereco" => "some updated endereco",
               "numero" => 43,
               "ocupado" => false,
               "uf" => "some updated uf",
               "vistoria" => false
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, imovel: imovel} do
      conn = put(conn, Routes.imovel_path(conn, :update, imovel), imovel: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete imovel" do
    setup [:create_imovel]

    test "deletes chosen imovel", %{conn: conn, imovel: imovel} do
      conn = delete(conn, Routes.imovel_path(conn, :delete, imovel))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.imovel_path(conn, :show, imovel))
      end
    end
  end

  defp create_imovel(_) do
    imovel = imovel_fixture()
    %{imovel: imovel}
  end
end
