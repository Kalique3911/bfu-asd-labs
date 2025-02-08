class Node {
    constructor(key) {
        this.left = null
        this.right = null
        this.val = key
    }

    traversePreOrder() {
        // Порядок прямого: Корень — Левое поддерево — Правое поддерево
        process.stdout.write(this.val + " ")
        if (this.left) {
            this.left.traversePreOrder()
        }
        if (this.right) {
            this.right.traversePreOrder()
        }
    }

    traverseInOrder() {
        // Порядок центрального: Левое поддерево — Корень — Правое поддерево
        if (this.left) {
            this.left.traverseInOrder()
        }
        process.stdout.write(this.val + " ")
        if (this.right) {
            this.right.traverseInOrder()
        }
    }

    traversePostOrder() {
        // Порядок концевого: Левое поддерево — Правое поддерево — Корень
        if (this.left) {
            this.left.traversePostOrder()
        }
        if (this.right) {
            this.right.traversePostOrder()
        }
        process.stdout.write(this.val + " ")
    }
}

function createTree(string) {
    return createSubtree(string, 0, string.length) // вызов строитт дерево от 0 до конца строки
}

function findRightSubtree(string, start, end) {
    // эта функция находит позицию, где заканчивается левое поддерево и начинается правое
    let bracketCounter = -1
    while (true) {
        if (start >= end) return -1
        if (string[start] === "," && bracketCounter === 0) return start + 1
        if (string[start] === "(") bracketCounter += 1
        if (string[start] === ")") bracketCounter -= 1
        start += 1
    }
}

function createSubtree(string, start, end) {
    while (string[start] === " " || string[start] === "(") start++
    if (start >= end) return null

    let number = "" // строка для добавления цифр, если число многозначное
    while (/[0-9]/.test(string[start])) {
        number += string[start]
        start++
        if (start >= end) return new Node(parseInt(number))
    }
    const node = new Node(parseInt(number))

    const rightSubtreeIndex = findRightSubtree(string, start, end) - 1

    if (rightSubtreeIndex === -1) {
        throw new Error("Wrong bracket notation string!")
    }

    if (rightSubtreeIndex) {
        node.left = createSubtree(string, start + 1, rightSubtreeIndex)
        node.right = createSubtree(string, rightSubtreeIndex + 1, end - 1)
    }
    return node
}

const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.question("Please, enter the linear-bracket string: ", (input) => {
    const bt = createTree(input.trim())
    console.log("In-Order traverse")
    bt.traverseInOrder()
    console.log("\nPost-Order traverse")
    bt.traversePostOrder()
    console.log("\nPre-Order traverse")
    bt.traversePreOrder()
    console.log()

    rl.close()
})
