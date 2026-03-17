function dijkstraRunner(input) {
    const { graph, start, target } = input

    const costs = {}
    const parents = {}
    const processed = []

    
    for (let node in graph) {
        costs[node] = Infinity 
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