import Bun from 'bun'
import { env } from '~/env'
import { yoga } from '~/gql/yoga'

Bun.serve({
  fetch: yoga,
  port: env.PORT,
})

console.log(`http://localhost:${env.PORT}`)
