import Head from "next/head"
import Typography from "@material-ui/core/Typography"
import styles from "../styles/layout.module.css"
import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <footer className={styles.footer}>
        <Typography>
          Created by{" "}
          <Link href="/about">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={styles.link}>Lýdie Hemalová</a>
          </Link>{" "}
          © 2021
        </Typography>
      </footer>
    </div>
  )
}
