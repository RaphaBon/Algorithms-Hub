function quickSortValidator(input) {
    if (!input || typeof input !== "object") {
        throw new Error("Input inválido. Esperado um objeto com a propriedade 'arr'.");
    }

    if (!Array.isArray(input.arr)) {
        throw new Error("O algoritmo quick_sort exige um array em 'arr'.");
    }

    const allNumbers = input.arr.every((item) => typeof item === "number");

    if (!allNumbers) {
        throw new Error("O array 'arr' deve conter apenas números.");
    }
}

module.exports = quickSortValidator;