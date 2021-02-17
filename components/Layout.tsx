import Head from "next/head"
import Typography from "@material-ui/core/Typography"
import styles from "../styles/layout.module.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <footer className={styles.footer}>
        <Typography>Created by Lýdie Hemalová © 2021</Typography>
      </footer>
    </div>
  )
}
