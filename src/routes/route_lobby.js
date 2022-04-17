/**
 * File to define the API route handlers for the public login and registration functionality.
 * This code was provided via the initial project template
 * @module routes/route_lobby
 * @author Daniel Jones
 */
 import Router from "koa-router";
 
 const router = new Router();
 /**
  * The main lobby page
  * @name lobby_page
  * @route {GET} /
  */
 router.get("/", async ctx => {
     await ctx.redirect("lobby"); 
     console.log("Redirected to lobby");
 });

 router.get("/lobby", async ctx => {
    await ctx.render("lobby", ctx.hbs);
    console.log("Lobby route successfully rendered");
 });

 export default router;
 