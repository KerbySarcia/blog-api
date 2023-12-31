import request from "supertest";

import app from "../app";
import { UserModel } from "../User/user.schema";

beforeAll(async () => {
  try {
    await UserModel.db.dropCollection("users");
  } catch (error) {}
});

describe("Post /auth", () => {
  it("response with a new user", async () =>
    request(app)
      .post("/user")
      .set("Accept", "application/json")
      .send({
        first_name: "Kerby",
        last_name: "Sarcia",
        password: "KerbySarcia_123",
        email: "kerbysarcia@gmail.com",
        mobile_number: "09502491943",
        interests: ["sports", "anime", "coding", "dancing"],
      })
      .expect("Content-type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty("first_name");
        expect(response.body).toHaveProperty("last_name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("mobile_number");
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("interests");
        expect(response.body).not.toHaveProperty("password");
        expect(response.body.interests.length).toBeGreaterThan(3);
      }));

  it("response with auth token", async () =>
    request(app)
      .post("/auth")
      .set("Accept", "application/json")
      .send({
        email: "kerbysarcia@gmail.com",
        password: "KerbySarcia_123",
      })
      .expect("Content-type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("auth_token");
      }));

  it("throw error invalid credentials", async () =>
    request(app)
      .post("/auth")
      .set("Accept", "application/json")
      .send({
        email: "095023194131",
        password: "123456780",
      })
      .expect("Content-type", /json/)
      .expect(401)
      .then((response) => {
        expect(response.body).toHaveProperty("statusCode");
        expect(response.body.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("stack");
      }));
});
