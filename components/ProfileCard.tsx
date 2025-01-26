import React, { FC } from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Link from "next/link"

import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import styles from "../styles/ProfileCard.module.css"
import { Astronaut } from "../utils/query-manager"

type ProfileCardProps = { astronaut: Astronaut; onDelete: () => void }

const ProfileCard: FC<ProfileCardProps> = ({ astronaut, onDelete }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Card className={styles.root}>
        <div className={styles.details}>
          <CardContent className={styles.content}>
            <Typography component="h5" variant="h5">
              {astronaut.firstName} {astronaut.lastName}
            </Typography>
            <Typography variant="caption" display="block" color="textSecondary" className={styles.text}>
              Birthday:
            </Typography>

            <Typography variant="subtitle1">{astronaut.birthday?.toLocaleDateString()}</Typography>
            <Typography variant="caption" display="block" color="textSecondary" className={styles.text}>
              Ability:
            </Typography>
            <Typography variant="subtitle1">{astronaut.ability}</Typography>
          </CardContent>
          <CardActions className={styles.controls}>
            <Button onClick={handleClickOpen}>
              <DeleteIcon />
            </Button>
            <Link href={`/profile/${astronaut._id}`} passHref>
              <Button>
                <EditIcon />
              </Button>
            </Link>
          </CardActions>
        </div>
      </Card>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want to delete this astonaut?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProfileCard
