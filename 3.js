function findNumbers(x) {
    const result = []

    let k = 0
    while (3 ** k <= x) {
        let l = 0
        while (3 ** k * 5 ** l <= x) {
            let m = 0
            while (3 ** k * 5 ** l * 7 ** m <= x) {
                result.push(3 ** k * 5 ** l * 7 ** m)
                m++
            }
            l++
        }
        k++
    }

    result.sort((a, b) => a - b)
    return result
}

const x = 100
const numbers = findNumbers(x)
console.log("Числа, удовлетворяющие условию:")
console.log(numbers)
