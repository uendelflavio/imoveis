defmodule ApiWeb.ImovelDetalheControllerTest do
  use ApiWeb.ConnCase

  import Api.ImoveisFixtures

  alias Api.Imoveis.ImovelDetalhe

  @create_attrs %{
    agua_incluso: true,
    area_lazer: true,
    area_total_construida_m2: 42,
    area_total_m2: 42,
    banheiros: 42,
    classificacao: "some classificacao",
    gas_incluso: true,
    matricula_agua: 42,
    matricula_energia: 42,
    numero_inscricao: "some numero_inscricao",
    piscina: true,
    quartos: 42,
    salas: 42,
    seguranca_incluso: true,
    suites: 42,
    vagas_garagem: 42
  }
  @update_attrs %{
    agua_incluso: false,
    area_lazer: false,
    area_total_construida_m2: 43,
    area_total_m2: 43,
    banheiros: 43,
    classificacao: "some updated classificacao",
    gas_incluso: false,
    matricula_agua: 43,
    matricula_energia: 43,
    numero_inscricao: "some updated numero_inscricao",
    piscina: false,
    quartos: 43,
    salas: 43,
    seguranca_incluso: false,
    suites: 43,
    vagas_garagem: 43
  }
  @invalid_attrs %{agua_incluso: nil, area_lazer: nil, area_total_construida_m2: nil, area_total_m2: nil, banheiros: nil, classificacao: nil, gas_incluso: nil, matricula_agua: nil, matricula_energia: nil, numero_inscricao: nil, piscina: nil, quartos: nil, salas: nil, seguranca_incluso: nil, suites: nil, vagas_garagem: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all imoveldetalhes", %{conn: conn} do
      conn = get(conn, Routes.imovel_detalhe_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create imovel_detalhe" do
    test "renders imovel_detalhe when data is valid", %{conn: conn} do
      conn = post(conn, Routes.imovel_detalhe_path(conn, :create), imovel_detalhe: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.imovel_detalhe_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "agua_incluso" => true,
               "area_lazer" => true,
               "area_total_construida_m2" => 42,
               "area_total_m2" => 42,
               "banheiros" => 42,
               "classificacao" => "some classificacao",
               "gas_incluso" => true,
               "matricula_agua" => 42,
               "matricula_energia" => 42,
               "numero_inscricao" => "some numero_inscricao",
               "piscina" => true,
               "quartos" => 42,
               "salas" => 42,
               "seguranca_incluso" => true,
               "suites" => 42,
               "vagas_garagem" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.imovel_detalhe_path(conn, :create), imovel_detalhe: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update imovel_detalhe" do
    setup [:create_imovel_detalhe]

    test "renders imovel_detalhe when data is valid", %{conn: conn, imovel_detalhe: %ImovelDetalhe{id: id} = imovel_detalhe} do
      conn = put(conn, Routes.imovel_detalhe_path(conn, :update, imovel_detalhe), imovel_detalhe: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.imovel_detalhe_path(conn, :show, id))

      assert %{
               "id" => ^id,
               "agua_incluso" => false,
               "area_lazer" => false,
               "area_total_construida_m2" => 43,
               "area_total_m2" => 43,
               "banheiros" => 43,
               "classificacao" => "some updated classificacao",
               "gas_incluso" => false,
               "matricula_agua" => 43,
               "matricula_energia" => 43,
               "numero_inscricao" => "some updated numero_inscricao",
               "piscina" => false,
               "quartos" => 43,
               "salas" => 43,
               "seguranca_incluso" => false,
               "suites" => 43,
               "vagas_garagem" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, imovel_detalhe: imovel_detalhe} do
      conn = put(conn, Routes.imovel_detalhe_path(conn, :update, imovel_detalhe), imovel_detalhe: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete imovel_detalhe" do
    setup [:create_imovel_detalhe]

    test "deletes chosen imovel_detalhe", %{conn: conn, imovel_detalhe: imovel_detalhe} do
      conn = delete(conn, Routes.imovel_detalhe_path(conn, :delete, imovel_detalhe))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.imovel_detalhe_path(conn, :show, imovel_detalhe))
      end
    end
  end

  defp create_imovel_detalhe(_) do
    imovel_detalhe = imovel_detalhe_fixture()
    %{imovel_detalhe: imovel_detalhe}
  end
end
