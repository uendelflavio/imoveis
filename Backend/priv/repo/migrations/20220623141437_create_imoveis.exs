defmodule Api.Repo.Migrations.CreateImoveis do
  use Ecto.Migration

  def change do
    create table(:imoveis) do
      add(:endereco, :text)
      add(:numero, :integer)
      add(:bairro, :string, size: 50)
      add(:cep, :varchar, size: 10)
      add(:cidade, :string, size: 50)
      add(:uf, :string, size: 2)
      add(:vistoria, :boolean, default: false, null: false)
      add(:ocupado, :boolean, default: false, null: false)
      add(:complemento, :string, size: 100)
      timestamps()
    end
  end
end
