# TCC

Trabalho apresentado a **UNIVERSIDADE PAULISTA** como pré-requisito para obtenção da **Certificação de Conclusão de Curso de Bacharelado em Ciência da Computação**.

- Aluno: [Rodrigo Cichetto](https://github.com/rodrigocichetto) 
- Profº Orientador: [Leandro Carlos Fernandes](https://github.com/leandro-carlos-fernandes)

[![](imagens/tcc-app-presentation.gif)](https://youtu.be/8W1SJ4qr2hE)

## Resumo

Já pensou em criar uma rápida prototipação de software ou desenvolver aplicações escaláveis de forma rápida e utilizando apenas uma linguagem? Nos últimos tempos o JavaScript ganhou muita importância em quaisquer cenários, e vem sendo utilizada em sites, aplicações, mobile, servidores, automação de testes, automação de tarefas, internet das coisas, entre outros. 

Tornar-se um desenvolvedor que tenha conhecimento e possibilidade de desenvolver em todas as camadas que envolvem a criação de uma aplicação, pode ser considerado um grande desafio. Para isso é necessário ter conhecimento amplo de front-end, back-end e devops, cada área com suas particularidades também apresentam linguagens específicas que podem ser utilizadas para seu desenvolvimento. 

Ter a linguagem JavaScript como um elemento comum e transversal a todas essas áreas, além de ajudar o aluno pode também acelerar o aprendizado, uma vez que inicialmente o estudante não terá que aprender várias linguagens e suas particularidades.

Este trabalho tem como principal objetivo relatar a evolução da linguagem JavaScript e sua ampla utilização, para os mais diferentes tipos de sistemas, no contexto atual destacando ferramentas já existentes aplicadas a arquitetura multicamadas. Mas lembre-se com grandes poderes vem grandes responsabilidades.

## Código

Foi criado uma aplicação para mostrar na prática os conceitos apresentados no trabalho, todo o código está disponível na pasta [src](/src).

Para o desenvolvimento do projeto foi utilizado a linguagem JavaScript em conjunto dos frameworks que compõem a MEAN Stack (MongoDB, Express, Angular e Node.js).

### Objetivo da aplicação desenvolvida

A aplicação desenvolvida teve como objetivo abordar o assunto ambiental, visando facilitar o dia a dia de uma pessoa com os cuidados de uma plantação, ou apenas a grama de um jardim, de uma forma mais sustentável.

A solução dos problemas ambientais tem sido considerada cada vez mais urgente para garantir o futuro da humanidade, e como hoje temos meios que facilitem o cuidado com o meio ambiente e a diminuição de desperdício, uma das formas de unirmos o cuidado com a diminuição de desperdício é desenvolvendo uma aplicação que tenha tais funcionalidades.

## Docker

Foi utilizado contêineres da tecnologia Docker para iniciar e gerenciar as camadas da aplicação. Um contêiner para cada responsabilidade, um para a Aplicação mobile, um para o Servidor e outro para o Banco de Dados.

Para iniciar a aplicação com apenas um comando, suba os containers indo até a pasta `src` e executando o comando:
```
docker-compose up -d
```

### Containers
- **tcc-api**

    Ip: 10.5.0.5:3000 (Abrir documentação no navegador)
        
    10.5.0.5:3000/monitor (Abrir monitor no navegador)

    Logs: `docker logs -f tcc-api`

    Tecnologias: Node.js, Express.

    O servidor representa as camadas de gerenciamento de interface de usuário, autenticação e autorização e a lógica de negócio principal.

    Seu papel é atender as requisições dos clientes realizadas através do protocolo REST, processando as informações e retornando as respostas.

- **tcc-app-mobile**

    Ip: 10.5.0.6:8200 (Abrir no navegador)

    Logs: `docker logs -f tcc-app-mobile`

    Tecnologias: Angular 6, Ionic 4.

    O aplicativo desenvolvido serve de gerenciador para o usuário cliente, onde ele pode se cadastrar como usuário, cadastrar e gerenciar os irrigadores além de saber a previsão do tempo para a cidade veiculada para seu usuário e também para cada irrigador separadamente.

- **tcc-mongodb**

    Ip: 10.5.0.7:27017

    Logs: `docker logs -f tcc-mongodb`

    Tecnologias: MongoDB.

    O banco de dados é onde as informações de usuário e irrigações são armazenadas também em formato JSON.

### .env configs

```
NODE_VERSION=alpine                 # (Versão do node a ser executada no container tcc-api)
NETWORK_SUBNET=10.5.0.0/16          # (Máscara de rede a ser utilizada)
API_PORT=3000                       # (Porta API)
API_IPV4_ADDRESS=10.5.0.5           # (IP da API)      
APP_MOBILE_PORT=8200                # (Porta aplicação cliente)
APP_MOBILE_IPV4_ADDRESS=10.5.0.6    # (Ip aplicação cliente)
DB_PORT=27017                       # (Porta banco de dados)
DB_IPV4_ADDRESS=10.5.0.7            # (Ip banco de dados)
DB_USER=user                        # (Usuário banco de dados)
DB_PASSWORD=pass                    # (Senha banco de dados)
DB_DATABASE=tcc                     # (Schema banco de dados)
DUMP_DEMO=true                      # (Iniciar com dump de demonstração)
```

## License
Os códigos deste projeto estão licenciados sob a licença [MIT](LICENSE) - veja o arquivo [LICENSE](LICENSE) para mais detalhes.