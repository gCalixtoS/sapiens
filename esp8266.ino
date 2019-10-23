#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include <base64.h>

String json = "";
const char* ssid     = "pedro";
const char* password = "pedro0193";

const char* host = "http://devpggp2001657855trial.hanatrial.ondemand.com/DadosArduinoServico";
const int httpPort = 80;

String auth = base64::encode("SYSTEM:Fiap.devpgg2019");

void setup() {
    Serial.begin(115200);                                  //Serial connection
    WiFi.begin(ssid, password);   //WiFi connection

    Serial.println();
  
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    while (WiFi.status() != WL_CONNECTED) {
        delay(100);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");  
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
 
}
 
void loop() {
   // Serial.println("teste");M
    if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
        HTTPClient http;    //Declare object of class HTTPClient
         
        if(Serial.available()){
          //envia os dados recebidos do arduino 1 para o servidor
        while(Serial.available()) 
            {   // While there is more to be read, keep reading.  
                json += (char)Serial.read();
            }
            String url = "/DadosArduino.xsjs";
            http.begin("https://devpggp2001657855trial.hanatrial.ondemand.com/DadosArduinoServico/DadosArduino.xsjs?VALOR_DADO="+json,"47:49:2E:30:2B:E8:25:6F:B2:2C:41:DD:32:3D:44:6B:C6:0E:95:D9");      //Specify request destination
            http.addHeader("Content-Type", "application/json");  //Specify content-type header
            http.addHeader("Authorization", "Basic " + auth);
            Serial.println("teste2");
            
        
            int httpCode = http.POST("");   //Send the request
            //recebe a resposta do servidor
            String payload = http.getString();                  //Get the response payload
            char response[10];
            payload.toCharArray(response, 10);
            //envia se está ligado ou não para o arduino 1
            Serial.println("response");
            Serial.println(httpCode);
            Serial.println(payload);
            Serial.write(response);
            http.end();  //Close connection
            json = ""; // No repeats  
        }
    }else{
        Serial.println("Error in WiFi connection");   
    }
 
}
