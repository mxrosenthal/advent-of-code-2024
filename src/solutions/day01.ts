export const solve = (input: string): string => {
    const splitRows = input.split("\n")
    const leftList: number[] = []
    const rightList: number[] = []
    const rightOccurrences: {[key: string]: number} = {}

    splitRows.forEach((row: string) => {
      const values = row.split("   ")
      leftList.push(Number(values[0]))
      rightList.push(Number(values[1]))

      if (rightOccurrences[values[1]]) {
        rightOccurrences[values[1]] += 1
      } else {
        rightOccurrences[values[1]] = 1
      }
    })

    leftList.sort()
    rightList.sort()

    let totalDistance: number = 0
    let similarityScore: number = 0
    for (let i = 0;  i < leftList.length; i++) {
      const left: number = leftList[i]
      const right: number = rightList[i]

      if (rightOccurrences[left.toString()]) {
        similarityScore += left * rightOccurrences[left]
      }

      if (left === right) {
        continue
      }
      else if (left > right) {
        totalDistance = totalDistance + (left - right)
      }
      else {
        totalDistance = totalDistance + (right - left)
      }
    }
    
    // part 1
    // return `Total distance: ${totalDistance}`

    // part 2
    return `Similarity score: ${similarityScore}`
    
  };