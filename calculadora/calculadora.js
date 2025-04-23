let voltar = document.querySelector("#volta");

voltar.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "../index.html";
})

let numero = document.querySelectorAll("#number");
let numeroValue = numero.values;

console.log(numeroValue);