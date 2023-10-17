import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 10.0);

const input = {
  id: product.id,
  name: "Product 1 Udpated",
  price: product.price * 1.1
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test for product update use case", () => {
  it("should update a product", async ()=> {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  })

  it("should throw an exception when product prince is minor than zero", async ()=> {
    const productRepository = MockRepository();
    
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    input.price = -1;
  
    await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  })
});