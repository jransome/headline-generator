import type { NextPage } from 'next'
import { useReducer } from 'react'
import { Divider, Group, Text, Title } from '@mantine/core'
import { Category } from '../models'
import { PhrasesByCategory, reducePhrasesByCategory } from '../reducers/phrase-categories'
import PhraseEditor from '../components/PhraseEditor'
import CombinationGenerator from '../components/CombinationGenerator'

export async function getServerSideProps() {
  const categoryDocuments = await Category.findAll()
  const phrasesByCategory = Object.fromEntries(categoryDocuments.map(c => [c.name, c.phrases]))
  return {
    props: {
      phrasesByCategory,
    },
  }
}

type Props = {
  phrasesByCategory: PhrasesByCategory
}

const Home: NextPage<Props> = ({ phrasesByCategory }: Props) => {
  const [phraseCategories, dispatch] = useReducer(reducePhrasesByCategory, phrasesByCategory)

  return (
    <>
      <main>
        <Title order={1}>AutoChantel v 1.3 beta</Title>
        <Text size="lg">Automating Chantel{"'"}s job since 2022</Text>
        <Divider sx={{ margin: '10px 0px' }} />

        <Group sx={{ justifyContent: 'space-between' }}>
          <CombinationGenerator 
            phrasesByCategory={phraseCategories} 
          />
          <PhraseEditor
            phrasesByCategory={phraseCategories}
            updateCategory={dispatch}
          />
        </Group>
      </main>

      <footer style={{
        padding: '2rem 0',
        borderTop: '1px solid #eaeaea',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        textAlign: 'center',
      }}>
        Copyright Ransome Corporation 2022
      </footer>
    </>
  )
}

export default Home
