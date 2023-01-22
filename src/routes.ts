import { Router } from "express";
import { AuthController } from "./controllers/auth/auth.controller";
import { UserController } from "./controllers/user/user.controller";
import { ProfessionController } from "./controllers/profession/profession.controller";
import { SpecialityController } from "./controllers/speciality/speciality.controller";

const router = Router();

const routes = [
  {
    path: "/api/auth",
    route: new AuthController().router,
  },
  {
    path: "/api/user",
    route: new UserController().router,
  },
  {
    path: "/profession",
    route: new ProfessionController().router,
  },
  {
    path: "/speciality",
    route: new SpecialityController().router,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
