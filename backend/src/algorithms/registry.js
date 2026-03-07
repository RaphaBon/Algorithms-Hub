// Importa todos os runners dos algoritmos:
const quickSortRunner = require('./runners/quickSort')
const binarySearchRunner = require('./runners/binarySearch')
const bfsRunner = require('./runners/bfs')
const dijkstraRunner = require("./runners/dijkstra")

const algorithmsRegistry = { // Objeto que funciona como catálogo
    quick_sort: quickSortRunner, // Quando o nome passado for o quick_sort, chamamos o valor (quickSortRunner)
    binary_search: binarySearchRunner,
    bfs: bfsRunner,
    dijkstra: dijkstraRunner
}

function getAlgorithmRunner(name){  // Função que procura o runner pelo nome
    return algorithmsRegistry[name] || null // Se existir, retorna ela, se não, passa nuull
}

module.exports = { getAlgorithmRunner } // Exporta a função