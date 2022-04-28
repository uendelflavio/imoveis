defmodule Api.Imoveis.Imovel do
  use Ecto.Schema
  import Ecto.Changeset

  schema "imoveis" do
    field :bairro, :string
    field :cep, :integer
    field :cidade, :string
    field :endereco, :string
    field :numero, :integer
    field :ocupado, :boolean, default: false
    field :uf, :string
    field :vistoria, :boolean, default: false

    timestamps()
  end

  @doc false
  def changeset(imovel, attrs) do
    imovel
    |> cast(attrs, [:endereco, :numero, :bairro, :cep, :cidade, :uf, :vistoria, :ocupado])
    |> validate_required([:endereco, :numero, :bairro, :cep, :cidade, :uf, :vistoria, :ocupado])
  end
end
