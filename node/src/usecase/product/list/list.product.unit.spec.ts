import ListProductUseCase from "./list.product.usecase";

const input1 = {
  id: "123",
  name: "Product 1",
  price: 20.0
}

const input2 = {
  id: "234",
  name: "Product 2",
  price: 12.0
}


const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([input1, input2])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test list product use case", () => {
  it("should list 2 products", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(input1.id);
    expect(output.products[0].name).toBe(input1.name);
    expect(output.products[0].price).toBe(input1.price);
    expect(output.products[1].id).toBe(input2.id);
    expect(output.products[1].name).toBe(input2.name);
    expect(output.products[1].price).toBe(input2.price);
  });
});