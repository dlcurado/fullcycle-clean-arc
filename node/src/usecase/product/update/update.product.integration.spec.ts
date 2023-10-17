import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";

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
    const useCaseProduct = new UpdateProductUseCase(productRepository);
    
    const product = new Product("123", "Product 1", 10.0);
    productRepository.create(product);

    product.changeName("Product 1 Updated");
    product.changePrice(11.0);

    const productOutput = await useCaseProduct.execute(product);

    expect(productOutput.name).toEqual("Product 1 Updated");
    expect(productOutput.price).toEqual(11.0);
  });
});