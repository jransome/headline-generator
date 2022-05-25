import { Dispatch, useEffect, useState } from 'react'
import { Button, Select, Divider, Notification, Textarea, Stack, keyframes, Container } from '@mantine/core'
import { PhraseCategoryAction, PhrasesByCategory } from '../reducers/phrase-categories'
import { Check, Database, X } from 'tabler-icons-react'

type Props = {
  phrasesByCategory: PhrasesByCategory,
  dispatchPhraseCategories: Dispatch<PhraseCategoryAction>,
}

type RequestStatus =
  | 'UPDATE_DISALLOWED'
  | 'UPDATE_POSSIBLE'
  | 'UPDATE_REQUESTED'
  | 'UPDATE_SUCCEEDED'
  | 'UPDATE_FAILED'

type RequestState = {
  status: RequestStatus,
  errorMessage?: string,
}

const putCategories = (
  editedCategories: Set<keyof PhrasesByCategory>,
  phrasesByCategory: PhrasesByCategory
): Promise<boolean> => fetch('/api/categories', {
  method: 'PUT',
  body: JSON.stringify(
    Array.from(editedCategories).map(name => ({
      name,
      phrases: phrasesByCategory[name],
    }))
  ),
})
  .then(res => res.ok)
  .catch(e => {
    console.error('Error on PUT /categories', e)
    return false
  })

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
})

const PhraseEditor = ({ phrasesByCategory, dispatchPhraseCategories }: Props) => {
  const categoryNames = Object.keys(phrasesByCategory)
  const noDataExists = categoryNames.length < 1
  const [selectedCategory, setSelectedCategory] = useState(categoryNames[0])
  const [editedCategories, setEditedCategories] = useState<Set<keyof PhrasesByCategory>>(new Set())
  const [phrasesInput, setPhrasesInput] = useState(phrasesByCategory[selectedCategory]?.join('\n'))
  const [requestState, setRequestState] = useState<RequestState>({ status: 'UPDATE_DISALLOWED' })

  useEffect(() => {
    if (requestState.status !== 'UPDATE_REQUESTED') return
    putCategories(editedCategories, phrasesByCategory)
      .then(updateSucceeded => {
        setRequestState({ status: updateSucceeded ? 'UPDATE_SUCCEEDED' : 'UPDATE_FAILED' })
      })
  }, [requestState, editedCategories, phrasesByCategory])

  return (
    <Stack sx={{ width: 400, padding: '0px 40px', alignSelf: 'stretch' }}>
      <Select
        variant="filled"
        label="Edit category"
        value={selectedCategory}
        placeholder="No categories exist"
        disabled={noDataExists}
        onChange={(value) => {
          const selectedCat = value ?? categoryNames[0]
          setSelectedCategory(selectedCat)
          setPhrasesInput(phrasesByCategory[selectedCat].join('\n'))
        }}
        data={categoryNames}
      />
      <Divider />
      <Textarea
        styles={{
          input: { fontFamily: 'monospace', lineHeight: 2, minHeight: 400 },
        }}
        placeholder="Enter each phrase on a new line"
        variant="filled"
        disabled={noDataExists}
        autosize
        minRows={5}
        maxRows={20}
        value={phrasesInput}
        onChange={(event) => {
          setPhrasesInput(event.target.value)
          dispatchPhraseCategories({
            type: 'EDIT_PHRASES',
            categoryName: selectedCategory,
            phrases: event.target.value.split('\n'),
          })
          setEditedCategories((edited) => edited.add(selectedCategory))
          setRequestState({ status: 'UPDATE_POSSIBLE' })
        }}
      />

      <Container>
        <Button
          leftIcon={<Database size={14} />}
          loading={requestState.status === 'UPDATE_REQUESTED'}
          disabled={noDataExists || requestState.status !== 'UPDATE_POSSIBLE'}
          onClick={() => setRequestState({ status: 'UPDATE_REQUESTED' })}
        >
          Save changes to database
        </Button>

        {requestState.status === 'UPDATE_SUCCEEDED' &&
          <Notification
            sx={{
              animationName: fadeOut,
              animationDuration: '0.5s',
              animationDelay: '1s',
              animationFillMode: 'forwards',
            }}
            icon={<Check size={18} />}
            color="green"
            title="u slag"
            disallowClose
          >
            Database updated
          </Notification>
        }
        {requestState.status === 'UPDATE_FAILED' &&
          <Notification
            icon={<X size={18} />}
            color="red"
            title="WHAT DID YOU DO"
            disallowClose
          >
            {requestState.errorMessage}
          </Notification>
        }
      </Container>

    </Stack>
  )
}

export default PhraseEditor
