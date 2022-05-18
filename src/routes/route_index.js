/**
* File to obtain, add, and connect the various routers from the different route files
* @module routes/route_index
* @author Daniel Jones
*/
import Router from 'koa-router'
import bodyParser from 'koa-body'

import defaultRouter from './route_default.js'
import lobbyRouter from './route_lobby.js'
import gameRouter from './route_four-in-a-chain.js'

const mainRouter = new Router()

mainRouter.use(bodyParser({ multipart: true }))

const nestedRoutes = [defaultRouter, lobbyRouter, gameRouter]
for (const router of nestedRoutes) {
    mainRouter.use(router.routes())
    mainRouter.use(router.allowedMethods())
}

export default mainRouter
