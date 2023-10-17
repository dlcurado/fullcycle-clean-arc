import { OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const input = {
  id: "123",
  name: "Product 1",
  price: 20.0
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(input)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test product find use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productFindUseCase = new FindProductUseCase(productRepository);

    const inputFind = {
      id: "123",
      name: "",
      price: 0
    }

    const output = await productFindUseCase.execute(inputFind);

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      price: input.price
    })
  });

  it("should throw an exception that product was not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    
    const productFindUseCase = new FindProductUseCase(productRepository);

    const inputFind = {
      id: "234",
      name: "",
      price: 0
    }

    await expect(productFindUseCase.execute(inputFind)).rejects.toThrow(
      "Product not found"
    );
  });
});