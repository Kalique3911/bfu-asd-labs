function separateNegative(arr) {
    return [arr.filter((elem) => elem < 0), arr.filter((elem) => elem >= 0)]
}

function radixSort(arr) {
    let [negativeArr, positiveArr] = separateNegative(arr)

    if (negativeArr.length > 0) {
        let maxDigits = Math.max(...negativeArr.map((elem) => String(Math.abs(elem)).length - 1))
        let radix = Array.from({ length: 10 }, () => [])

        for (let exponent = 0; exponent <= maxDigits; exponent++) {
            for (let elem of negativeArr) {
                let digit = (Math.abs(elem) / Math.pow(10, exponent)) | 0
                radix[digit % 10].push(elem)
            }
            negativeArr = radix.flat()
            radix = Array.from({ length: 10 }, () => [])
        }
    }

    if (positiveArr.length > 0) {
        let maxDigits = Math.max(...positiveArr.map((elem) => String(elem).length))
        let radix = Array.from({ length: 10 }, () => [])

        for (let exponent = 0; exponent < maxDigits; exponent++) {
            for (let elem of positiveArr) {
                let digit = Math.floor(elem / Math.pow(10, exponent)) % 10
                radix[digit].push(elem)
            }
            positiveArr = radix.flat()
            radix = Array.from({ length: 10 }, () => [])
        }
    }

    return negativeArr.concat(positiveArr)
}
