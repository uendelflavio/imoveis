defmodule Api.Repo do
  use Ecto.Repo, otp_app: :api, adapter: Ecto.Adapters.Postgres
  use Scrivener, page_size: 1
end
