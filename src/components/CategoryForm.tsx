import { TextInput, Group, Grid, ActionIcon, Box, Button } from '@mantine/core'
import { Dispatch } from 'react'
import { Trash } from 'tabler-icons-react'
import { Category } from '../models'
import { PhraseCategoryAction } from '../reducers/phrase-categories'

type Props = Category.ICategory & {
  updateCategory: Dispatch<PhraseCategoryAction>
}

const CategoryForm = ({ name, phrases, updateCategory }: Props) => {

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <Grid>
        {phrases.map((phrase, i) =>
          <Group key={i} sx={{ margin: '5px 10px', gap: 2 }}>
            <TextInput
              placeholder="blah blah..."
              required
              sx={{ flex: 1 }}
              value={phrase}
              onChange={(event) => updateCategory({
                type: 'EDIT_PHRASE',
                categoryName: name,
                phraseIndex: i,
                phrase: event.target.value,
              })}
            />
            <ActionIcon
              color="red"
              variant="hover"
              onClick={() => updateCategory({
                type: 'DELETE_PHRASE',
                categoryName: name,
                phraseIndex: i,
              })}
            >
              <Trash size={16} />
            </ActionIcon>
          </Group>
        )}
      </Grid>

      <Group position="center" mt="md">
        <Button onClick={() => updateCategory({
          type: 'ADD_BLANK_PHRASE',
          categoryName: name,
        })}>
          Add phrase
        </Button>
      </Group>
    </Box >
  )
}

export default CategoryForm
