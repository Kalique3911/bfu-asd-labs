let string = "((1+1)*14)*18*(2+2)="

let calcExpression = (str) => {
    let strArr = []

    for (let i = 0; i < str.length; i++) {
        strArr.push(str[i])
    }

    if (strArr[strArr.length - 1] !== "=") {
        return "неверное выражение"
    } else {
        strArr.pop()
    }

    let expression = { sign: "", firstNumber: "", secondNumber: "", start: "", secondNumberStart: "", parenthesesStart: "" }
    let parentheses = []

    while (strArr.length > 1) {
        for (let i = 0; i < strArr.length; i++) {
            if ((expression.secondNumber === "0" || expression.secondNumber === 0) && expression.sign === "/") {
                return "неверное выражение"
            }

            if (strArr[i] === ")") {
                if (parentheses.length > 0) {
                    parentheses.pop()
                } else {
                    return "неверное выражение"
                }
            }
            //parentheses check

            if (strArr[i + 1] === "(" || strArr[i] === ")" || strArr[i] === "(") {
                if (strArr[i] === "(") {
                    parentheses.push(strArr[i])
                    expression.parenthesesStart = i
                } else if (strArr[i + 1] === "(") {
                    parentheses.push(strArr[i + 1])
                    expression.sign = ""
                    expression.firstNumber = ""
                    expression.secondNumber = ""
                    expression.start = ""
                    expression.secondNumberStart = ""
                    expression.parenthesesStart = i + 1
                    i++
                    //change expression
                } else {
                    let expressionReuslt
                    if (expression.sign === "+") {
                        expressionReuslt = Number(expression.firstNumber) + Number(expression.secondNumber)
                    } else if (expression.sign === "-") {
                        expressionReuslt = Number(expression.firstNumber) - Number(expression.secondNumber)
                    } else if (expression.sign === "*") {
                        expressionReuslt = Number(expression.firstNumber) * Number(expression.secondNumber)
                    } else if (expression.sign === "/") {
                        expressionReuslt = Number(expression.firstNumber) / Number(expression.secondNumber)
                    } else if (!expression.sign) {
                        expressionReuslt = Number(expression.firstNumber)
                    }
                    expression.firstNumber = ""
                    expression.secondNumber = ""
                    expression.sign = ""
                    strArr.splice(
                        expression.parenthesesStart === 0 || expression.parenthesesStart ? expression.parenthesesStart : expression.start,
                        i - (expression.parenthesesStart === 0 || expression.parenthesesStart ? expression.parenthesesStart : expression.start + 1) + 1,
                        expressionReuslt.toString()
                    )
                    expression.start = ""
                    expression.secondNumberStart = ""
                    expression.parenthesesStart = ""
                    parentheses = []
                    break
                    //calc
                }
            } else if (Number(strArr[i]).toString() !== "NaN") {
                if (expression.sign) {
                    expression.secondNumber = expression.secondNumber.concat("", strArr[i])
                    if (!expression.secondNumberStart && expression.secondNumberStart !== 0) {
                        expression.secondNumberStart = i
                    }
                } else {
                    expression.firstNumber = expression.firstNumber.concat("", strArr[i])
                    if (!expression.start && expression.start !== 0) {
                        expression.start = i
                    }
                }
            } else if (strArr[i] === "*" || strArr[i] === "/") {
                if (expression.sign === "*" || expression.sign === "/") {
                    let expressionReuslt
                    if (expression.sign === "*") {
                        expressionReuslt = Number(expression.firstNumber) * Number(expression.secondNumber)
                    } else {
                        expressionReuslt = Number(expression.firstNumber) / Number(expression.secondNumber)
                    }
                    expression.parenthesesStart = ""
                    expression.firstNumber = ""
                    expression.secondNumber = ""
                    expression.sign = ""
                    strArr.splice(expression.start, i - expression.start, expressionReuslt.toString())
                    expression.start = ""
                    expression.secondNumberStart = ""
                    parentheses = []
                    break
                    //calc
                } else if (!expression.sign) {
                    expression.sign = strArr[i]
                } else {
                    expression.sign = strArr[i]
                    expression.firstNumber = expression.secondNumber
                    expression.secondNumber = ""
                    expression.start = expression.secondNumberStart
                    expression.secondNumberStart = ""
                    expression.parenthesesStart = ""
                    //change expression
                }
            } else if (strArr[i] === "+" || strArr[i] === "-") {
                if (!expression.sign) {
                    expression.sign = strArr[i]
                } else {
                    let expressionReuslt
                    if (expression.sign === "+") {
                        expressionReuslt = Number(expression.firstNumber) + Number(expression.secondNumber)
                    } else if (expression.sign === "-") {
                        expressionReuslt = Number(expression.firstNumber) - Number(expression.secondNumber)
                    } else if (expression.sign === "*") {
                        expressionReuslt = Number(expression.firstNumber) * Number(expression.secondNumber)
                    } else if (expression.sign === "/") {
                        expressionReuslt = Number(expression.firstNumber) / Number(expression.secondNumber)
                    }
                    expression.parenthesesStart = ""
                    expression.firstNumber = ""
                    expression.secondNumber = ""
                    expression.sign = ""
                    strArr.splice(expression.start, i - expression.start, expressionReuslt.toString())
                    expression.start = ""
                    expression.secondNumberStart = ""
                    parentheses = []
                    break
                    //calc
                }
            } else {
                return "неверное выражение"
            }
            if (i === strArr.length - 1) {
                let expressionReuslt
                if (expression.sign === "+") {
                    expressionReuslt = Number(expression.firstNumber) + Number(expression.secondNumber)
                } else if (expression.sign === "-") {
                    expressionReuslt = Number(expression.firstNumber) - Number(expression.secondNumber)
                } else if (expression.sign === "*") {
                    expressionReuslt = Number(expression.firstNumber) * Number(expression.secondNumber)
                } else if (expression.sign === "/") {
                    expressionReuslt = Number(expression.firstNumber) / Number(expression.secondNumber)
                } else {
                    expressionReuslt = Number(expression.firstNumber)
                    if (parentheses.length !== 0) {
                        return "неверное выражение"
                    }
                }
                expression.parenthesesStart = ""
                expression.firstNumber = ""
                expression.secondNumber = ""
                expression.sign = ""
                strArr.splice(expression.start, i - expression.start + 1, expressionReuslt.toString())
                expression.start = ""
                expression.secondNumberStart = ""
                parentheses = []
                break
                //calc
            }
        }
    }

    return strArr[0]
}

console.log(calcExpression(string))
