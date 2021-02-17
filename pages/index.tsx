import Head from "next/head"
import styles from "../styles/Home.module.css"
import ProfileCard from "../components/ProfileCard"
import Layout from "../components/Layout"
import { Astronaut, faunaQueries } from "../utils/query-manager"
import { useState } from "react"
import { useEffect } from "react"

export default function Home() {
  /*
  const [state, setState] = useState({
    astronauts: [] as Astronaut[],
  })

  useEffect(() => {
    faunaQueries.getAstronauts().then((result) => {
      console.log("astronauts", result)
      setState({
        astronauts: result,
      })
    })
  }, [])
  */
  faunaQueries.updateAstronaut({ _id: "290813718733783559", firstName: "Pepa", lastName: "Ponožka", ability: "bafání" })
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
