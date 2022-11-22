defmodule ApiWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use ApiWeb, :controller

  # This clause handles errors returned by Ecto's insert/update/delete.
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(ApiWeb.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :bad_request}) do
    conn
    |> put_status(401)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"400")
  end

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(401)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"401")
  end

  def call(conn, {:error, :forbidden}) do
    conn
    |> put_status(:forbidden)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"403")
  end

  # This clause is an example of how to handle resources that cannot be found.
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, :method_not_allowed}) do
    conn
    |> put_status(:method_not_allowed)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"405")
  end

  def call(conn, {:error, :server_error}) do
    conn
    |> put_status(500)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"500")
  end

  def call(conn, {:error, :not_Implemented}) do
    conn
    |> put_status(501)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"501")
  end

  def call(conn, {:error, :bad_gateway}) do
    conn
    |> put_status(502)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"502")
  end

  def call(conn, {:error, :service_unavailable}) do
    conn
    |> put_status(503)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"503")
  end

  def call(conn, {:error, :gateway_timeout}) do
    conn
    |> put_status(504)
    |> put_view(ApiWeb.ErrorView)
    |> render(:"504")
  end
end
