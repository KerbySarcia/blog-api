import request from "supertest";

import app from "../app";
import { Blog, BlogModel } from "./blog.schema";

beforeAll(async () => {
  await BlogModel.db.dropCollection("blogs");
});

describe("BLOG Router", () => {
  describe("POST /blog", () => {
    it("response with a posted blog", async () => {
      const token = await request(app)
        .post("/auth")
        .send({
          email: "kerbysarcia@gmail.com",
          password: "KerbySarcia_123",
        })
        .then((res) => res.body.auth_token);

      return request(app)
        .post("/blog")
        .set("Accept", "application/json")
        .set("authorization", "Bearer " + token)
        .send({
          title: "New Journey",
          content: "Hello World!",
          tags: ["Coding", "Computer"],
        })
        .expect("Content-type", /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty("title");
          expect(response.body).toHaveProperty("content");
          expect(response.body).toHaveProperty("tags");
        });
    });

    it("response with a posted blog", async () => {
      const token = await request(app)
        .post("/auth")
        .send({
          email: "kerbysarcia@gmail.com",
          password: "KerbySarcia_123",
        })
        .then((res) => res.body.auth_token);

      return request(app)
        .post("/blog")
        .set("Accept", "application/json")
        .set("authorization", "Bearer " + token)
        .send({
          title: "New Journey",
          content: "Hello World!",
          tags: ["Computer"],
        })
        .expect("Content-type", /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty("title");
          expect(response.body).toHaveProperty("content");
          expect(response.body).toHaveProperty("tags");
        });
    });

    it("response with a posted blog", async () => {
      const token = await request(app)
        .post("/auth")
        .send({
          email: "kerbysarcia@gmail.com",
          password: "KerbySarcia_123",
        })
        .then((res) => res.body.auth_token);

      return request(app)
        .post("/blog")
        .set("Accept", "application/json")
        .set("authorization", "Bearer " + token)
        .send({
          title: "New Journey",
          content: "Hello World!",
          tags: ["Computer", "Dance", "Coding"],
        })
        .expect("Content-type", /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty("title");
          expect(response.body).toHaveProperty("content");
          expect(response.body).toHaveProperty("tags");
        });
    });
  });

  describe("GET /blog", () => {
    it("response with blogs depends on user interests", async () => {
      const token = await request(app)
        .post("/auth")
        .send({
          email: "kerbysarcia@gmail.com",
          password: "KerbySarcia_123",
        })
        .then((res) => res.body.auth_token);

      return request(app)
        .get("/blog")
        .set("Accept", "application/json")
        .set("authorization", "Bearer " + token)
        .send({ page: 0, tags: ["Basketball", "Coding", "Dance"] })
        .expect(200)
        .then((response) => {
          response.body.map((item: Blog) => {
            const blog = item.tags.some((tag) => ["Basketball", "Coding", "Dance"].includes(tag));
            expect(blog).toBe(true);
          });
        });
    });

    it("response with blogs depends on user interests", async () => {
      const token = await request(app)
        .post("/auth")
        .send({
          email: "kerbysarcia@gmail.com",
          password: "KerbySarcia_123",
        })
        .then((res) => res.body.auth_token);

      return request(app)
        .get("/blog")
        .set("Accept", "application/json")
        .set("authorization", "Bearer " + token)
        .send({ page: 1, tags: ["Basketball", "Coding", "Dance"] })
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([]);
        });
    });
  });
});

describe("/DELETE", () => {
  it("response with deleted blog", async () => {
    const token = await request(app)
      .post("/auth")
      .send({
        email: "kerbysarcia@gmail.com",
        password: "KerbySarcia_123",
      })
      .then((res) => res.body.auth_token);

    const blogs = await BlogModel.find().limit(2);
    const id = blogs[0]._id.toString();

    return request(app)
      .delete("/blog/" + id)
      .set("authorization", "Bearer " + token)
      .expect(200)
      .then(async (response) => {
        const blogId = response.body._id.toString();
        const isExist = await BlogModel.findById(blogId).lean();
        expect(isExist).toEqual(null);
      });
  });
});
