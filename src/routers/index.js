import { Router } from "express";

import { mailRouter } from "./mail.router.js";
import { productsRouter } from "./products.router.js";
import { cartsrouter} from "./carts.router.js";
import { sessionsRouter} from "./sessions.router.js";
import { viewsRouter } from "./views.router.js";
import { usersRouter } from "./users.router.js";
import { paymentsRouter } from "./payments.router.js";

export function routerApi(app) {
  const router = Router();
  app.use("/api/v1", router);

  router.use("/mail", mailRouter);
  router.use("/carts", cartsrouter);
  router.use("/products", productsRouter);
  router.use("/views", viewsRouter);
  router.use("/sessions", sessionsRouter);
  router.use("/users", usersRouter);
  router.use("/payments", paymentsRouter);
}