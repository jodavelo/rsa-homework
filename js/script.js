function onlyNumberKey(evt) {
          
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
        alert('Solo se permiten numeros!')
        return false;
    }
    return true;
}

function isPrime(n){
    let count = 0;
    for(let idx = n; idx > 0; idx--){
        if(n % idx == 0) count++;
    }
    if(count == 2) return true;
    return false;
}

particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#000000"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":1,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#000000","opacity":0.4,"width":1},"move":{"enable":true,"speed":0.8,"direction":"bottom","random":false,"straight":true,"out_mode":"out","bounce":false,"attract":{"enable":true,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":0,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.display = 'none'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array)  requestAnimationFrame(update); }; requestAnimationFrame(update);;

function numbersCoprimeToN(n) {
    // return Greater Common Denominator of two given numbers
    function gcd(a, b) {
      if (a === 0) {
        return b;
      }
  
      return gcd(b % a, a);
    }
  
    // init
    var result = 1;
    let possibleE = [];
  
    // walk through all integers up to n
    for (let idx = 2; idx < n; idx++) {
      if (gcd(idx, n) === 1) {
        possibleE.push(idx)
        result++;
      }
    }
  
    return possibleE;
}

// console.log(numbersCoprimeToN(12))
var nGlobal = null;
var phiNGlobal = null;
var pGlobal = null;
var qGlobal = null;
function calculateNFiN(){
    let p = document.getElementById('number1');
    let q = document.getElementById('number2');
    let pCheck = isPrime(p.value);
    let qCheck = isPrime(q.value);
    removeAllChildFromDiv('select_possible_e');
    if(pCheck && qCheck){
        let n = p.value * q.value;
        let phiN = (p.value -1) * (q.value - 1);
        pGlobal = p.value;
        qGlobal = q.value;
        nGlobal = n;
        phiNGlobal = phiN;
        //console.log(numbersCoprimeToN(phiN));
        let coprimeList = numbersCoprimeToN(phiN);
        displayShow('container_select');
        let possibleESelect = document.getElementById('select_possible_e');
        let defaultOption = document.createElement('option');
        defaultOption.innerText = "Por favor selecciona un valor e";
        defaultOption.value = 'defaultValue';
        possibleESelect.appendChild(defaultOption);
        coprimeList.forEach((el, idx) => {
            let option = document.createElement('option');
            option.id = idx;
            option.innerText = `${el}`;
            option.value = el;
            possibleESelect.appendChild(option);
        });
    }else{
        displayHide('container_select');
        document.getElementById('modalInfo').click();
        removeAllChildFromDiv('info-text');
        let infoText = document.getElementById('info-text');
        if(!pCheck && !qCheck){
            let pText = document.createElement('p');
            pText.innerText = 'Los valores ingresados en los campos numero 1 y numero 2 no corresponden a numeros primos. Verifica por favor estos campos, si tienes dudas sobre cuales son los numeros, puedes revisar los primeros 100 numeros primos, haciendo click ';
            let span = document.createElement('span');
            span.innerText = 'aqui';
            span.style.color = 'blue';
            span.style.textDecoration = 'underline';
            span.style.cursor = 'pointer';
            span.id = 'link_prime_numbers_table';
            span.onclick = openPrimeNumbersTable;
            pText.appendChild(span);
            infoText.appendChild(pText);
        }else if(!pCheck){
            let pText = document.createElement('p');
            pText.innerText = 'El valor ingresado en el campo Numero 1 no corresponde a un numero primo. Por favor ingresa un valor valido e intentalo de nuevo.';
            infoText.appendChild(pText);
        }
        else if(!qCheck){
            let pText = document.createElement('p');
            pText.innerText = 'El valor ingresado en el campo Numero 2 no corresponde a un numero primo. Por favor ingresa un valor valido e intentalo de nuevo.';
            infoText.appendChild(pText);
        }
    }
}

var selectE = document.getElementById('select_possible_e');
selectE.addEventListener('change', () => {
    removeAllChildFromDiv('info-text');
    document.getElementById('number1').disabled = true;
    document.getElementById('number2').disabled = true;
    displayHide('btn_calculate_n_phi_n');
    if(selectE.value == 'defaultValue'){
        let infoText = document.getElementById('info-text');
        let pText = document.createElement('p');
        pText.innerText = 'Por favor selecciona una opción diferente';
        infoText.appendChild(pText);
        document.getElementById('modalInfo').click();
    }else{
        displayShow('table1');
        determinateK(parseInt(selectE.value), parseInt(phiNGlobal));
    }
});

function determinateK(e, phiN){
    removeAllChildFromDiv('tbody_table');
    removeAllChildFromDiv('step_by_step_of_k');
    let tBody = document.getElementById('tbody_table');
    let k = 1;
    let condition = (k * parseInt(phiN) + 1) % e;
    do {
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        th.innerText = `${k}`;
        tr.appendChild(th);
        let td1 = document.createElement('td');
        td1.innerHTML = `${e}`;
        tr.appendChild(td1);
        let td2 = document.createElement('td');
        td2.innerHTML = `(${k} x ${phiNGlobal} + 1) % ${e} = ${condition}`;
        tr.appendChild(td2);
        tBody.appendChild(tr);
        k++;
        condition = (k * parseInt(phiN) + 1) % e;
    } while (condition != 0);
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerText = `${k}`;
    tr.appendChild(th);
    let td1 = document.createElement('td');
    td1.innerHTML = `${e}`;
    tr.appendChild(td1);
    let td2 = document.createElement('td');
    let kCalculate = (k * parseInt(phiN) + 1) % e;
    td2.innerHTML = `(${k} x ${phiNGlobal} + 1) % ${e} = ${kCalculate}`;
    tr.appendChild(td2);
    tBody.appendChild(tr);

    displayShow('step_list')

    let ul = document.getElementById('step_by_step_of_k');
    let li1 = document.createElement('li');
    li1.innerText = `k = ${k}`;
    ul.appendChild(li1);
    let li2 = document.createElement('li');
    li2.innerText = `k > 0`;
    ul.appendChild(li2);
    let li3 = document.createElement('li');
    li3.innerText = `k | 1 + k * fi(n) % e == 0`;
    ul.appendChild(li3);
    let li4 = document.createElement('li');
    li4.innerText = ` 1 + ${k} * ${phiNGlobal} % ${e} == 0`;
    ul.appendChild(li4);
    let temp = 1 + k * phiNGlobal;
    let temp2 = temp % e; 
    let li5 = document.createElement('li');
    li5.innerText = `${temp} % ${e} == 0`;
    ul.appendChild(li5);
    let li6 = document.createElement('li');
    li6.innerText = `${temp2} == 0`;
    ul.appendChild(li6);

    displayShow('details_d');
    removeAllChildFromDiv('step_by_step_of_d');
    let ulOfD = document.getElementById('step_by_step_of_d');
    let li1OfD = document.createElement('li');
    li1OfD.innerText = `d = (1 + k * fi(n)) / e`;
    ulOfD.appendChild(li1OfD);
    d = (1 + k * phiNGlobal) / e;
    let optionalD = 1 + k * phiNGlobal / e;
    console.log(`clave privada opcional n = ${nGlobal}, d = ${optionalD}`);
    let li2OfD = document.createElement('li');
    li2OfD.innerText = `d = (1 + ${k} * ${phiNGlobal}) / ${e} = ${d}`;
    ulOfD.appendChild(li2OfD);

    displayShow('public_key_container');
    displayShow('private_key_container');
    document.getElementById('public_key_text').textContent = `Llave pública = [ n = ${nGlobal}, e = ${e} ]`;
    document.getElementById('private_key_text').textContent = `Llave privada = [ n = ${nGlobal}, d = ${d} ]`;
}

function openPrimeNumbersTable(){
    let numbers = first100PrimeNumbers();
    let rows = '';
    let matrix = listToMatrix(numbers, 10);
    for(let idx = 0; idx < 10; idx++){
        let tr = `<tr style="border:1px solid black;">`;
        for(let idx2  = 0; idx2 < 10; idx2++){
            let td = `<td style="border:1px solid black;">${matrix[idx][idx2]}</td>`;
            tr += td;
        }
        rows += tr;
    };
    let html = `<table style="width:100%; border:1px solid black;">
                    ${rows}
                </table>`;
    let newWindow= window.open('', '', 'width=300, height=300');
    newWindow.document.write(html);
}

function first100PrimeNumbers(){
    let count = 0;
    let prime = [];
    while(count < 1000){
        
        if(isPrime(count)){
            prime.push(count);
            
        }
        if(prime.length > 99) break;
        count++;
        
    }
    return prime;
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}


document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });

//------------------------------------------------------------------------------------
// ** Helpers **
//------------------------------------------------------------------------------------
function removeAllChildFromDiv(id){
    let container = document.getElementById(`${id}`);  
    // Create the Range object
    let rangeObj = new Range();
    // Select all of theParent's children
    rangeObj.selectNodeContents(container);
    // Delete everything that is selected
    rangeObj.deleteContents();
}


function displayHide(id) {
    let x = document.getElementById(id);
    x.className = x.className.replace("show", "hide");
}

function displayShow(id) {
    let x = document.getElementById(id);
    x.className = x.className.replace("hide", "show");
}