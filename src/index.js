import Koa from "koa";
import serve from "koa-static";
import views from "koa-views";
import session from "koa-session";

import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import router from "./routes/route_index.js";

const app = new Koa();

const DEFAULT_PORT = 8888;
const port = process.env.PORT || DEFAULT_PORT;

async function getHandlebarData(ctx, next) {
	console.log(`${ctx.method} ${ctx.path}`);
	ctx.hbs = {
		authorised: ctx.session.authorised,
		user: ctx.session.user,
		userid: ctx.session.userid,
		host: `http://${ctx.host}`
	}
	for(const key in ctx.query) ctx.hbs[key] = ctx.query[key];
	await next();
}

// Serve the contents of the public folder for e.g., css stylesheets and assets
app.use(serve("node_modules/web3/dist"))
app.use(serve("public"))

app.use(session(app));
app.use(views("views", { extension: "handlebars" }, {map: { handlebars: "handlebars" }}));

app.use(getHandlebarData);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, async() => console.log(`listening on port ${port}`));
