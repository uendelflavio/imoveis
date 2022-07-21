defmodule Api.Imoveis.ImovelDocumento do
  @moduledoc """
  Module Imovel Documento
  """
  use Ecto.Schema
  import Ecto.Changeset

  schema "imoveldocumentos" do
    field(:documento, :string)
    field(:descricao, :string)
    belongs_to(:imovel, Api.Imoveis.Imovel)
    timestamps()
  end

  @doc false
  def changeset(imovel_documento, attrs) do
    imovel_documento
    |> cast(attrs, [:documento, :descricao, :imovel_id])
    |> validate_required([:documento, :descricao, :imovel_id])
  end
end
