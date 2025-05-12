const dataAtualJS = new Date();

const diaAtual = dataAtualJS.getDate();
const mesAtual = dataAtualJS.getMonth() + 1;
const anoAtual = dataAtualJS.getFullYear();

const todayDate = new Date(anoAtual, mesAtual, diaAtual);
const valueDate = todayDate.getTime();

const dataAtual = document.querySelector("#dataAgenda");
dataAtual.textContent = `Essa é a minha agenda pessoal do dia ${diaAtual}/${mesAtual}/${anoAtual}`;

const dataAtualStorage = localStorage.getItem('DataAtual');
const dataAtualParse = dataAtualStorage ? JSON.parse(dataAtualStorage) : 0;

if (dataAtualParse < valueDate) {
    localStorage.removeItem('itemStorageJSON');
}

const dataAtualJSON = JSON.stringify(valueDate);
localStorage.setItem('DataAtual', dataAtualJSON);

const erro = document.querySelector("#error");
const botaoVoltar = document.querySelector("#voltar");

botaoVoltar?.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/";
})


const localStorageToParse = localStorage.getItem('itemStorageJSON');
const arrayTasks = localStorageToParse ? JSON.parse(localStorageToParse) : [];

function listTasks(tarefaValue, horario1Value, horario2Value) {
    const listaDeTarefas = document.querySelector("#listaTarefa");
    const itemLista = document.createElement("li");
    const [hour, minute] = horario1Value.split(":");
    itemLista.id = `${tarefaValue.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "")}-${hour}-${minute}`;
    itemLista.classList.add("lista");
    itemLista.innerHTML = `Tarefa: <span id="span${tarefaValue.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "")}-${hour}-${minute}">${tarefaValue}</span> horário: <span>${horario1Value}</span> às <span>${horario2Value}</span>`;
  
    const deleteList = document.createElement("button");
    const updateList = document.createElement("button");
    deleteList.classList.add("buttonList");
    updateList.classList.add("updateList");
    deleteList.textContent = "Excluir";
    updateList.textContent = "Atualizar";
    listaDeTarefas.appendChild(itemLista);
  
    itemLista.appendChild(updateList);
    itemLista.appendChild(deleteList);

    deleteList.addEventListener("click", (event) => removerEventos(event));
    updateList.addEventListener("click", (event) => atualizarEventos(event));
}

function resetValues(tarefa, horario1, horario2) {
    tarefa.value = "";
    horario1.value = "";
    horario2.value = "";
}

arrayTasks.forEach((task) => {
    listTasks(task.tarefaValue, task.horario1Value, task.horario2Value);
})

function validationNull(tarefaValue, horario1Value, horario2Value) {
    if (tarefaValue.trim() == "" || horario1Value == "" || horario2Value == "") {
        return true;
    }
    return false;
}

const botaoTarefa = document.querySelector("#botaoTarefa");
botaoTarefa?.addEventListener("click", function () {
    const tarefa = document.querySelector("#tarefa");
    const tarefaValue = tarefa.value;

    const horario1 = document.querySelector("#horario1");
    const horario1Value = horario1.value;

    const horario2 = document.querySelector("#horario2");
    const horario2Value = horario2.value;


    let validationHourBoolean = false;

    function validationHour(hora1, hora2) {
        arrayTasks.forEach((task) => {
            const [hour1, minute1] = hora1.split(":");
            const [hour2, minute2] = hora2.split(":");
            const [taskHour1, taskMinute1] = task.horario1Value.split(":");
            const [taskHour2, taskMinute2] = task.horario2Value.split(":");

            const dataHorario1 = new Date(anoAtual, mesAtual, diaAtual, hour1, minute1, 0).getTime();
            const dataHorario2 = new Date(anoAtual, mesAtual, diaAtual, hour2, minute2, 0).getTime();
            const dataTask1 = new Date(anoAtual, mesAtual, diaAtual, taskHour1, taskMinute1, 0).getTime();
            const dataTask2 = new Date(anoAtual, mesAtual, diaAtual, taskHour2, taskMinute2, 0).getTime();

            if (dataHorario1 <= dataTask1 && dataHorario2 >= dataTask2) {
                validationHourBoolean = true;
            }
            else if (dataHorario1 <= dataTask1 && dataHorario2 >= dataTask2) {
                validationHourBoolean = true;
            }
            else if (dataHorario1 >= dataTask1 && dataHorario1 <= dataTask2) {
                validationHourBoolean = true;
            }
        })
    }

    validationHour(horario1Value, horario2Value);

    if (validationHourBoolean) {
        resetValues(tarefa, horario1, horario2);

        erro.textContent = "Existe uma agenda cadastrada no intervalo informado!";

        return;
    }

    if (validationNull(tarefaValue, horario1Value, horario2Value)) {
        resetValues(tarefa, horario1, horario2);

        erro.textContent = "Nenhum campo pode ser vazio!";

        return;
    }

    function getHour(hourTime) {
        const [hour, minute] = hourTime.split(":");
        const dateFormat = new Date(anoAtual, mesAtual, diaAtual, hour, minute, 0);
        return dateFormat;
    }

    if (getHour(horario1Value) >= getHour(horario2Value)) {
        resetValues(tarefa, horario1, horario2);

        erro.textContent = "Horário 2 precisa ser maior do que o Horário 1!";

        return;
    }

    listTasks(tarefaValue, horario1Value, horario2Value);

    const itemStorage = {
        tarefaValue,
        horario1Value,
        horario2Value
    };

    arrayTasks.push(itemStorage);
    const itemStorageJSON = JSON.stringify(arrayTasks);

    resetValues(tarefa, horario1, horario2);
    erro.textContent = "";

    localStorage.setItem('itemStorageJSON', itemStorageJSON);
})

function removerEventos(event) {
    const itemLista = event.target.parentElement;

    const listaDeTarefas = document.querySelector("#listaTarefa");
    const tarefasInArray = Array.from(listaDeTarefas.children)
    const tarefaIndex = tarefasInArray.indexOf(itemLista);

    if (itemLista) {
        itemLista.remove();

        console.log(tarefaIndex);
        arrayTasks.splice(tarefaIndex, 1);
        localStorage.setItem('itemStorageJSON', JSON.stringify(arrayTasks));
    }
}

let itemLista = "";
let indexToUpdate = "";

function atualizarEventos(event) {  
    itemLista = event.target.parentElement;
    const spanItem = itemLista.children[0].textContent;
    indexToUpdate = arrayTasks.findIndex(i => i.tarefaValue === spanItem);

    const inputCamp = document.querySelectorAll(".invisible");
    inputCamp.forEach((i) => {
        i.classList.remove("invisible");
    })
}  

const botaoAtualizar = document.querySelector("#enviarUpdate");
botaoAtualizar.addEventListener("click", () => {
    const updateTask = document.querySelector("#updateTask");
    const updateTaskValue = updateTask.value;

    const spanId = arrayTasks[indexToUpdate].horario1Value;
    const [hour, minute] = spanId.split(":");
    
    if (validationNull(updateTaskValue, arrayTasks[indexToUpdate].horario1Value, arrayTasks[indexToUpdate].horario2Value)) {
        const inputCampCSS = document.querySelector("#inputCamp");
        const updateTaskCSS = document.querySelector("#updateTask");
        const enviarUpdateCSS = document.querySelector("#enviarUpdate");
        inputCampCSS.classList.add("invisible");
        updateTaskCSS.classList.add("invisible");
        enviarUpdateCSS.classList.add("invisible");
        updateTask.value = "";
        itemLista = "";
        indexToUpdate = "";
        erro.textContent = `O nome da tarefa não pode ser vazio!`
        return;
    }
    
    itemLista.children[0].textContent = `${updateTaskValue}`
    itemLista.id = `${updateTaskValue.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "")}-${hour}-${minute}`;
    
    arrayTasks[indexToUpdate].tarefaValue = updateTaskValue;
    
    const itemStorageJSON = JSON.stringify(arrayTasks);
    localStorage.setItem('itemStorageJSON', itemStorageJSON);

    const inputCampCSS = document.querySelector("#inputCamp");
    const updateTaskCSS = document.querySelector("#updateTask");
    const enviarUpdateCSS = document.querySelector("#enviarUpdate");
    inputCampCSS.classList.add("invisible");
    updateTaskCSS.classList.add("invisible");
    enviarUpdateCSS.classList.add("invisible");

    updateTask.value = "";
    itemLista = "";
    indexToUpdate = "";
})
