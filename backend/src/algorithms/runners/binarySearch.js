function binarySearchRunner(input){

    // Desestrutura o input recebido da API
    const { arr, target } = input

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

