  # App

  GyPass style app

  ## RFs (Requisitos funcionais)
  - [ ] Deve ser possivel se cadastrar
  - [ ] Deve ser possivel se autenticar
  - [ ] Deve ser possivel obter o perfil de um usuario logado
  - [ ]  Deve ser possivel obter o numero de check-ins realizado pelo usuario
  - [ ]  Deve ser possivel o usuario obter seu historico de check-ins
  - [ ]  Deve ser possivel o usuario buscar academias proximas
  - [ ]  Deve ser possivel o usuario buscar academias pelo nome
  - [ ]  Deve ser possivel o usuario realizar check-in em uma academia
  - [ ]  Deve ser possivel validar o check-in de um usuario
  - [ ]  Deve ser possivel cadastrar uma academia
  - [ ]  

  ## RNs (Regras de negócio)

  - [ ] o usuario nao deve poder se cadastrar com um email duplicado
  - [ ] o usuario nao pode fazer 2 check-ins no mesmo dia
  - [ ] o usuario nao pode fazer check-in se nao estiver (100m) da academia
  - [ ] O check-in so pode ser validado ate 20 minutos apos criado
  - [ ] o check-in so pode ser validado por administradores
  - [ ] a academia so pode ser cadastrada por administradores

## RNFs (Requisitos nao funcionais)

- [ ] A senha do usuario precisa esta criptografada
- [ ] Os dados da aplicacao precisam ser persistido em um banco SQL
- [ ] Todas as lista de dados precisam ser paginadas com 20 itens por paginas
- [ ] o usuario deve ser identificado por um JWT (JSON Web Token)
