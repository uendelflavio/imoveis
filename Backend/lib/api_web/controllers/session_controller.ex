defmodule ApiWeb.SessionController do
  use ApiWeb, :controller

  alias Api.Account
  alias Api.Guardian

  action_fallback(ApiWeb.FallbackController)

  def new(conn, %{"email" => email, "password" => password}) do
    case Account.authenticate_user(email, password) do
      {:ok, user} ->
        {:ok, access_token, _claims} =
          Guardian.encode_and_sign(user, %{code: "#{email}-#{String.length(email)}"},
            token_type: "access",
            ttl: {100, :minute}
          )

        # Guardian.encode_and_sign(user, %{}, token_type: "refresh", ttl: {7, :day})
        {:ok, refresh_token, _claims} =
          Guardian.encode_and_sign(user, %{}, token_type: "refresh", ttl: {2, :minute})

        conn
        |> put_resp_cookie("ruid", refresh_token)
        |> put_status(:created)
        |> render("token.json", access_token: access_token)

      {:error, :unauthorized} ->
        body = Jason.encode!(%{error: "Unauthorized"})

        conn
        |> send_resp(401, body)
    end
  end

  def refresh(conn, _params) do
    refresh_token =
      Plug.Conn.fetch_cookies(conn)
      |> Map.from_struct()
      |> get_in([:cookies, "ruid"])

    IO.inspect(_params)

    case Guardian.exchange(refresh_token, "refresh", "access") do
      {:ok, _old_stuff, {new_access_token, _new_claims}} ->
        conn
        |> put_status(:created)
        |> render("token.json", %{access_token: new_access_token})

      {:error, _reason} ->
        body = Jason.encode!(%{error: "Unauthorized"})

        conn
        |> send_resp(401, body)
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_resp_cookie("ruid")
    |> put_status(200)
    |> text("Log out successful.")
  end
end
