# Entidades do Sistema de Aluguel Imoveis

***
### USER
1. #ID [PRIMARY KEY]
2. EMAIL
3. PASSWORD

`
mix phx.gen.json Account User users email:string password:string
`

`
mix phx.gen.schema Account.User users email:string password:string
`


***
### IMOVEL
1. #ID [PRIMARY KEY]
2. *ENDERECO
3. *NUMERO
4. *BAIRRO
5. *CEP
6. *CIDADE
7. *UF
8. *VISTORIA TRUE|FALSE
9. *OCUPADO TRUE|FALSE
10. *COMPLEMENTO

`
mix phx.gen.json Imoveis Imovel imoveis  endereco:text  numero:integer bairro:string cep:integer cidade:string uf:string vistoria:boolean ocupado:boolean complemento:string
`

`
mix phx.gen.schema Imoveis.Imovel imoveis endereco:text  numero:integer bairro:string cep:integer cidade:string uf:string vistoria:boolean ocupado:boolean complemento:string
`
***
### IMOVEL_DETALHE
1. #ID [PRIMARY KEY]
2. *AREA_TOTAL_M2
3. *AREA_CONSTRUIDA_M2
4. *NUMERO_INSCRICAO
5. *MATRICULA_AGUA
6. *MATRICULA_ENERGIA
7. *CLASSIFICACAO
8. *SALAS
9. *QUARTOS
10. *BANHEIROS
11. *SUITES
12. *VAGAS_GARAGEM
13. *AREA_LAZER
14. *PISCINA
15. *AGUA_INCLUSO
16. *GAS_INCLUSO
17. *SEGURANCA_INCLUSO


`
mix phx.gen.json Imoveis ImovelDetalhe imoveldetalhes imovel_id:references:imoveis area_total_m2:integer area_total_construida_m2:integer numero_inscricao:string matricula_agua:integer matricula_energia:integer classificacao:string salas:integer quartos:integer banheiros:integer suites:integer vagas_garagem:integer area_lazer:boolean piscina:boolean agua_incluso:boolean gas_incluso:boolean seguranca_incluso:boolean
`

`
mix phx.gen.schema Imoveis.ImovelDetalhe imoveldetalhes imovel_id:references:imoveis area_total_m2:integer area_total_construida_m2:integer numero_inscricao:string matricula_agua:integer matricula_energia:integer classificacao:string salas:integer quartos:integer banheiros:integer suites:integer vagas_garagem:integer area_lazer:boolean piscina:boolean agua_incluso:boolean gas_incluso:boolean seguranca_incluso:boolean
`


***
### IMOVEL_IMAGEM
1. #ID [PRIMARY KEY]
2. *LINK

`
mix phx.gen.json Imoveis ImovelImagem imovelimagens imovel_id:references:imoveis link:string
`

`
mix phx.gen.schema Imoveis.ImovelImagem imovelimagens imovel_id:references:imoveis link:string
`

***
### IMOVEL_DOCUMENTO
1. #ID [PRIMARY KEY]
2. *LINK

`
mix phx.gen.json Imoveis ImovelDocumento imoveldocumentos imovel_id:references:imoveis link:string
`

`
mix phx.gen.schema Imoveis.ImovelDocumento imoveldocumentos imovel_id:references:imoveis link:string
`

***
### CONTAS
1. #ID [PRIMARY KEY]
2. MES_REFERENCIA
3. AGUA
4. ENERGIA
5. IPTU
6. GAS
7. ALUGUEL

`
mix phx.gen.json Financeiro Conta contas mes_referencia:string agua:decimal energia:decimal iptu:decimal gas:decimal aluguel:decimal
`

`
mix phx.gen.schema Financeiro.Conta contas mes_referencia:string agua:decimal energia:decimal iptu:decimal gas:decimal aluguel:decimal`

***
###  CONTRATOS
1. #ID [PRIMARY KEY]
2. *DATA_INICIAL
3. *DATA_FINAL
4. *REAJUSTE

`
mix phx.gen.json Financeiro Contrato contratos  data_inicial:date data_final:date reajuste:decimal
`

`
mix phx.gen.schema Financeiro.Contrato contratos  data_inicial:date data_final:date reajuste:decimal`

***
### LOCADOR
1. #ID [PRIMARY KEY]
2. *NOME
3. *RG
4. *CPF
5. *ENDERECO
6. *NUMERO
7. *BAIRRO
8. *CEP
9. *CIDADE
10. *UF
11. *CELULAR
12. *TELEFONE_FIXO
13. *EMAIL


`
mix phx.gen.json Imoveis Locador locadores  nome:string rg:string cpf:string endereco:text numero:integer bairro:string cep:integer cidade:string uf:string celular:string telefone_fixo:string email:string
`

`
mix phx.gen.schema Imoveis.Locador locadores  nome:string rg:string cpf:string endereco:text numero:integer bairro:string cep:integer cidade:string uf:string celular:string telefone_fixo:string email:string
`

***
### PROFISSIONAL
#ID [PRIMARY KEY]
1. *NOME
2. *CELULAR
3. *FUNCAO

`
mix phx.gen.json Imoveis Profissional profissionais  nome:string celular:string funcao:string
`

`
mix phx.gen.schema Imoveis.Profissional profissionais  nome:string celular:string funcao:string
`

***
### LOCATARIO
1. #ID [PRIMARY KEY]
2. %IMOVEL_ID [FOREIGN KEY]
3. %CONTRATO_ID [FOREIGN KEY]
4. *NOME
5. *CPF
6. *CELULAR
7. *RG
8. *PROFISSAO
9. *EMAIL
10. *CALCAO

`
mix phx.gen.json Imoveis Locatario locatarios imovel_id:references:imoveis contrato_id:references:contratos nome:string cpf:string  celular:string rg:string profissao:string email:string calcao:decimal
`

`
mix phx.gen.schema Imoveis.Locatario locatarios imovel_id:references:imoveis contrato_id:references:contratos nome:string cpf:string  celular:string rg:string profissao:string email:string calcao:decimal`

***
### MANUTENÇÃO
1. #ID [PRIMARY KEY]
2. %PROFISSIONAL_ID [FOREIGN KEY]
3. %IMOVEL_ID [FOREIGN KEY]
4. *DESCRICAO_SERVICO
5. *TIPO_SERVICO  POR EMPREITA|POR DIARIA| POR HORA
6. *VALOR_SERVICO
7. *DATA_INICIO
8. *DATA_FINAL


`
mix phx.gen.json Imoveis Manutencao manutencoes profissional_id:references:profissionais  imovel_id:references:imoveis descricao_servico:text tipo_servico:string valor_servico:decimal data_inicio:date data_final:date 
`

`
mix phx.gen.schema Imoveis.Manutencao manutencoes profissional_id:references:profissionais  imovel_id:references:imoveis descricao_servico:text tipo_servico:string valor_servico:decimal data_inicio:date data_final:date
`

***
### OBSERVAÇÃO 
- AGUA,ENERGIA,IPTU SERAO GERENCIADA POR UM BOT DE CAPTURA DE DADOS DA SANEAGO,ENEL E PREFEITURA
- TERA SERVICO DE ENVIO DE EMAIL PARA NOTIFICACOES
- O SOFTWARE E SOFT-DELETE PORTANTO NAO APAGARA DADOS SOMENTE ALTERACAO DE STATUS DESATIVADO


***
## PASSOS PARA ALTERAR ESTRUTURA DO BANCO
- Desligue o servidor cowboy
- Desconecte-se de qualquer software de cliente de banco de DADOS
- Va no arquivo changeset e altere os dados do campo
- Va no arquivo de migração e altere os dados do campo
- Execute no terminal os seguinte comandos:


`mix ecto.drop`

`mix ecto.create`

`mix ecto.migrate`


