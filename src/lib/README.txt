Essa pasta é para colocar configurações de bibliotecas externas.

Por exemplo, para facilitar vamos usar o AXIOS para fazer requisições HTTP, pois é mais simples e rápido que utilizar o fetch normal.

Para deixar o AXIOS ainda mais simples, criei um arquivo de configuração dele aqui, onde eu defino a 'baseURL' como 'http://localhost:3333/api/v1'. 

Dessa forma, sempre que a gente for fazer uma solicitação HTTP com axios, invés de precisar escrever o endereço completo como 'http://localhost:3333/api/v1/products' bastará escrever '/products' pois todo resto já está definido.

Eu estou salvando essas configurações do AXIOS na constante 'api', então sempre que for necessário fazer uma solicitação HTTP, será necessário importar essa constante api e utilizar ela.