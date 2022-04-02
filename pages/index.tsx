import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import { Category } from '../models'
import CategoryForm from '../components/CategoryForm'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { ICategory } from '../models/Category'

export async function getServerSideProps() {
  const categoryDocuments = await Category.findAll()
  const phrasesByCategory = Object.fromEntries(categoryDocuments.map(c => [c.name, c.phrases]))
  return {
    props: {
      phrasesByCategory,
    },
  }
}

const title = 'AutoChantel v 1.3 beta'

type PhrasesByCategory = { [k: string]: string[] }
type Props = {
  phrasesByCategory: PhrasesByCategory
}

const Home: NextPage<Props> = ({ phrasesByCategory }: Props) => {
  const [categories, setCategories] = useState<PhrasesByCategory>(phrasesByCategory)
  const updateCategory = (name: string, phrases: string[]) => setCategories((old) => {
    return {
      ...old,
      [name]: phrases,
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {title}
        </h1>

        <p className={styles.description}>
          Automating Chantel's job since 2022
        </p>

        <CategoryForm 
          name={Object.keys(categories)[0]} 
          phrases={categories[Object.keys(categories)[0]]} 
          updateCategory={updateCategory}
        />

      </main>

      <footer className={styles.footer}>
        Copyright Ransome Corporation 2022
      </footer>
    </div>
  )
}

export default Home
