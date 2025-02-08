const fs = require("fs")

class ChainHashTable {
    constructor(size = 50) {
        this.buckets = Array.from(Array(size), () => [])
    }

    _hash(key) {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % this.buckets.length // 31 — это простое число
        }
        return hash
    }

    set(key, value) {
        let index = this._hash(key)

        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === key) {
                this.buckets[index][i][1] = value // Обновляем значение, если ключ уже существует
                return
            }
        }

        this.buckets[index].push([key, value])
    }

    get(key) {
        let index = this._hash(key)

        return this.buckets[index].find((item) => item[0] === key)
    }
}

let hashTable = new ChainHashTable()

let data = fs.readFileSync("inputC.txt", "utf-8").split(" ")

data.forEach((word) => hashTable.set(word, word))

fs.writeFileSync("outputC.txt", JSON.stringify(hashTable.buckets), "utf-8")
