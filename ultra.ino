//Carrega a biblioteca SoftwareSerial
//#include <ArduinoJson.h>

//Carrega a biblioteca do sensor ultrassonico
#include <Ultrasonic.h>

//Define os pinos para o trigger e echo
#define pino_trigger 13
#define pino_echo 12
#define red 8
#define green 9

//Inicializa o sensor nos pinos definidos acima
Ultrasonic ultrasonic(pino_trigger, pino_echo);

void setup()
{
   pinMode(green, OUTPUT);
   pinMode(red, OUTPUT);
  //Inicia a serial
  Serial.begin(115200);
}

void loop()
{
  //Le as informacoes do sensor, em cm e pol
 long microsec = ultrasonic.timing();
 float cmMsec = ultrasonic.convert(microsec, Ultrasonic::CM);
 Serial.print(cmMsec);
 if (cmMsec < 30){
 analogWrite(red, 255);
 analogWrite(green, 0);
 }else{
 analogWrite(red, 0);
 analogWrite(green, 255);
 }

 delay(1000);
}
