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


export function converterTemperatura(temperatura, inputScale)  {

    let celsius = temperatura
      if (inputScale === 'celsius') {
        celsius = temperatura; // Já está em Celsius
      } else if (inputScale === 'fahrenheit') {
        celsius = (temperatura - 32) * 5 / 9; // Fahrenheit para Celsius
    } else if (inputScale === 'kelvin') {
        celsius = temperatura - 273.15; // Kelvin para Celsius
    }

    const resultados = {
    celsius: celsius,
    fahrenheit: (celsius * 9 / 5) + 32,
    kelvin: celsius + 273.15
  };

  return resultados;
}
