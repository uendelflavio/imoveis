defmodule Api.Imoveis.ImovelImagem do
  @moduledoc """
  Module Imovel Imagem
  """
  use Ecto.Schema
  import Ecto.Changeset

  schema "imovelimagens" do
    field(:imagem, :string)
    field(:descricao, :string)
    belongs_to(:imovel, Api.Imoveis.Imovel)
    timestamps()
  end

  @doc false
  def changeset(imovel_imagem, attrs) do
    imovel_imagem
    |> cast(attrs, [:imagem, :descricao, :imovel_id])
    |> validate_required([:imagem, :descricao, :imovel_id])
    |> foreign_key_constraint(:imovel_id)
  end
end
