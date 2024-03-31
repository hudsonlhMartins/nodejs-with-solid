  # App

  GyPass style app

  ## RFs (Requisitos funcionais)
  - [ x ] Deve ser possivel se cadastrar
  - [ x ] Deve ser possivel se autenticar
  - [ x ] Deve ser possivel obter o perfil de um usuario logado
  - [ x ]  Deve ser possivel obter o numero de check-ins realizado pelo usuario
  - [ x ]  Deve ser possivel o usuario obter seu historico de check-ins
  - [ x ]  Deve ser possivel o usuario buscar academias proximas
  - [ x ]  Deve ser possivel o usuario buscar academias pelo nome
  - [ x ]  Deve ser possivel o usuario realizar check-in em uma academia
  - [ x ]  Deve ser possivel validar o check-in de um usuario
  - [ x ]  Deve ser possivel cadastrar uma academia
  - [ x ]  

  ## RNs (Regras de negócio)

  - [ x ]  o usuario nao deve poder se cadastrar com um email duplicado
  - [ x ]  o usuario nao pode fazer 2 check-ins no mesmo dia
  - [ x ]  o usuario nao pode fazer check-in se nao estiver (100m) da academia
  - [ x ]  O check-in so pode ser validado ate 20 minutos apos criado
  - [ x ]  o check-in so pode ser validado por administradores
  - [ x ]  a academia so pode ser cadastrada por administradores

## RNFs (Requisitos nao funcionais)

  - [ x ]  A senha do usuario precisa esta criptografada
  - [ x ]  Os dados da aplicacao precisam ser persistido em um banco SQL
  - [ x ]  Todas as lista de dados precisam ser paginadas com 20 itens por paginas
  - [ x ]  o usuario deve ser identificado por um JWT (JSON Web Token)
