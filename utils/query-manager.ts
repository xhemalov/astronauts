import format from "date-fns/format"
import faunadb from "faunadb"

const q = faunadb.query
const { Create, Collection, Paginate, Documents, Lambda, Get, Var, Update, Ref, Delete, Map } = q

export type AstronautInput = {
  firstName: string
  lastName: string
  birthday?: any | null
  ability?: string
}

export type Astronaut = {
  _id: string
} & AstronautInput

function normalizeDate(date?: Date | null): string {
  return format(date || new Date(Date.now()), "MM/dd/yyyy")
}

class QueryManager {
  bootstrapToken: string

  client: faunadb.Client

  constructor(token?: string) {
    // A client is just a wrapper, it does not create a persitant connection
    // FaunaDB behaves like an API and will include the token on each request.
    this.bootstrapToken = token || (process.env.NEXT_PUBLIC_FAUNA_TOKEN as string)
    this.client = new faunadb.Client({
      secret: token || this.bootstrapToken,
    })
  }

  createAstronaut(firstName: string, lastName: string, birthday?: Date | null, ability?: string): Promise<Astronaut> {
    const FQLStatement = Create(Collection("astronauts"), {
      data: {
        firstName,
        lastName,
        birthday: normalizeDate(birthday),
        ability,
      },
    })
    return this.client.query(FQLStatement)
  }

  deleteAstronaut(id: string): Promise<void> {
    const FQLStatement = Delete(Ref(Collection("astronauts"), id))
    return this.client.query(FQLStatement)
  }

  updateAstronaut(data: Astronaut) {
    const FQLStatement = Update(Ref(Collection("astronauts"), data._id), {
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: normalizeDate(data.birthday),
        ability: data.ability,
      },
    })
    return this.client.query(FQLStatement)
  }

  getAstronauts(): Promise<Astronaut[]> {
    const FQLStatement = Map(Paginate(Documents(Collection("astronauts"))), Lambda("X", Get(Var("X"))))
    return this.client.query<{ data: any[] }>(FQLStatement).then((result) =>
      result.data.map((v) => ({
        _id: v.ref.value.id,
        ...v.data,
      })),
    )
  }

  getAstronaut(id: string): Promise<Astronaut> {
    const FQLStatement = Get(Ref(Collection("astronauts"), id))
    return this.client.query<{ data: any; ref: any }>(FQLStatement).then((result) => ({
      _id: result.ref.value.id,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      birthday: result.data.birthday,
      ability: result.data.ability,
    }))
  }
}

const faunaQueries = new QueryManager()
export { faunaQueries, QueryManager }
