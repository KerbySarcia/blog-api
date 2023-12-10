import { Response, Router } from "express";

const router = Router();

type Health = {
  message: string;
  date: Date;
};

router.get("/", (_, res: Response<Health>) => {
  res.json({
    message: "Health Check",
    date: new Date(),
  });
});

export default router;
