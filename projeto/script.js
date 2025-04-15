let botao = document.querySelector("#botao");

botao.addEventListener("click", function () {
    let nome = document.querySelector("#nome");
    let nomeCompleto = nome.value;

    let escreverNome = document.querySelector("#seunome");
    escreverNome.textContent = "Olá " + nomeCompleto + ", Seja Bem-vindo ao Site!";

    nome.value = "";
});



let botao2 = document.querySelector("#botao2");

botao2.addEventListener("click", function() {
    let tarefa = document.querySelector("#tarefas");
    let tarefas = tarefa.value;

    
    let meses = document.querySelector("#mesesTarefa");
    let mesesTarefa = meses.value;
    
    if(tarefas.length == 0 || tarefas.length >= 20){
        tarefa.value = "";
        meses.value = undefined;
        return;
    }
    
    if(mesesTarefa == ""){  
        tarefa.value = "";
        return;
    }

    
    let tarefaListagem = document.querySelector("#listaDeTarefa");
    let listaDeTarefas = document.createElement("li");
    listaDeTarefas.classList.add("lista");

    tarefaListagem.appendChild(listaDeTarefas);

    
    tarefa.value = "";
    meses.value = undefined;

    listaDeTarefas.textContent = "Essa é a tarefa: " + tarefas + ". Com prazo de: " + mesesTarefa;


});

let pagina2 = document.querySelector(".link1");

pagina2.addEventListener("click", function(event){
    event.preventDefault();
    pagina2.href = "calculadora.html";
    window.location.href = "calculadora.html";
})

let voltar = document.querySelector("#volta");

voltar.addEventListener("click", function(event){
    event.preventDefault();
    voltar.href = "index.html"
    window.location.href = "index.html";
})