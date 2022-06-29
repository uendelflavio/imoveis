defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :api do
    plug(CORSPlug, origem: ["*"])
    plug(:accepts, ["json"])
  end

  pipeline :auth do
    plug(Api.Guardian.AuthPipeline)
  end

  pipeline :browser do
    plug(:accepts, ["html"])
  end

  scope "/api", ApiWeb do
    pipe_through(:api)
    post("/users", UserController, :register)
    post("/session/new", SessionController, :new)
    resources("/imoveisdetalhe", ImovelDetalheController)
  end

  scope "/api", ApiWeb do
    pipe_through([:api, :auth])

    post("/session/refresh", SessionController, :refresh)
    delete("/session/delete", SessionController, :delete)
    resources("/imoveis", ImovelController)

    resources("/imoveisdocumento", ImovelDocumentoController)
    resources("/imoveisimagem", ImovelImagemController)
  end

  scope "/", ApiWeb do
    pipe_through([:browser])
    get("/", PrincipalController, :principal)
  end

  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through([:fetch_session, :protect_from_forgery])
      forward("/mailbox", Plug.Swoosh.MailboxPreview)
    end
  end
end
