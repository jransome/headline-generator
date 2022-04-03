import { useReducer } from 'react'

export type PhrasesByCategory = { [k: string]: string[] }

export type PhraseCategoryAction = { type: 'EDIT_PHRASES', categoryName: keyof PhrasesByCategory, phrases: string[] }

function reducePhrasesByCategory(state: PhrasesByCategory, action: PhraseCategoryAction) {
  const newState: PhrasesByCategory = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case 'EDIT_PHRASES':
      newState[action.categoryName] = action.phrases
        .filter(p => p.length > 0)
        .map(p => p.trim())
      return newState
    default:
      throw new Error(`PhraseCategoryAction ${action} not recognised`)
  }
}

export const usePhraseCategories = (initialPhraseCategories: PhrasesByCategory) => useReducer(reducePhrasesByCategory, initialPhraseCategories)


  // const setCategoryPhrases: SetCategoryPhrases = async (categoryName, phrases) => {
  //   const oldPhrases = [...phraseCategories[categoryName]]

  //   // optimistic update. note that dispatch is an async op behind the scenes
  //   dispatch({ type: 'EDIT_PHRASES', categoryName, phrases })

  //   try {
  //     const response = await fetch('/api/categories', {
  //       method: 'PUT',
  //       body: JSON.stringify({ name: categoryName, phrases })
  //     })
  //     if (!response.ok) dispatch({ type: 'EDIT_PHRASES', categoryName, phrases: oldPhrases })
  //   } catch (error) {
  //     dispatch({ type: 'EDIT_PHRASES', categoryName, phrases: oldPhrases })
  //   }
  // }

//   return [phraseCategories, setCategoryPhrases] as const
// }
