const binarySearch = require("./runners/binarySearch")
const quickSort = require('./runners/quickSort')

const registry = { // Mandamos "algorithm": "quick_sort" ele roda o algoritmo quickSort
    binary_search: binarySearch,
    quick_sort: quickSort,
}

function getRunner(name){
    return registry[name]  || null
}

module.exports = { getRunner }