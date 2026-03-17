function quickSort(arr){
    
    if(arr.length < 2){
        return arr
    }

    
    const indicePivo = Math.floor(Math.random() * arr.length)
    const pivo = arr[indicePivo]

    
    const menores = []
    const maiores = []

    
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
    return { sorted: quickSort(input.arr)}
}