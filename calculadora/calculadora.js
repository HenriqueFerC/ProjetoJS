const voltar = document.querySelector("#volta");

voltar.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "../index.html";
})

const numeros = document.querySelector("#numbers");


let calcular = [];
let historico = [];

numeros.addEventListener("click", function (event) {
    let numeroClicado = event.target.value;

    const showResult = document.querySelector("#resposta");

    function validation() {
        if (calcular.at(-1) == '+') {
            calcular.pop();
        } else if (calcular.at(-1) == '-') {
            calcular.pop();
        } else if (calcular.at(-1) == '*') {
            calcular.pop();
        } else if (calcular.at(-1) == '/') {
            calcular.pop();
        }
        historico.push(...calcular);
        calcular = [];
    }

    switch (numeroClicado) {
        case 10:
            validation();
            numeroClicado = '+';
            break;
        case 11:
            if (calcular.findIndex(i => i === ".") >= 0) {
                return;
            } else if (calcular.at(0) == '-' && calcular.length == 1) {
                return;
            }
            numeroClicado = ".";
            break;
        case 12:
            validation();
            numeroClicado = '-';
            break;
        case 13:
            validation();
            numeroClicado = '/';
            break;
        case 14:
            validation();
            numeroClicado = '*';
            break;
        case 15:
            if (calcular.length <= 1 && historico.length == 0) {
                calcular.pop();
                return;
            }
            if (calcular.at(0) == '*' && calcular.length == 1 && historico.length != 0 || calcular.at(0) == '/' && calcular.length == 1 && historico.length != 0 || calcular.at(0) == '+' && calcular.length == 1 && historico.length != 0 || calcular.at(0) == '-' && calcular.length == 1 && historico.length != 0) {
                calcular.pop();
            }
            historico.push(...calcular);
            const result = eval(historico.join(""));
            historico = [result]
            calcular = [];
            showResult.textContent = result.toFixed(2);
            return;
        case 16:
            calcular = [];
            resultFormat = historico.join("") + calcular.join("");
            showResult.textContent = resultFormat;
            if (resultFormat.length == 0) {
                showResult.textContent = "Resultado"
            }
            return;
        case 17:
            calcular = [];
            historico = [];
            showResult.textContent = "Resultado";
            return;
        case 18:
            let calcularLenght = calcular.length != 0;
            const historicoLenght = historico.length != 0;
            if (calcularLenght) {
                calcular.pop();
                resultFormat = historico.join("") + calcular.join("");
                showResult.textContent = resultFormat;
                calcularLenght = calcular.length != 0;
            }
            if (!calcularLenght && !historicoLenght) {
                showResult.textContent = "Resultado";
                return;
            }
            return;
        case 19:
            calcular.push('/');
            calcular.push(100);
            showResult.textContent = resultFormat;
            return;
    }

    const result = historico.at(-1);

    if (result == '.') {
        if (numeroClicado == '*' || numeroClicado == '/' || numeroClicado == '+' || numeroClicado == '-') {
            numeroClicado = 30;
            calcular = [...historico]
            historico = [];
            return;
        }
    }

    calcular.push(numeroClicado);

    const booleanFindIndex = calcular.findIndex(i => i == '/' || i == '*' || i == '+' || i == '0')

    if (calcular.length == 1 && booleanFindIndex == 0 && historico.length == 0) {
        calcular = [];
        showResult.textContent = "Resultado";
        return;
    }

    if (historico.length != 0 && calcular.length == 1 && numeroClicado >= 0 ||
         historico.length != 0 && calcular.length == 1 && numeroClicado == '.') {
        historico = [];
        calcular = [];
        calcular.push(numeroClicado);
    }


    resultFormat = historico.join("") + calcular.join("");
    showResult.textContent = resultFormat;
})

document.addEventListener('keydown', function (event) {
    let numeroClicado = event.key;

    if (numeroClicado == '=') {
        numeroClicado = "Enter";
    } else if (numeroClicado == ',') {
        numeroClicado = '.';
    }


    const showResult = document.querySelector("#resposta");

    function validation() {
        if (calcular.at(-1) == '+') {
            calcular.pop();
        } else if (calcular.at(-1) == '-') {
            calcular.pop();
        } else if (calcular.at(-1) == '*') {
            calcular.pop();
        } else if (calcular.at(-1) == '/') {
            calcular.pop();
        }
        historico.push(...calcular);
        calcular = [];
    }

    switch (numeroClicado) {
        case '+':
            validation();
            numeroClicado = '+';
            break;
        case '.':
            if (calcular.findIndex(i => i === ".") >= 0) {
                return;
            } else if (calcular.at(0) == '-' && calcular.length == 1) {
                return;
            }
            numeroClicado = ".";
            break;
        case '-':
            validation();
            numeroClicado = '-';
            break;
        case '/':
            validation();
            numeroClicado = '/';
            break;
        case '*':
            validation();
            numeroClicado = '*';
            break;
        case 'Enter':
            if (calcular.length <= 1 && historico.length == 0) {
                calcular.pop();
                return;
            }
            if (calcular.at(0) == '*' && calcular.length == 1 && historico.length != 0 || calcular.at(0) == '/' && calcular.length == 1 && historico.length != 0 || calcular.at(0) == '+' && calcular.length == 1 && historico.length != 0 || calcular.at(0) == '-' && calcular.length == 1 && historico.length != 0) {
                calcular.pop();
            }
            historico.push(...calcular);
            const result = eval(historico.join(""));
            historico = [result]
            calcular = [];
            showResult.textContent = result.toFixed(2);
            return;
        case 16:
            calcular = [];
            resultFormat = historico.join("") + calcular.join("");
            showResult.textContent = resultFormat;
            if (resultFormat.length == 0) {
                showResult.textContent = "Resultado"
            }
            return;
        case 'Escape':
            calcular = [];
            historico = [];
            showResult.textContent = "Resultado";
            return;
        case 'Backspace':
            let calcularLenght = calcular.length != 0;
            const historicoLenght = historico.length != 0;
            if (calcularLenght) {
                calcular.pop();
                resultFormat = historico.join("") + calcular.join("");
                showResult.textContent = resultFormat;
                calcularLenght = calcular.length != 0;
            }
            if (!calcularLenght && !historicoLenght) {
                showResult.textContent = "Resultado";
                return;
            }
            return;
        case 19:
            calcular.push('/');
            calcular.push(100);
            showResult.textContent = resultFormat;
            return;
    }

    const result = historico.at(-1);

    if (result == '.') {
        if (numeroClicado == '*' || numeroClicado == '/' || numeroClicado == '+' || numeroClicado == '-') {
            numeroClicado = 30;
            calcular = [...historico]
            historico = [];
            return;
        }
    }

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '-', '+', '.', '*', '/'];
    const operator = ['-', '/', '*', '+'];

    const operatorNumber = operator.findIndex(i => i == numeroClicado);
    console.log(operatorNumber);

    numbers.forEach(element => {
        if (element == numeroClicado) {
            calcular.push(numeroClicado);
        }
    });

    if (historico.length != 0 && calcular.length == 1 && numeroClicado >= 0 ||
         historico.length != 0 && calcular.length == 1 && numeroClicado == '.') {
        historico = [];
        calcular = [];
        calcular.push(numeroClicado);
    }


    const booleanFindIndex = calcular.findIndex(i => i == '/' || i == '*' || i == '+' || i == '0')

    if (calcular.length == 1 && booleanFindIndex == 0 && historico.length == 0) {
        calcular = [];
        showResult.textContent = "Resultado";
        return;
    }


    resultFormat = historico.join("") + calcular.join("");
    if (resultFormat == '') {
        showResult.textContent == "Resultado";
        return;
    }
    showResult.textContent = resultFormat;
});


