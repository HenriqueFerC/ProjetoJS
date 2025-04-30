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
    itemLista.innerHTML = `Tarefa: <span id="span${tarefaValue.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "")}-${hour}-${minute}">${tarefaValue}</span> horário: ${horario1Value} às ${horario2Value}`;
    const buttonList = document.createElement("button");
    const updateList = document.createElement("button");
    buttonList.classList.add("buttonList");
    updateList.classList.add("updateList");
    buttonList.textContent = "Excluir";
    updateList.textContent = "Atualizar";
    listaDeTarefas.appendChild(itemLista);
    itemLista.appendChild(updateList);
    itemLista.appendChild(buttonList);
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
    const tarefaValue = tarefa.value.toUpperCase();

    const horario1 = document.querySelector("#horario1");
    const horario1Value = horario1.value;

    const horario2 = document.querySelector("#horario2");
    const horario2Value = horario2.value;

    const erro = document.querySelector("#error");

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
    atualizarEventos();
})

function removerEventos() {
    const buttonRemove = document.querySelectorAll(".buttonList");
    buttonRemove.forEach((button, index) => {
        button?.addEventListener("click", function () {
            const itemListaId = arrayTasks[index].horario1Value;
            const [hour, minute] = itemListaId.split(":");
            console.log(`#${arrayTasks[index].tarefaValue.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "")}-${hour}-${minute}`)
            const itemLista = document.querySelector(`#${arrayTasks[index].tarefaValue.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "")}-${hour}-${minute}`);
            
            const itemToRemove = arrayTasks.findIndex(item => item["horario1"] === arrayTasks);


            arrayTasks.splice(index, 1);

            const itemStorageJSON = JSON.stringify(arrayTasks);

            const listaDeTarefas = document.querySelector("#listaTarefa");
            listaDeTarefas.removeChild(itemLista);

            localStorage.setItem('itemStorageJSON', itemStorageJSON);
        });
    });
}

removerEventos();

function atualizarEventos() {
    const updateButton = document.querySelectorAll(".updateList");
    updateButton.forEach((button, index) => {
        button.addEventListener("click", function () {
            const updatedTask = prompt("Coloque aqui o Nome Atualizado");

            if (validationNull(updatedTask, arrayTasks[index].horario1Value, arrayTasks[index].horario2Value)) {
                return;
            }


            const spanId = arrayTasks[index].horario1Value;
            const [hour, minute] = spanId.split(":");
            const span = document.querySelector(`#span${arrayTasks[index].tarefaValue.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "")}-${hour}-${minute}`);
            span.textContent = `${updatedTask}`;
            span.id = `span${updatedTask.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, "")}-${hour}-${minute}`;

            arrayTasks[index].tarefaValue = updatedTask;




            const itemStorageJSON = JSON.stringify(arrayTasks);
            localStorage.setItem('itemStorageJSON', itemStorageJSON);
            removerEventos();
        })
    })
}

atualizarEventos();

