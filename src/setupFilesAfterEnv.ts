import { disconnectDB } from "./db";
global.afterAll(async () => {
  await disconnectDB();
});
