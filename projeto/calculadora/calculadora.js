let voltar = document.querySelector("#volta");

voltar.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "../index.html";
})