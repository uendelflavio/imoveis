defmodule Api.Repo.Migrations.CreateImoveldetalhes do
  use Ecto.Migration

  def change do
    create table(:imoveldetalhes) do
      add(:area_total_m2, :integer)
      add(:area_total_construida_m2, :integer)
      add(:numero_inscricao, :string, size: 40)
      add(:matricula_agua, :string, size: 20)
      add(:matricula_energia, :string, size: 20)
      add(:classificacao, :string, size: 20)
      add(:salas, :integer)
      add(:quartos, :integer)
      add(:banheiros, :integer)
      add(:suites, :integer)
      add(:vagas_garagem, :integer)
      add(:area_lazer, :boolean, default: false, null: false)
      add(:piscina, :boolean, default: false, null: false)
      add(:agua_incluso, :boolean, default: false, null: false)
      add(:gas_incluso, :boolean, default: false, null: false)
      add(:seguranca_incluso, :boolean, default: false, null: false)
      add(:imovel_id, references(:imoveis, on_delete: :delete_all), null: false)
      timestamps()
    end

    create(unique_index(:imoveldetalhes, [:imovel_id]))
  end
end
