defmodule Api.Imoveis do
  @moduledoc """
  The Imoveis context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.Imoveis.Imovel

  @doc """
  Returns the list of imoveis.

  ## Examples

      iex> list_imoveis()
      [%Imovel{}, ...]

  """
  def list_imoveis do
    query = from(i in Imovel, order_by: i.id)
    Repo.all(query)
  end

  @doc """
  Returns the list of imoveis with paginate.

  ## Examples

      iex> paginate_imoveis()
      [%Imovel{}, ...]

  """
  def paginate_imoveis(params) do
    Repo.paginate(Imovel, params)
  end

  @doc """
  Gets a single imovel.

  Raises `Ecto.NoResultsError` if the Imovel does not exist.

  ## Examples

      iex> get_imovel!(123)
      %Imovel{}

      iex> get_imovel!(456)
      ** (Ecto.NoResultsError)

  """
  def get_imovel!(id), do: Repo.get!(Imovel, id)

  @doc """
  Creates a imovel.

  ## Examples

      iex> create_imovel(%{field: value})
      {:ok, %Imovel{}}

      iex> create_imovel(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_imovel(attrs \\ %{}) do
    %Imovel{}
    |> Imovel.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a imovel.

  ## Examples

      iex> update_imovel(imovel, %{field: new_value})
      {:ok, %Imovel{}}

      iex> update_imovel(imovel, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_imovel(%Imovel{} = imovel, attrs) do
    imovel
    |> Imovel.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a imovel.

  ## Examples

      iex> delete_imovel(imovel)
      {:ok, %Imovel{}}

      iex> delete_imovel(imovel)
      {:error, %Ecto.Changeset{}}

  """
  def delete_imovel(%Imovel{} = imovel) do
    Repo.delete(imovel)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking imovel changes.

  ## Examples

      iex> change_imovel(imovel)
      %Ecto.Changeset{data: %Imovel{}}

  """
  def change_imovel(%Imovel{} = imovel, attrs \\ %{}) do
    Imovel.changeset(imovel, attrs)
  end
end
