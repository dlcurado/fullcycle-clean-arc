import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    // Criando um product
    const productRepository = new ProductRepository();
    const useCaseProduct = new ListProductUseCase(productRepository);
    
    const product1 = new Product("123", "Product 1", 10.0);
    const product2 = new Product("234", "Product 2", 12.0);
    productRepository.create(product1);
    productRepository.create(product2);

    const productOutput = await useCaseProduct.execute({});

    expect(productOutput.products.length).toEqual(2);
    expect(productOutput.products[0].id).toBe(product1.id);
    expect(productOutput.products[0].name).toBe(product1.name);
    expect(productOutput.products[0].price).toBe(product1.price);
    expect(productOutput.products[1].id).toBe(product2.id);
    expect(productOutput.products[1].name).toBe(product2.name);
    expect(productOutput.products[1].price).toBe(product2.price);

  });
});