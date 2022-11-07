import app from "../index";

import supertest from "supertest";
const requestWithSupertest = supertest(app);

afterAll((done) => {
  done();
});

let token;
// describe("User", () => {});

describe("financial", () => {
  test("Login", async () => {
    const res = await requestWithSupertest
      .post("/api/users/login")
      .send({ email: "new@gmail.com", password: "new123" });

    expect(res.status).toBe(201);
    token = res.body.token;
  });

  test("List Financial Record", async () => {
    const res = await requestWithSupertest
      .get("/api/financial_record/")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
  });

  it("create financial", async () => {
    return requestWithSupertest
      .post("/api/financial_record/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        money: 12000,
        status: "uang masuk",
        description: "gajian bulan 11",
      })
      .expect("Content-type", /json/)
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });

  test("Edit financial", async () => {
    const res = await requestWithSupertest
      .put("/api/financial_record/update/3")
      .set("Authorization", `Bearer ${token}`)
      .send({
        money: 15000,
        status: "uang keluar",
        description: "jajan",
      });

    expect(res.statusCode).toBe(201);
  });

  test("hapus financial", async () => {
    const res = await requestWithSupertest.delete(
      "/api/financial_record/delete/7"
    );

    expect(res.statusCode).toBe(200);
  });
});
