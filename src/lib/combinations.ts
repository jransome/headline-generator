export const generateCombinations = (phraseLists: string[][], catIndex = 0, combinations: string[][] = [], current: string[] = []) => {
  if (catIndex === phraseLists.length) combinations.push(current)
  else phraseLists[catIndex].forEach(item => generateCombinations(phraseLists, catIndex + 1, combinations, [...current, item]))

  return combinations.map(c => c.join(' '))
}
