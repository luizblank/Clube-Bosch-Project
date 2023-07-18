var FirForm = document.getElementById('formulario1');
var SecForm = document.getElementById('formulario2');

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

FirForm.addEventListener('change', async function(){
    DataResVal = DataRes.value;
    EspElemVal = EspElem.value;
    HorElemVal = HorElem.value;
});

SecForm.addEventListener('change', async function(){
    DataChuVal = DataChu.value;
    ChuElemVal = ChuElem.value;
});



