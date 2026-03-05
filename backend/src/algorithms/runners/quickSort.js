function quickSort(arr){
    //Se a lista tiver só 1 elemento, retorna ela
    if(arr.length < 2){
        return arr
    }

    //Define o pivo com um número aleatório do array
    indicePivo = Math.floor(Math.random() * arr.length)
    const pivo = arr[indicePivo]

    //Arrays para armazenarem os valores que são menores/maiores do que o pivo 
    const menores = []
    const maiores = []

    //Loop para percorrer a arr
    for (let i = 0; i < arr.length; i++){
        if (i === indicePivo) continue

        if(arr[i] <= pivo){
            menores.push(arr[i])
        }else{
            maiores.push(arr[i])
        }
    }

    return [... quickSort(menores), pivo,... quickSort(maiores)]
}

module.exports = function quickSortRunner(input){
    // input esperado: { arr: number[]}
    const { arr } = input
    return { sorted: quickSort(arr)}
}