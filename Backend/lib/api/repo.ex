defmodule Api.Repo do
  use Ecto.Repo, otp_app: :api, adapter: Ecto.Adapters.Postgres
  use Phoenix.Pagination, per_page: 15
end
