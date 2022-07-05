defmodule Api.ImoveisTest do
  use Api.DataCase

  alias Api.Imoveis

  describe "imoveis" do
    alias Api.Imoveis.Imovel

    import Api.ImoveisFixtures

    @invalid_attrs %{
      bairro: nil,
      cep: nil,
      cidade: nil,
      complemento: nil,
      endereco: nil,
      numero: nil,
      ocupado: nil,
      uf: nil,
      vistoria: nil
    }

    test "list_imoveis/0 returns all imoveis" do
      imovel = imovel_fixture()
      assert Imoveis.list_imoveis() == [imovel]
    end

    test "get_imovel!/1 returns the imovel with given id" do
      imovel = imovel_fixture()
      assert Imoveis.get_imovel!(imovel.id) == imovel
    end

    test "create_imovel/1 with valid data creates a imovel" do
      valid_attrs = %{
        bairro: "some bairro",
        cep: 42,
        cidade: "some cidade",
        complemento: "some complemento",
        endereco: "some endereco",
        numero: 42,
        ocupado: true,
        uf: "some uf",
        vistoria: true
      }

      assert {:ok, %Imovel{} = imovel} = Imoveis.create_imovel(valid_attrs)
      assert imovel.bairro == "some bairro"
      assert imovel.cep == 42
      assert imovel.cidade == "some cidade"
      assert imovel.complemento == "some complemento"
      assert imovel.endereco == "some endereco"
      assert imovel.numero == 42
      assert imovel.ocupado == true
      assert imovel.uf == "some uf"
      assert imovel.vistoria == true
    end

    test "create_imovel/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_imovel(@invalid_attrs)
    end

    test "update_imovel/2 with valid data updates the imovel" do
      imovel = imovel_fixture()

      update_attrs = %{
        bairro: "some updated bairro",
        cep: 43,
        cidade: "some updated cidade",
        complemento: "some updated complemento",
        endereco: "some updated endereco",
        numero: 43,
        ocupado: false,
        uf: "some updated uf",
        vistoria: false
      }

      assert {:ok, %Imovel{} = imovel} = Imoveis.update_imovel(imovel, update_attrs)
      assert imovel.bairro == "some updated bairro"
      assert imovel.cep == 43
      assert imovel.cidade == "some updated cidade"
      assert imovel.complemento == "some updated complemento"
      assert imovel.endereco == "some updated endereco"
      assert imovel.numero == 43
      assert imovel.ocupado == false
      assert imovel.uf == "some updated uf"
      assert imovel.vistoria == false
    end

    test "update_imovel/2 with invalid data returns error changeset" do
      imovel = imovel_fixture()
      assert {:error, %Ecto.Changeset{}} = Imoveis.update_imovel(imovel, @invalid_attrs)
      assert imovel == Imoveis.get_imovel!(imovel.id)
    end

    test "delete_imovel/1 deletes the imovel" do
      imovel = imovel_fixture()
      assert {:ok, %Imovel{}} = Imoveis.delete_imovel(imovel)
      assert_raise Ecto.NoResultsError, fn -> Imoveis.get_imovel!(imovel.id) end
    end

    test "change_imovel/1 returns a imovel changeset" do
      imovel = imovel_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_imovel(imovel)
    end
  end

  describe "imoveldetalhes" do
    alias Api.Imoveis.ImovelDetalhe

    import Api.ImoveisFixtures

    @invalid_attrs %{
      agua_incluso: nil,
      area_lazer: nil,
      area_total_construida_m2: nil,
      area_total_m2: nil,
      banheiros: nil,
      classificacao: nil,
      gas_incluso: nil,
      matricula_agua: nil,
      matricula_energia: nil,
      numero_inscricao: nil,
      piscina: nil,
      quartos: nil,
      salas: nil,
      seguranca_incluso: nil,
      suites: nil,
      vagas_garagem: nil
    }

    test "list_imoveldetalhes/0 returns all imoveldetalhes" do
      imovel_detalhe = imovel_detalhe_fixture()
      assert Imoveis.list_imoveldetalhes() == [imovel_detalhe]
    end

    test "get_imovel_detalhe!/1 returns the imovel_detalhe with given id" do
      imovel_detalhe = imovel_detalhe_fixture()
      assert Imoveis.get_imovel_detalhe!(imovel_detalhe.id) == imovel_detalhe
    end

    test "create_imovel_detalhe/1 with valid data creates a imovel_detalhe" do
      valid_attrs = %{
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

      assert {:ok, %ImovelDetalhe{} = imovel_detalhe} = Imoveis.create_imovel_detalhe(valid_attrs)
      assert imovel_detalhe.agua_incluso == true
      assert imovel_detalhe.area_lazer == true
      assert imovel_detalhe.area_total_construida_m2 == 42
      assert imovel_detalhe.area_total_m2 == 42
      assert imovel_detalhe.banheiros == 42
      assert imovel_detalhe.classificacao == "some classificacao"
      assert imovel_detalhe.gas_incluso == true
      assert imovel_detalhe.matricula_agua == 42
      assert imovel_detalhe.matricula_energia == 42
      assert imovel_detalhe.numero_inscricao == "some numero_inscricao"
      assert imovel_detalhe.piscina == true
      assert imovel_detalhe.quartos == 42
      assert imovel_detalhe.salas == 42
      assert imovel_detalhe.seguranca_incluso == true
      assert imovel_detalhe.suites == 42
      assert imovel_detalhe.vagas_garagem == 42
    end

    test "create_imovel_detalhe/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_imovel_detalhe(@invalid_attrs)
    end

    test "update_imovel_detalhe/2 with valid data updates the imovel_detalhe" do
      imovel_detalhe = imovel_detalhe_fixture()

      update_attrs = %{
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

      assert {:ok, %ImovelDetalhe{} = imovel_detalhe} =
               Imoveis.update_imovel_detalhe(imovel_detalhe, update_attrs)

      assert imovel_detalhe.agua_incluso == false
      assert imovel_detalhe.area_lazer == false
      assert imovel_detalhe.area_total_construida_m2 == 43
      assert imovel_detalhe.area_total_m2 == 43
      assert imovel_detalhe.banheiros == 43
      assert imovel_detalhe.classificacao == "some updated classificacao"
      assert imovel_detalhe.gas_incluso == false
      assert imovel_detalhe.matricula_agua == 43
      assert imovel_detalhe.matricula_energia == 43
      assert imovel_detalhe.numero_inscricao == "some updated numero_inscricao"
      assert imovel_detalhe.piscina == false
      assert imovel_detalhe.quartos == 43
      assert imovel_detalhe.salas == 43
      assert imovel_detalhe.seguranca_incluso == false
      assert imovel_detalhe.suites == 43
      assert imovel_detalhe.vagas_garagem == 43
    end

    test "update_imovel_detalhe/2 with invalid data returns error changeset" do
      imovel_detalhe = imovel_detalhe_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Imoveis.update_imovel_detalhe(imovel_detalhe, @invalid_attrs)

      assert imovel_detalhe == Imoveis.get_imovel_detalhe!(imovel_detalhe.id)
    end

    test "delete_imovel_detalhe/1 deletes the imovel_detalhe" do
      imovel_detalhe = imovel_detalhe_fixture()
      assert {:ok, %ImovelDetalhe{}} = Imoveis.delete_imovel_detalhe(imovel_detalhe)
      assert_raise Ecto.NoResultsError, fn -> Imoveis.get_imovel_detalhe!(imovel_detalhe.id) end
    end

    test "change_imovel_detalhe/1 returns a imovel_detalhe changeset" do
      imovel_detalhe = imovel_detalhe_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_imovel_detalhe(imovel_detalhe)
    end
  end

  describe "imovelimagens" do
    alias Api.Imoveis.ImovelImagem

    import Api.ImoveisFixtures

    @invalid_attrs %{link: nil}

    test "list_imovelimagens/0 returns all imovelimagens" do
      imovel_imagem = imovel_imagem_fixture()
      assert Imoveis.list_imovelimagens() == [imovel_imagem]
    end

    test "get_imovel_imagem!/1 returns the imovel_imagem with given id" do
      imovel_imagem = imovel_imagem_fixture()
      assert Imoveis.get_imovel_imagem!(imovel_imagem.id) == imovel_imagem
    end

    test "create_imovel_imagem/1 with valid data creates a imovel_imagem" do
      valid_attrs = %{link: "some link"}

      assert {:ok, %ImovelImagem{} = imovel_imagem} = Imoveis.create_imovel_imagem(valid_attrs)
      assert imovel_imagem.link == "some link"
    end

    test "create_imovel_imagem/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_imovel_imagem(@invalid_attrs)
    end

    test "update_imovel_imagem/2 with valid data updates the imovel_imagem" do
      imovel_imagem = imovel_imagem_fixture()
      update_attrs = %{link: "some updated link"}

      assert {:ok, %ImovelImagem{} = imovel_imagem} =
               Imoveis.update_imovel_imagem(imovel_imagem, update_attrs)

      assert imovel_imagem.link == "some updated link"
    end

    test "update_imovel_imagem/2 with invalid data returns error changeset" do
      imovel_imagem = imovel_imagem_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Imoveis.update_imovel_imagem(imovel_imagem, @invalid_attrs)

      assert imovel_imagem == Imoveis.get_imovel_imagem!(imovel_imagem.id)
    end

    test "delete_imovel_imagem/1 deletes the imovel_imagem" do
      imovel_imagem = imovel_imagem_fixture()
      assert {:ok, %ImovelImagem{}} = Imoveis.delete_imovel_imagem(imovel_imagem)
      assert_raise Ecto.NoResultsError, fn -> Imoveis.get_imovel_imagem!(imovel_imagem.id) end
    end

    test "change_imovel_imagem/1 returns a imovel_imagem changeset" do
      imovel_imagem = imovel_imagem_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_imovel_imagem(imovel_imagem)
    end
  end

  describe "imoveldocumentos" do
    alias Api.Imoveis.ImovelDocumento

    import Api.ImoveisFixtures

    @invalid_attrs %{link: nil}

    test "list_imoveldocumentos/0 returns all imoveldocumentos" do
      imovel_documento = imovel_documento_fixture()
      assert Imoveis.list_imoveldocumentos() == [imovel_documento]
    end

    test "get_imovel_documento!/1 returns the imovel_documento with given id" do
      imovel_documento = imovel_documento_fixture()
      assert Imoveis.get_imovel_documento!(imovel_documento.id) == imovel_documento
    end

    test "create_imovel_documento/1 with valid data creates a imovel_documento" do
      valid_attrs = %{link: "some link"}

      assert {:ok, %ImovelDocumento{} = imovel_documento} =
               Imoveis.create_imovel_documento(valid_attrs)

      assert imovel_documento.link == "some link"
    end

    test "create_imovel_documento/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_imovel_documento(@invalid_attrs)
    end

    test "update_imovel_documento/2 with valid data updates the imovel_documento" do
      imovel_documento = imovel_documento_fixture()
      update_attrs = %{link: "some updated link"}

      assert {:ok, %ImovelDocumento{} = imovel_documento} =
               Imoveis.update_imovel_documento(imovel_documento, update_attrs)

      assert imovel_documento.link == "some updated link"
    end

    test "update_imovel_documento/2 with invalid data returns error changeset" do
      imovel_documento = imovel_documento_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Imoveis.update_imovel_documento(imovel_documento, @invalid_attrs)

      assert imovel_documento == Imoveis.get_imovel_documento!(imovel_documento.id)
    end

    test "delete_imovel_documento/1 deletes the imovel_documento" do
      imovel_documento = imovel_documento_fixture()
      assert {:ok, %ImovelDocumento{}} = Imoveis.delete_imovel_documento(imovel_documento)

      assert_raise Ecto.NoResultsError, fn ->
        Imoveis.get_imovel_documento!(imovel_documento.id)
      end
    end

    test "change_imovel_documento/1 returns a imovel_documento changeset" do
      imovel_documento = imovel_documento_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_imovel_documento(imovel_documento)
    end
  end
end
