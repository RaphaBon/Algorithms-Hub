function dijkstraValidator(input) {
  if (!input || typeof input !== "object") {
    throw new Error("Input inválido. Esperado um objeto com 'graph', 'start' e 'target'.");
  }

  const { graph, start, target } = input;

  if (!graph || typeof graph !== "object" || Array.isArray(graph)) {
    throw new Error("O campo 'graph' deve ser um objeto representando um grafo ponderado.");
  }

  if (typeof start !== "string" || !start.trim()) {
    throw new Error("O campo 'start' deve ser uma string não vazia.");
  }

  if (typeof target !== "string" || !target.trim()) {
    throw new Error("O campo 'target' deve ser uma string não vazia.");
  }

  if (!(start in graph)) {
    throw new Error("O nó inicial informado em 'start' não existe no grafo.");
  }

  if (!(target in graph)) {
    throw new Error("O nó alvo informado em 'target' não existe no grafo.");
  }

  for (const node in graph) {
    const neighbors = graph[node];

    for (const neighbor in neighbors) {
      const weight = neighbors[neighbor];

      if (weight < 0) {
        throw new Error("O algoritmo Dijkstra não aceita pesos negativos.");
      }
    }
  }
}

module.exports = dijkstraValidator;