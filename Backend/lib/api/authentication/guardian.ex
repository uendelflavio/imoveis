defmodule Api.Guardian do
  @moduledoc """
  Module Guardian
  """
  use Guardian, otp_app: :api
  alias Api.Account

  def subject_for_token(%{email: email}, _claims) do
    sub = email
    {:ok, sub}
  end

  def resource_from_claims(claims) do
    email = claims["sub"]

    resource = Account.get_by_email(email)
    {:ok, resource}
  end
end
