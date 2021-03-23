# Sapiens

## 1. Introdução
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O projeto SAPiens teve como princípio mitigar a probabilidade de episódios como os que se deram nas cidades de Mariana e Brumadinho. 
Então, utilizando sistemas open source somados aos que a empresa SAP nos proporcionou para trabalharmos com cloud, criamos uma solução que realizava uma curadoria dos dados que 
já eram coletados pelos sensores da empresa.

## 2. Problemática
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Para entregarmos uma solução de qualidade tivemos que entender o que causou os eventos em si. Após lermos algumas notícias, percebemos que o 
ocorrido não se deu por falta de sensoriamento ou alarmes, pois eles ocorreram. A verdadeira raiz do problema foi a demora para essas informações escalarem para alguém que 
tivesse o poder de tomar alguma ação.

## 3. Solução Desenvolvida
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pensando nisso, desenvolvemos um projeto que, através de um workflow, entregasse as informações ao responsável imediato pelo alarme. 
Para que isso fosse possível, tivemos de montar um protótipo físico utiizando a plataforma Arduino somada à um circuito ESP, e utilizar um modelo de Machine Learning para 
classificarmos as mensagens.

## 3.1 IoT

## 3.2 Data Science
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Para a parte cognitiva, treinamos nossos modelos com os dados do sensor de ultrassom e assim pudemos montar dois modelos de inteligência artificial:
  * <b>Modelo de Regressão Linear:</b> Tendo o nível da água como variável dependente da nossa variável tempo, pudemos montar um modelo que estimava o nível de água em função do 
  tempo, para que os engenheiros e técnicos pudessem agir de maneira mais preventiva ao invés de somente reagir quando o alarme tocasse;
  * <b>Modelo de Regressão Logística:</b> Utilizamos esse modelo a fim de detectarmos anomalias. Lemos os dados da nossa maquete e sinalizamos quando a situação estava crítica e
  quando a mesma era regular, então ensinamos esse padrão para o nosso modelo, que aprendeu a classificar os cenários de acordo com o nível da água.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Combinando a saída do nosso modelo de regressão linear com o modelo de regressão logística, é possível até mesmo prevermos um futuro cenário crítico
ou que exigisse a atenção dos técnicos. Os produtos dos modelos são enviados ao SAP Hana, onde eles eram lidos pelo SAP Cloud Analytics que geravam visualizações de dados em tempo
real, para que os funcionários pudessem ter um histórico e detectarem problemas, como falhas no sistema de sensoriamento.

## 3.3 Workflow
Para ingestão dos dados, utilizamos o serviço de workflow do SAP Cloud Platform, orquestrando o fluxo de dados tratados dos sensores. Dessa forma, definimos níveis de criticidade e uma ação a ser executada com base no dado analisado: 

  * <b>Nível baixo:</b> Nenhuma ação é executada;
  * <b>Nível intermediário:</b> E-mail enviado para os engenheiros responsáveis, alertando sobre a criticidade para que uma ação de revisão das condições da barragem seja planejada;
  * <b>Nível crítico:</b> E-mail enviado para a diretoria, engenheiros e demais responsáveis pela respectiva barragem, afim de executar planos de contingência e evacuação dos trabalhores e população ao redores. 


Através desses alertas, as partes interessadas são informadas de imediato sobre as condições de cada sensor, permitindo que planos de manutenção da barragem sejam elaborados e executados mais rapidamente, diminuindo custos e prevenindo tragédias.

# 4. Conclusão
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No final do nosso projeto, pudemos entender que o tema debatido não se encontra somente na indústria de mineração, mas existem diversos setores, empresas e órgãos que têm seus
dados descentralizados, o que inibe o desenvolvimento de soluções. Por exemplo, como seria possível criar um procedimento padrão ou regra de comportamento dentro de um negócio
onde não se entende os dados, onde não está clara a causa raiz. Desde o início, o workflow foi o coração da nossa solução, e enxergamos que o projeto SAPiens é escalável para
outros cenários.
