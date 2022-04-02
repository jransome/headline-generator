import type { NextPage } from 'next'
import Head from 'next/head'
import { Category } from '../models'
import CategoryForm from '../components/CategoryForm'
import styles from '../styles/Home.module.css'
import { useReducer } from 'react'
import { PhrasesByCategory, reducePhrasesByCategory } from '../reducers/phrase-categories'

export async function getServerSideProps() {
  const categoryDocuments = await Category.findAll()
  const phrasesByCategory = Object.fromEntries(categoryDocuments.map(c => [c.name, c.phrases]))
  return {
    props: {
      phrasesByCategory,
    },
  }
}

const PAGE_TITLE = 'AutoChantel v 1.3 beta'

type Props = {
  phrasesByCategory: PhrasesByCategory
}

const Home: NextPage<Props> = ({ phrasesByCategory }: Props) => {
  // const [categories, setCategories] = useState<PhrasesByCategory>(phrasesByCategory)
  // const updateCategory = (name: string, phrases: string[]) => setCategories((old) => {
  //   return {
  //     ...old,
  //     [name]: phrases,
  //   }
  // })
  const [phraseCategories, dispatch] = useReducer(reducePhrasesByCategory, phrasesByCategory)

  return (
    <div className={styles.container}>
      <Head>
        <title>{PAGE_TITLE}</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {PAGE_TITLE}
        </h1>

        <p className={styles.description}>
          Automating Chantel's job since 2022
        </p>

        <CategoryForm
          name={Object.keys(phraseCategories)[1]}
          phrases={phraseCategories['Puns']}
          updateCategory={dispatch}
        />

      </main>

      <footer className={styles.footer}>
        Copyright Ransome Corporation 2022
      </footer>
    </div>
  )
}

export default Home
