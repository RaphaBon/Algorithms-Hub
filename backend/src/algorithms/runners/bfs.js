// Criamos uma classe para fila
class Queue{

    // Método construtor da classe (roda quando criamos a classe)
    constructor(){
        // Criamos a fila:
        this.queue = []
    }

    // Método para adicioanr elementos na fila
    enqueue(element){
        this.queue.push(element)
    }

    // Método para remover elementos da fila
    dequeue(){
        //Removemos o 1° item
        return this.queue.shift()
    }

    isEmpty(){
        return this.queue.length === 0
    }

}

// Função BFS
function bfsRunner(input){

    const { graph, start, target } = input
    
    if(!graph || typeof graph !== 'object' || Array.isArray(graph)){
        const error = new Error('O input do bfs deve conter um objeto válido no "gráfico".')
        error.statusCode = 400
        throw error
    }

    if(!start){
        const error = new Error('O input do bfs deve conter um "início".')
        error.statusCode = 400
        throw error
    }

    if(!target){
        const error = new Error('O input do bfs deve conter um "alvo".')
        error.statusCode = 400
        throw error
    }

    // Cria a fila e passa o ponto incial da fila
    const queue = new Queue()
    queue.enqueue(start)

    // Cria o objeto para marcar os visitado e marca o inicio como visitado
    const visit = {}
    visit[start] = true

    // Objeto para guardar o nó anterior da fila
    const previous = {}

    // Enquanto a fila nao estiver vazia
    while(!queue.isEmpty()){

            // Pegamos o nó do topo da fila
            const current = queue.dequeue()

            // Se o nó atual for o objetivo:
            if(current === target){

                // Constante para armazenar o caminho final
                const path = []

                // Essa variável vai armazenar os nós do final para o começo
                let step = target

                while(step){   //Enquanto o objetivo  ainda estiver na fila

                    // Remove da fila o objetivo e salva no inicio do array final
                    path.unshift(step)

                    // E passa o anterior do objetivo.
                    step = previous[step]
                }  
                //Retorna todo o camihno
                return path 
            }

            const neighbors = graph[current] || []

            // Percorre todos os vizinhos
            for(let i = 0; i < neighbors.length; i++){

                // Acessa cada vizinho por vez. 
                const neighbor = neighbors[i]

                // Se ainda não visitou esse vizinho
                if(!visit[neighbor]){

                    // Marca ele como visitado
                    visit[neighbor] = true

                    // Pega o anterior desse vizinho.
                    previous[neighbor] = current

                    // Coloca o vizinho na fila
                    queue.enqueue(neighbor)

                }
            }
    }

    return {
        found: false,
        path: []
    }
}

module.exports = bfsRunner