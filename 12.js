const fs = require("fs")
const path = require("path")
const os = require("os")

async function mergeFiles(outputFile, tempFiles) {
    let minIndex = 0
    let indexes = Array.from(Array(tempFiles.length), () => 0)
    let heap = []

    do {
        heap = []
        tempFiles.forEach((file, index) => {
            const data = fs.readFileSync(file, "utf-8").split(os.EOL).filter(Boolean)[indexes[index]]
            if (data) {
                heap.push(data)
            } else {
                heap.push(Infinity)
            }
        })
        const chunk = Math.min(...heap.map(Number).sort((a, b) => a - b))
        minIndex = heap.indexOf(chunk.toString())
        indexes[minIndex] += 1
        if (Number.isFinite(chunk)) fs.appendFileSync(outputFile, chunk.toString() + "\r\n", "utf-8")
    } while (heap.find((el) => Number.isFinite(Number(el))))
}

function createInitialRuns(inputFile, runSize, tempPath) {
    if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath, { recursive: true })

    return fs
        .readFileSync(inputFile, "utf-8")
        .split(os.EOL)
        .filter(Boolean)
        .reduce((tempFiles, _, i, arr) => {
            if (i % runSize === 0) {
                const chunk = arr
                    .slice(i, i + runSize)
                    .map(Number)
                    .sort((a, b) => a - b)
                const tempFileName = path.join(tempPath, `f_${tempFiles.length}.txt`)
                fs.writeFileSync(tempFileName, chunk.join(os.EOL), "utf-8")
                tempFiles.push(tempFileName)
            }
            return tempFiles
        }, [])
}

async function externalMultiphaseSort(inputPath, runSize) {
    const inputFile = path.join(inputPath, "input.txt")
    const outputFile = path.join(inputPath, "output.txt")
    const tempPath = path.join(inputPath, "Temp_files_linear")

    const tempFiles = createInitialRuns(inputFile, runSize, tempPath)
    await mergeFiles(outputFile, tempFiles, runSize)

    console.log("Sorting complete. Output file:", outputFile)
}

externalMultiphaseSort("./", 5)
