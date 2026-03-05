function botão(value) {
    document.getElementById('display').value += value
}

function clearDisplay() {
    document.getElementById('display').value = ''
}

function calculate(){

    let display = document.getElementById("display");

    try{

        let result = eval(display.value);

        addHistory(display.value + " = " + result);

        display.value = result;

    }catch{
        display.value = "Erro";
    }

}

function addHistory(calculo){

    const history = document.getElementById("historyList");

    const item = document.createElement("li");

    item.textContent = calculo;

    history.prepend(item);

}

function back () {
    const display = document.getElementById('display')
    display.value = display.value.slice(0, -1)
}

document.addEventListener("keydown", function(event) {

    const key = event.key;
    const display = document.getElementById("display");

    // números
    if (!isNaN(key)) {
        display.value += key;
    }

    // operadores
    if (key === "+" || key === "-" || key === "*" || key === "/") {
        display.value += key;
    }

    // ponto decimal
    if (key === ".") {
        display.value += ".";
    }

    // calcular
    if (key === "Enter") {
        calculate();
    }

    // apagar último
    if (key === "Backspace") {
        back();
    }

    // limpar
    if (key === "Escape") {
        clearDisplay();
    }

});

function calculate(){

    let display = document.getElementById("display");

    try{

        let result = eval(display.value);

        saveHistory(display.value + " = " + result);

        display.value = result;

    }catch{
        display.value = "Erro";
    }

}

function saveHistory(calculo){

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.unshift(calculo);

    if(history.length > 10){
        history.pop();
    }

    localStorage.setItem("history", JSON.stringify(history));

    renderHistory();
}

function renderHistory(){

    const list = document.getElementById("historyList");

    if(!list) return;

    list.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

    });

}

window.onload = function(){
    renderHistory();
}

const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    } else {
        localStorage.setItem("theme","light");
    }

});

window.onload = function(){

    renderHistory();

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){
        document.body.classList.add("dark");
    }

}