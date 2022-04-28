defmodule Api.ImoveisFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Imoveis` context.
  """

  @doc """
  Generate a locador.
  """
  def locador_fixture(attrs \\ %{}) do
    {:ok, locador} =
      attrs
      |> Enum.into(%{
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
      })
      |> Api.Imoveis.create_locador()

    locador
  end

  @doc """
  Generate a profissional.
  """
  def profissional_fixture(attrs \\ %{}) do
    {:ok, profissional} =
      attrs
      |> Enum.into(%{
        celular: "some celular",
        funcao: "some funcao",
        nome: "some nome"
      })
      |> Api.Imoveis.create_profissional()

    profissional
  end

  @doc """
  Generate a imovel.
  """
  def imovel_fixture(attrs \\ %{}) do
    {:ok, imovel} =
      attrs
      |> Enum.into(%{
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
      })
      |> Api.Imoveis.create_imovel()

    imovel
  end

  @doc """
  Generate a locatario.
  """
  def locatario_fixture(attrs \\ %{}) do
    {:ok, locatario} =
      attrs
      |> Enum.into(%{
        calcao: "120.5",
        celular: "some celular",
        cpf: "some cpf",
        email: "some email",
        nome: "some nome",
        profissao: "some profissao",
        rg: "some rg"
      })
      |> Api.Imoveis.create_locatario()

    locatario
  end

  @doc """
  Generate a manutencao.
  """
  def manutencao_fixture(attrs \\ %{}) do
    {:ok, manutencao} =
      attrs
      |> Enum.into(%{
        data_final: ~D[2021-11-21],
        data_inicio: ~D[2021-11-21],
        descricao_servico: "some descricao_servico",
        tipo_servico: "some tipo_servico",
        valor_servico: "120.5"
      })
      |> Api.Imoveis.create_manutencao()

    manutencao
  end

  @doc """
  Generate a locador.
  """
  def locador_fixture(attrs \\ %{}) do
    {:ok, locador} =
      attrs
      |> Enum.into(%{
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
      })
      |> Api.Imoveis.create_locador()

    locador
  end

  @doc """
  Generate a manutencao.
  """
  def manutencao_fixture(attrs \\ %{}) do
    {:ok, manutencao} =
      attrs
      |> Enum.into(%{
        data_final: ~D[2021-11-23],
        data_inicio: ~D[2021-11-23],
        descricao_servico: "some descricao_servico",
        tipo_servico: "some tipo_servico",
        valor_servico: "120.5"
      })
      |> Api.Imoveis.create_manutencao()

    manutencao
  end

  @doc """
  Generate a imovel.
  """
  def imovel_fixture(attrs \\ %{}) do
    {:ok, imovel} =
      attrs
      |> Enum.into(%{
        bairro: "some bairro",
        cep: 42,
        cidade: "some cidade",
        endereco: "some endereco",
        numero: 42,
        ocupado: true,
        uf: "some uf",
        vistoria: true
      })
      |> Api.Imoveis.create_imovel()

    imovel
  end
end
