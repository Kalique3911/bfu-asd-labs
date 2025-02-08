class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }

    // Вставка узла в БДП
    #insertNode(current, value) {
        if (value < current.value) {
            if (!current.left) {
                current.left = new Node(value)
            } else {
                this.#insertNode(current.left, value)
            }
        } else if (value > current.value) {
            if (!current.right) {
                current.right = new Node(value)
            } else {
                this.#insertNode(current.right, value)
            }
        } else {
            console.log(`${value} уже существует!`)
        }
    }

    insert(value) {
        if (!this.root) {
            this.root = new Node(value)
        } else {
            this.#insertNode(this.root, value)
        }
    }

    // Поиск узла в БДП
    #searchNode(value, parent, current) {
        if (!current) return { parent: null, current: null }
        if (value === current.value) {
            return { parent, current }
        } else if (value < current.value) {
            return this.#searchNode(value, current, current.left)
        } else {
            return this.#searchNode(value, current, current.right)
        }
    }

    search(value) {
        if (!this.root) return { parent: null, current: null }
        return this.#searchNode(value, null, this.root)
    }

    // Удаление узла из БДП
    #minValueNode(node) {
        let current = node
        while (current.left) {
            current = current.left
        }
        return current
    }

    #removeNode(root, value) {
        if (!root) return null

        if (value < root.value) {
            root.left = this.#removeNode(root.left, value)
        } else if (value > root.value) {
            root.right = this.#removeNode(root.right, value)
        } else {
            if (!root.left) {
                return root.right
            } else if (!root.right) {
                return root.left
            }

            const successor = this.#minValueNode(root.right)
            root.value = successor.value
            root.right = this.#removeNode(root.right, successor.value)
        }
        return root
    }

    remove(value) {
        this.root = this.#removeNode(this.root, value)
    }

    // Преобразование дерева в линейно-скобочную запись
    toBracketNotation(node = this.root) {
        if (!node) return ""
        const left = this.toBracketNotation(node.left)
        const right = this.toBracketNotation(node.right)
        if (left || right) {
            return `${node.value}(${left},${right})`
        }
        return `${node.value}`
    }

    // Построение БДП из линейно-скобочной записи
    static fromBracketNotation(string) {
        function parseSubtree(s, start, end) {
            while (s[start] === " " || s[start] === "(") start++
            if (start >= end) return null

            let number = ""
            while (/[0-9]/.test(s[start])) {
                number += s[start]
                start++
            }

            const node = new Node(parseInt(number))
            if (s[start] === "(") {
                let bracketCount = 0
                let splitIndex = start
                while (splitIndex < end) {
                    if (s[splitIndex] === "(") bracketCount++
                    if (s[splitIndex] === ")") bracketCount--
                    if (s[splitIndex] === "," && bracketCount === 1) break
                    splitIndex++
                }
                node.left = parseSubtree(s, start + 1, splitIndex)
                node.right = parseSubtree(s, splitIndex + 1, end - 1)
            }
            return node
        }

        const bst = new BST()
        bst.root = parseSubtree(string, 0, string.length)
        return bst
    }
}

const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let bst = new BST()

function menu() {
    console.log(`
    Выберите действие:
    1) Добавить элемент
    2) Удалить элемент
    3) Найти элемент
    0) Выйти и вывести дерево в скобочной записи
    `)

    rl.question("Ваш выбор: ", (command) => {
        switch (command) {
            case "1":
                rl.question("Введите значение для вставки: ", (value) => {
                    bst.insert(parseInt(value, 10))
                    menu()
                })
                break
            case "2":
                rl.question("Введите значение для удаления: ", (value) => {
                    bst.remove(parseInt(value, 10))
                    menu()
                })
                break
            case "3":
                rl.question("Введите значение для поиска: ", (value) => {
                    const { current, parent } = bst.search(parseInt(value, 10))
                    if (current) {
                        console.log(`Найдено значение: ${current.value}; Родитель: ${parent.value}`)
                    } else {
                        console.log("Значение не найдено")
                    }
                    menu()
                })
                break
            case "0":
                console.log("Дерево в скобочной записи: ")
                console.log(bst.toBracketNotation())
                rl.close()
                break
            default:
                menu()
                break
        }
    })
}

rl.question('Введите дерево в скобочной записи (например, "4(2(1,3),6(5,7))"): ', (tree) => {
    try {
        bst = BST.fromBracketNotation(tree)
    } catch (error) {
        console.log("Ошибка при разборе дерева. Начато с пустым деревом.")
    }
    menu()
})
