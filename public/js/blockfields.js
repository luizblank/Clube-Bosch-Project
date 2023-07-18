var data1 = document.getElementById("data1");
var data2 = document.getElementById("data2")
var esportes = document.getElementById("esportes");
var churrasqueira = document.getElementById("churrasqueira");
var hora = document.getElementById("hora");


var DataPreenchida = data1.value;
var DataPreenchida2 = data2.value;

var EsportesPreenchido = esportes.value;

var HorasPreenchido = hora.value;

if(DataPreenchida == ''){
    esportes.disabled = true;
}

if(EsportesPreenchido == ''){
    hora.disabled = true;
}

if(DataPreenchida2 == ''){
    churrasqueira.disabled = true;
}

data1.addEventListener('change', function(){
    esportes.disabled = false;
});

data2.addEventListener('change', function(){
    churrasqueira.disabled = false;
});

esportes.addEventListener('change', function(){
    hora.disabled = false;
});

