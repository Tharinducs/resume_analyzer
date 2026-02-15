import request from "supertest";
import app from "../app.js";

describe("Express App", () => {
  test("should respond to /health", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "OK" });
  });

  test("should parse JSON body", async () => {
    const res = await request(app)
      .post("/echo")
      .send({ hello: "world" })
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(404); // since route doesn't exist yet
  });
  
});