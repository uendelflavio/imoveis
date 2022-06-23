defmodule Api.Imoveis.Imovel do
  use Ecto.Schema
  import Ecto.Changeset
  # @primary_key {:id, :binary_id, autogenerate: true}
  schema "imoveis" do
    field(:bairro, :string)
    field(:cep, :string)
    field(:cidade, :string)
    field(:endereco, :string)
    field(:numero, :integer, default: 0)
    field(:uf, :string)
    field(:ocupado, :boolean, default: false)
    field(:vistoria, :boolean, default: false)
    field(:complemento, :string)
    has_one(:detalhe_imovel, DetalheImovel)
    has_one(:imagem_imovel, ImagemImovel)
    has_one(:documento_imovel, DocumentosImovel)
    timestamps()
  end

  @doc false
  def changeset(imovel, attrs) do
    imovel
    |> cast(attrs, [:endereco, :numero, :bairro, :cep, :cidade, :uf, :vistoria, :ocupado])
    |> validate_required([:endereco, :numero, :bairro, :cep, :cidade, :uf, :vistoria, :ocupado])
  end
end
