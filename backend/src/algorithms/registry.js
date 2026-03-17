
const quickSortRunner = require('./runners/quickSort')
const binarySearchRunner = require('./runners/binarySearch')
const bfsRunner = require('./runners/bfs')
const dijkstraRunner = require("./runners/dijkstra")


const quickSortValidator = require('./validators/quickSortValidator')
const binarySearchValidator = require('./validators/binarySearchValidator')
const bfsValidator = require('./validators/bfsValidator')
const dijkstraValidator = require('./validators/dijkstraValidator')


const algorithmsRegistry = { 
    quick_sort: {
        name: "quick_sort",
        displayName: "Quick Sort",
        description: "Ordena um array de números utilizando Quick Sort",
        validator: quickSortValidator,
        runner: quickSortRunner
    },
    binary_search: {
        name: "binary_search",
        displayName: "Binary Search",
        description: "Busca binária em um array ordenado",
        validator: binarySearchValidator,
        runner: binarySearchRunner
    },
    bfs: {
        name: "bfs",
        displayName: "Breadth-First Search",
        description: "Busca em largura em um grafo",
        validator: bfsValidator,
        runner: bfsRunner
    },
    dijkstra: {
        name: "dijkstra",
        displayName: "Dijkstra",
        description: "Menor caminho em grafo com pesos positivos",
        validator: dijkstraValidator,
        runner: dijkstraRunner
    }
}

module.exports =  algorithmsRegistry