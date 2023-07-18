var data = document.getElementById("data");
var data2 = document.getElementById("data2")
var esportes = document.getElementById("esportes");
var hora = document.getElementById("hora");
var churrasqueira = document.getElementById("churrasqueira");

var DataPreenchida = data.value;
var DataPreenchida2 = data2.value;
var EsportesPreenchido = esportes.value;

if (DataPreenchida == '') {
    esportes.disabled = true;
}

if (EsportesPreenchido == '') {
    hora.disabled = true;
}

if (DataPreenchida2 == '') {
    churrasqueira.disabled = true;
}

data.addEventListener('change', function () {
    esportes.disabled = false;
});

data2.addEventListener('change', function () {
    churrasqueira.disabled = false;
});

esportes.addEventListener('change', function () {
    hora.disabled = false;
});





















