import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "Customer 1",
  address: {
    street: "Street 1",
    city: "City 1",
    number: 1,
    zip: "Zipcode 1"
  }
}


const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test create customer use case", () => {
//   const customer = new Customer("123", "Customer 1");
// const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
// customer.changeAddress(address);

  it("should create a customer", async () => {
    // Criando um customer
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip
      }
    });
  });

  it("should throw an expeption when name is empty", async () => {
    // Criando um customer
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an expeption when street is empty", async () => {
    // Criando um customer
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});