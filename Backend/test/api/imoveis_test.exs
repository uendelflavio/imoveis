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

      assert {:ok, %ImovelImagem{} = imovel_imagem} = Imoveis.update_imovel_imagem(imovel_imagem, update_attrs)
      assert imovel_imagem.link == "some updated link"
    end

    test "update_imovel_imagem/2 with invalid data returns error changeset" do
      imovel_imagem = imovel_imagem_fixture()
      assert {:error, %Ecto.Changeset{}} = Imoveis.update_imovel_imagem(imovel_imagem, @invalid_attrs)
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
end
