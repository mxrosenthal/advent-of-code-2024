
export const solve = (input: string): string => {  
    // part 1
    // return "answer: " + calculateSum(getMatches(input))
    // const test = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+don't()mul(32,64](mudon't()do()l(11,8)undo()?mul(8,5))mul(1234,1)"
     // part 2

     //got help from internet.
     const mulPattern = "mul\\((\\d{1,3}),(\\d{1,3})\\)";
     const doPattern = "do\\(\\)";
     const dontPattern = "don't\\(\\)";
     const instructionPattern = `${mulPattern}|${doPattern}|${dontPattern}`
     const instructionRegex = new RegExp(instructionPattern, "g")
     const do_dont_regex = new RegExp(`${dontPattern}.*?${doPattern}`, "g")
     const mulRegex = new RegExp(mulPattern)

     let totalSum = 0
     let enabled = true

     const instructions = input.match(instructionRegex)

     if (instructions) {
      console.log(instructions)
        for (const instruction of instructions) {
          if (new RegExp(doPattern).test(instruction)) {
            enabled = true;
          } else if ( new RegExp(dontPattern).test(instruction)) {
            enabled = false;
          } else if (enabled && mulRegex.test(instruction)) {
            const [, left, right] = instruction.match(mulRegex) ?? [];
            console.log(left, right)
            totalSum += parseInt(left) * parseInt(right);
          }
        }
     }
     return "answer: " + totalSum

     
     // my way
    //  return "answer: " + calculateSum(getMatches(getCleanInput(input)))
    
}

const getCleanInput = (input: string): string => {
    // the final don't might not be followed by a do, and also might be followed by more don't()'s and thus won't be removed during replace.
    const {doIndexes, dontIndexes} = findDoAndDontIndexes(input)
    // console.log(doIndexes, dontIndexes)
    const extraDonts = dontIndexes.filter((index) => index > doIndexes[doIndexes.length - 1])
    const do_dont_regex: RegExp = /don't\(\).*?do\(\)/g;
    // we can truncate the input after the first index of extraDonts
    let resultString = input.slice(0, extraDonts[0])
   

    resultString = resultString.replace(do_dont_regex, " ") // removes all text following don't until we see do(). then proceed as normal
    console.log(resultString.length)
    
    resultString = resultString.replace(do_dont_regex, " ")
    console.log(resultString.length)
    console.log(resultString)

    // const {doIndexes: doIndexes2, dontIndexes: dontIndexes2} = findDoAndDontIndexes(resultString)
    // console.log(doIndexes2, dontIndexes2)
  

    return resultString
}

const findDoAndDontIndexes = (input: string): { doIndexes: number[]; dontIndexes: number[] } => {
    // Regex for `do()` and `dont()`
    const doRegex = /do\(\)/g;
    const dontRegex = /don't\(\)/g;
  
    const doIndexes: number[] = [];
    const dontIndexes: number[] = [];
  
    let match: RegExpExecArray | null;
  
    // Find all `do()` matches and their indexes
    while ((match = doRegex.exec(input)) !== null) {
      doIndexes.push(match.index);
    }
  
    // Find all `dont()` matches and their indexes
    while ((match = dontRegex.exec(input)) !== null) {
      dontIndexes.push(match.index);
    }
  
    return { doIndexes, dontIndexes };
  }
  

const getMatches = (input: string): string[] => {
    const mul_regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches: string[] = [];
    let match
    
    while ((match = mul_regex.exec(input)) !== null) {
        matches.push(match[0]); // Add the entire matched string
    }

    return matches
}

const calculateSum = (matches: string[]): Number => {
    let sum = 0
     matches.forEach((match: string) => {
         const leftNum = match.slice(4).split(",")[0]
         const rightNum = match.slice(4).split(",")[1].split(")")[0]
         sum += Number(leftNum) * Number(rightNum)
     })
     return sum
}