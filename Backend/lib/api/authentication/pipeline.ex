defmodule Api.Guardian.AuthPipeline do
  @moduledoc """
  Module Guardian Authentication Pipeline
  """
  @claims %{typ: "access"}

  use Guardian.Plug.Pipeline,
    otp_app: :api,
    module: Api.Guardian,
    error_handler: Api.Guardian.AuthErrorHandler

  plug(Guardian.Plug.VerifyHeader, claims: @claims, realm: "Bearer")
  plug(Guardian.Plug.EnsureAuthenticated)
  plug(Guardian.Plug.LoadResource, ensure: true)
end
