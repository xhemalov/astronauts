import Head from "next/head"
import styles from "../styles/Home.module.css"
import ProfileCard from "../components/ProfileCard"
import Layout from "../components/Layout"

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Astronauts</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Awesome Astronauts</h1>
        <div className={styles.grid}>
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
      </main>
    </Layout>
  )
}
