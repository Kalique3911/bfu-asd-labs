const fs = require("fs")
const os = require("os")

class OpenAdressingHashTable {
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

        while (this.buckets[index]?.length !== 0) {
            if (this.buckets[index][i][0] === key) {
                this.buckets[index][i][1] = value // Обновляем значение, если ключ уже существует
                return
            }
            index += 1
            if (!this.buckets[index]) {
                throw new Error("hashtable overload")
            }
        }

        this.buckets[index] = [key, value]
    }

    get(key) {
        let index = this._hash(key)

        return this.buckets[index][1]
    }
}

let hashTable = new OpenAdressingHashTable()

let data = fs.readFileSync("inputOA.txt", "utf-8").split(" ")

data.forEach((word) => hashTable.set(word, word))

fs.writeFileSync("outputAO.txt", JSON.stringify(hashTable.buckets), "utf-8")
