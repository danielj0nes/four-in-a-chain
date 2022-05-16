/**
 * File to define the API route handlers for the lobby functionality.
 * @module routes/route_lobby
 * @author Daniel Jones
 */
import Router from "koa-router";

const lobbyPrefix = "/lobby"
const router = new Router({ prefix: lobbyPrefix });
let playerInfo = {}

router.get("/", async ctx => {
    await ctx.render("lobby", ctx.hbs);
});

// Terrible js incoming (why the fk does ctx.redirect/render not work?!)
router.post("/opponent-search", async ctx => {
    try {
        let connectedWallet = ctx.request.body.walletId;
        console.log(`Connection from: ${connectedWallet}`);

        playerInfo[connectedWallet] = "connected";
        if (Object.keys(playerInfo).length > 2) {
            // Flush the json object
            playerInfo = {}
            playerInfo[connectedWallet] = "connected"
        }
        ctx.body = {};
    } catch (err) {
        console.log(err);
    }
    
})
// Server the info
router.get("/ready", async ctx => {
    ctx.body = playerInfo;
})

 export default router;
 