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

document.getElementById('limpar').addEventListener('click', (event) => {
    event.preventDefault();
    corpo.innerHTML = ''
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
    console.log(temperaturas)
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
            listarConversoesAnteriores()
            console.log(temperaturas)

    } catch (error) {
        resultadoElemento.innerHTML = `<p> ❌ ERRO! ${error.message}</p>`;
        return;
    }
}

function listarConversoesAnteriores() {
    const corpo = document.getElementById('anteriores');

    corpo.innerHTML = ''; // limpa o conteúdo anterior
    let linhas = '';

    temperaturas.forEach((tempObj) => {
        // Constrói uma linha com os valores do objeto
        let linha = '';
        
        for (const escala in tempObj) {
            linha += `<td>${escala.toUpperCase()}: ${tempObj[escala].toFixed(2)} </td>`;
        }

        linha += `</tr>`;
        linhas += linha;
        linhas += `<tr><td colspan="3"><br></td></tr>`;
    });

    corpo.innerHTML = linhas; // insere as linhas construídas na tabela
}


