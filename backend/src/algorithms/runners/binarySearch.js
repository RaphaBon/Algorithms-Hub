function binarySearchRunner(input){

    
    const { arr, target } = input

    
    let baixo = 0
    let alto = arr.length - 1

    
    while (baixo <= alto){

        
        const meio = Math.floor((baixo + alto) / 2)
        const chute = arr[meio]

        if (chute === target){
            return meio
        }

        if (chute > target){
            alto = meio - 1
        }
        else {
            baixo = meio + 1
        }
    }

    return { index: -1 }
}

module.exports = binarySearchRunner

