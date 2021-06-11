import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", (_, res: Response) => {
  res.status(200).send({
    appVersion: "v1.0.0",
  });
});

export default router;
