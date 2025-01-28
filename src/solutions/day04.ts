export const solve = (input: string): string => {
    // map input into 2d array
    const input2dArray = input.split('\n').map((row) => row.split(""))
    const numRows = input2dArray.length
    const numCols = input2dArray[0].length

    let wordCount = 0 // part 1
    let X_MASCount = 0 // part 2
    let numChecked = 0
    
    for (let row = 0; row <= numRows - 1; row++) {
        for (let col = 0; col <= numCols - 1; col++) {
            // loop through all the indicies looking for X becuase that will always be the starting character
            // if X, check above, below, lef, right, and diagonals, 
            // if XMAS increment wordCount by 1
            numChecked += 1
            if (input2dArray[row][col] === "X") {
                wordCount += getNumXMAS(row, col, input2dArray)
            }
            if (input2dArray[row][col] === "A") {
                if(getIsX_MAS(row, col, input2dArray)) {
                    X_MASCount += 1
                }
            }
        }
    }

    // part 1
    // return "answer: " + wordCount 

    // part 2
    return "answer: " + X_MASCount
}

const getIsX_MAS = (row: number, col: number, input: string[][]): boolean => {
    // we are centered on the "A", assume border will always fail. assume if corners contain X or A it fails. 
    const numRows = input.length
    const numCols = input[0].length

    if (row === 0 || row == numRows - 1 || col === 0 || col === numCols - 1) {
        // on perimeter
        return false
    }
    
    const topLeft = input[row + 1][col - 1]
    const topRight = input[row + 1][col + 1]
    const bottomLeft = input[row - 1][col - 1]
    const bottomRight = input[row - 1][col + 1]

    const setOfLetters: Set<string> = new Set([topLeft, topRight, bottomLeft, bottomRight])
    const targetSet: Set<string> = new Set(["S", "M"])
    if (!areSetsEqual(setOfLetters, targetSet)) {
        // bad set
        return false
    }

    if (topLeft === "S" && bottomRight === "S") return false
    if (topRight === "S" && bottomLeft === "S") return false
    if (topLeft === "M" && bottomRight === "M") return false
    if (topRight === "M" && bottomLeft === "M") return false

    return true
}

function areSetsEqual(setA: Set<string>, setB: Set<string>) {
    if (setA.size !== setB.size) return false;
    for (const elem of setA) {
        if (!setB.has(elem)) return false;
    }
    return true;
}

const getNumXMAS = (row: number, col: number, input: string[][]): number => {
    const numRows = input.length
    const numCols = input[0].length
    let numXMAS = 0 


    // check right
    if (col <= numCols - 4) {
        if (input[row][col + 1] === "M" && input[row][col + 2] === "A" && input[row][col + 3] === "S") {

            numXMAS += 1
        }
    }

    // check rightDown
    if (col <= numCols - 4 && row <= numRows - 4) {
        if (input[row + 1][col + 1] === "M" && input[row + 2][col + 2] === "A" && input[row + 3][col + 3] === "S") {

            numXMAS += 1
        }
    }

    // check down
    if (row <= numRows - 4) {
        if (input[row + 1][col] === "M" && input[row + 2][col] === "A" && input[row + 3][col] === "S") {

            numXMAS += 1
        }
    }

    // check leftDown
    if (row <= numRows - 4 && col >= 3) {
        if (input[row + 1][col - 1] === "M" && input[row + 2][col - 2] === "A" && input[row + 3][col - 3] === "S") {

            numXMAS += 1
        }
    }

    // check left
    if (col >= 3) {
        if (input[row][col - 1] === "M" && input[row][col - 2] === "A" && input[row][col - 3] === "S") {

            numXMAS += 1
        }
    }

    // check leftUP
    if (row >= 3 && col >= 3) {
        if (input[row - 1][col - 1] === "M" && input[row - 2][col - 2] === "A" && input[row - 3][col - 3] === "S") {

            numXMAS += 1
        }
    }

    // check up
    if (row >= 3) {
        if (input[row - 1][col] === "M" && input[row - 2][col] === "A" && input[row - 3][col] === "S") {

            numXMAS += 1
        }
    }

    // check upRight
    if (row >= 3 && col <= numCols - 4) {
        if (input[row - 1][col + 1] === "M" && input[row - 2][col + 2] === "A" && input[row - 3][col + 3] === "S") {

            numXMAS += 1
        }
    }


    return numXMAS
}
