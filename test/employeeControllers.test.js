const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");

describe("Employee Controller", () => {
  let token;
  let employeeId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Autenticar y obtener un token
    const res = await request(app).post("/api/auth/login").send({
      username: "admin",
      password: "adminpassword",
    });
    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new employee", async () => {
    const res = await request(app)
      .post("/api/employees")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Doe",
        position: "Developer",
        department: "Engineering",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    employeeId = res.body._id;
  });

  it("should get an employee by ID", async () => {
    const res = await request(app)
      .get(`/api/employees/${employeeId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "John Doe");
  });
});
