defmodule Api.ImoveisFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Imoveis` context.
  """

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
        endereco: "some endereco",
        numero: 42,
        ocupado: true,
        uf: "some uf",
        vistoria: true
      })
      |> Api.Imoveis.create_imovel()

    imovel
  end

  @doc """
  Generate a imovel_detalhe.
  """
  def imovel_detalhe_fixture(attrs \\ %{}) do
    {:ok, imovel_detalhe} =
      attrs
      |> Enum.into(%{
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
      })
      |> Api.Imoveis.create_imovel_detalhe()

    imovel_detalhe
  end

  @doc """
  Generate a imovel_imagem.
  """
  def imovel_imagem_fixture(attrs \\ %{}) do
    {:ok, imovel_imagem} =
      attrs
      |> Enum.into(%{
        link: "some link"
      })
      |> Api.Imoveis.create_imovel_imagem()

    imovel_imagem
  end

  @doc """
  Generate a imovel_documento.
  """
  def imovel_documento_fixture(attrs \\ %{}) do
    {:ok, imovel_documento} =
      attrs
      |> Enum.into(%{
        link: "some link"
      })
      |> Api.Imoveis.create_imovel_documento()

    imovel_documento
  end
end
