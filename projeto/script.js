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

    if(tarefas.length == 0 || tarefas.length >= 10){
        tarefa.value = "";
        meses.selectedIndex = 0;
        return;
    }
    
    let meses = document.querySelector("#mesesTarefa");
    let mesesTarefa = meses.value;

    if(mesesTarefa == ""){  
        tarefa.value = "";
        return;
    }

    if(mesesTarefa.length > 0 && tarefas.length == 0){
        meses.selectedIndex = 0;
        return;
    }

    let tarefaListagem = document.querySelector("#listaDeTarefa");
    let listaDeTarefas = document.createElement("li");

    tarefaListagem.appendChild(listaDeTarefas);

    
    tarefa.value = "";
    meses.selectedIndex = 0;

    
    listaDeTarefas.textContent = "Essa é a tarefa: " + tarefas + ". Com prazo de: " + mesesTarefa;


});
