import app from "../index";

import supertest from "supertest";
const requestWithSupertest = supertest(app);

describe("login API Test", () => {
  // Login Test
  test("Login", async () => {
    const res = await requestWithSupertest
      .post("/api/users/login")
      .send({ email: "new@gmail.com", password: "new123" });

    expect(res.status).toBe(201);
  });
});
