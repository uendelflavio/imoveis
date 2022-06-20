defmodule ApiWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :api

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  @session_options [
    store: :cookie,
    key: "_api_key",
    signing_salt: "sElZ0bqa"
  ]

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phx.digest
  # when deploying your static files in production.
  # plug Plug.Static,
  #  at: "/",
  #  from: :api,
  #  gzip: false,
  #  only: ~w(assets fonts images favicon.ico robots.txt)

  plug(Plug.Static,
    at: "/",
    from: {:api, "/priv/static"}
  )

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    plug(Phoenix.CodeReloader)
    plug(Phoenix.Ecto.CheckRepoStatus, otp_app: :api)
  end

  plug(Phoenix.LiveDashboard.RequestLogger,
    param_key: "request_logger",
    cookie_key: "request_logger"
  )

  plug(Plug.RequestId)

  plug(Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Phoenix.json_library()
  )

  plug(Plug.MethodOverride)
  plug(Plug.Head)
  plug(Plug.Session, @session_options)

  plug(CORSPlug,
    origin: ["http://localhost:3000", "http://localhost:4000"],
    max_age: 86_400,
    expose: [],
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: [
      "Authorization",
      "Content-Type",
      "Accept",
      "Origin",
      "User-Agent",
      "DNT",
      "Cache-Control",
      "X-Mx-ReqToken",
      "Keep-Alive",
      "X-Requested-With",
      "If-Modified-Since",
      "Bearer",
      "X-File-Name"
    ]
  )

  plug(ApiWeb.Router)
end
