

angular.module("myApp", []).controller("memoria", function($scope,$timeout,$interval) {

//Declaração de variaveis
var status = true;
var armazenaId = "";
var cont=0;
var cont2;
var myVar;
var aux = 2;
var contador = 0;
$scope.nivel;
$scope.msg = "";
$scope.booleano=false;
$scope.booleano1=false;
$scope.botao = false;



iniciaJogo(1);
function iniciaJogo(cod){
  switch(cod){
  case 1:
    $scope.nivel ="Nível 1";
      init(8);
      verificaVitoria(4)      
      break;
  case 2:
      init(16);
      verificaVitoria(8);
      $scope.nivel ="Nível  2";
      break;
  case 3:
      init(32);
      verificaVitoria(16)
      $scope.nivel ="Nível  3";
      break;
  default:
  $scope.booleano1=true;
  $scope.botao = true;
  $scope.msg = "Você venceu!!!";
}
}

//conta 5 segundos e chama flipAll
function TesTtimeout(valor){
    $timeout(function(){
      flipAll(valor);     
    },5000);    
}

function TesTtimeout2(valor){
    $timeout(function(){
      iniciaJogo(valor);
    },1000);    
}

tstinterval();
function tstinterval(){
    cont2 = 300;
 var T = $interval( function(){ 
      cont2--;
      $scope.call = "["+cont2 + ":segundo]";
      if(cont2 < 1){
        $interval.cancel(T);
        $scope.booleano=true;
        status = false;
        $scope.botao = true;
        $scope.msg = "Você perdeu";
      }
    },1000,0);

 };



//Cria dinamicamente o Array de imagens
function init(valor){
    TesTtimeout(valor);
    $scope.imagens = [];
     var n = Math.floor(Math.random()*10);
    var i , j = 0;
    for (i = 0; i < valor; i++) {
      
      if(i < (valor/2) ){
      var estrutura =[
       {"id":i,
      "imgfrente":"public/img/"+(i+n)+".jpg",
      "imgback":"public/img/17.jpg",
      "atual":""} 
      ];

      }
      else{ 

        var estrutura =[
       {"id":i,
        "imgfrente":"public/img/"+(j+n)+".jpg",
        "imgback":"public/img/17.jpg",
        "atual":""} 
        ];       
        j++;         
      } 
      $scope.imagens[i] = estrutura[0];
    };

    for ( var i = 0; i < $scope.imagens.length; i++ ) {
      $scope.imagens[i].atual = $scope.imagens[i].imgfrente;
    };
    shuffle($scope.imagens);

  };

//sorte as cartas
function shuffle(array) {
  var m = array.length, t, i;
 
  while (m) {  

    i = Math.floor(Math.random() * m--);  
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

function verificaVitoria(){
  return $scope.imagens.length  == (contador*2);
}

//Vira uma carta
$scope.flip = function(id){ 
    if(!status){return;}//enquanto o status for falso nao deixa eu clicar em outrou img 
    if($scope.imagens[id].atual !=  $scope.imagens[id].imgback) {
      return;
    }
    else if($scope.imagens[id].atual ===  $scope.imagens[id].imgback ){
      if(cont == 0){
        $scope.imagens[id].atual = $scope.imagens[id].imgfrente; 
          armazenaId = id; 
          cont++;
          return;
      }else{
        $scope.imagens[id].atual = $scope.imagens[id].imgfrente; 

        if($scope.imagens[armazenaId].imgfrente === $scope.imagens[id].imgfrente){
          console.log("Acertou");
          console.log("armazenaId:"+armazenaId); 
           console.log("Id:"+id);   
          console.log($scope.imagens[armazenaId].imgfrente); 
          console.log($scope.imagens[id].imgfrente); 
          armazenaId = "";
          contador++;
          console.log("Contador: "+contador);
          console.log("Teste verifica:"+verificaVitoria());
          if(verificaVitoria()){
            TesTtimeout2(aux);
            aux++;
            contador = 0;
          }             
        } else{
            console.log("Errou");
            console.log("armazenaId:"+armazenaId); 
           console.log("Id:"+id);
            console.log($scope.imagens[armazenaId].imgfrente); 
            console.log($scope.imagens[id].imgfrente);
            console.log("Else:"+id+"/;"+armazenaId);
            status = false;
            myVar = $timeout(function(){
               Teste(id,armazenaId);        
              },1000);
            
        }
      }      

    } 

    if(cont == 1){        
        cont--;
     }    
}

function Teste(id,armazenaId){
    console.log("Teste:"+id+"/;"+armazenaId);
    $scope.imagens[armazenaId].atual = $scope.imagens[armazenaId].imgback;
    $scope.imagens[id].atual = $scope.imagens[id].imgback;
    armazenaId = "";
    clearTimeout(myVar);
    status = true;
    
}

//Vira todas as cartas
function flipAll(valor){
  for (var i = 0; i < valor ; i++) {
      $scope.imagens[i].atual = $scope.imagens[i].imgback;
   };   
}

 $scope.reiniciar = function(){
    window.location.reload();
  }

});
