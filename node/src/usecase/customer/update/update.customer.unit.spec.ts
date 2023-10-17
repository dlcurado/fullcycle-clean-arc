import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", 
  new Address("Street",123,"000000","City")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street",
    number: 123,
    zip: "000000",
    city: "City"
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test for customer update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUserCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUserCase.execute(input);

    expect(output).toEqual(input);
  });


  it("should throw an expeption when name is empty", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUserCase = new UpdateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(customerUpdateUserCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an expeption when street is empty", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUserCase = new UpdateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(customerUpdateUserCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });
});