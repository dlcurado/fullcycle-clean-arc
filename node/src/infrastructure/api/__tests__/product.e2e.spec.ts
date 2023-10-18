import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E tests for product",() => {
  beforeEach(async () => {
    await sequelize.sync({force: true})
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product",async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10.5
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(10.5);
  });

  it("should not create a product without name",async () => {
    let response = await request(app)
      .post("/product")
      .send({
        name: "",
        price: 10.5,
      });

    expect(response.status).toBe(200);

    response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: -1,
      });

    expect(response.status).toBe(200);
  });

  it("should list products",async () => {
    const response1 = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 10.5,
      });

    expect(response1.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 14.98,
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    let product = listResponse.body.products[0];
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(10.5);

    product = listResponse.body.products[1];
    expect(product.name).toBe("Product 2");
    expect(product.price).toBe(14.98);
  });

  
});