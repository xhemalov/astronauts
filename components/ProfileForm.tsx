import React, { FC, useState } from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import TextField from "@material-ui/core/TextField"
import Link from "next/link"
import { Button, Typography } from "@material-ui/core"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import styles from "../styles/ProfileEdit.module.css"
import { Astronaut, AstronautInput } from "../utils/query-manager"

type ProfileFormPros = {
  astronaut?: Astronaut
  onConfirm: (astronaut: AstronautInput) => void
}

const ProfileForm: FC<ProfileFormPros> = ({ astronaut, onConfirm }) => {
  const [firstName, setFirstName] = useState(astronaut ? astronaut.firstName : "")
  const [lastName, setLastName] = useState(astronaut ? astronaut.lastName : "")
  const [birthday, setBirthday] = useState<Date | undefined | null>(
    astronaut ? astronaut.birthday : new Date(Date.now()),
  )
  const [ability, setAbility] = useState(astronaut ? astronaut.ability : "")

  return (
    <Card className={styles.root}>
      <div className={styles.details}>
        <CardContent className={styles.content}>
          <Typography component="h5" variant="h5">
            {astronaut ? "Edit" : "Add"} astronaut
          </Typography>
          <TextField
            required
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.input}
          />
          <TextField
            required
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.input}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Birthday"
              value={birthday}
              onChange={setBirthday}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            label="Ability"
            value={ability}
            onChange={(e) => setAbility(e.target.value)}
            className={styles.input}
          />
        </CardContent>
        <CardActions className={styles.controls}>
          <Link href="/" passHref>
            <Button>Back</Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onConfirm({ firstName, lastName, birthday, ability })}
          >
            {astronaut ? "Save" : "Add"}
          </Button>
        </CardActions>
      </div>
    </Card>
  )
}

export default ProfileForm
