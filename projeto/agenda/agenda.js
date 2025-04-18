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

const localStorageItems = localStorage;

botaoTarefa?.addEventListener("click", function(){
    const tarefa = document.querySelector("#tarefa");
    const tarefaValue = tarefa.value.toUpperCase();

    
    const horario1 = document.querySelector("#horario1");
    const horario1Value = horario1.value;

    const horario2 = document.querySelector("#horario2");
    const horario2Value = horario2.value;

    let erro = document.querySelector("#error");
    
    if(validationNull()){
        tarefa.value = "";
        horario1.value = "";
        horario2.value = "";
        
        erro.textContent = "Nenhum campo pode ser vazio!";
  
        return;
    }

    function validationNull(){
        if(tarefaValue == "" || horario1Value == "" || horario2Value == ""){
            return true;
        }
        return false;
    }

    function getHour(hourTime){
        const [hour, minute] = hourTime.split(":");
        const dateFormat = new Date(anoAtual, mesAtual, diaAtual, hour,minute,0);
        const dataFormatValue = dateFormat.getTime();
        return dateFormat;
    }

    if(getHour(horario1Value) >= getHour(horario2Value)){
        tarefa.value = "";
        horario1.value = "";
        horario2.value = "";
  
        erro.textContent = "Horário 2 precisa ser maior do que o Horário 1!";
  
        return;
    }

    const listaDeTarefas = document.querySelector("#listaTarefa");
    const itemLista = document.createElement("li");
    itemLista.classList.add("lista");
    itemLista.textContent = `Tarefa: ${tarefaValue} horário ${horario1Value} às ${horario2Value}`
    

    listaDeTarefas.appendChild(itemLista);

    const itemStorage = {
        tarefaValue,
        horario1Value,
        horario2Value
        };
    const itemStorageJSON = JSON.stringify(itemStorage);



    tarefa.value = "";
    horario1.value = "";
    horario2.value = "";
    erro.textContent = "";




    localStorageItems.setItem('itemStorageJSON', itemStorageJSON);
})
