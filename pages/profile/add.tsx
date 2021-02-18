import React, { FC } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import ProfileForm from "../../components/ProfileForm"
import { AstronautInput, faunaQueries } from "../../utils/query-manager"

const ProfileAdd: FC = () => {
  const router = useRouter()
  const onConfirm = async (astronaut: AstronautInput) => {
    await faunaQueries.createAstronaut(astronaut.firstName, astronaut.lastName, astronaut.birthday, astronaut.ability)
    router.push("/")
  }

  return (
    <Layout>
      <Head>
        <title>Add Astronaut</title>
      </Head>

      <main>
        <ProfileForm onConfirm={onConfirm} />
      </main>
    </Layout>
  )
}

export default ProfileAdd
