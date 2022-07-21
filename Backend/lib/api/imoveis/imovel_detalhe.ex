defmodule Api.Imoveis.ImovelDetalhe do
  @moduledoc """
  Module Imovel Detalhe
  """

  use Ecto.Schema
  import Ecto.Changeset

  schema "imoveldetalhes" do
    field(:agua_incluso, :boolean, default: false)
    field(:area_lazer, :boolean, default: false)
    field(:area_total_construida_m2, :integer)
    field(:area_total_m2, :integer)
    field(:banheiros, :integer)
    field(:classificacao, :string)
    field(:gas_incluso, :boolean, default: false)
    field(:matricula_agua, :integer)
    field(:matricula_energia, :integer)
    field(:numero_inscricao, :string)
    field(:piscina, :boolean, default: false)
    field(:quartos, :integer)
    field(:salas, :integer)
    field(:seguranca_incluso, :boolean, default: false)
    field(:suites, :integer)
    field(:vagas_garagem, :integer)
    belongs_to(:imovel, Api.Imoveis.Imovel)
    timestamps()
  end

  @doc false
  def changeset(imovel_detalhe, attrs) do
    imovel_detalhe
    |> cast(attrs, [
      :imovel_id,
      :area_total_m2,
      :area_total_construida_m2,
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
    |> validate_required([
      :area_total_m2,
      :area_total_construida_m2,
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
      :seguranca_incluso,
      :imovel_id
    ])
    |> unique_constraint(:imovel_id)
  end
end
