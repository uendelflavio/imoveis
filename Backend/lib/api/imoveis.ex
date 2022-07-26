defmodule Api.Imoveis do
  @moduledoc """
  The Imoveis context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.Imoveis.Imovel
  alias Api.Imoveis.ImovelDetalhe

  @doc """
  Returns the list of imoveis.

  ## Examples

      iex> list_imoveis()
      [%Imovel{}, ...]

  """
  def list_imoveis do
    Imovel |> order_by(asc: :inserted_at) |> Repo.all()
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

  def get_imovel_with_imagem!(id) do
    Imovel
    |> Repo.get!(id)
    |> Repo.preload([:imovel_imagem])
  end

  def get_imovel_with_detalhe!(id) do
    Imovel
    |> Repo.get!(id)
    |> Repo.preload([:imovel_detalhe])
  end

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

  alias Api.Imoveis.ImovelDetalhe

  @doc """
  Returns the list of imoveldetalhes.

  ## Examples

      iex> list_imoveldetalhes()
      [%ImovelDetalhe{}, ...]

  """
  def list_imoveldetalhes do
    ImovelDetalhe |> order_by(asc: :inserted_at) |> Repo.all()
  end

  @doc """
  Gets a single imovel_detalhe.

  Raises `Ecto.NoResultsError` if the Imovel detalhe does not exist.

  ## Examples

      iex> get_imovel_detalhe!(123)
      %ImovelDetalhe{}

      iex> get_imovel_detalhe!(456)
      ** (Ecto.NoResultsError)

  """
  def get_imovel_detalhe!(id), do: Repo.get!(ImovelDetalhe, id)

  @doc """
  Creates a imovel_detalhe.

  ## Examples

      iex> create_imovel_detalhe(%{field: value})
      {:ok, %ImovelDetalhe{}}

      iex> create_imovel_detalhe(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_imovel_detalhe(attrs \\ %{}) do
    %ImovelDetalhe{}
    |> ImovelDetalhe.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a imovel_detalhe.

  ## Examples

      iex> update_imovel_detalhe(imovel_detalhe, %{field: new_value})
      {:ok, %ImovelDetalhe{}}

      iex> update_imovel_detalhe(imovel_detalhe, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_imovel_detalhe(%ImovelDetalhe{} = imovel_detalhe, attrs) do
    imovel_detalhe
    |> ImovelDetalhe.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a imovel_detalhe.

  ## Examples

      iex> delete_imovel_detalhe(imovel_detalhe)
      {:ok, %ImovelDetalhe{}}

      iex> delete_imovel_detalhe(imovel_detalhe)
      {:error, %Ecto.Changeset{}}

  """
  def delete_imovel_detalhe(%ImovelDetalhe{} = imovel_detalhe) do
    Repo.delete(imovel_detalhe)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking imovel_detalhe changes.

  ## Examples

      iex> change_imovel_detalhe(imovel_detalhe)
      %Ecto.Changeset{data: %ImovelDetalhe{}}

  """
  def change_imovel_detalhe(%ImovelDetalhe{} = imovel_detalhe, attrs \\ %{}) do
    ImovelDetalhe.changeset(imovel_detalhe, attrs)
  end

  alias Api.Imoveis.ImovelImagem

  @doc """
  Returns the list of imovelimagens.

  ## Examples

      iex> list_imovelimagens()
      [%ImovelImagem{}, ...]

  """
  def list_imovelimagens do
    ImovelImagem |> order_by(asc: :inserted_at) |> Repo.all()
  end

  @doc """
  Gets a single imovel_imagem.

  Raises `Ecto.NoResultsError` if the Imovel imagem does not exist.

  ## Examples

      iex> get_imovel_imagem!(123)
      %ImovelImagem{}

      iex> get_imovel_imagem!(456)
      ** (Ecto.NoResultsError)

  """
  def get_imovel_imagem!(id), do: Repo.get!(ImovelImagem, id)

  @doc """
  Creates a imovel_imagem.

  ## Examples

      iex> create_imovel_imagem(%{field: value})
      {:ok, %ImovelImagem{}}

      iex> create_imovel_imagem(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_imovel_imagem(attrs \\ %{}) do
    %ImovelImagem{}
    |> ImovelImagem.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a imovel_imagem.

  ## Examples

      iex> update_imovel_imagem(imovel_imagem, %{field: new_value})
      {:ok, %ImovelImagem{}}

      iex> update_imovel_imagem(imovel_imagem, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_imovel_imagem(%ImovelImagem{} = imovel_imagem, attrs) do
    imovel_imagem
    |> ImovelImagem.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a imovel_imagem.

  ## Examples

      iex> delete_imovel_imagem(imovel_imagem)
      {:ok, %ImovelImagem{}}

      iex> delete_imovel_imagem(imovel_imagem)
      {:error, %Ecto.Changeset{}}

  """
  def delete_imovel_imagem(%ImovelImagem{} = imovel_imagem) do
    Repo.delete(imovel_imagem)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking imovel_imagem changes.

  ## Examples

      iex> change_imovel_imagem(imovel_imagem)
      %Ecto.Changeset{data: %ImovelImagem{}}

  """
  def change_imovel_imagem(%ImovelImagem{} = imovel_imagem, attrs \\ %{}) do
    ImovelImagem.changeset(imovel_imagem, attrs)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` quantity images.

  ## Examples
      iex> count_imovel_imagem(id)
      %Ecto.Changeset{data: %ImovelImagem{}}

  """
  def count_imovel_imagem!(id) do
    Imovel
    |> Repo.get(id)
    |> Ecto.assoc(:imovel_imagem)
    |> Repo.aggregate(:count, :id)
  end

  alias Api.Imoveis.ImovelDocumento

  @doc """
  Returns the list of imoveldocumentos.

  ## Examples

      iex> list_imoveldocumentos()
      [%ImovelDocumento{}, ...]

  """
  def list_imoveldocumentos do
    ImovelDocumento |> order_by(asc: :inserted_at) |> Repo.all()
  end

  @doc """
  Gets a single imovel_documento.

  Raises `Ecto.NoResultsError` if the Imovel documento does not exist.

  ## Examples

      iex> get_imovel_documento!(123)
      %ImovelDocumento{}

      iex> get_imovel_documento!(456)
      ** (Ecto.NoResultsError)

  """
  def get_imovel_documento!(id), do: Repo.get!(ImovelDocumento, id)

  @doc """
  Creates a imovel_documento.

  ## Examples

      iex> create_imovel_documento(%{field: value})
      {:ok, %ImovelDocumento{}}

      iex> create_imovel_documento(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_imovel_documento(attrs \\ %{}) do
    %ImovelDocumento{}
    |> ImovelDocumento.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a imovel_documento.

  ## Examples

      iex> update_imovel_documento(imovel_documento, %{field: new_value})
      {:ok, %ImovelDocumento{}}

      iex> update_imovel_documento(imovel_documento, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_imovel_documento(%ImovelDocumento{} = imovel_documento, attrs) do
    imovel_documento
    |> ImovelDocumento.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a imovel_documento.

  ## Examples

      iex> delete_imovel_documento(imovel_documento)
      {:ok, %ImovelDocumento{}}

      iex> delete_imovel_documento(imovel_documento)
      {:error, %Ecto.Changeset{}}

  """
  def delete_imovel_documento(%ImovelDocumento{} = imovel_documento) do
    Repo.delete(imovel_documento)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking imovel_documento changes.

  ## Examples

      iex> change_imovel_documento(imovel_documento)
      %Ecto.Changeset{data: %ImovelDocumento{}}

  """
  def change_imovel_documento(%ImovelDocumento{} = imovel_documento, attrs \\ %{}) do
    ImovelDocumento.changeset(imovel_documento, attrs)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` quantity images.

  ## Examples
      iex> count_imovel_imagem(id)
      %Ecto.Changeset{data: %ImovelImagem{}}

  """
  def count_imovel_documento!(id) do
    Imovel
    |> Repo.get(id)
    |> Ecto.assoc(:imovel_documento)
    |> Repo.aggregate(:count, :id)
  end
end
