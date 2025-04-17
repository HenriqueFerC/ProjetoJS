const dataAtualJS = new Date();

let diaAtual = dataAtualJS.getDate();
let mesAtual = dataAtualJS.getMonth()+1;
let anoAtual = dataAtualJS.getFullYear();

let dataAtual = document.querySelector("#dataAgenda");
dataAtual.textContent = `Essa é a minha agenda pessoal do dia ${diaAtual}/${mesAtual}/${anoAtual}`;

let botaoVoltar = document.querySelector("#voltar");

botaoVoltar?.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "/";
})


const botaoTarefa = document.querySelector("#botaoTarefa");

botaoTarefa?.addEventListener("click", function(){
    let tarefa = document.querySelector("#tarefa");
    let tarefaValue = tarefa.value.toUpperCase();

    
    let horario1 = document.querySelector("#horario1");
    let horario1Value = horario1.value;

    let horario2 = document.querySelector("#horario2");
    let horario2Value = horario2.value;

    let erro = document.querySelector("#error");

   if(tarefaValue == "" || horario1Value == "" || horario2Value == ""){
       tarefa.value = "";
       horario1.value = "";
       horario2.value = "";
       
       erro.textContent = "Nenhum campo pode ser vazio!";

       return;
   }

   function getHoras(hour){
    const [horas, minutos] = hour.split(":");
    return horas * 60 + minutos;
   }

   if(horario1Value == horario2Value){
       tarefa.value = "";
       horario1.value = "";
       horario2.value = "";

       erro.textContent = "Horários precisam ser diferentes!";

       return;
   }

   if(getHoras(horario1Value) < getHoras(horario2Value)){
       tarefa.value = "";
       horario1.value = "";
       horario2.value = "";

       erro.textContent = "Horário 1 precisa ser maior do que o Horário 2!";

       return;
   }

    const listaDeTarefas = document.querySelector("#listaTarefa");
    const itemLista = document.createElement("li");
    itemLista.classList.add("lista");
    itemLista.textContent = `Tarefa: ${tarefaValue} horário ${horario1Value} às ${horario2Value}`

    listaDeTarefas.appendChild(itemLista);
    tarefa.value = "";
    horario1.value = "";
    horario2.value = "";
    erro.textContent = "";
})
