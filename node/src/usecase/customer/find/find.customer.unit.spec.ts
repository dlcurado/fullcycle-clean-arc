import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Customer 1");
const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test find customer use case", () => {
  it("should find a customer", async () => {
    // Criando um customer
    const customerRepository = MockRepository();
    const customerFindUseCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123"
    }

    const output = {
      id: "123",
      name: "Customer 1",
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1"
      }
    }
    
    const customerOutput = await customerFindUseCase.execute(input);

    expect(customerOutput).toEqual(output);
  })

  it("it should throw an customer not found exception", async () => {
    // Criando um customer
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const useCaseCustomer = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123"
    };

    const output = {
      id: "123",
      name: "Customer 1",
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1"
      }
    };

    expect(() => {
      return useCaseCustomer.execute(input)
    }).rejects.toThrow("Customer not found");
  });
});