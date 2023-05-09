import { describe, expect, jest, it } from "@jest/globals";
import Repositories from "../src/repository/Repositories";
import { allCategories, allProducts, category, product } from "./mocks";
import categoryService from "../src/services/categoryService";

describe("Get all categories", () => {
  it("should return all the categories on database", async () => {
    jest
      .spyOn(Repositories, "indexCategories")
      .mockResolvedValueOnce(allCategories);

    expect(await categoryService.index()).toEqual(
      expect.arrayContaining(["jewelery", "men's clothing"])
    );
  });

  it("should throw an error if the database is empty", async () => {
    jest.spyOn(Repositories, "indexCategories").mockResolvedValueOnce([]);

    try {
      await categoryService.index();
    } catch (error: any) {
      expect(error.message).toMatch("O banco está vazio!");
    }
  });
});

describe("Get the products by category name", () => {
  it("should return all the products with the given category", async () => {
    jest
      .spyOn(Repositories, "getProductsByCategory")
      .mockResolvedValueOnce(allProducts);

    expect(await categoryService.showByCategory("jewelery")).toMatchObject([
      { id: 1 },
      { id: 2 },
    ]);
  });
  it("should return an empty array if there is no products with the given category", async () => {
    jest.spyOn(Repositories, "getProductsByCategory").mockResolvedValueOnce([]);

    expect(await categoryService.showByCategory("jewelery")).toMatchObject([]);
  });
});

describe("Insert a new category", () => {
  it("should return the id of the inserted category", async () => {
    jest.spyOn(Repositories, "getCategory").mockResolvedValueOnce([]);
    jest.spyOn(Repositories, "insertCategory").mockResolvedValueOnce([1]);

    expect(await categoryService.insert("jewelery")).toBe(1);
  });
  it("should throw an error if the category already exists", async () => {
    jest.spyOn(Repositories, "getCategory").mockResolvedValueOnce([category]);

    try {
      await categoryService.insert("jewelery");
    } catch (error: any) {
      expect(error.message).toMatch("Categoria já existe!");
    }
  });
});

describe("Update a category", () => {
  it("should return 1 if successful", async () => {
    jest.spyOn(Repositories, "updateCategory").mockResolvedValueOnce(1);

    expect(await categoryService.update(1, "jewelery")).toBe(1);
  });

  it("should throw an error if not successful", async () => {
    jest.spyOn(Repositories, "updateCategory").mockResolvedValueOnce(0);

    try {
      await categoryService.update(1, "jewelery");
    } catch (error: any) {
      expect(error.message).toMatch("Categoria não existe!");
    }
  });
});

describe("Remove a category", () => {
  it("should return 1 if successful", async () => {
    jest.spyOn(Repositories, "removeCategory").mockResolvedValueOnce(1);

    expect(await categoryService.remove(1)).toBe(1);
  });

  it("should throw an error if not successful", async () => {
    jest.spyOn(Repositories, "removeCategory").mockResolvedValueOnce(0);

    try {
      await categoryService.remove(1);
    } catch (error: any) {
      expect(error.message).toMatch("Categoria não existe!");
    }
  });
});
