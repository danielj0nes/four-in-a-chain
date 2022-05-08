/**
 * File to define the API route handlers for the four-in-a-row game functionality.
 * @module routes/route_four-in-a-chain
 * @author Daniel Jones
 */
import Router from "koa-router";

const gamePrefix = "/four-in-a-chain"
const router = new Router({ prefix: gamePrefix });

router.get("/", async ctx => {
    await ctx.render("four-in-a-chain", ctx.hbs);
});

 export default router;
 