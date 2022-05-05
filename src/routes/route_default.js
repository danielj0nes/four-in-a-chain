/**
 * File to define the default route handler
 * @module routes/route_default
 * @author Daniel Jones
 */
 import Router from "koa-router";
 
 const router = new Router();

 router.get("/", async ctx => {
     ctx.redirect("lobby"); 
     console.log("Redirected to lobby");
 });

 export default router;
 