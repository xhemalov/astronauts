import Head from "next/head"
import { useState, useEffect } from "react"

import { Button, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import Link from "next/link"
import { Astronaut, faunaQueries } from "../utils/query-manager"
import Layout from "../components/Layout"
import ProfileCard from "../components/ProfileCard"
import styles from "../styles/Home.module.css"

export default function Home() {
  const [state, setState] = useState({
    astronauts: [] as Astronaut[],
  })

  const getAstronauts = () => {
    faunaQueries.getAstronauts().then((result) => {
      setState({
        astronauts: result,
      })
    })
  }
  useEffect(getAstronauts, [])

  const onDelete = async (id: string) => {
    await faunaQueries.deleteAstronaut(id)
    getAstronauts()
  }

  return (
    <Layout>
      <Head>
        <title>Astronauts</title>
      </Head>

      <main className={styles.main}>
        <Typography variant="h2">Awesome Astronauts</Typography>
        {state.astronauts.length === 0 ? (
          <>
            <Typography>You currently do not have astronauts. Please add some.</Typography>
            <Link href="/profile/add" passHref>
              <Button variant="contained" color="primary" size="large" className={styles.add}>
                <AddIcon /> Add
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Typography>You can add new astronaut</Typography>
            <Link href="/profile/add" passHref>
              <Button variant="contained" color="primary" size="large" className={styles.add}>
                <AddIcon /> Add
              </Button>
            </Link>
            <div className={styles.grid}>
              {state.astronauts.map((r) => (
                <ProfileCard key={r._id} astronaut={r} onDelete={() => onDelete(r._id)} />
              ))}
            </div>
          </>
        )}
      </main>
    </Layout>
  )
}
