//endpoint para inserção dos dados no sap hana.

$.response.contentType = "application/json";


function grava_dados() {
    var output = [];
    var log = {};
    var sql = null;
    var pstmt = null;
    
    try {
        var conn = $.db.getConnection();
        var valor = $.request.parameters.get('VALOR_DADO');
        var severidade;
        var cod_func;
        var descTask;
        var barragem;
        if (valor <= 30){
            //alta
            severidade = '1';
            cod_func = '3';
            descTask = 'Rompimento iminente.';
            barragem = '2';
        }else if(valor > 30 && valor <= 32){
            //media
            severidade = '2';
            cod_func = '2';
            descTask = 'Alerta de possibilidade de rompimento.';
            barragem = '2';
        }else{
            //baixa
            severidade = '3';
            cod_func = '1';
            descTask = 'Tarefa rotineira.';
            barragem = '1';
        }

        sql = "INSERT INTO \"DB_01\".\"DADOS_SENSOR\"(VALOR_DADO,COD_SEVERIDADE,COD_SENSOR, COD_BARRAGEM) VALUES(?,?,1,?)";
        pstmt = conn.prepareStatement(sql);

        pstmt.setString(1, valor);
        pstmt.setString(2, severidade);
        pstmt.setString(3, barragem);

        pstmt.execute();

        pstmt.close();
        conn.commit();

        conn.close();
        
        conn = $.db.getConnection();
        
        sql = "INSERT INTO \"DB_01\".\"CHAMADO\"(NOME_CHAMADO,DATA_LIMT,COD_FUNC,COD_BARRAGEM) VALUES('Resolução do chamado','2019.10.24',?,?)";
        pstmt = conn.prepareStatement(sql);
        
        pstmt.setString(1, severidade);
        pstmt.setString(2, barragem);
        
        pstmt.execute();

        pstmt.close();
        conn.commit();

        conn.close();
        
        conn = $.db.getConnection();
        pstmt = conn.prepareStatement("select cod_chamado from \"DB_01\".\"CHAMADO\" order by cod_chamado desc limit 1");
        
        var result = pstmt.executeQuery();
        var chamadoId;
        while(result.next()) // till records are available
        {
            chamadoId = result.getString(1);   
        }
        
        pstmt = conn.prepareStatement(sql);

        pstmt.close();
        conn.close();
        
        conn = $.db.getConnection();
        
        sql = "INSERT INTO \"DB_01\".\"TAREFA\"(NOME_TAREFA,DATA_LIMT,COD_CHAMADO,COD_FUNC,DESCCRICAO_TAREFA) VALUES('Resolução da tarefa','2019.10.24',?,?,?)";
        pstmt = conn.prepareStatement(sql);
        
        pstmt.setString(1, chamadoId);
        pstmt.setString(2, cod_func);
        pstmt.setString(3, descTask);
        
        pstmt.execute();

        pstmt.close();
        conn.commit();

        conn.close();       
       
        output.push('TODOS OS DADOS FORAM INSERIDOS');
        
        $.response.setBody(JSON.stringify(output));
        
        var context = JSON.stringify({
        	"definitionId": "sapiens",
            "context": {
        						    
        	}
        });

        //realiza a chamada para a api do workflow.
        
        var destination =$.net.http.readDestination("DadosArduinoServico", "getBpmToken");
        var client = new $.net.http.Client();
        var req = new $.web.WebRequest($.net.http.GET, "&s=SAP");
        client.request(req, destination);
        
        output.push(client.getResponse());
        
        $.response.setBody(JSON.stringify(output));
        
        var xrftoken = retrieveXSRFToken(destination, client);
        var service = 'https://bpmworkflowruntimewfs-p2001657855trial.hanatrial.ondemand.com';
        var request = new $.web.WebRequest($.net.http.POST,'https://bpmworkflowruntimewfs-p2001657855trial.hanatrial.ondemand.com');
        request.headers.set('x-csrf-token','FAA0277DE7FDC42C8BCB2A2BF96C9EAD');
        request.headers.set('Content-Type','application/json');
        
        client.request(req, destination);
        
        output.push(client.getResponse());
        $.response.setBody(JSON.stringify(output));
              
        $.ajax({
            url: "/bpmworkflowruntime/rest/v1/xsrf-token",
            method: "GET",
            headers: {
                "X-CSRF-Token": "Fetch"
            },
            success: function (result, xhr, data) {
                var token = data.getResponseHeader("X-CSRF-Token");
        
                $.ajax({
                    url: "/bpmworkflowruntime/rest/v1/workflow-instances",
                    method: "POST",
                    async: false,
                    contentType: "application/json",
                    headers: {
                        "X-CSRF-Token": token
                    },
                    data: context,
                    success: function (res, xhrr, dataFluxo) {
                        log.response = "Dados Gravados com sucesso!";
                        output.push(log);
                
                        $.response.setBody(JSON.stringify(output));
                        $.response.setBody(JSON.stringify(dataFluxo));
                    }
                });
            },
            error: function(err){
                $.response.setBody(JSON.stringify(err));
            }
        });     

    } catch (error) {
        log.response = "Falha de gravacao dos dados...";
        output.push(log);

        $.response.setBody(JSON.stringify(output.response + error));
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;

    }

}


grava_dados();










