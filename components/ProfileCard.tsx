import React, { FC } from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Link from "next/link"
import styles from "../styles/ProfileCard.module.css"

const ProfileCard: FC = () => {
  return (
    <Card className={styles.root}>
      <div className={styles.details}>
        <CardContent className={styles.content}>
          <Typography component="h5" variant="h5">
            Pepa Ponožka
          </Typography>
          <Typography variant="caption" display="block" color="textSecondary" className={styles.text}>
            Birthday:
          </Typography>

          <Typography variant="subtitle1">30.2.1991</Typography>
          <Typography variant="caption" display="block" color="textSecondary" className={styles.text}>
            Ability:
          </Typography>
          <Typography variant="subtitle1">šťouchání brambor</Typography>
        </CardContent>
        <CardActions className={styles.controls}>
          <Button>
            <DeleteIcon />
          </Button>
          <Link href="/ProfileUpdate" passHref>
            <Button>
              <EditIcon />
            </Button>
          </Link>
        </CardActions>
      </div>
    </Card>
  )
}

export default ProfileCard
