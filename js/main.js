// coisas pra fazer:

// documentar e comentar o código
// formatar estilo da saída de temperaturas, e dos erros
// adicionar função para limpar os campos


import { converterTemperatura } from './conversor.js';

const button = document.getElementById('calcular');

button.addEventListener('click', function (event) {
    event.preventDefault()
    let temperatura = parseFloat(document.getElementById('valor1').value);
    let inputScale = document.getElementById('temperaturaInput').value;
    const resultadoElemento = document.getElementById('resultado');


    try {
        const resultados = converterTemperatura(temperatura, inputScale);
        const escalas = Object.keys(resultados);
        resultadoElemento.innerHTML = escalas
            .filter(escala => escala !== inputScale.toLowerCase()) // remove a escala original
            .map(escala => `<p>${escala.toUpperCase()}: ${resultados[escala].toFixed(2)}</p>`)
            .join('');

    } catch (error) {
        resultadoElemento.innerHTML = `<p> ❌ ERRO! ${error.message}</p>`;
        return;
    }


})

