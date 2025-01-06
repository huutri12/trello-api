/* eslint-disable no-console */
import express from 'express'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
const START_SERVER = () => {
  const app = express()

  // Enable req.body json data
  app.use(express.json())

  // Use APIs V1
  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, Back-end Server running successfully at Host at http://${ env.APP_HOST }:${env.APP_PORT }/`)
  })

  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    ('4. Server is shutting down...'),
    CLOSE_DB(),
    ('5. Disconnected from MongoDB Cloud Atlas!')
  })
}

(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas')
    await CONNECT_DB()
    console.log('2. Connect to MongoDB Cloud Atlas!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// console.log('1. Connecting to MongoDB Cloud Atlas')
// CONNECT_DB()
//   .then(() => console.log('Connect to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })


