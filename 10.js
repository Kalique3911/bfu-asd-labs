function merge(left, right) {
    const arr = []
    while (left.length && right.length) {
        // в этом цикле удаляем меньшие элементы из отсортированных масивов и добавляем в результирующий
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }
    return arr.concat(left).concat(right) // при слиянии массивов размера больше двух мы уже будем знать что большие элементы будут в конце
}

function mergeSort(arr) {
    if (arr.length < 2) return arr
    const half = Math.floor(arr.length / 2)
    const left = arr.slice(0, half)
    const right = arr.slice(half)
    return merge(mergeSort(left), mergeSort(right))
}

console.log(mergeSort([2, 5, 4, 3]))
