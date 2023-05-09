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

  it("should throw an error if the database is empty", async () => {
    jest.spyOn(Repositories, "indexProducts").mockResolvedValueOnce([]);

    try {
      await productService.index();
    } catch (error: any) {
      expect(error.message).toMatch("O banco está vazio!");
    }
  });
});

describe("Get a product by id", () => {
  it("should return one product with the given id", async () => {
    jest.spyOn(Repositories, "getProduct").mockResolvedValueOnce([product]);

    expect(await productService.show(1)).toMatchObject({ id: 1 });
  });

  it("should throw an error if there is not product with the given id", async () => {
    jest.spyOn(Repositories, "getProduct").mockResolvedValueOnce([]);

    try {
      await productService.show(1);
    } catch (error: any) {
      expect(error.message).toMatch("Produto não existe!");
    }
  });
});

describe("Insert a new product", () => {
  it("should return the id of the inserted product", async () => {
    jest.spyOn(Repositories, "getCategory").mockResolvedValueOnce([category]);
    jest.spyOn(Repositories, "insertProduct").mockResolvedValueOnce([1]);

    expect(await productService.insert(product)).toBe(1);
  });

  it("should throw an error if the category does not exist", async () => {
    jest.spyOn(Repositories, "getCategory").mockResolvedValueOnce([]);

    try {
      await productService.insert(product);
    } catch (error: any) {
      expect(error.message).toMatch("Categoria não existe!");
    }
  });
});

describe("Update a product", () => {
  it("should return the id of the updated product", async () => {
    jest.spyOn(Repositories, "getCategory").mockResolvedValueOnce([category]);
    jest.spyOn(Repositories, "updateProduct").mockResolvedValueOnce(1);

    expect(await productService.update(1, product)).toBe(1);
  });

  it("should throw an error if the category does not exist", async () => {
    jest.spyOn(Repositories, "getCategory").mockResolvedValueOnce([]);

    try {
      await productService.update(1, product);
    } catch (error: any) {
      expect(error.message).toMatch("Categoria não existe!");
    }
  });

  it("should throw an error if the product does not exist", async () => {
    jest.spyOn(Repositories, "getCategory").mockResolvedValueOnce([category]);
    jest.spyOn(Repositories, "updateProduct").mockResolvedValueOnce(0);

    try {
      await productService.update(1, product);
    } catch (error: any) {
      expect(error.message).toMatch("Produto não existe!");
    }
  });
});

describe("Remove product", () => {
  it("should return 1 if successful", async () => {
    jest.spyOn(Repositories, "removeProduct").mockResolvedValueOnce(1);

    expect(await productService.remove(1)).toBe(1);
  });

  it("should throw an error if not successful", async () => {
    jest.spyOn(Repositories, "removeProduct").mockResolvedValueOnce(0);

    try {
      await productService.remove(1);
    } catch (error: any) {
      expect(error.message).toMatch("Produto não existe!");
    }
  });
});
