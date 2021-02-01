import { Application, Router, React, ReactDOMServer } from "../deps.ts"
import App from "../client/components/App.tsx";

const router = new Router();
router.get("/", (ctx) => {
  const app = (ReactDOMServer as any).renderToString(<App />);
  ctx.response.body =
    `<html>
      <head>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <div id="root">${app}</div>
      </body>
    </html>`;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  const root = `${Deno.cwd()}/client/static`
  try {
    await ctx.send({ root });
  } catch {
    next();
  }
});

await app.listen({ port: 8000 });