function binarySearchRunner(input){
    //Define o início e o fim do array
    const { arr, target } = input

    let baixo = 0
    let alto = arr.length - 1

    while (baixo <= alto){
        //Dividir na metade e verificar aonde o item está
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

