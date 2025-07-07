const voltar = document.querySelector("#volta");

voltar.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "../index.html";
})

const numeros = document.querySelector("#numbers");

let lastClick = "";

let calcular = [];
let historico = [];

numeros.addEventListener("click", function(event){
    let numeroClicado = event.target.value;
    
    const showResult = document.querySelector("#resposta");

    function validation(){
        if(calcular.at(-1) == '+'){
            calcular.pop();
        } else if (calcular.at(-1) == '-'){
            calcular.pop();
        } else if (calcular.at(-1) == '*'){
            calcular.pop();
        } else if (calcular.at(-1) == '/'){
            calcular.pop();
        }
        historico.push(...calcular);
        calcular = [];
    }

    switch(numeroClicado) {
        case 10:
            validation();
            numeroClicado = '+';
            break;
        case 11:
            if (calcular.findIndex(i => i === ".") >= 0){
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
            if(resultFormat.length == 0){
                showResult.textContent = "Resultado"
            }
            return;
        case 17:
            calcular = [];
            historico = [];
            showResult.textContent = "Resultado";
            return;
    }



    calcular.push(numeroClicado);
    
    const booleanFindIndex = calcular.findIndex(i => i == '/' || i == '*' || i == '+' || i =='0')

    if(calcular.length == 1 && booleanFindIndex == 0 && historico.length == 0){
        calcular = [];
        showResult.textContent = "Resultado";
        return;
    }
    
    resultFormat = historico.join("") + calcular.join("");
    showResult.textContent = resultFormat;
})

