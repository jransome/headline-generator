import { useState } from 'react'
import { Box, MultiSelect, List } from '@mantine/core'
import { PhrasesByCategory } from '../reducers/phrase-categories'
import { generateCombinations } from '../lib/combinations'

type Props = {
  phrasesByCategory: PhrasesByCategory
}

const CombinationGenerator = ({ phrasesByCategory }: Props) => {
  const categoryNames = Object.keys(phrasesByCategory)
  const [categorySelection, setCategorySelection] = useState<string[]>([])

  return (
    <Box>
      <MultiSelect
        data={categoryNames}
        label="Generate combinations"
        placeholder="Pick categories.."
        sx={{ width: 400 }}
        onChange={setCategorySelection}
        searchable
        clearable
      />
      <List>
        {generateCombinations(categorySelection.map(category => phrasesByCategory[category]))
          .map((c, i) => <List.Item key={i}>{c}</List.Item>)}
      </List>
    </Box>
  )
}

export default CombinationGenerator
