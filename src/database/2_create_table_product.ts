import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", function (table) {
    table.increments();
    table.string("title").notNullable();
    table.float("price");
    table.text("description");
    table.integer("category_id");
    table.foreign("category_id").references("categorys");
    table.string("image");
    table.float("rate");
    table.integer("count");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("products");
}
