defmodule Api.Imoveis.DetalheImovel do
  use Ecto.Schema
  import Ecto.Changeset
  # @primary_key {:id, :binary_id, autogenerate: true}
  schema "detalhe_imoveis" do
    field(:imovel_id, :integer)
    field(:area_total_m2, :string)
    field(:area_construida_m2, :string)
    field(:numero_inscricao, :string)
    field(:matricula_agua, :integer, default: 0)
    field(:matricula_energia, :integer, default: 0)
    field(:classificacao, :string)
    field(:salas, :integer, default: 0)
    field(:quartos, :integer, default: 0)
    field(:banheiros, :integer, default: 0)
    field(:suites, :integer, default: 0)
    field(:vagas_garagem, :integer, default: 0)
    field(:area_lazer, :boolean, default: false)
    field(:piscina, :boolean, default: false)
    field(:agua_incluso, :boolean, default: false)
    field(:gas_incluso, :boolean, default: false)
    field(:seguranca_incluso, :boolean, default: false)
    timestamps()
    belongs_to(:imovel, Api.Imoveis.Imovel, define_field: false)
  end

  @doc false
  def changeset(detalhe_imovel, attrs) do
    detalhe_imovel
    |> cast(attrs, [
      :area_total_m2,
      :area_construida_m2,
      :numero_inscricao,
      :matricula_agua,
      :matricula_energia,
      :classificacao,
      :salas,
      :quartos,
      :banheiros,
      :suites,
      :vagas_garagem,
      :area_lazer,
      :piscina,
      :agua_incluso,
      :gas_incluso,
      :seguranca_incluso
    ])
    |> foreign_key_constraint(:detalhe_imovel)
  end
end
