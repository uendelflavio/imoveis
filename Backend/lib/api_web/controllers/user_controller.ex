defmodule ApiWeb.UserController do
  use ApiWeb, :controller

  alias Api.Account
  alias Api.Account.User

  action_fallback ApiWeb.FallbackController

  def register(conn, %{"user" => user_params}) do
    with {:ok, user} <- Account.create_user(user_params) do
      conn
      |> put_status(:created)
      |> text("User successfully registered with email:" <> "  " <> user.email)
    end
  end
end
