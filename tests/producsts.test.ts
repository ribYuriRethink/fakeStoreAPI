import { describe, expect, jest, it } from "@jest/globals";
import Repositories from "../src/repository/Repositories";
import productService from "../src/services/productService";
import { allProducts, category, product } from "./mocks";

describe("Get all products", () => {
  it("should return all products on database", async () => {
    jest
      .spyOn(Repositories, "indexProducts")
      .mockResolvedValueOnce(allProducts);

    expect(await productService.index()).toMatchObject([{ id: 1 }, { id: 2 }]);
  });
});

describe("Get a product by id", () => {
  it("should return one product with the given id", async () => {
    jest.spyOn(Repositories, "getProduct").mockResolvedValueOnce([product]);

    expect(await productService.show(1)).toMatchObject({ id: 1 });
  });
});

describe("Insert a new product", () => {
  it("should return the id of the inserted product", async () => {
    jest.spyOn(Repositories, "getCategory").mockResolvedValueOnce([category]);
    jest.spyOn(Repositories, "insertProduct").mockResolvedValueOnce([1]);

    expect(await productService.insert(product)).toBe(1);
  });
});
