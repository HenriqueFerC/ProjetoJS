const dataAtualJS = new Date();

let diaAtual = dataAtualJS.getDate();
let mesAtual = dataAtualJS.getMonth()+1;
let anoAtual = dataAtualJS.getFullYear();

const todayDate = new Date(anoAtual, mesAtual, diaAtual);
const valueDate = todayDate.getTime();

let dataAtual = document.querySelector("#dataAgenda");
dataAtual.textContent = `Essa é a minha agenda pessoal do dia ${diaAtual}/${mesAtual}/${anoAtual}`;

const dataAtualStorage = localStorage.getItem('DataAtual');
const dataAtualParse = dataAtualStorage ? JSON.parse(dataAtualStorage) : [];

if(dataAtualParse < valueDate){
    const arrayTasks = localStorageToParse ? JSON.parse(localStorageToParse) : [];
    arrayTasks.splice(0, arrayTasks.length);
    localStorage.removeItem('itemStorageJSON');
}

const dataAtualJSON = JSON.stringify(valueDate);
localStorage.setItem('DataAtual', dataAtualJSON);


console.log(dataAtualParse);

console.log(valueDate)


let botaoVoltar = document.querySelector("#voltar");

botaoVoltar?.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "/";
})

    
const localStorageToParse = localStorage.getItem('itemStorageJSON');
const arrayTasks = localStorageToParse ? JSON.parse(localStorageToParse) : [];

arrayTasks.forEach((task)=>{
    const listaDeTarefas = document.querySelector("#listaTarefa");
    const itemLista = document.createElement("li");
    itemLista.classList.add("lista");
    itemLista.textContent = `Tarefa: ${task.tarefaValue} horário: ${task.horario1Value} às ${task.horario2Value}`;
    const buttonList = document.createElement("button");
    const updateList = document.createElement("button");
    buttonList.classList.add("buttonList");
    updateList.classList.add("updateList");
    buttonList.textContent = "Excluir";
    updateList.textContent = "Atualizar";
    listaDeTarefas.appendChild(itemLista);
    itemLista.appendChild(buttonList);
    itemLista.appendChild(updateList);
})


const botaoTarefa = document.querySelector("#botaoTarefa");
botaoTarefa?.addEventListener("click", function(){
    const tarefa = document.querySelector("#tarefa");
    const tarefaValue = tarefa.value.toUpperCase();

    
    const horario1 = document.querySelector("#horario1");
    const horario1Value = horario1.value;

    const horario2 = document.querySelector("#horario2");
    const horario2Value = horario2.value;

    let erro = document.querySelector("#error");
    
    function validationHour(){
        arrayTasks.forEach((task => {
            if(horario1Value >= task.horario1Value && horario1Value <= task.horario2Value){
                return true;
            }
            else if(horario2Value >= task.horario1Value && horario2Value <= task.horario2Value){
                return true;
            }
        }))
    return false;
}
    

    if(validationHour()){
        tarefa.value = "";
        horario1.value = "";
        horario2.value = "";

        erro.textContent = "Horário já cadastrado";

        return;
    }

    if(validationNull()){
        tarefa.value = "";
        horario1.value = "";
        horario2.value = "";
        
        erro.textContent = "Nenhum campo pode ser vazio!";
  
        return;
    }

    function validationNull(){
        if(tarefaValue.trim() == "" || horario1Value == "" || horario2Value == ""){
            return true;
        }
        return false;
    }

    function getHour(hourTime){
        const [hour, minute] = hourTime.split(":");
        const dateFormat = new Date(anoAtual, mesAtual, diaAtual, hour,minute,0);
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
    const buttonList = document.createElement("button");
    const updateList = document.createElement("button");
    itemLista.classList.add("lista");
    buttonList.classList.add("buttonList");
    updateList.classList.add("updateList");
    buttonList.textContent = "Excluir";
    updateList.textContent = "Atualizar";
    itemLista.textContent = `Tarefa: ${tarefaValue} horário: ${horario1Value} às ${horario2Value}`;
    

    listaDeTarefas.appendChild(itemLista);
    itemLista.appendChild(buttonList);
    itemLista.appendChild(updateList);

    const itemStorage = {
        tarefaValue,
        horario1Value,
        horario2Value
        };
    arrayTasks.push(itemStorage);
    const itemStorageJSON = JSON.stringify(arrayTasks);
    

    tarefa.value = "";
    horario1.value = "";
    horario2.value = "";
    erro.textContent = "";




    localStorage.setItem('itemStorageJSON', itemStorageJSON);
    removerEventos();
    atualizarEventos();
})

function removerEventos() {
    const buttonRemove = document.querySelectorAll(".buttonList");
    buttonRemove.forEach((button, index) => {
        button?.addEventListener("click", function () {
            arrayTasks.splice(index, 1);
            const itemStorageJSON = JSON.stringify(arrayTasks);

            const listaDeTarefas = document.querySelector("#listaTarefa");
            listaDeTarefas.removeChild(listaDeTarefas.children[index]);

            localStorage.setItem('itemStorageJSON', itemStorageJSON)
        });
    });
}

removerEventos();

function atualizarEventos(){
    const updateButton = document.querySelectorAll(".updateList");
    updateButton.forEach((button, index) => {
        button.addEventListener("click", function(){
            const updatedTask = prompt("Coloque aqui o Nome Atualizado");

            if(updatedTask.trim() == ""){
                return;
            }

            arrayTasks[index].tarefaValue = updatedTask;
            
            const listaDeTarefas = document.querySelector("#listaTarefa");
            listaDeTarefas.children[index].textContent = `Tarefa: ${updatedTask} horário: ${arrayTasks[index].horario1Value} às ${arrayTasks[index].horario2Value}`;

            const itemLista = document.querySelector(".lista");
            const buttonList = document.createElement("button");
            const updateList = document.createElement("button");
            buttonList.classList.add("buttonList");
            updateList.classList.add("updateList");
            buttonList.textContent = "Excluir";
            updateList.textContent = "Atualizar";
            itemLista.appendChild(buttonList);
            itemLista.appendChild(updateList);

            const itemStorageJSON = JSON.stringify(arrayTasks);
            localStorage.setItem('itemStorageJSON', itemStorageJSON);
            atualizarEventos();
            removerEventos();
        })
    })
}

atualizarEventos();

