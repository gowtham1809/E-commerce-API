const request = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");

describe("API Tests", () => {
  it("should respond with a welcome message", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
    console.log("Server and DB connection closed");
  });
});
