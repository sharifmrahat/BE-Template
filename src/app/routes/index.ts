import express from 'express'
import { exampleRoutes } from '../modules/example/example.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/example',
    route: exampleRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
