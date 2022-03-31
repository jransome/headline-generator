import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import { Category } from '../models'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  const categories = await Category.findAll()

  return {
    props: {
      categories,
    },
  }
}

const title = 'AutoChantel v 1.3 beta'

type Props = {
  categories: Category.ICategory[]
}

const Home: NextPage<Props> = ({ categories }) => {
  console.log('categories', categories)
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

        <div className={styles.grid}>
          {categories.map(c => c.name)}
        </div>
      </main>

      <footer className={styles.footer}>
        Copyright Ransome Corporation 2022
      </footer>
    </div>
  )
}

export default Home
