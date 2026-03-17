
class Queue{

    
    constructor(){
        
        this.queue = []
    }

    
    enqueue(element){
        this.queue.push(element)
    }

    
    dequeue(){
        
        return this.queue.shift()
    }

    isEmpty(){
        return this.queue.length === 0
    }

}


function bfsRunner(input){

    const { graph, start, target } = input
    
    
    const queue = new Queue()
    queue.enqueue(start)

    
    const visit = {}
    visit[start] = true

    
    const previous = {}

    
    while(!queue.isEmpty()){

            
            const current = queue.dequeue()

            
            if(current === target){

                
                const path = []

                
                let step = target

                while(step){   

                    
                    path.unshift(step)

                    
                    step = previous[step]
                }  
                
                return path 
            }

            const neighbors = graph[current] || []

            
            for(let i = 0; i < neighbors.length; i++){

                
                const neighbor = neighbors[i]

                
                if(!visit[neighbor]){

                    
                    visit[neighbor] = true

                    
                    previous[neighbor] = current

                    
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