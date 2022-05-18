/**
* File to define the API route handlers for the lobby functionality.
* @module routes/route_lobby
* @author Daniel Jones
*/
import Router from 'koa-router'

const lobbyPrefix = '/lobby'
const router = new Router({ prefix: lobbyPrefix })

router.get('/', async ctx => {
    await ctx.render('lobby', ctx.hbs)
})

export default router
