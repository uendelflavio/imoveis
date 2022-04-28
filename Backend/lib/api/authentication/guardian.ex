defmodule Api.Guardian do
  use Guardian, otp_app: :api
  alias Api.Account

  def subject_for_token(%{id: id}, _claims) do
    sub = to_string(id)
    {:ok, sub}
  end

  def resource_from_claims(claims) do
    id = claims["sub"]

    resource = Account.get_by_id!(id)
    {:ok, resource}
  end
end
