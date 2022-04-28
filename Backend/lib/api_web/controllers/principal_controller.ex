defmodule ApiWeb.PrincipalController do
  use ApiWeb, :controller

  def principal(conn, _params) do
    render(conn, "index.html")
  end
end
