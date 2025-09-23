/**
 * Converte a temperatura entre Celsius, Kelvin e Fahrenheit
 * @author Deborah S Navarro e Juliana Aguilar <deborah.scavacini@gmail.com>
 * @version 1.0.0
 * @since 1.0.0 (30/08/2025)
 * @param {number} celsius - graus celsius
 * @param {number} kelvin - graus kelvin
 * @param {number} fahrenheit - graus fahrenheit
 * @returns {number} o valor do convertido calculado
 * 
 * @example //converte 36ºC em Fahrenheit
 * const resultado = calcularTemperatura(36,0)
 * console.log(resultado)
 */



export function ConverterTemperatura(temperatura, escalaSelecionada) {
  if (isNaN(temperatura)) {
    throw new Error('Por favor, insira um valor numérico válido para a temperatura.');
  }

  const escala = escalaSelecionada.value.toLowerCase();

  let celsius = temperatura
  if (escala === 'celsius') {
    celsius = temperatura;
  } else if (escala === 'fahrenheit') {
    celsius = (temperatura - 32) * 5 / 9;
  } else if (escala === 'kelvin') {
    celsius = temperatura - 273.15;
  }


  const resultados = {
    celsius: celsius,
    fahrenheit: (celsius * 9 / 5) + 32,
    kelvin: celsius + 273.15
  };

  

  return resultados;
}
