defmodule Api.Account.User do
  @moduledoc """
  Module User
  """
  use Ecto.Schema
  import Ecto.Changeset

  alias Argon2

  schema "users" do
    field(:email, :string)
    field(:password, :string)
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> unique_constraint(:email)
  end

  @doc false
  def registration_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
    |> encrypt_and_put_password()
  end

  defp encrypt_and_put_password(user) do
    with password <- fetch_field!(user, :password) do
      encrypted_password = Argon2.hash_pwd_salt(password)
      put_change(user, :password, encrypted_password)
    end
  end
end
