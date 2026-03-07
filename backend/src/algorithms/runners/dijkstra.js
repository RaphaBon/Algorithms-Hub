function dijkstraRunner(input) {
    const { graph, start, target } = input

    if (!graph || typeof graph !== 'object' || Array.isArray(graph)) {
        const error = new Error('O input do dijkstra deve conter um grafo válido.')
        error.statusCode = 400
        throw error
    }

    if (!start) {
        const error = new Error('O input do dijkstra deve conter um início.')
        error.statusCode = 400
        throw error
    }

    if (!target) {
        const error = new Error('O input do dijkstra deve conter um objetivo.')
        error.statusCode = 400
        throw error
    }

    if (!graph[start]) {
        const error = new Error('O início informado não está no grafo.')
        error.statusCode = 400
        throw error
    }

    const costs = {}
    const parents = {}
    const processed = []

    // Para cada nó no grafo
    for (let node in graph) {
        costs[node] = Infinity // Define o custo como infinto
    }

    costs[start] = 0 

    function findLowestCostNode() {
        let lowestCost = Infinity
        let lowestCostNode = null

        for (let node in graph) {
            if (costs[node] < lowestCost && !processed.includes(node)) {
                lowestCost = costs[node]
                lowestCostNode = node
            }
        }

        return lowestCostNode
    }

    let node = findLowestCostNode()

    while (node !== null) {
        const cost = costs[node]
        const neighbors = graph[node] || {}

        for (let neighbor in neighbors) {
            const edgeWeight = neighbors[neighbor]

            if (typeof edgeWeight !== 'number' || edgeWeight < 0) {
                const error = new Error('O algoritmo de dijkstra só aceita pesos positivos.')
                error.statusCode = 400
                throw error
            }

            const newCost = cost + edgeWeight

            if (newCost < costs[neighbor]) {
                costs[neighbor] = newCost
                parents[neighbor] = node
            }
        }

        processed.push(node)
        node = findLowestCostNode()
    }

    if (costs[target] === undefined || costs[target] === Infinity) {
        return {
            found: false,
            path: [],
            cost: null
        }
    }

    const path = []
    let step = target

    while (step) {
        path.unshift(step)
        step = parents[step]
    }

    if (path[0] !== start) {
        return {
            found: false,
            path: [],
            cost: null
        }
    }

    return {
        found: true,
        path,
        cost: costs[target]
    }
}

module.exports = dijkstraRunner