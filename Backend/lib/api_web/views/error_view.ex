defmodule ApiWeb.ErrorView do
  use ApiWeb, :view

  # If you want to customize a particular status code
  # for a certain format, you may uncomment below.
  def render("504.json", _assigns) do
    %{errors: %{detail: "Gateway Timeout"}}
  end

  def render("503.json", _assigns) do
    %{errors: %{detail: "Service Unavailable"}}
  end

  def render("502.json", _assigns) do
    %{errors: %{detail: "Bad Gateway"}}
  end

  def render("501.json", _assigns) do
    %{errors: %{detail: "Not Implemented"}}
  end

  def render("500.json", _assigns) do
    %{errors: %{detail: "Internal Server Error"}}
  end

  def render("405.json", _assigns) do
    %{errors: %{detail: "Method Not Allowed"}}
  end

  def render("404.json", _assigns) do
    %{errors: %{detail: "Not Found"}}
  end

  def render("403.json", _assigns) do
    %{errors: %{detail: "Forbidden"}}
  end

  def render("401.json", _assigns) do
    %{errors: %{detail: "Unauthorized"}}
  end

  def render("400.json", _assigns) do
    %{errors: %{detail: "Bad Request"}}
  end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.json" becomes
  # "Not Found".
  # def template_not_found(template, _assigns) do
  #   %{errors: %{detail: Phoenix.Controller.status_message_from_template(template)}}
  # end
end
