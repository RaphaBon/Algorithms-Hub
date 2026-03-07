// Importa todos os runners dos algoritmos:
const quickSortRunner = require('./runners/quickSort')

const algorithmsRegistry = { // Objeto que funciona como catálogo
    quick_sort: quickSortRunner // Quando o nome passado for o quick_sort, chamamos o valor (quickSortRunner)
}

function getAlgorithmRunner(name){  // Função que procura o runner pelo nome
    return algorithmsRegistry[name] || null // Se existir, retorna ela, se não, passa nuull
}

module.exports = { getAlgorithmRunner } // Exporta a função