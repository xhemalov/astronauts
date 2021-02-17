import React, { FC } from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import TextField from "@material-ui/core/TextField"
import Link from "next/link"
import { Button, Typography } from "@material-ui/core"
import styles from "../styles/ProfileEdit.module.css"

const ProfileEdit: FC = () => {
  return (
    <Card className={styles.root}>
      <div className={styles.details}>
        <CardContent className={styles.content}>
          <Typography component="h5" variant="h5">
            Edit astronaut
          </Typography>
          <TextField required label="First name" className={styles.input} />
          <TextField required label="Last name" className={styles.input} />
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
            className={styles.input}
          />
          <TextField required label="Ability" className={styles.input} />
        </CardContent>
        <CardActions className={styles.controls}>
          <Link href="/" passHref>
            <Button>Back</Button>
          </Link>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </CardActions>
      </div>
    </Card>
  )
}

export default ProfileEdit
