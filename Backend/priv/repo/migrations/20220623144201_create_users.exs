defmodule Api.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:email, :string, size: 50)
      add(:password, :string, size: 120)
      timestamps()
    end
  end
end
