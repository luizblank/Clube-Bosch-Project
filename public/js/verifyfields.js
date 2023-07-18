var FirForm = document.getElementById('formulario1');
var AlertReserva = document.getElementById('alert-reserva');

var SecForm = document.getElementById('formulario2');
var AlertChurras = document.getElementById('alert-churras');

var DataRes = document.getElementById('data1');
var DataChu = document.getElementById('data2');
var EspElem = document.getElementById('esportes');
var ChuElem = document.getElementById('churrasqueira');
var HorElem = document.getElementById('hora');

var DataResVal = DataRes.value;
var DataChuVal = DataChu.value;
var EspElemVal = EspElem.value;
var ChuElemVal = ChuElem.value;
var HorElemVal = HorElem.value;

FirForm.addEventListener('change', function(){
    DataResVal = DataRes.value;
    EspElemVal = EspElem.value;
    HorElemVal = HorElem.value;
});

FirForm.addEventListener('submit', function(){
    if(DataResVal == '' || EspElemVal == '' || HorElemVal == ''){
        AlertReserva.style.display = 'block';
        event.preventDefault();
        return;
    }
});

SecForm.addEventListener('change', function(){
    DataChuVal = DataChu.value;
    ChuElemVal = ChuElem.value;
});

SecForm.addEventListener('submit', function(){
    if(DataChuVal == '' || ChuElemVal == ''){
        AlertChurras.style.display = 'block';
        event.preventDefault();
        return;
    }
});