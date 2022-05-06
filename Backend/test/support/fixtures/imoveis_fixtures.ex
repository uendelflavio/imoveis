defmodule Api.ImoveisFixtures do
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
