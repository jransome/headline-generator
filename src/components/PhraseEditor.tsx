import { Dispatch, useState } from 'react'
import { Trash } from 'tabler-icons-react'
import { TextInput, Group, ActionIcon, Box, Button, ScrollArea, Select, Divider } from '@mantine/core'
import { PhraseCategoryAction } from '../reducers/phrase-categories'
import { PhrasesByCategory } from '../reducers/phrase-categories'

type Props = {
  phrasesByCategory: PhrasesByCategory,
  updateCategory: Dispatch<PhraseCategoryAction>,
}

const PhraseEditor = ({ phrasesByCategory, updateCategory }: Props) => {
  const categoryNames = Object.keys(phrasesByCategory)
  const [selectedCategory, setSelectedCategory] = useState(categoryNames[0])

  return (
    <Box sx={{ width: 400, padding: '0px 40px' }}>
      <Select
        variant="filled"
        label="Edit category"
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value ?? categoryNames[0])}
        data={categoryNames}
      />
      <Divider sx={{ margin: '10px 0px' }} />
      <ScrollArea sx={{ height: 500 }}>
        {phrasesByCategory[selectedCategory].map((phrase, i) =>
          <Group key={i} sx={{ margin: '5px 10px', gap: 2 }}>
            <TextInput
              placeholder="blah blah..."
              required
              sx={{ flex: 1 }}
              value={phrase}
              onChange={(event) => updateCategory({
                type: 'EDIT_PHRASE',
                categoryName: selectedCategory,
                phraseIndex: i,
                phrase: event.target.value,
              })}
            />
            <ActionIcon
              color="red"
              variant="hover"
              onClick={() => updateCategory({
                type: 'DELETE_PHRASE',
                categoryName: selectedCategory,
                phraseIndex: i,
              })}
            >
              <Trash size={16} />
            </ActionIcon>
          </Group>
        )}
      </ScrollArea>

      <Group position="center" mt="md">
        <Button onClick={() => updateCategory({
          type: 'ADD_BLANK_PHRASE',
          categoryName: selectedCategory,
        })}>
          Add phrase
        </Button>
      </Group>
    </Box>
  )
}

export default PhraseEditor
