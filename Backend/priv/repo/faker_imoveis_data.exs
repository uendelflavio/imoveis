alias Api.Repo
alias Api.Imoveis.Imovel

"""
for _ <- 1..2 do
  Imovel.create_imovel(%Imovel{
    bairro: Address.PtBr.neighborhood(),
    cep: Address.PtBr.zip_code(),
    cidade: Address.PtBr.city(),
    endereco: Address.PtBr.street_address(true),
    numero: Util.pick(10..1000),
    ocupado: Util.pick([true, false]),
    uf: Address.PtBr.state_abbr(),
    vistoria: Util.pick([true, false])
  })
end
"""
