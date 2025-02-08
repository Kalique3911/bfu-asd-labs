function quickSort(arr) {
    if (arr.length < 2) return arr
    const pivot = arr.shift() // опорное число
    const left = []
    const right = []

    for (const elem of arr) {
        // меньшие элементы добавляем в левый массив, а большие в правый
        count += 1
        if (elem < pivot) {
            left.push(elem)
        } else {
            right.push(elem)
        }
    }

    // по такому же принципу сортируем два получившихся массива через рекурсию, причем в конец лефт массива кладём пивот, по итогу через конкат собираем отсортированный массив, сложность nlog2(n)
    const answer = quickSort(left)
    answer.push(pivot)
    return answer.concat(quickSort(right))
}

console.log(quickSort([2, 3243, 5, 766, 13, 25, 777, 2, 7]))
