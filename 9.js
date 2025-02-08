function heapify(arr, n, i) {
    let largest = i
    let left = 2 * i + 1
    let right = 2 * i + 2

    if (left < n && arr[i] < arr[left]) {
        largest = left
    }

    if (right < n && arr[largest] < arr[right]) {
        largest = right
    }

    if (largest !== i) {
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]] // меняем местами больший элемент потомка с меньшим родительским
        heapify(arr, n, largest)
    }
}

function heapSort(arr) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        // в этом цикле мы пробежимся по всему бинарному дереву от его низших элементов к высшему начав с середины и делая прямыми потомками высших элементов наибольшие низшие элементы
        heapify(arr, arr.length, i)
    }

    for (let i = arr.length - 1; i > 0; i--) {
        // в процессе отпадают найденные большие элементы в конце
        ;[arr[0], arr[i]] = [arr[i], arr[0]] // меняем местами найденный наибольший элемент с элементом в конце

        heapify(arr, i, 0)
    }

    return arr
}

heapSort([9, 5, 3, 2, 7, 4])
