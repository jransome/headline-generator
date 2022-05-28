import { useState } from 'react'
import { Container, MultiSelect, Divider, ScrollArea, List } from '@mantine/core'
import { PhrasesByCategory } from '../reducers/phrase-categories'
import { generateCombinations } from '../lib/combinations'

type Props = {
  phrasesByCategory: PhrasesByCategory
}

const CombinationGenerator = ({ phrasesByCategory }: Props) => {
  const categoryNames = Object.keys(phrasesByCategory)
  const noDataExists = categoryNames.length < 1
  const [categorySelection, setCategorySelection] = useState<string[]>([])

  return (
    <Container sx={{
      flex: 1
    }}>
      <MultiSelect
        data={categoryNames}  
        label="Generate combinations"
        placeholder={noDataExists ? "No categories exist" : "Pick categories.."}
        disabled={noDataExists}
        sx={{ width: 400 }}
        onChange={setCategorySelection}
        searchable
        clearable
      />
      <Divider sx={{ margin: '10px 0px' }} />

      <List>
        <ScrollArea>
          {generateCombinations(categorySelection.map(category => phrasesByCategory[category]))
            .map((c, i) => <List.Item key={i} >{c}</List.Item>)}
        </ScrollArea>
      </List>
    </Container>
  )
}

export default CombinationGenerator
