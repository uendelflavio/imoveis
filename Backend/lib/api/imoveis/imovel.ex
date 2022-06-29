defmodule Api.Imoveis.Imovel do
  @moduledoc """
  Module Imovel
  """
  use Ecto.Schema
  import Ecto.Changeset

  schema "imoveis" do
    field(:bairro, :string)
    field(:cep, :string)
    field(:cidade, :string)
    field(:complemento, :string)
    field(:endereco, :string)
    field(:numero, :integer)
    field(:ocupado, :boolean, default: false)
    field(:uf, :string)
    field(:vistoria, :boolean, default: false)
    has_one(:imovel_detalhe, Api.Imoveis.ImovelDetalhe)
    has_many(:imovel_imagem, Api.Imoveis.ImovelImagem)
    has_many(:imovel_documento, Api.Imoveis.ImovelDocumento)
    timestamps()
  end

  @doc false
  def changeset(imovel, attrs) do
    imovel
    |> cast(attrs, [
      :endereco,
      :numero,
      :bairro,
      :cep,
      :cidade,
      :uf,
      :vistoria,
      :ocupado,
      :complemento
    ])
    |> validate_required([:endereco, :numero, :bairro, :cep, :cidade, :uf, :vistoria, :ocupado])
  end
end
