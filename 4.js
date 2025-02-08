function combSort(arr) {
    const shrink = 1.247
    let gapFactor = arr.length / shrink

    while (gapFactor > 1) {
        let gap = Math.floor(gapFactor)
        for (let i = 0; i < arr.length - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                ;[arr[i], arr[i + gap]] = [arr[i + gap], arr[i]]
            }
        }
        gapFactor /= shrink
    }

    return arr
}
