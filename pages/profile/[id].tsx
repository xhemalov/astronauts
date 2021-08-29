import React, { FC } from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import ProfileForm from "../../components/ProfileForm"
import { Astronaut, AstronautInput, faunaQueries } from "../../utils/query-manager"

interface Props {
  astronaut: Astronaut
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const astronaut = await faunaQueries.getAstronaut(context?.params?.id as string)
  return { props: { astronaut } }
}

const ProfileEdit: FC<Props> = ({ astronaut }) => {
  const router = useRouter()
  const onConfirm = async (input: AstronautInput) => {
    await faunaQueries.updateAstronaut({ ...input, _id: astronaut._id })
    router.push("/")
  }

  return (
    <Layout>
      <Head>
        <title>Edit Astronaut</title>
      </Head>

      <main>
        <ProfileForm
          astronaut={astronaut}
          onConfirm={onConfirm}
          onRandom={() => {
            throw new Error("Funkce random nebyla nalezena")
          }}
        />
      </main>
    </Layout>
  )
}

export default ProfileEdit
