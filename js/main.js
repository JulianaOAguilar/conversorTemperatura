import { ConverterTemperatura } from './conversor.js';

let temperaturas = JSON.parse(localStorage.getItem('temperaturas')) || [];


document.addEventListener('DOMContentLoaded', function () {
    carregarTemperaturas()     // Carrega os temperaturas do Local Storage
    listarConversoesAnteriores() // carrega a tabela com os valores existentes no Local Storage
})

function carregarTemperaturas() {
    temperaturas = JSON.parse(localStorage.getItem('temperaturas')) || [];
}

function salvarTemperaturas() {
    const jsonTemp = JSON.stringify(temperaturas)
    localStorage.setItem('temperaturas', jsonTemp)
}


// limpar o histórico e o resultado
document.getElementById('limpar').addEventListener('click', function () {
    limpar();
    const resultadoElemento = document.getElementById('resultado');
    const anterioresElemento = document.getElementById('anteriores');
    resultadoElemento.innerHTML = '';
    anterioresElemento.innerHTML = '';
})

document.getElementById('calcular').addEventListener('click', (event) => {
    event.preventDefault();
    calcular();
});



function limpar() {
    localStorage.clear()
    temperaturas = []
    alert('Histórico Limpo')
    console.log(temperaturas) // tirar os consoles.logs(temperaturas) que tiver, só coloquei eles
    // para mostrar o conteudo do local storage no devTools (clicar no F12 para ver :D)
}


function calcular() {
    let temperatura = parseFloat(document.getElementById('valor1').value);
    let escalaSelecionada = document.querySelector('input[name="escala"]:checked');
    const resultadoElemento = document.getElementById('resultado');

    try {
        const resultados = ConverterTemperatura(temperatura, escalaSelecionada);
        const escalas = Object.keys(resultados);

        // adiciona ao histórico
        temperaturas.push(resultados);
        salvarTemperaturas();
        listarConversoesAnteriores();

          
        // monta texto em uma linha só, ignorando a escala de origem
        let textoLinha = escalas
            .filter(escala => escala !== escalaSelecionada.value.toLowerCase())
            .map(escala => `${escala.toUpperCase()}: ${resultados[escala].toFixed(2)}`)
            .join(' '); // tudo em uma linha

        // exibe no resultado com numeração
        resultadoElemento.innerHTML = `<p>${textoLinha}</p>`;

    } catch (error) {
        resultadoElemento.innerHTML = `<p> ❌ ERRO! ${error.message}</p>`;
    }
}


function listarConversoesAnteriores() {
    const corpo = document.getElementById('anteriores');
    corpo.innerHTML = '';

    // inverter a ordem e pega os 5 ultimos
    const ultimasTemperaturas = temperaturas.slice(-5).reverse();

    ultimasTemperaturas.forEach((tempObj, index) => {
        let texto = '';

        for (const escala in tempObj) {
            texto += `${escala.toUpperCase()}: ${tempObj[escala].toFixed(2)} `;
        }

        corpo.innerHTML += `${texto}</p>`;
    });
}
