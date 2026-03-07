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

    //Loop para percorrer o arr
    for (let i = 0; i < arr.length; i++){
        if (i === indicePivo) continue

        if(arr[i] <= pivo){
            menores.push(arr[i])
        }else{
            maiores.push(arr[i])
        }
    }

    // O operador ... espalha os elementos do array, ou seja: [... [1,2],5, ...[9]] vira : [1,2,5,9]
    return [... quickSort(menores), pivo,... quickSort(maiores)]   
}

// Criamos uma função de runner como um "adptador" do algoritmo para o sistema, pois o sistema vai receber
// um input genérico viindo da API, e cada algoritmo pode espeerar formatos diferentes. Logo, pegamos o input
// e desestruturamos ele, já que no body vem assim:

/** {
 *     algoritm: "quick_sort",
 *     input: {
 *              "arr": [5,2,6,8]
 *              }
 *  }
 * Entao, o que irá para a função quickSort é só o arr: [5,2,6,8] 
 */

module.exports = function quickSortRunner(input){
    // input esperado: { arr: number[]}
    const { arr } = input

    if(!Array.isArray(arr)) //Verificamos se realmente é um array, se nao for, passamos o erro pro middleware global
    {
        const error = new Error("O input deve conter um array!!")
        error.statusCode = 400
        throw error
    }
    
    return { sorted: quickSort(arr)}
}