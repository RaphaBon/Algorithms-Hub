function binarySearchRunner(input){

    // Desestrutura o input recebido da API
    const { arr, target } = input

    if(!Array.isArray(arr)){
        const error = new Error('O input do binary_search deve conter um array!!')
        error.statusCode = 400
        throw error
    }

    if(target == undefined){
        const error = new Error('O input do binary_search deve conter um "target" !!')
        error.statusCode = 400
        throw error
    }
    
    for(let i =0; i < arr.length - 1;i++){
        if(arr[i] > arr[i+1]){
            const error = new Error('O array enviado para o binary_search deve ser ordenado')
            error.statusCode = 400
            throw error
        }
    }

    // Define o inicio e o fim do array
    let baixo = 0
    let alto = arr.length - 1

    // Enquanto ainda houver intervalo
    while (baixo <= alto){

        // Dividi na metade e verifica aonde o item está
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

