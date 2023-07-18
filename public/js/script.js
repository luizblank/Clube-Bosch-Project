let photo1 = document.getElementById('imgFoto1');
let photo2 = document.getElementById('imgFoto2');
let photo3 = document.getElementById('imgFoto3');

let file1 = document.getElementById('flImage1');
let file2 = document.getElementById('flImage2');
let file3 = document.getElementById('flImage3');

photo1.addEventListener('click', () => {
    file1.click();
});

photo2.addEventListener('click', () => {
    file2.click();
});

photo3.addEventListener('click', () => {
    file3.click();
});

file1.addEventListener('change', () => {
    if (file1.files.length == 0) {
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(file1.files[0]);
    
    reader.onload = () => {
        photo1.src = reader.result  
    }
});

file2.addEventListener('change', () => {
    if (file2.files.length == 0) {
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(file2.files[0]);
    
    reader.onload = () => {
        photo2.src = reader.result  
    }
});

file3.addEventListener('change', () => {
    if (file3.files.length == 0) {
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(file3.files[0]);
    
    reader.onload = () => {
        photo3.src = reader.result  
    }
});