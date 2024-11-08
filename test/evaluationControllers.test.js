const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

describe("Evaluation Controller", () => {
  let token;
  let evaluationId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Autenticar y obtener un token
    const res = await request(app).post("/api/auth/login").send({
      username: "manager",
      password: "managerpassword",
    });
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new evaluation", async () => {
    const res = await request(app)
      .post("/api/evaluations")
      .set("Authorization", `Bearer ${token}`)
      .send({
        employeeId: "60f7a5c3c5f54b2cf6c8b64f", // Reemplaza con un ID de empleado válido
        period: "2023 Q3",
        type: "360 feedback",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    evaluationId = res.body._id;
  });

  it("should list all evaluations", async () => {
    const res = await request(app)
      .get("/api/evaluations")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
