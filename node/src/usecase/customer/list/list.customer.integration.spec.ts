import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Integration test list customer use case", () => {
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

  it("should list a customer", async () => {
    // Criando um customer
    const customerRepository = new CustomerRepository();
    const useCaseCustomer = new ListCustomerUseCase(customerRepository);
    
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    

    const customer2 = new Customer("234", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    
    customer1.changeAddress(address1);
    customer2.changeAddress(address2);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);
    

    const output1 = {
      id: "123",
      name: "Customer 1",
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1"
      }
    }

    const output2 = {
      id: "234",
      name: "Customer 2",
      address: {
        street: "Street 2",
        city: "City 2",
        number: 2,
        zip: "Zipcode 2"
      }
    }
    
    const customerOutput = await useCaseCustomer.execute(customer1);

    expect(customerOutput.customers.length).toEqual(2);

    expect(customerOutput.customers[0].id).toEqual(output1.id);
    expect(customerOutput.customers[0].name).toEqual(output1.name);
    expect(customerOutput.customers[0].address.street).toEqual(output1.address.street);

    expect(customerOutput.customers[1].id).toEqual(output2.id);
    expect(customerOutput.customers[1].name).toEqual(output2.name);
    expect(customerOutput.customers[1].address.street).toEqual(output2.address.street);
  });
});