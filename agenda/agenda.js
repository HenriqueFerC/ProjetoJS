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

arrayTasks.forEach((task) => {
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
    itemLista.appendChild(updateList);
    itemLista.appendChild(buttonList);
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

            console.log("hr 1 " + dataHorario1);
            console.log("tk 1 " + dataTask1);
            console.log("tk 2 " + dataTask2);

            if (dataHorario1 <= dataTask1 && dataHorario1 <= dataTask2) {
                validationHourBoolean = true;
            }
            else if (dataHorario1 <= dataTask1 && dataHorario2 >= dataTask2) {
                validationHourBoolean = true;
            }
            else if (dataHorario1 >= dataTask1 && dataHorario2 <= dataTask2) {
                validationHourBoolean = true;
            }
        })
    }

    validationHour(horario1Value, horario2Value);

    if (validationHourBoolean) {
        tarefa.value = "";
        horario1.value = "";
        horario2.value = "";

        erro.textContent = "Existe uma agenda cadastrada no intervalo informado!";

        return;
    }

    if (validationNull(tarefaValue, horario1Value, horario2Value)) {
        tarefa.value = "";
        horario1.value = "";
        horario2.value = "";

        erro.textContent = "Nenhum campo pode ser vazio!";

        return;
    }

    function getHour(hourTime) {
        const [hour, minute] = hourTime.split(":");
        const dateFormat = new Date(anoAtual, mesAtual, diaAtual, hour, minute, 0);
        return dateFormat;
    }

    if (getHour(horario1Value) >= getHour(horario2Value)) {
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
    itemLista.appendChild(updateList);
    itemLista.appendChild(buttonList);

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

function atualizarEventos() {
    const updateButton = document.querySelectorAll(".updateList");
    updateButton.forEach((button, index) => {
        button.addEventListener("click", function () {
            const updatedTask = prompt("Coloque aqui o Nome Atualizado");

            if (validationNull(updatedTask)) {
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

