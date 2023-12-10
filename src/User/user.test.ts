import request from "supertest";

import app from "../app";
import { UserModel } from "./user.schema";

beforeAll(async () => {
  try {
    await UserModel.db.dropCollection("users");
  } catch (error) {}
});

describe("POST /user", () => {
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

  it("resonse with a new user using 63 mobile numer", async () =>
    request(app)
      .post("/user")
      .set("Accept", "application/json")
      .send({
        first_name: "Jhon",
        last_name: "Doe",
        password: "JhonDoe_123",
        email: "JhonDoe@gmail.com",
        mobile_number: "639502491943",
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

  it("thow duplicate error email", async () =>
    request(app)
      .post("/user")
      .set("Accept", "application/json")
      .send({
        first_name: "Kerby",
        last_name: "Sarcia",
        password: "KerbySarcia_123",
        email: "kerbysarcia@gmail.com",
        mobile_number: "09450249112",
        interests: ["sports", "anime", "coding", "dancing"],
      })
      .expect(409)
      .then((response) => {
        expect(response.body).toHaveProperty("statusCode");
        expect(response.body.statusCode).toBe(409);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("stack");
      }));

  it("thow duplicate error mobile number", async () =>
    request(app)
      .post("/user")
      .set("Accept", "application/json")
      .send({
        first_name: "Kerby",
        last_name: "Sarcia",
        password: "KerbySarcia_123",
        email: "kerbysarcia123@gmail.com",
        mobile_number: "09502491943",
        interests: ["sports", "anime", "coding", "dancing"],
      })
      .expect(409)
      .then((response) => {
        expect(response.body).toHaveProperty("statusCode");
        expect(response.body.statusCode).toBe(409);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("stack");
      }));

  it("thow an error on interests greater than 3", async () =>
    request(app)
      .post("/user")
      .set("Accept", "application/json")
      .send({
        first_name: "Kerby",
        last_name: "Sarcia",
        password: "KerbySarcia_123",
        email: "kerby@gmail.com",
        mobile_number: "09502491123",
        interests: ["sports"],
      })
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty("statusCode");
        expect(response.body.statusCode).toBe(422);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("stack");
      }));

  it("throw an error invalid email", async () =>
    request(app)
      .post("/user")
      .set("Accept", "application/json")
      .send({
        first_name: "Kerby",
        last_name: "Sarcia",
        password: "KerbySarcia_123",
        email: "kerbysarcasdiagmail.com",
        mobile_number: "095024919231",
        interests: ["sports", "anime", "coding", "dancing"],
      })
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty("statusCode");
        expect(response.body.statusCode).toBe(422);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("stack");
      }));

  it("throw an error status code 422", async () =>
    request(app)
      .post("/user")
      .set("Accept", "application/json")
      .send({})
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty("statusCode");
        expect(response.body.statusCode).toBe(422);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("stack");
      }));
});
