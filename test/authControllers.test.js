const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

describe("Auth Controller", () => {
  beforeAll(async () => {
    // Conecta a la base de datos antes de ejecutar las pruebas
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Cierra la conexión después de todas las pruebas
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "password123",
      role: "empleado",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("Usuario registrado");
  });

  it("should login a user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
