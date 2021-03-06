import type { NextPage } from 'next'
import { Divider, Group, Stack, Text, Title } from '@mantine/core'
import { Category } from '../models'
import { PhrasesByCategory, usePhraseCategories } from '../reducers/phrase-categories'
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
  const [phraseCategories, dispatchPhraseCategories] = usePhraseCategories(phrasesByCategory)

  return (
    <>
      <main>
        <Stack sx={{ padding: '10px 30px', gap: '2px' }}>
          <Title order={1}>Copywriting headlines thing v 1.3 beta</Title>
          <Text
            size="md"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            sx={{ textTransform: 'uppercase' }}
          >
            Automating Chantel{"'"}s job since like forever
          </Text>
        </Stack>

        <Divider sx={{ margin: '10px 0px' }} />

        <Group>
          <CombinationGenerator
            phrasesByCategory={phraseCategories}
          />
          <PhraseEditor
            phrasesByCategory={phraseCategories}
            dispatchPhraseCategories={dispatchPhraseCategories}
          />
        </Group>
      </main>

      <footer style={{
        padding: '20px 0px',
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
