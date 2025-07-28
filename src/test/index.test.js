const request = require("supertest");
const { app, server } = require("../index");

describe("API Tests", () => {
  it("should respond with a welcome message", async () => {
    const response = await request(app).get("/api");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Welcome to the API");
  });

  afterAll(async () => {
    await server.close();
    console.log("Server closed");
  });
});
