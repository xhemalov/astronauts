import faunadb from "faunadb"

const q = faunadb.query
const {
  Call,
  Create,
  Collection,
  Identity,
  Paginate,
  Documents,
  Lambda,
  Get,
  Var,
  Select,
  Let,
  Match,
  Index,
  Join,
  If,
  Exists,
  Update,
  Do,
  Add,
  Subtract,
  Not,
  Contains,
  Abort,
  Now,
  Ref,
  Delete,
  Map,
} = q

export type Astronaut = {
  _id: string
  firstName: string
  lastName: string
  birthDate?: Date
  ability?: string
}

class QueryManager {
  bootstrapToken: string

  client: faunadb.Client

  constructor(token?: string) {
    // A client is just a wrapper, it does not create a persitant connection
    // FaunaDB behaves like an API and will include the token on each request.
    this.bootstrapToken = token || (process.env.NEXT_PUBLIC_FAUNA_TOKEN as string)
    console.log(this.bootstrapToken)
    this.client = new faunadb.Client({
      secret: token || this.bootstrapToken,
    })
  }

  createAstronaut(firstName: string, lastName: string, birthday?: Date, ability?: string): Promise<Astronaut> {
    const FQLStatement = Create(Collection("astronauts"), {
      data: {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        ability: ability,
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
        birthday: data.birthDate,
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
}
const faunaQueries = new QueryManager()
export { faunaQueries, QueryManager }
