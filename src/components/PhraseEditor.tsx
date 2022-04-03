import { Dispatch, useState } from 'react'
import { Button, Select, Divider, Textarea, Stack } from '@mantine/core'
import { PhraseCategoryAction, PhrasesByCategory } from '../reducers/phrase-categories'
import { Database } from 'tabler-icons-react'

type Props = {
  phrasesByCategory: PhrasesByCategory,
  dispatchPhraseCategories: Dispatch<PhraseCategoryAction>,
}

const PhraseEditor = ({ phrasesByCategory, dispatchPhraseCategories }: Props) => {
  const categoryNames = Object.keys(phrasesByCategory)
  const [selectedCategory, setSelectedCategory] = useState(categoryNames[0])
  const [phrases, setPhrases] = useState(phrasesByCategory[selectedCategory].join('\n'))

  return (
    <Stack sx={{ width: 400, padding: '0px 40px' }}>
      <Select
        variant="filled"
        label="Edit category"
        value={selectedCategory}
        onChange={(value) => {
          const selectedCat = value ?? categoryNames[0]
          setSelectedCategory(selectedCat)
          setPhrases(phrasesByCategory[selectedCat].join('\n'))
        }}
        data={categoryNames}
      />
      <Divider />
      <Textarea
        styles={{
          input: { fontFamily: 'monospace', lineHeight: 2 },
        }}
        placeholder="Enter each phrase on a new line"
        variant="filled"
        autosize
        minRows={5}
        maxRows={20}
        value={phrases}
        onChange={(event) => {
          setPhrases(event.target.value)
          dispatchPhraseCategories({
            type: 'EDIT_PHRASES',
            categoryName: selectedCategory,
            phrases: event.target.value.split('\n'),
          })
        }}
      />
      <Button
        leftIcon={<Database size={14} />}
        loading={false}
        disabled={true}
      >
        Save changes to database
      </Button>
    </Stack>
  )
}

export default PhraseEditor
