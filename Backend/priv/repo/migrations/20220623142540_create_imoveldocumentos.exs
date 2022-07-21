defmodule Api.Repo.Migrations.CreateImoveldocumentos do
  use Ecto.Migration

  def change do
    create table(:imoveldocumentos) do
      add(:documento, :text)
      add(:descricao, :string, size: 100)
      add(:imovel_id, references(:imoveis, on_delete: :delete_all), null: false)
      timestamps()
    end

    create(index(:imoveldocumentos, [:imovel_id]))
  end
end
