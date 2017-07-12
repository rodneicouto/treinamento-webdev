# Passos de instalacao: 

* Instalar o node (https://nodejs.org)
* Instalar os plugins do Node necessários. O comando abaixo deve ser executado dentro do diretorio raiz do projeto
    * `sudo npm install -g gulp bower`

# Passos após baixar o projeto pela primeira vez

* Executar dentro do diretório raiz do projeto	
    1 ``` npm install ```
    1 ``` bower install ```
* Para rodar, basta executar na linha de comando, dentro do diretorio do projeto
    * ``` gulp serve ```
* Caso tenha feito testes jasmine, para rodar
    * ``` gulp test ```    
* Se tudo der certo, o endereço vai abrir corretamente: http://localhost:3000/#!/profile?email=rodnei@tecgraf.puc-rio.br