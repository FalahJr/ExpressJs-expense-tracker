import app from "../index";

import supertest from "supertest";
const requestWithSupertest = supertest(app);

afterAll((done) => {
  done();
});

// describe("User", () => {});

describe("User create", () => {
  test("List User", async () => {
    const res = await requestWithSupertest.get("/api/users/");

    expect(res.status).toBe(200);
  });

  it("user test", async () => {
    return requestWithSupertest
      .post("/api/users/register")
      .send({
        name: "testing",
        email: "test4@gmail.com",
        password: "testing123",
      })
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
    // expect(res.statusCode).toBe(400);
    // expect(res.body).toHaveProperty("post");
  });

  test("Edit User", async () => {
    const res = await requestWithSupertest.put("/api/users/update/2").send({
      name: "tim6",
      email: "tim6@gmail.com",
      password: "testing123",
    });

    expect(res.statusCode).toBe(201);
  });

  test("hapus User", async () => {
    const res = await requestWithSupertest.delete("/api/users/delete/42");

    expect(res.statusCode).toBe(201);
  });
});
