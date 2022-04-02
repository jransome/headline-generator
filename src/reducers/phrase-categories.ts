export type PhrasesByCategory = { [k: string]: string[] }

export type PhraseCategoryAction =
  | { type: 'ADD_BLANK_PHRASE', categoryName: keyof PhrasesByCategory }
  | { type: 'EDIT_PHRASE', categoryName: keyof PhrasesByCategory, phraseIndex: number, phrase: string }
  | { type: 'DELETE_PHRASE', categoryName: keyof PhrasesByCategory, phraseIndex: number }

export function reducePhrasesByCategory(state: PhrasesByCategory, action: PhraseCategoryAction) {
  const newState: PhrasesByCategory = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case 'ADD_BLANK_PHRASE':
      if (!newState[action.categoryName].includes('')) 
        newState[action.categoryName].push('')
      return newState
    case 'EDIT_PHRASE':
      newState[action.categoryName][action.phraseIndex] = action.phrase
      return newState
    case 'DELETE_PHRASE':
      newState[action.categoryName].splice(action.phraseIndex, 1)
      return newState
    default:
      throw new Error(`PhraseCategoryAction ${action} not recognised`)
  }
}
