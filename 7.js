function shellSort(arr) {
    let step = Math.floor(arr.length / 2)
    while (step > 0) {
        for (let i = step; i < arr.length; i++) {
            let j = i
            let dif = j - step
            while (dif >= 0 && arr[dif] > arr[j]) {
                ;[arr[dif], arr[j]] = [arr[j], arr[dif]]
                j = dif
                dif = j - step
            }
        }
        step = Math.floor(step / 2)
    }
    return arr
}
