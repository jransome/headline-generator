import type { NextPage } from 'next'
import Head from 'next/head'
import { Category } from '../models'
import CategoryForm from '../components/CategoryForm'
import { useReducer, useState } from 'react'
import { PhrasesByCategory, reducePhrasesByCategory } from '../reducers/phrase-categories'
import { Box, Divider, Group, Select } from '@mantine/core'
import styles from '../styles/Home.module.css'

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
  const categoryNames = Object.keys(phrasesByCategory)
  const [selectedCategory, setSelectedCategory] = useState(categoryNames[0])
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
          Automating Chantel{"'"}s job since 2022
        </p>
        <Box>
          {/* <Box sx={{ backgroundColor: 'pink' }}></Box>
          <Divider orientation="vertical" size={'md'}/> */}
          <Select
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value ?? categoryNames[0])}
            data={categoryNames}
          />
          <CategoryForm
            name={selectedCategory}
            phrases={phraseCategories[selectedCategory]}
            updateCategory={dispatch}
          />
        </Box>
      </main>

      <footer className={styles.footer}>
        Copyright Ransome Corporation 2022
      </footer>
    </div>
  )
}

export default Home
