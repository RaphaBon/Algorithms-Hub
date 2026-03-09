function binarySearchValidator(input) {
  if (!input || typeof input !== "object") {
    throw new Error("Input inválido. Esperado um objeto com 'arr' e 'target'.");
  }

  if (!Array.isArray(input.arr)) {
    throw new Error("O algoritmo binary_search exige um array em 'arr'.");
  }

  if (typeof input.target !== "number") {
    throw new Error("O campo 'target' deve ser um número.");
  }

  const allNumbers = input.arr.every((item) => typeof item === "number");

  if (!allNumbers) {
    throw new Error("O array 'arr' deve conter apenas números.");
  }

  for (let i = 1; i < input.arr.length; i++) {
    if (input.arr[i] < input.arr[i - 1]) {
      throw new Error("O array 'arr' deve estar ordenado em ordem crescente para binary_search.");
    }
  }
}

module.exports = binarySearchValidator;