import React, { FC } from "react"
import Layout from "../components/Layout"
import ProfileEdit from "../components/ProfileEdit"
import Head from "next/head"

const ProfileUpdate: FC = () => {
  return (
    <Layout>
      <Head>
        <title>Edit Astronaut</title>
      </Head>

      <main>
        <ProfileEdit />
      </main>
    </Layout>
  )
}

export default ProfileUpdate
