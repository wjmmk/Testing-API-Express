require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");

const app = process.env.SERVER_LOCAL;

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
  });

//* Testing the API endpoints. */
describe("GET /api/products", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});


describe("GET /api/products/:id", () => {
    it("should return a product", async () => {
      const res = await request(app).get(
        "/api/products/633aff86bbe0e9b1e9a1ec25"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Product 4");
    });
});
  
describe("POST /api/products", () => {
    it("should create a product", async () => {
      const res = await request(app).post("/api/products").send({
        name: "Product 4",
        price: 1009,
        description: "Description 2",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Product 4");
    });
});
  
describe("PATCH /api/products/:id", () => {
    it("should update a product", async () => {
      const res = await request(app)
        .patch("/api/products/633affb0bbe0e9b1e9a1ec29")
        .send({
          name: "Product 4",
          price: 104,
          description: "Description 4",
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(104);
    });
});
  

describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      const res = await request(app).delete(
        "/api/products/6338735c8e18f0d5eda0490f"
      );
      expect(res.statusCode).toBe(200);
    });
});