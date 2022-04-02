import { generateCombinations } from '../src/lib/combinations'

describe('generateCombinations', () => {
  it('generates all possible combinations', () => {
    const phraseLists = [
      ['a', 'b', 'c'],
      ['d', 'e'],
      ['f', 'g', 'h'],
    ]
    const totalPossibleCombinations = phraseLists.reduce(
      (tCombos, list) => tCombos * list.length,
      1,
    )

    const possibleCombinations = [
      'a d f',
      'a d g',
      'a d h',
      'a e f',
      'a e g',
      'a e h',
      'b d f',
      'b d g',
      'b d h',
      'b e f',
      'b e g',
      'b e h',
      'c d f',
      'c d g',
      'c d h',
      'c e f',
      'c e g',
      'c e h',
    ]

    const combinations = generateCombinations(phraseLists)
    expect(combinations).toEqual(possibleCombinations)
    expect(combinations.length).toEqual(totalPossibleCombinations)
  })
})
