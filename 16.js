class Node {
    constructor(key) {
        this.left = null
        this.right = null
        this.val = key
    }

    traverseNonRecursive() {
        const stack = -[]
        stack.push(this) // обходит начиная с первого элемента
        while (stack.length) {
            let current = stack.pop()
            while (current) {
                process.stdout.write(current.val + " ") // выводит значения дерева
                if (current.left) {
                    stack.push(current.left)
                }
                current = current.right
            }
        }
    }
}

function createTree(string) {
    return createSubtree(string, 0, string.length)
}

function findRightSubtree(string, start, end) {
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

    let number = ""
    while (/[0-9]/.test(string[start])) {
        number += string[start]
        start++
        if (start >= end) return new Node(parseInt(number, 10))
    }
    const node = new Node(parseInt(number, 10))

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
    try {
        const bt = createTree(input.trim())
        console.log("Traverse without recursion:")
        bt.traverseNonRecursive()
        console.log()
    } catch (error) {
        console.error(error.message)
    }
    rl.close()
})
