# APS

APS UNIP - 8º Semestre Trabalho desenvolvido como Atividades Praticas Supervisionadas do curso de Ciência da Computação na UNIP.

- Alunos:
    - [Rodrigo Cichetto](https://github.com/rodrigocichetto) 
    - Leticia Gibelli

## Objetivo

O trabalho tem como objetivo abordar o assunto sobre informações ambientais e desenvolvimento de uma aplicação baseada em Web Services,
que facilite o dia a dia de uma pessoa com os cuidados de uma plantação, podendo ser uma plantação grande, ou apenas a grama de um jardim de uma forma sustentável.

## Proposta do trabalho

Pede-se aos alunos que desenvolvam uma aplicação baseada em Web Services. A escolha de serviço que a ser implementado será de escolha do grupo, desde que aprovado pelo professor responsável pelo acompanhamento das atividades.

## Observações

Segue abaixo os pré-requisitos informados pelo professor.

### Serviços do Middleware

|        Nome        | Método |         Path         |       Parâmetros       |     Resposta    |
|:------------------:|:------:|:--------------------:|:----------------------:|:---------------:|
| controla_irrigacao | PUT    | /irrigacao/controla/ | *token, estado(on/off) | 200/401/400/500 |
| verifica_irrigacao | GET    | /irrigacao/verifica/ | *token                 | 200/401/500     |
| healf_check        | GET    | /irrigacao           | -                      | 200             |

[*] Parâmetros no header

*Os serviços descritos na documentação (http://10.5.0.5:3000/api-docs/) com a palavra-chave [APS] são os requisitados pelo professor, ou seja, os listados na tabela acima.

### Ativar/Desativar irrigação

1. **Solicitação para ativar/desativar irrigação**

    Enviar uma requisição para o middleware com um token no header da requisição, assim como o estado a ser alterado.

2. **Consultar previsão INPE**

    Consultar previsão para os próximos 4 dias.

    Se a previsão para o dia seguinte for `nv`, `cm` ou `pt` não ativar a irrigação.

3. **Adicionar um item na Queue do MQTT com o estado da irrigação**

## Código

Código disponível na pasta [src](/src), siga as instruções abaixo para executar o projeto.

## Docker

Para iniciar a aplicação com apenas um comando, suba os containers indo até a pasta `src` e executando o comando:
```
docker-compose up -d
```

### Containers
- **aps-api**

    Ip: 10.5.0.5:3000 (Abrir documentação no navegador)

    Logs: `docker logs -f aps-api`

- **aps-mongodb**

    Ip: 10.5.0.7:27017

    Logs: `docker logs -f aps-mongodb`

### .env configs

```
NODE_VERSION=alpine                 # (Versão do node a ser executada no container tcc-api)
NETWORK_SUBNET=10.5.0.0/16          # (Máscara de rede a ser utilizada)
API_PORT=3000                       # (Porta API)
API_IPV4_ADDRESS=10.5.0.5           # (IP da API)      
DB_PORT=27017                       # (Porta banco de dados)
DB_IPV4_ADDRESS=10.5.0.7            # (Ip banco de dados)
DB_USER=user                        # (Usuário banco de dados)
DB_PASSWORD=pass                    # (Senha banco de dados)
DB_DATABASE=tcc                     # (Schema banco de dados)
DUMP_DEMO=true                      # (Iniciar com dump de demonstração)
```

## License
Os códigos deste projeto estão licenciados sob a licença [MIT](LICENSE) - veja o arquivo [LICENSE](LICENSE) para mais detalhes.