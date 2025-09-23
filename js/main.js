import { ConverterTemperatura } from './conversor.js';

let temperaturas = JSON.parse(localStorage.getItem('temperaturas')) || [];

document.addEventListener('DOMContentLoaded', function () {
    carregarTemperaturas()
    // Carrega os temperaturas do Local Storage
    //listar temperaturas 
})

function carregarTemperaturas() {
        temperaturas = JSON.parse(localStorage.getItem('temperaturas')) || [];
    }

    function salvarTemperaturas() {
    const jsonProduct = JSON.stringify(temperaturas)
    localStorage.setItem('temperaturas', jsonProduct)
}

document.getElementById('limpar').addEventListener('click', (event) => {
    event.preventDefault();
    limpar();
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
        resultadoElemento.innerHTML = escalas
            .filter(escala => escala !== escalaSelecionada.value.toLowerCase())
            .map(escala => `<p>${escala.toUpperCase()}: ${resultados[escala].toFixed(2)}</p>`)
            .join('');

            temperaturas.push(resultados)
            salvarTemperaturas()
            console.log(temperaturas)

    } catch (error) {
        resultadoElemento.innerHTML = `<p> ❌ ERRO! ${error.message}</p>`;
        return;
    }
}
