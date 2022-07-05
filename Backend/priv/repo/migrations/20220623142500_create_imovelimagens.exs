defmodule Api.Repo.Migrations.CreateImovelimagens do
  use Ecto.Migration

  def change do
    create table(:imovelimagens) do
      add(:imagem, :string, size: 255)
      add(:descricao, :string, size: 100)
      add(:imovel_id, references(:imoveis, on_delete: :delete_all), null: false)
      timestamps()
    end

    create(index(:imovelimagens, [:imovel_id]))
  end
end
