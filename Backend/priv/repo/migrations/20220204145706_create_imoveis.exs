defmodule Api.Repo.Migrations.CreateImoveis do
  use Ecto.Migration

  def change do
    create table(:imoveis) do
      add :endereco, :text
      add :numero, :integer
      add :bairro, :string
      add :cep, :integer
      add :cidade, :string
      add :uf, :string
      add :vistoria, :boolean, default: false, null: false
      add :ocupado, :boolean, default: false, null: false

      timestamps()
    end
  end
end
