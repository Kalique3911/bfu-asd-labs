const readline = require("node:readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let isBracketsStringValid = (str) => {
    let strArr = []

    for (let i = 0; i < str.length; i++) {
        strArr.push({ bracket: str[i], number: i })
    }
    let braces = []
    let squareBrackets = []
    let parentheses = []
    let error = ""

    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i].bracket === "{") braces.push(strArr[i])
        if (strArr[i].bracket === "[") squareBrackets.push(strArr[i])
        if (strArr[i].bracket === "(") parentheses.push(strArr[i])
        if (strArr[i].bracket === "}")
            if (
                braces.length > 0 &&
                (parentheses.length === 0 ? true : braces[braces.length - 1].number > parentheses[parentheses.length - 1].number) &&
                (squareBrackets.length === 0 ? true : braces[braces.length - 1].number > squareBrackets[squareBrackets.length - 1].number)
            ) {
                braces.pop()
            } else {
                return "неверная строка"
            }
        if (strArr[i].bracket === "]")
            if (
                squareBrackets.length > 0 &&
                (parentheses.length === 0 ? true : squareBrackets[squareBrackets.length - 1].number > parentheses[parentheses.length - 1].number) &&
                (braces.length === 0 ? true : squareBrackets[squareBrackets.length - 1].number > braces[braces.length - 1].number)
            ) {
                squareBrackets.pop()
            } else {
                return "неверная строка"
            }
        if (strArr[i].bracket === ")")
            if (
                parentheses.length > 0 &&
                (squareBrackets.length === 0 ? true : parentheses[parentheses.length - 1].number > squareBrackets[squareBrackets.length - 1].number) &&
                (braces.length === 0 ? true : parentheses[parentheses.length - 1].number > braces[braces.length - 1].number)
            ) {
                parentheses.pop()
            } else {
                return "неверная строка"
            }
    }

    if (error || braces.length !== 0 || squareBrackets.length !== 0 || parentheses.length !== 0) {
        return "неверная строка"
    } else {
        return "строка верная"
    }
}

rl.question("Введите строку: ", (string) => {
    console.log(isBracketsStringValid(string))
    rl.close()
})
