defmodule Api.ImoveisTest do
  use Api.DataCase

  alias Api.Imoveis

  describe "locadores" do
    alias Api.Imoveis.Locador

    import Api.ImoveisFixtures

    @invalid_attrs %{
      bairro: nil,
      celular: nil,
      cep: nil,
      cidade: nil,
      complemento: nil,
      cpf: nil,
      lote: nil,
      nome: nil,
      numero: nil,
      quadra: nil,
      rg: nil,
      rua: nil,
      sala: nil,
      tipo: nil,
      uf: nil
    }

    test "list_locadores/0 returns all locadores" do
      locador = locador_fixture()
      assert Imoveis.list_locadores() == [locador]
    end

    test "get_locador!/1 returns the locador with given id" do
      locador = locador_fixture()
      assert Imoveis.get_locador!(locador.id) == locador
    end

    test "create_locador/1 with valid data creates a locador" do
      valid_attrs = %{
        bairro: "some bairro",
        celular: "some celular",
        cep: 42,
        cidade: "some cidade",
        complemento: "some complemento",
        cpf: "some cpf",
        lote: "some lote",
        nome: "some nome",
        numero: 42,
        quadra: "some quadra",
        rg: "some rg",
        rua: "some rua",
        sala: "some sala",
        tipo: "some tipo",
        uf: "some uf"
      }

      assert {:ok, %Locador{} = locador} = Imoveis.create_locador(valid_attrs)
      assert locador.bairro == "some bairro"
      assert locador.celular == "some celular"
      assert locador.cep == 42
      assert locador.cidade == "some cidade"
      assert locador.complemento == "some complemento"
      assert locador.cpf == "some cpf"
      assert locador.lote == "some lote"
      assert locador.nome == "some nome"
      assert locador.numero == 42
      assert locador.quadra == "some quadra"
      assert locador.rg == "some rg"
      assert locador.rua == "some rua"
      assert locador.sala == "some sala"
      assert locador.tipo == "some tipo"
      assert locador.uf == "some uf"
    end

    test "create_locador/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_locador(@invalid_attrs)
    end

    test "update_locador/2 with valid data updates the locador" do
      locador = locador_fixture()

      update_attrs = %{
        bairro: "some updated bairro",
        celular: "some updated celular",
        cep: 43,
        cidade: "some updated cidade",
        complemento: "some updated complemento",
        cpf: "some updated cpf",
        lote: "some updated lote",
        nome: "some updated nome",
        numero: 43,
        quadra: "some updated quadra",
        rg: "some updated rg",
        rua: "some updated rua",
        sala: "some updated sala",
        tipo: "some updated tipo",
        uf: "some updated uf"
      }

      assert {:ok, %Locador{} = locador} = Imoveis.update_locador(locador, update_attrs)
      assert locador.bairro == "some updated bairro"
      assert locador.celular == "some updated celular"
      assert locador.cep == 43
      assert locador.cidade == "some updated cidade"
      assert locador.complemento == "some updated complemento"
      assert locador.cpf == "some updated cpf"
      assert locador.lote == "some updated lote"
      assert locador.nome == "some updated nome"
      assert locador.numero == 43
      assert locador.quadra == "some updated quadra"
      assert locador.rg == "some updated rg"
      assert locador.rua == "some updated rua"
      assert locador.sala == "some updated sala"
      assert locador.tipo == "some updated tipo"
      assert locador.uf == "some updated uf"
    end

    test "update_locador/2 with invalid data returns error changeset" do
      locador = locador_fixture()
      assert {:error, %Ecto.Changeset{}} = Imoveis.update_locador(locador, @invalid_attrs)
      assert locador == Imoveis.get_locador!(locador.id)
    end

    test "delete_locador/1 deletes the locador" do
      locador = locador_fixture()
      assert {:ok, %Locador{}} = Imoveis.delete_locador(locador)
      assert_raise Ecto.NoResultsError, fn -> Imoveis.get_locador!(locador.id) end
    end

    test "change_locador/1 returns a locador changeset" do
      locador = locador_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_locador(locador)
    end
  end

  describe "profissionais" do
    alias Api.Imoveis.Profissional

    import Api.ImoveisFixtures

    @invalid_attrs %{celular: nil, funcao: nil, nome: nil}

    test "list_profissionais/0 returns all profissionais" do
      profissional = profissional_fixture()
      assert Imoveis.list_profissionais() == [profissional]
    end

    test "get_profissional!/1 returns the profissional with given id" do
      profissional = profissional_fixture()
      assert Imoveis.get_profissional!(profissional.id) == profissional
    end

    test "create_profissional/1 with valid data creates a profissional" do
      valid_attrs = %{celular: "some celular", funcao: "some funcao", nome: "some nome"}

      assert {:ok, %Profissional{} = profissional} = Imoveis.create_profissional(valid_attrs)
      assert profissional.celular == "some celular"
      assert profissional.funcao == "some funcao"
      assert profissional.nome == "some nome"
    end

    test "create_profissional/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_profissional(@invalid_attrs)
    end

    test "update_profissional/2 with valid data updates the profissional" do
      profissional = profissional_fixture()

      update_attrs = %{
        celular: "some updated celular",
        funcao: "some updated funcao",
        nome: "some updated nome"
      }

      assert {:ok, %Profissional{} = profissional} =
               Imoveis.update_profissional(profissional, update_attrs)

      assert profissional.celular == "some updated celular"
      assert profissional.funcao == "some updated funcao"
      assert profissional.nome == "some updated nome"
    end

    test "update_profissional/2 with invalid data returns error changeset" do
      profissional = profissional_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Imoveis.update_profissional(profissional, @invalid_attrs)

      assert profissional == Imoveis.get_profissional!(profissional.id)
    end

    test "delete_profissional/1 deletes the profissional" do
      profissional = profissional_fixture()
      assert {:ok, %Profissional{}} = Imoveis.delete_profissional(profissional)
      assert_raise Ecto.NoResultsError, fn -> Imoveis.get_profissional!(profissional.id) end
    end

    test "change_profissional/1 returns a profissional changeset" do
      profissional = profissional_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_profissional(profissional)
    end
  end

  describe "imoveis" do
    alias Api.Imoveis.Imovel

    import Api.ImoveisFixtures

    @invalid_attrs %{
      bairro: nil,
      cep: nil,
      cidade: nil,
      complemento: nil,
      lote: nil,
      numero: nil,
      ocupado: nil,
      quadra: nil,
      rua: nil,
      sala: nil,
      tipo: nil,
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
        lote: "some lote",
        numero: 42,
        ocupado: true,
        quadra: "some quadra",
        rua: "some rua",
        sala: "some sala",
        tipo: "some tipo",
        uf: "some uf",
        vistoria: true
      }

      assert {:ok, %Imovel{} = imovel} = Imoveis.create_imovel(valid_attrs)
      assert imovel.bairro == "some bairro"
      assert imovel.cep == 42
      assert imovel.cidade == "some cidade"
      assert imovel.complemento == "some complemento"
      assert imovel.lote == "some lote"
      assert imovel.numero == 42
      assert imovel.ocupado == true
      assert imovel.quadra == "some quadra"
      assert imovel.rua == "some rua"
      assert imovel.sala == "some sala"
      assert imovel.tipo == "some tipo"
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
        lote: "some updated lote",
        numero: 43,
        ocupado: false,
        quadra: "some updated quadra",
        rua: "some updated rua",
        sala: "some updated sala",
        tipo: "some updated tipo",
        uf: "some updated uf",
        vistoria: false
      }

      assert {:ok, %Imovel{} = imovel} = Imoveis.update_imovel(imovel, update_attrs)
      assert imovel.bairro == "some updated bairro"
      assert imovel.cep == 43
      assert imovel.cidade == "some updated cidade"
      assert imovel.complemento == "some updated complemento"
      assert imovel.lote == "some updated lote"
      assert imovel.numero == 43
      assert imovel.ocupado == false
      assert imovel.quadra == "some updated quadra"
      assert imovel.rua == "some updated rua"
      assert imovel.sala == "some updated sala"
      assert imovel.tipo == "some updated tipo"
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

  describe "locatarios" do
    alias Api.Imoveis.Locatario

    import Api.ImoveisFixtures

    @invalid_attrs %{
      calcao: nil,
      celular: nil,
      cpf: nil,
      email: nil,
      nome: nil,
      profissao: nil,
      rg: nil
    }

    test "list_locatarios/0 returns all locatarios" do
      locatario = locatario_fixture()
      assert Imoveis.list_locatarios() == [locatario]
    end

    test "get_locatario!/1 returns the locatario with given id" do
      locatario = locatario_fixture()
      assert Imoveis.get_locatario!(locatario.id) == locatario
    end

    test "create_locatario/1 with valid data creates a locatario" do
      valid_attrs = %{
        calcao: "120.5",
        celular: "some celular",
        cpf: "some cpf",
        email: "some email",
        nome: "some nome",
        profissao: "some profissao",
        rg: "some rg"
      }

      assert {:ok, %Locatario{} = locatario} = Imoveis.create_locatario(valid_attrs)
      assert locatario.calcao == Decimal.new("120.5")
      assert locatario.celular == "some celular"
      assert locatario.cpf == "some cpf"
      assert locatario.email == "some email"
      assert locatario.nome == "some nome"
      assert locatario.profissao == "some profissao"
      assert locatario.rg == "some rg"
    end

    test "create_locatario/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_locatario(@invalid_attrs)
    end

    test "update_locatario/2 with valid data updates the locatario" do
      locatario = locatario_fixture()

      update_attrs = %{
        calcao: "456.7",
        celular: "some updated celular",
        cpf: "some updated cpf",
        email: "some updated email",
        nome: "some updated nome",
        profissao: "some updated profissao",
        rg: "some updated rg"
      }

      assert {:ok, %Locatario{} = locatario} = Imoveis.update_locatario(locatario, update_attrs)
      assert locatario.calcao == Decimal.new("456.7")
      assert locatario.celular == "some updated celular"
      assert locatario.cpf == "some updated cpf"
      assert locatario.email == "some updated email"
      assert locatario.nome == "some updated nome"
      assert locatario.profissao == "some updated profissao"
      assert locatario.rg == "some updated rg"
    end

    test "update_locatario/2 with invalid data returns error changeset" do
      locatario = locatario_fixture()
      assert {:error, %Ecto.Changeset{}} = Imoveis.update_locatario(locatario, @invalid_attrs)
      assert locatario == Imoveis.get_locatario!(locatario.id)
    end

    test "delete_locatario/1 deletes the locatario" do
      locatario = locatario_fixture()
      assert {:ok, %Locatario{}} = Imoveis.delete_locatario(locatario)
      assert_raise Ecto.NoResultsError, fn -> Imoveis.get_locatario!(locatario.id) end
    end

    test "change_locatario/1 returns a locatario changeset" do
      locatario = locatario_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_locatario(locatario)
    end
  end

  describe "manutencoes" do
    alias Api.Imoveis.Manutencao

    import Api.ImoveisFixtures

    @invalid_attrs %{
      data_final: nil,
      data_inicio: nil,
      descricao_servico: nil,
      tipo_servico: nil,
      valor_servico: nil
    }

    test "list_manutencoes/0 returns all manutencoes" do
      manutencao = manutencao_fixture()
      assert Imoveis.list_manutencoes() == [manutencao]
    end

    test "get_manutencao!/1 returns the manutencao with given id" do
      manutencao = manutencao_fixture()
      assert Imoveis.get_manutencao!(manutencao.id) == manutencao
    end

    test "create_manutencao/1 with valid data creates a manutencao" do
      valid_attrs = %{
        data_final: ~D[2021-11-21],
        data_inicio: ~D[2021-11-21],
        descricao_servico: "some descricao_servico",
        tipo_servico: "some tipo_servico",
        valor_servico: "120.5"
      }

      assert {:ok, %Manutencao{} = manutencao} = Imoveis.create_manutencao(valid_attrs)
      assert manutencao.data_final == ~D[2021-11-21]
      assert manutencao.data_inicio == ~D[2021-11-21]
      assert manutencao.descricao_servico == "some descricao_servico"
      assert manutencao.tipo_servico == "some tipo_servico"
      assert manutencao.valor_servico == Decimal.new("120.5")
    end

    test "create_manutencao/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_manutencao(@invalid_attrs)
    end

    test "update_manutencao/2 with valid data updates the manutencao" do
      manutencao = manutencao_fixture()

      update_attrs = %{
        data_final: ~D[2021-11-22],
        data_inicio: ~D[2021-11-22],
        descricao_servico: "some updated descricao_servico",
        tipo_servico: "some updated tipo_servico",
        valor_servico: "456.7"
      }

      assert {:ok, %Manutencao{} = manutencao} =
               Imoveis.update_manutencao(manutencao, update_attrs)

      assert manutencao.data_final == ~D[2021-11-22]
      assert manutencao.data_inicio == ~D[2021-11-22]
      assert manutencao.descricao_servico == "some updated descricao_servico"
      assert manutencao.tipo_servico == "some updated tipo_servico"
      assert manutencao.valor_servico == Decimal.new("456.7")
    end

    test "update_manutencao/2 with invalid data returns error changeset" do
      manutencao = manutencao_fixture()
      assert {:error, %Ecto.Changeset{}} = Imoveis.update_manutencao(manutencao, @invalid_attrs)
      assert manutencao == Imoveis.get_manutencao!(manutencao.id)
    end

    test "delete_manutencao/1 deletes the manutencao" do
      manutencao = manutencao_fixture()
      assert {:ok, %Manutencao{}} = Imoveis.delete_manutencao(manutencao)
      assert_raise Ecto.NoResultsError, fn -> Imoveis.get_manutencao!(manutencao.id) end
    end

    test "change_manutencao/1 returns a manutencao changeset" do
      manutencao = manutencao_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_manutencao(manutencao)
    end
  end

  describe "locadores" do
    alias Api.Imoveis.Locador

    import Api.ImoveisFixtures

    @invalid_attrs %{
      bairro: nil,
      celular: nil,
      cep: nil,
      cidade: nil,
      cpf: nil,
      email: nil,
      endereco: nil,
      nome: nil,
      numero: nil,
      rg: nil,
      telefone_fixo: nil,
      uf: nil
    }

    test "list_locadores/0 returns all locadores" do
      locador = locador_fixture()
      assert Imoveis.list_locadores() == [locador]
    end

    test "get_locador!/1 returns the locador with given id" do
      locador = locador_fixture()
      assert Imoveis.get_locador!(locador.id) == locador
    end

    test "create_locador/1 with valid data creates a locador" do
      valid_attrs = %{
        bairro: "some bairro",
        celular: "some celular",
        cep: 42,
        cidade: "some cidade",
        cpf: "some cpf",
        email: "some email",
        endereco: "some endereco",
        nome: "some nome",
        numero: 42,
        rg: "some rg",
        telefone_fixo: "some telefone_fixo",
        uf: "some uf"
      }

      assert {:ok, %Locador{} = locador} = Imoveis.create_locador(valid_attrs)
      assert locador.bairro == "some bairro"
      assert locador.celular == "some celular"
      assert locador.cep == 42
      assert locador.cidade == "some cidade"
      assert locador.cpf == "some cpf"
      assert locador.email == "some email"
      assert locador.endereco == "some endereco"
      assert locador.nome == "some nome"
      assert locador.numero == 42
      assert locador.rg == "some rg"
      assert locador.telefone_fixo == "some telefone_fixo"
      assert locador.uf == "some uf"
    end

    test "create_locador/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_locador(@invalid_attrs)
    end

    test "update_locador/2 with valid data updates the locador" do
      locador = locador_fixture()

      update_attrs = %{
        bairro: "some updated bairro",
        celular: "some updated celular",
        cep: 43,
        cidade: "some updated cidade",
        cpf: "some updated cpf",
        email: "some updated email",
        endereco: "some updated endereco",
        nome: "some updated nome",
        numero: 43,
        rg: "some updated rg",
        telefone_fixo: "some updated telefone_fixo",
        uf: "some updated uf"
      }

      assert {:ok, %Locador{} = locador} = Imoveis.update_locador(locador, update_attrs)
      assert locador.bairro == "some updated bairro"
      assert locador.celular == "some updated celular"
      assert locador.cep == 43
      assert locador.cidade == "some updated cidade"
      assert locador.cpf == "some updated cpf"
      assert locador.email == "some updated email"
      assert locador.endereco == "some updated endereco"
      assert locador.nome == "some updated nome"
      assert locador.numero == 43
      assert locador.rg == "some updated rg"
      assert locador.telefone_fixo == "some updated telefone_fixo"
      assert locador.uf == "some updated uf"
    end

    test "update_locador/2 with invalid data returns error changeset" do
      locador = locador_fixture()
      assert {:error, %Ecto.Changeset{}} = Imoveis.update_locador(locador, @invalid_attrs)
      assert locador == Imoveis.get_locador!(locador.id)
    end

    test "delete_locador/1 deletes the locador" do
      locador = locador_fixture()
      assert {:ok, %Locador{}} = Imoveis.delete_locador(locador)
      assert_raise Ecto.NoResultsError, fn -> Imoveis.get_locador!(locador.id) end
    end

    test "change_locador/1 returns a locador changeset" do
      locador = locador_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_locador(locador)
    end
  end

  describe "manutencoes" do
    alias Api.Imoveis.Manutencao

    import Api.ImoveisFixtures

    @invalid_attrs %{
      data_final: nil,
      data_inicio: nil,
      descricao_servico: nil,
      tipo_servico: nil,
      valor_servico: nil
    }

    test "list_manutencoes/0 returns all manutencoes" do
      manutencao = manutencao_fixture()
      assert Imoveis.list_manutencoes() == [manutencao]
    end

    test "get_manutencao!/1 returns the manutencao with given id" do
      manutencao = manutencao_fixture()
      assert Imoveis.get_manutencao!(manutencao.id) == manutencao
    end

    test "create_manutencao/1 with valid data creates a manutencao" do
      valid_attrs = %{
        data_final: ~D[2021-11-23],
        data_inicio: ~D[2021-11-23],
        descricao_servico: "some descricao_servico",
        tipo_servico: "some tipo_servico",
        valor_servico: "120.5"
      }

      assert {:ok, %Manutencao{} = manutencao} = Imoveis.create_manutencao(valid_attrs)
      assert manutencao.data_final == ~D[2021-11-23]
      assert manutencao.data_inicio == ~D[2021-11-23]
      assert manutencao.descricao_servico == "some descricao_servico"
      assert manutencao.tipo_servico == "some tipo_servico"
      assert manutencao.valor_servico == Decimal.new("120.5")
    end

    test "create_manutencao/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Imoveis.create_manutencao(@invalid_attrs)
    end

    test "update_manutencao/2 with valid data updates the manutencao" do
      manutencao = manutencao_fixture()

      update_attrs = %{
        data_final: ~D[2021-11-24],
        data_inicio: ~D[2021-11-24],
        descricao_servico: "some updated descricao_servico",
        tipo_servico: "some updated tipo_servico",
        valor_servico: "456.7"
      }

      assert {:ok, %Manutencao{} = manutencao} =
               Imoveis.update_manutencao(manutencao, update_attrs)

      assert manutencao.data_final == ~D[2021-11-24]
      assert manutencao.data_inicio == ~D[2021-11-24]
      assert manutencao.descricao_servico == "some updated descricao_servico"
      assert manutencao.tipo_servico == "some updated tipo_servico"
      assert manutencao.valor_servico == Decimal.new("456.7")
    end

    test "update_manutencao/2 with invalid data returns error changeset" do
      manutencao = manutencao_fixture()
      assert {:error, %Ecto.Changeset{}} = Imoveis.update_manutencao(manutencao, @invalid_attrs)
      assert manutencao == Imoveis.get_manutencao!(manutencao.id)
    end

    test "delete_manutencao/1 deletes the manutencao" do
      manutencao = manutencao_fixture()
      assert {:ok, %Manutencao{}} = Imoveis.delete_manutencao(manutencao)
      assert_raise Ecto.NoResultsError, fn -> Imoveis.get_manutencao!(manutencao.id) end
    end

    test "change_manutencao/1 returns a manutencao changeset" do
      manutencao = manutencao_fixture()
      assert %Ecto.Changeset{} = Imoveis.change_manutencao(manutencao)
    end
  end

  describe "imoveis" do
    alias Api.Imoveis.Imovel

    import Api.ImoveisFixtures

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
end
