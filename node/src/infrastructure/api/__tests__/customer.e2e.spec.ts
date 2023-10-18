import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E tests for customer",() => {
  beforeEach(async () => {
    await sequelize.sync({force: true})
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer",async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Jhon",
        address: {
          street: "street 555",
          city: "city",
          number: 123,
          zip: "zip",
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Jhon");
    expect(response.body.address.street).toBe("street 555");
  });

  it("should not create a customer without name",async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "",
        address: {
          street: "street 555",
          city: "city",
          number: 123,
          zip: "zip",
        }
      });

    expect(response.status).toBe(500);
  });

  it("should list customers",async () => {
    const response1 = await request(app)
      .post("/customer")
      .send({
        name: "Suzi",
        address: {
          street: "street 123",
          city: "city 1",
          number: 569,
          zip: "zip 1",
        }
      });

    expect(response1.status).toBe(200);
    expect(response1.body.name).toBe("Suzi");
    expect(response1.body.address.street).toBe("street 123");

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jhon",
        address: {
          street: "street 555",
          city: "city 2",
          number: 123,
          zip: "zip 2",
        }
      });

    expect(response2.status).toBe(200);
    expect(response2.body.name).toBe("Jhon");
    expect(response2.body.address.street).toBe("street 555");

    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    let customer = listResponse.body.customers[0];
    expect(customer.name).toBe("Suzi");
    expect(customer.address.street).toBe("street 123");

    customer = listResponse.body.customers[1];
    expect(customer.name).toBe("Jhon");
    expect(customer.address.street).toBe("street 555");
  });
});