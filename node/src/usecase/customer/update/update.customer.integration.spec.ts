import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Integration test update customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a customer", async () => {
    // Criando um customer
    const customerRepository = new CustomerRepository();
    const useCaseCustomer = new UpdateCustomerUseCase(customerRepository);
    
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);
    
    customer.changeName("Customer 1 Updated");

    const output = {
      id: "123",
      name: "Customer 1 Updated",
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1"
      }
    }
    
    const customerOutput = await useCaseCustomer.execute(customer);

    expect(customerOutput).toEqual(output);
  });
});