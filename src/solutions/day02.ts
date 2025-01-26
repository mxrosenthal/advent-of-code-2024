export const solve = (input: string): string => {
    const reports = input.split("\n")
    const reportsWithJustLevels = reports.map((report) => report.split(" ").map((level: string) => Number(level)))

    const safeReports = reportsWithJustLevels.filter((report) => isSafe(report))
    const badReports = reportsWithJustLevels.filter((report) => !isSafe(report))

    const safeReportsAfterDampening = badReports.filter((report) => {
        if (isSafeAfterCheckingAllOptions(report)) return report
    })
    
    
    // part 1
    // return "number of safe reports: " + safeReports.length

    // part 2
    const totalSafeReports = safeReports.length + safeReportsAfterDampening.length
    return "number of safe reports after dampening: " + totalSafeReports
}

// part 1
const isSafe = (level: Number[]): boolean => {
    const isDecreasing = level[0] > level[level.length - 1] ? true : false;

    for (let i = 0; i < level.length-1; i++) {
        let j = i + 1;
        if (level[i] === level[j]) return false
        if (isDecreasing && level[i] < level[j]) return false
        if (!isDecreasing && level[i] > level[j]) return false
        if (!isWithin3(Number(level[j]), Number(level[i]))) return false
    }
    return true
}

const isWithin3 = (num1: Number, num2: Number): boolean => {
    return Math.abs(Number(num1) - Number(num2)) <= 3
}

// part 2
const isSafeAfterCheckingAllOptions = (level: Number[]): boolean => {
    const possibleLevels = level.map((_, mapIndex) => level.filter((filterNumber, filterInd) => {
        if (mapIndex != filterInd ) return filterNumber
    }))

    let isItSafe = false
    possibleLevels.forEach((level) => {
        if (isSafe(level)) isItSafe = true
    })
    return isItSafe
}

