import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe", 
  new Address("Street 1",123,"000000","City")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe", 
  new Address("Street 2",123,"000000","City")
);


const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn()
  }
}


describe("Unit test for listing customer use case", () => {
  it("should list 2 customers", async  () => {
    const repository = MockRepository();
    const customerListUseCase = new ListCustomerUseCase(repository);

    const output = await customerListUseCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);
    expect(output.customers[0].address.number).toBe(customer1.address.number);
    expect(output.customers[0].address.zip).toBe(customer1.address.zip);
    expect(output.customers[0].address.city).toBe(customer1.address.city);

  });
});