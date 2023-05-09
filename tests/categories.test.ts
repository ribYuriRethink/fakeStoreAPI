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
});

describe("Insert a new category", () => {
  it("should return the id of the inserted category", async () => {
    jest.spyOn(Repositories, "getCategory").mockResolvedValueOnce([]);
    jest.spyOn(Repositories, "insertCategory").mockResolvedValueOnce([1]);

    expect(await categoryService.insert("jewelery")).toBe(1);
  });
});

describe("Update a category", () => {
  it("should return 1 for success", async () => {
    jest.spyOn(Repositories, "updateCategory").mockResolvedValueOnce(1);

    expect(await categoryService.update(1, "jewelery")).toBe(1);
  });

  it("should throw an error if not success", async () => {
    jest.spyOn(Repositories, "updateCategory").mockResolvedValueOnce(0);

    try {
      await categoryService.update(1, "jewelery");
    } catch (error: any) {
      expect(error.message).toMatch("Categoria não existe!");
    }
  });
});

describe("Remove a category", () => {
  it("should return 1 for success", async () => {
    jest.spyOn(Repositories, "removeCategory").mockResolvedValueOnce(1);

    expect(await categoryService.remove(1)).toBe(1);
  });

  it("should throw an error if not success", async () => {
    jest.spyOn(Repositories, "removeCategory").mockResolvedValueOnce(0);

    try {
      await categoryService.remove(1);
    } catch (error: any) {
      expect(error.message).toMatch("Categoria não existe!");
    }
  });
});
